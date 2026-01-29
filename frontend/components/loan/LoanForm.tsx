"use client";

import {
    FormGrid,
    Field,
    Label,
    Input,
} from "./LoanStyles";

import { BorrowerDetails } from "@/app/lib/api/directortool.api";

export default function LoanForm({ data }: { data?: BorrowerDetails }) {
    if (!data) {
        return null;
    }

    return (
        <FormGrid>
            <Field>
                <Label>Borrower Name</Label>
                <Input value={data.borrower_name ?? ""} readOnly />
            </Field>

            <Field>
                <Label>Borrower ID / Case ID</Label>
                <Input value={data.external_borrower_id ?? ""} readOnly />
            </Field>

            <Field>
                <Label>Street Address</Label>
                <Input value={data.street_address ?? ""} readOnly />
            </Field>

            <Field>
                <Label>City</Label>
                <Input value={data.city ?? ""} readOnly />
            </Field>

            <Field>
                <Label>State</Label>
                <Input value={data.state ?? ""} readOnly />
            </Field>

            <Field>
                <Label>ZIP Code</Label>
                <Input value={data.zip_code ?? ""} readOnly />
            </Field>

            <Field>
                <Label>Borrower Type</Label>
                <Input value={data.borrower_type ?? ""} readOnly />
            </Field>

            <Field>
                <Label>Employment Status</Label>
                <Input value={data.employment_status ?? ""} readOnly />
            </Field>

            <Field>
                <Label>Company Name</Label>
                <Input value={data.company_name ?? ""} readOnly />
            </Field>

            <Field>
                <Label>Monthly Income Range</Label>
                <Input value={data.monthly_income_range ?? ""} readOnly />
            </Field>

        </FormGrid>
    );
}
