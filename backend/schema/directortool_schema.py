from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from enum import Enum
from decimal import Decimal
from typing_extensions import Literal


# ---------- ENUMS ----------


class EmploymentStatus(str, Enum):
    employed = "employed"
    unemployed = "unemployed"
    retired = "retired"


class CurrentPaymentStatus(str, Enum):
    active = "active"
    inactive = "inactive"


class BorrowerType(str, Enum):
    individual = "individual"
    joint = "joint"
    corporate = "corporate"


class InterestRateType(str, Enum):
    fixed = "fixed"
    variable = "variable"


# ---------- NESTED MODELS ----------


class BorrowerDetails(BaseModel):
    external_borrower_id: str
    borrower_name: str
    street_address: str
    city: str
    state: str
    zip_code: str
    borrower_type: BorrowerType
    employment_status: EmploymentStatus
    company_name: Optional[str] = None
    monthly_income_range: str


class LoanAccountDetails(BaseModel):
    external_loan_account_id: str
    loan_number: str
    outstanding_principal: Decimal = Field(..., gt=0)
    interest_rate_type: InterestRateType
    escrow_balance: Decimal = Field(..., ge=0)
    loan_type: str
    delinquency_days: int = Field(..., ge=0)
    next_payment_due_date: datetime
    current_payment_status: CurrentPaymentStatus


class PropertyDetails(BaseModel):
    external_property_id: str
    property_address: str
    property_value: Decimal = Field(..., gt=0)
    property_condition: str
    occupancy_type: str
    investor_insure_type: str


class PaymentBehavior(BaseModel):
    payment_behavior_id: str
    payment_history: str
    last_payment_date: datetime
    payment_pattern: str
    forbearance_history: str
    late_fees_accrued: Decimal = Field(..., ge=0)
    payment_method: str


class FinancialHardship(BaseModel):
    financial_hardship_id: str
    hardship_reason: str
    hardship_start_date: datetime
    hardship_duration_months: int = Field(..., ge=0)
    income_reduction_percentage: Decimal = Field(..., ge=0, le=100)
    supporting_documents: Optional[str] = None
    borrower_explanation: str
    assistance_type_required: str
    eligibility_status: str


# ---------- MAIN SCHEMAS ----------


class BorrowerDirectoryCreate(BaseModel):
    external_case_id: str
    borrower: BorrowerDetails
    loan_account: LoanAccountDetails
    property: PropertyDetails
    payment_behavior: PaymentBehavior
    financial_hardship: Optional[FinancialHardship] = None


class BorrowerDirectoryOut(BorrowerDirectoryCreate):
    id: str
    source: Literal["dummy", "director_tool", "manual"]
    created_at: datetime
    updated_at: datetime
