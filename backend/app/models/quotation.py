from pydantic import BaseModel

class Quotation(BaseModel):
    id: str
    rfq_id: str
    supplier: str
    price: float
    status: str
