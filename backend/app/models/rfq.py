from pydantic import BaseModel
from typing import Optional

class RFQ(BaseModel):
    id: str  # Maps to `RequestForQuotation`
    name: str  # Maps to `RequestForQuotationName`
    created_by: str  # Maps to `CreatedByUser`
    creation_date: str  # Maps to `CreationDate`
    currency: str  # Maps to `DocumentCurrency`
    publishing_date: str  # Maps to `RFQPublishingDate`
    submission_deadline: str  # Maps to `QuotationLatestSubmissionDate`
    lifecycle_status: str  # Maps to `RFQLifecycleStatus`

class GeneralAndDeliveryInfo(BaseModel):
    RequestForQuotation: str
    CompanyCode: str
    PurchasingDocumentCategory: str
    PurchasingDocumentType: str
    CreatedByUser: str
    CreationDate: str
    LastChangeDateTime: Optional[str] = None  # Mark this field as optional
    DocumentCurrency: str
    RFQPublishingDate: str
    QuotationLatestSubmissionDate: str
    TargetAmount: str
    RFQLifecycleStatus: str
    RequestForQuotationName: str