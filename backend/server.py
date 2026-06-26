from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Amsale Café API")
api_router = APIRouter(prefix="/api")


class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactInquiryCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    phone: Optional[str] = Field(default=None, max_length=40)
    party_size: Optional[str] = Field(default=None, max_length=10)
    preferred_date: Optional[str] = Field(default=None, max_length=30)
    message: Optional[str] = Field(default=None, max_length=2000)
    honeypot: Optional[str] = Field(default="", max_length=200)


class ContactInquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    party_size: Optional[str] = None
    preferred_date: Optional[str] = None
    message: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


@api_router.get("/")
async def root():
    return {"message": "Amsale Café API"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/contact", response_model=ContactInquiry)
async def create_contact_inquiry(payload: ContactInquiryCreate):
    # Silent honeypot drop
    if payload.honeypot and payload.honeypot.strip():
        # Return a fake "success" without persisting
        return ContactInquiry(
            name=payload.name,
            email=str(payload.email),
            phone=payload.phone,
            party_size=payload.party_size,
            preferred_date=payload.preferred_date,
            message=payload.message,
        )

    inquiry = ContactInquiry(
        name=payload.name.strip(),
        email=str(payload.email).strip(),
        phone=(payload.phone or "").strip() or None,
        party_size=(payload.party_size or "").strip() or None,
        preferred_date=(payload.preferred_date or "").strip() or None,
        message=(payload.message or "").strip() or None,
    )
    doc = inquiry.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    try:
        await db.contact_inquiries.insert_one(doc)
    except Exception as e:
        logging.exception("Failed to save contact inquiry")
        raise HTTPException(status_code=500, detail="Unable to save inquiry")
    return inquiry


@api_router.get("/contact", response_model=List[ContactInquiry])
async def list_contact_inquiries(limit: int = 50):
    items = await db.contact_inquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    for item in items:
        if isinstance(item.get('created_at'), str):
            item['created_at'] = datetime.fromisoformat(item['created_at'])
    return items


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
