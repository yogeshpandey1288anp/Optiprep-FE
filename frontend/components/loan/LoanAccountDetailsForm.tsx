"use client";

import {
    FormGrid,
    Field,
    Label,
    Input,
} from "./LoanStyles";

export default function LoanAccountDetailsForm() {
    return (
        <FormGrid>
            <Field>
                <Label>Loan Number</Label>
                <Input value="4587123698" readOnly />
            </Field>

            <Field>
                <Label>Outstanding Principal</Label>
                <Input value="$325,000" readOnly />
            </Field>

            <Field>
                <Label>Interest Rate Type</Label>
                <Input value="Fixed Rate (5.25% per annum)" readOnly />
            </Field>

            <Field>
                <Label>Escrow Balance</Label>
                <Input value="$2,450" readOnly />
            </Field>

            <Field>
                <Label>Loan Type</Label>
                <Input value="FHA" readOnly />
            </Field>

            <Field>
                <Label>Delinquency Days</Label>
                <Input value="Current" readOnly />
            </Field>

            <Field>
                <Label>Next Payment Due Date</Label>
                <Input value="09-01-2025" readOnly />
            </Field>

            <Field>
                <Label>Current Payment Status</Label>
                <Input value="Active" readOnly />
            </Field>
        </FormGrid>
    );
}
