"use client";

import {
    FormGrid,
    Field,
    Label,
    Input,
} from "./LoanStyles";

export default function LoanForm() {
    return (
        <FormGrid>
            <Field>
                <Label>Borrower Name</Label>
                <Input value="Alex Johnson" readOnly />
            </Field>

            <Field>
                <Label>Borrower ID / Case ID</Label>
                <Input value="784512TX" readOnly />
            </Field>

            <Field>
                <Label>Street Address</Label>
                <Input value="2457 Maplewood Avenue" readOnly />
            </Field>

            <Field>
                <Label>City</Label>
                <Input value="Dallas" readOnly />
            </Field>

            <Field>
                <Label>State</Label>
                <Input value="Texas (TX)" readOnly />
            </Field>

            <Field>
                <Label>ZIP Code</Label>
                <Input value="75204" readOnly />
            </Field>

            <Field>
                <Label>Borrower Type</Label>
                <Input value="Individual (Primary Borrower)" readOnly />
            </Field>

            <Field>
                <Label>Employment Status</Label>
                <Input value="Salaried / Full-Time Employed" readOnly />
            </Field>

            <Field>
                <Label>Company Name</Label>
                <Input value="Tech Solutions Inc." readOnly />
            </Field>

            <Field>
                <Label>Monthly Income Range</Label>
                <Input value="$7,000 - $8,000" readOnly />
            </Field>

            <Field>
                <Label>Household Size</Label>
                <Input value="3 Members" readOnly />
            </Field>
        </FormGrid>
    );
}
