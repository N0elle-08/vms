import requests
import xml.etree.ElementTree as ET
from app.models.rfq import GeneralAndDeliveryInfo

S4HANA_BASE_URL = "https://my418390-api.s4hana.cloud.sap/sap/opu"
AUTH = ("S4HANA_BASIC", "GGWYYnbPqPWmpcuCHt9zuht<NFnlkbQYJEHvkfLi")



import requests

def fetch_prs():
    # Fetch data from the SAP API
    response = requests.get(
        f"{S4HANA_BASE_URL}/odata4/sap/api_purchaserequisition_2/srvd_a2x/sap/purchaserequisition/0001/PurchaseReqn",
        auth=AUTH
    )
    response.raise_for_status()  # Raise an exception for HTTP errors

    # Parse the JSON response
    data = response.json()

    # Extract the list of purchase requisitions
    prs = []
    for item in data.get("value", []):
        prs.append({
            "id": item.get("PurchaseRequisition"),
            "type": item.get("PurchaseRequisitionType"),
            "description": item.get("PurReqnDescription"),
            "note": item.get("PurReqnHeaderNote"),
        })

    return prs

def create_quotation(quotation):
    """Crete quoation"""
    #response = requests.post(f"{S4HANA_BASE_URL}/publish-rfq", json={"pr_id": pr_id}, auth=AUTH)
    #response.raise_for_status()
    return {"message": "Quotation created successfully"}

def fetch_rfqs():
    """Fetch RFQs for vendors."""
    response = requests.get(f"{S4HANA_BASE_URL}/odata/sap/API_RFQ_PROCESS_SRV/A_RequestForQuotation", auth=AUTH)
    response.raise_for_status()
    #return response.json().get("value", []) # Assume the SAP API returns a list of RFQs
     # Parse the XML response
    root = ET.fromstring(response.text)
    namespace = {
        "atom": "http://www.w3.org/2005/Atom",
        "m": "http://schemas.microsoft.com/ado/2007/08/dataservices/metadata",
        "d": "http://schemas.microsoft.com/ado/2007/08/dataservices"
    }

    rfqs = []
    for entry in root.findall("atom:entry", namespace):
        properties = entry.find("atom:content/m:properties", namespace)
        rfqs.append({
            "id": properties.find("d:RequestForQuotation", namespace).text,
            "name": properties.find("d:RequestForQuotationName", namespace).text,
            "created_by": properties.find("d:CreatedByUser", namespace).text,
            "creation_date": properties.find("d:CreationDate", namespace).text,
            "currency": properties.find("d:DocumentCurrency", namespace).text,
            "publishing_date": properties.find("d:RFQPublishingDate", namespace).text,
            "submission_deadline": properties.find("d:QuotationLatestSubmissionDate", namespace).text,
            "lifecycle_status": properties.find("d:RFQLifecycleStatus", namespace).text,
        })
    print(rfqs)
    return rfqs

#rfq details
def fetch_quotations(role):
   # endpoint = f"{S4HANA_BASE_URL}/Quotations?role={role}"
   # response = requests.get(endpoint, auth=AUTH)
   # response.raise_for_status()
    return "response.json()"

def fetch_general_and_delivery_info(rfq_id: str):
    endpoint = f"{S4HANA_BASE_URL}/odata/sap/API_RFQ_PROCESS_SRV/A_RequestForQuotation('{rfq_id}')"
    headers = {"Accept": "application/atom+xml"}
    
    response = requests.get(endpoint, auth=AUTH, headers=headers)
    response.raise_for_status()

    # Parse XML response
    root = ET.fromstring(response.text)
    namespace = {
        "atom": "http://www.w3.org/2005/Atom",
        "m": "http://schemas.microsoft.com/ado/2007/08/dataservices/metadata",
        "d": "http://schemas.microsoft.com/ado/2007/08/dataservices"
    }
    properties = root.find(".//atom:content/m:properties", namespace)

    rfq_det = {
        "RequestForQuotation": properties.find("d:RequestForQuotation", namespace).text,
        "CompanyCode": properties.find("d:CompanyCode", namespace).text,
        "PurchasingDocumentCategory": properties.find("d:PurchasingDocumentCategory", namespace).text,
        "PurchasingDocumentType": properties.find("d:PurchasingDocumentType", namespace).text,
        "CreatedByUser": properties.find("d:CreatedByUser", namespace).text,
        "CreationDate": properties.find("d:CreationDate", namespace).text,
        "DocumentCurrency": properties.find("d:DocumentCurrency", namespace).text,
        "RFQPublishingDate": properties.find("d:RFQPublishingDate", namespace).text,
        "QuotationLatestSubmissionDate": properties.find("d:QuotationLatestSubmissionDate", namespace).text,
        "TargetAmount": properties.find("d:TargetAmount", namespace).text,
        "RFQLifecycleStatus": properties.find("d:RFQLifecycleStatus", namespace).text,
        "RequestForQuotationName": properties.find("d:RequestForQuotationName", namespace).text,
    }
    print(rfq_det)
    return rfq_det

def fetch_items(rfq_id):
    """Fetch items for an RFQ."""
    endpoint = f"{S4HANA_BASE_URL}/odata/sap/API_RFQ_PROCESS_SRV//A_RequestForQuotation({rfq_id})/to_RequestForQuotationItem"
    response = requests.get(endpoint, auth=AUTH)
    response.raise_for_status()
    return response.json()
