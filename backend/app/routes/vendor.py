from http.client import HTTPException
from fastapi import APIRouter
from app.models.rfq import RFQ
from app.models.quotation import Quotation
from app.services.s4hana_service import fetch_rfqs, create_quotation, fetch_quotations, fetch_general_and_delivery_info, fetch_items
from app.models.rfq import GeneralAndDeliveryInfo

router = APIRouter()

# Mock data for vendor IDs (replace with S/4 HANA API or database in production)
VALID_VENDOR_IDS = ["17100088", "17100089", "17100100"]

@router.post("/login")
def login_vendor(vendor_id: str):
    """Authenticate vendor using their ID."""
    if vendor_id in VALID_VENDOR_IDS:
        return {"message": "Login successful", "vendor_id": vendor_id}
    raise HTTPException(status_code=401, detail="Invalid Vendor ID")


@router.get("/rfqs", response_model=list[RFQ])
def get_rfqs(vendor_id: str):
    return fetch_rfqs()


@router.post("/quotations", response_model=Quotation)
def post_quotation(quotation: Quotation):
    return create_quotation(quotation)

@router.get("/quotations", response_model=list[Quotation])
def get_vendor_quotations():
    return fetch_quotations(role="vendor")


#RFQ details

@router.get("/rfq/{rfq_id}/general", response_model=GeneralAndDeliveryInfo)
def get_general_and_delivery_info(rfq_id: str):
    """
    Get general and delivery information for a specific RFQ.
    """
    try:
        print(rfq_id)
        return fetch_general_and_delivery_info(rfq_id)
    except Exception as e:
        raise HTTPException(500, f"Error fetching data: {str(e)}")

@router.get("/rfq/{rfq_id}/items")
def get_items(rfq_id: str):
    """Fetch items for an RFQ."""
    try:
        print("Fetching items for")
       # return fetch_items(rfq_id)
    except Exception as e:
        raise HTTPException(500, f"Error fetching data: {str(e)}")
