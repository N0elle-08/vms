from fastapi import FastAPI
from app.routes import customer, vendor
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Supplier Dashboard")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to restrict origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(customer.router, prefix="/customer", tags=["Customer"])
app.include_router(vendor.router, prefix="/vendor", tags=["Vendor"])




