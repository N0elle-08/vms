from fastapi import APIRouter
from app.models.rfq import RFQ
from app.models.quotation import Quotation
from app.models.pr import PurchaseRequest
from app.services.s4hana_service import fetch_prs, fetch_rfqs, fetch_quotations

router = APIRouter()

@router.get("/prs", response_model=list[PurchaseRequest])
def get_prs():
    return fetch_prs()

@router.get("/rfqs", response_model=list[RFQ])
def get_customer_rfqs():
    return fetch_rfqs()

@router.get("/quotations", response_model=list[Quotation])
def get_customer_quotations():
    return fetch_quotations(role="customer")
