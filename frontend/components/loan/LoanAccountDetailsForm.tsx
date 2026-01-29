"use client";

import {
    FormGrid,
    Field,
    Label,
    Input,
} from "./LoanStyles";

import { LoanAccountDetails } from "@/app/lib/api/directortool.api";

export default function LoanAccountDetailsForm({
  data,
}: {
  data?: LoanAccountDetails;
}) {
  if (!data)
    {
            console.warn("LoanAccountDetailsForm: data is undefined");
        
        return null;
    }

    return (
        <FormGrid>
            <Field>
                <Label>Loan Number</Label>
                <Input value={data.loan_number} readOnly />
            </Field>

            <Field>
                <Label>Outstanding Principal</Label>
                <Input value={data.outstanding_principal} readOnly />
            </Field>

            <Field>
                <Label>Interest Rate Type</Label>
                <Input value={data.interest_rate_type} readOnly />
            </Field>

            <Field>
                <Label>Escrow Balance</Label>
                <Input value={data.escrow_balance} readOnly />
            </Field>

            <Field>
                <Label>Loan Type</Label>
                <Input value={data.loan_type} readOnly />
            </Field>

            <Field>
                <Label>Delinquency Days</Label>
                <Input value={data.delinquency_days} readOnly />
            </Field>

            <Field>
                <Label>Next Payment Due Date</Label>
                <Input value={data.next_payment_due_date} readOnly />
            </Field>

            <Field>
                <Label>Current Payment Status</Label>
                <Input value={data.current_payment_status} readOnly />
            </Field>
        </FormGrid>
    );
}
