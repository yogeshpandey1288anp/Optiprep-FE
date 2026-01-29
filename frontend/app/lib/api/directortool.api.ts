import axios from "axios";



const api = axios.create({
  baseURL:process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});



export type EmploymentStatus = "employed" | "unemployed" | "retired";

export type CurrentPaymentStatus = "active" | "inactive";

export type BorrowerType = "individual" | "joint" | "corporate";

export type InterestRateType = "fixed" | "variable";

export interface BorrowerDetails {
  external_borrower_id: string;
  borrower_name: string;
  street_address: string;
  city: string;
  state: string;
  zip_code: string;
  borrower_type: BorrowerType;
  employment_status: EmploymentStatus;
  company_name?: string | null;
  monthly_income_range: string;
}

export interface LoanAccountDetails {
  external_loan_account_id: string;
  loan_number: string;
  outstanding_principal: number;
  interest_rate_type: InterestRateType;
  escrow_balance: number;
  loan_type: string;
  delinquency_days: number;
  next_payment_due_date: string; 
  current_payment_status: CurrentPaymentStatus;
}

export interface PropertyDetails {
  external_property_id: string;
  property_address: string;
  property_value: number;
  property_condition: string;
  occupancy_type: string;
  investor_insure_type: string;
}

export interface PaymentBehavior {
  payment_behavior_id: string;
  payment_history: string;
  last_payment_date: string; // ISO datetime
  payment_pattern: string;
  forbearance_history: string;
  late_fees_accrued: number;
  payment_method: string;
}

export interface FinancialHardship {
  financial_hardship_id: string;
  hardship_reason: string;
  hardship_start_date: string; 
  hardship_duration_months: number;
  income_reduction_percentage: number;
  supporting_documents?: string | null;
  borrower_explanation: string;
  assistance_type_required: string;
  eligibility_status: string;
}


export interface BorrowerDirectoryCreate {
  external_case_id: string;
  borrower: BorrowerDetails;
  loan_account: LoanAccountDetails;
  property: PropertyDetails;
  payment_behavior: PaymentBehavior;
  financial_hardship?: FinancialHardship | null;
}

export interface BorrowerDirectoryOut extends BorrowerDirectoryCreate {
  id: string;
  source: "dummy" | "director_tool" | "manual";
  created_at: string; 
  updated_at: string; 
}


export const createDirectorToolData = async (
  payload: BorrowerDirectoryCreate
): Promise<BorrowerDirectoryOut> => {
  const { data } = await api.post<BorrowerDirectoryOut>(
    "/directortool/",
    payload
  );
  return data;
};


export const getDirectorToolData = async (
  externalCaseId: string
): Promise<BorrowerDirectoryOut> => {
  const { data } = await api.get<BorrowerDirectoryOut>(
    `/directortool/${externalCaseId}`
  );
  return data;
};


export const getAllDirectorToolData = async (): Promise<
  BorrowerDirectoryOut[]
> => {
  const { data } = await api.get<BorrowerDirectoryOut[]>("/directortool/");
  return data;
};
