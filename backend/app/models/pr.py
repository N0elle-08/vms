from pydantic import BaseModel

class PurchaseRequest(BaseModel):
    id: str
    type: str
    description: str
    note: str
    #source_determination: str
