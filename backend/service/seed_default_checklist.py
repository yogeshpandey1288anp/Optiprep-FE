import asyncio
from db.mongo import db

DEFAULT_VA_CHECKLIST = [
    {
        "id": "va_title_commitment",
        "name": "VA Title Commitment",
        "description": "Title commitment document for VA loans",
        "TitleCommitment": {
            "CommitmentNumber": "",
            "EffectiveDate": "",
            "DateOfTitleReview": "2026-01-01",
            "TitleCompany": {
                "Name": "",
                "Address": "",
                "Phone": "",
                "Fax": ""
            },
            "ScheduleA": {
                "PropertyAddress": "2457 Maplewood Avenue, Dallas, TX 75204",
                "LegalDescription": "",
                "OwnerOfRecord": "Alex Johnson",
                "ProposedInsured": {
                    "Borrower": "Alex Johnson",
                    "Lender": "OptiFinance Corporation",
                    "VA_Guarantor": "Department of Veterans Affairs"
                },
                "PolicyAmounts": {
                    "OwnersPolicy": "",
                    "LendersPolicy": ""
                },
                "LoanInformation": {
                    "LoanNoteReference": "Secured Promissory Note — OptiFinance Corporation",
                    "LenderMortgagee": "OptiFinance Corporation"
                }
            },
            "ScheduleB": {
                "Requirements": [
                    {"Item": "B-1", "Description": "Pay off or otherwise satisfy all existing liens or encumbrances affecting title."},
                    {"Item": "B-2", "Description": "Provide evidence that all property taxes, assessments, and municipal charges are paid."},
                    {"Item": "B-3", "Description": "Provide certified copy of recorded Vesting Deed for ownership verification."},
                    {"Item": "B-4", "Description": "Cure or release any judgments, tax liens, or encumbrances."},
                    {"Item": "B-5", "Description": "Provide complete closing documents including executed mortgage and VA endorsements."},
                    {"Item": "B-6", "Description": "Provide any additional documents reasonably required by the Title Company."}
                ],
                "Exceptions": [
                    {"Item": "E-1", "Description": "Easements, rights-of-way, and reservations of record."},
                    {"Item": "E-2", "Description": "Covenants, conditions & restrictions (CC&R's) of record."},
                    {"Item": "E-3", "Description": "Unpaid taxes, assessments, or municipal charges not yet due."},
                    {"Item": "E-4", "Description": "Encroachments or boundary disputes not reflected in public record."},
                    {"Item": "E-5", "Description": "Defects arising from facts not shown in public record but ascertainable by inspection."}
                ]
            },
            "Conditions": [
                "Commitment void if policy is not issued within a specified number of days of effective date.",
                "Liability limited to minimum amount necessary to comply with title insurance policy terms.",
                "Commitment based solely on public records as of effective date."
            ],
            "Certification": {
                "TitleOfficerName": "",
                "TitleOfficerSignature": "",
                "TitleOfficerTitle": "",
                "DateSigned": ""
            }
        }
    },
    {
        "id": "va_promissory_note",
        "name": "VA Original Promissory Note",
        "description": "Original promissory note for VA guaranteed loan",
        "title": "VA LOAN – ORIGINAL PROMISSORY NOTE",
        "loan_number": "VA-987654321",
        "date": "January 1, 2026",
        "place_of_execution": "Dallas, Texas",
        "property_and_borrower_details": {
            "borrower_names": "Alex Johnson",
            "property_address": "2457 Maplewood Avenue, Dallas, TX 75204",
            "loan_note_reference": "Secured Promissory Note — OptiFinance Corporation",
            "lender": "OptiFinance Corporation",
            "title_company_agent": "",
            "date_of_title_review": "01/01/2026"
        },
        "borrower": {
            "name": "Alex Johnson",
            "mailing_address": "2457 Maplewood Avenue, Dallas, TX 75204"
        },
        "lender": {
            "name": "OptiFinance Corporation",
            "address": "9800 Finance Plaza, Irving, TX 75063"
        },
        "principal_amount": "$325,000.00",
        "principal_amount_words": "Three Hundred Twenty-Five Thousand Dollars and 00/100",
        "interest_rate": "6.100% per year",
        "payments": {
            "monthly_principal_interest": "$1,970.00",
            "first_payment_due": "March 1, 2026",
            "payment_due_date": "1st day of each month",
            "final_due": "February 1, 2056"
        },
        "loan_type": "VA Guaranteed Loan",
        "va_case_number": "26-456-789012",
        "property_security": "2457 Maplewood Avenue, Dallas, TX 75204",
        "late_charges": "If the Lender does not receive the full monthly payment within 15 calendar days after the due date, a late charge equal to 4% of the overdue payment will be assessed.",
        "prepayment": "Borrower may prepay principal in full or in part at any time without penalty, subject to VA loan regulations.",
        "default": "If Borrower fails to make payments as required, the Lender may declare the entire unpaid balance immediately due, in compliance with VA servicing guidelines.",
        "va_guaranty": "This loan is guaranteed by the U.S. Department of Veterans Affairs (VA) under applicable federal law and regulations.",
        "borrowers_promise_to_pay": "By signing below, Borrower agrees to all terms of this Secured Promissory Note.",
        "signatures": {
            "borrowers": [
                {
                    "name": "Alex Johnson",
                    "date": "January 1, 2026"
                }
            ],
            "lender_authorized_representative": {
                "name": "Sarah Mitchell",
                "title": "Senior Loan Officer",
                "company": "OptiFinance Corporation"
            }
        }
    },
    {
        "id": "va_foreclosure_disclosure",
        "name": "VA Foreclosure Fees and Costs Disclosure",
        "description": "Foreclosure fees and costs disclosure for VA loans",
        "document_type": "Foreclosure Fees and Costs Disclosure",
        "loan_program": "VA-Guaranteed Mortgage Loan",
        "lender": {
            "name": "OptiFinance Corporation",
            "address": {
                "line_1": None,
                "line_2": None
            },
            "phone": None,
            "nmls_id": None
        },
        "borrower": {
            "full_name": "Alex Johnson"
        },
        "property": {
            "address": {
                "street": "2457 Maplewood Avenue",
                "city": "Dallas",
                "state": "TX",
                "zip_code": "75204"
            }
        },
        "loan": {
            "note_reference": "Secured Promissory Note — OptiFinance Corporation",
            "lien_type": "First-lien mortgage"
        },
        "title": {
            "title_company_or_agent": None,
            "date_of_title_review": "2026-01-01"
        },
        "dates": {
            "document_date": "2026-01-01"
        },
        "foreclosure_fees_and_costs": {
            "legal_and_administrative_fees": [
                "Attorney or trustee fees",
                "Foreclosure filing fees",
                "Court costs",
                "Recording fees",
                "Document preparation fees",
                "Notice, posting, and publication fees"
            ],
            "property_related_costs": [
                "Property inspections",
                "Appraisal or valuation fees",
                "Property preservation",
                "Securing or winterization",
                "Required repairs to protect property"
            ],
            "taxes_insurance_and_advances": [
                "Delinquent property taxes",
                "Hazard insurance premiums",
                "Force-placed insurance",
                "HOA or condominium dues"
            ],
            "other_allowable_costs": [
                "Title search or title update fees",
                "Eviction or occupancy-related expenses"
            ]
        },
        "va_specific_requirements": {
            "loss_mitigation_required": True,
            "borrower_contact_required": True,
            "fees_subject_to_va_review": True,
            "guaranty_claim_review": True
        },
        "borrower_responsibility": {
            "costs_may_be_added_to_loan_balance": True,
            "costs_may_be_paid_from_sale_proceeds": True
        },
        "borrower_acknowledgment": {
            "receipt_acknowledged": True,
            "no_waiver_of_rights": True,
            "no_obligation_to_foreclose": True
        },
        "signatures": {
            "borrower": {
                "printed_name": "Alex Johnson",
                "signature": None,
                "signature_date": None
            },
            "lender_authorized_representative": {
                "company_name": "OptiFinance Corporation",
                "signature": None,
                "signature_date": None
            }
        },
        "compliance": {
            "applicable_laws": [
                "VA Loan Program Regulations",
                "RESPA",
                "TILA",
                "Applicable State Foreclosure Law"
            ],
            "pii_present": True,
            "data_classification": "Confidential"
        }
    },
    {
        "id": "va_imminent_default",
        "name": "VA Imminent Default Certificate",
        "description": "Certificate indicating imminent default status",
        "certificate_type": "Imminent Default Certificate",
        "date": "15 January 2026",
        "loan_reference": "Secured Promissory Note — OptiFinance Corporation",
        "property_and_borrower_details": {
            "borrower_name": "Alex Johnson",
            "property_address": "2457 Maplewood Avenue, Dallas, TX 75204",
            "lender": "OptiFinance Corporation",
            "date_of_title_review": "01 January 2026"
        },
        "loan_details": {
            "loan_account_number": "OFC-IMD-000789",
            "sanctioned_loan_amount": "USD 1,000,000",
            "outstanding_balance": "USD 785,000",
            "date_of_sanction": "01 June 2024",
            "repayment_frequency": "Monthly"
        },
        "imminent_default_status": {
            "total_overdue_amount": "USD 125,000",
            "days_past_due": 75,
            "last_payment_received": "01 October 2025",
            "status": "Imminent Risk of Default",
            "description": "The borrower has failed to comply with the repayment obligations as stipulated in the loan agreement."
        },
        "declaration": "This certificate is issued for official, legal, and informational purposes.",
        "authorized_signatory": {
            "name": "John Doe",
            "designation": "Credit Risk Manager",
            "date": "15 January 2026"
        }
    },
    {
        "id": "va_servicing_disclosure",
        "name": "VA Servicing Disclosure Statement",
        "description": "Servicing disclosure statement for VA loans",
        "document_type": "Servicing Disclosure Statement",
        "regulation": {
            "law": "RESPA",
            "usc_reference": "12 U.S.C. 2601 et seq.",
            "regulation_x": "12 CFR Part 1024"
        },
        "borrower": {
            "full_name": "Alex Johnson"
        },
        "property": {
            "address": {
                "street": "2457 Maplewood Avenue",
                "city": "Dallas",
                "state": "TX",
                "zip_code": "75204"
            }
        },
        "loan": {
            "note_reference": "Secured Promissory Note",
            "lien_type": "First-lien mortgage"
        },
        "dates": {
            "document_date": "2026-01-01"
        },
        "servicing_transfer_options": {
            "may_transfer_servicing": False,
            "will_transfer_before_first_payment": False,
            "will_retain_servicing": False
        }
    }
]

DEFAULT_FHA_CHECKLIST = [
    {
        "id": "fha_sam_ldp",
        "name": "FHA SAM-LDP",
        "description": "Signed Acknowledgment of Mortgage Loan Disclosure Package",
        "document_type": "Signed Acknowledgment of Mortgage Loan Disclosure Package",
        "abbreviation": "SAM-LDP",
        "lender": {
            "name": "OptiFinance Corporation",
            "address": {"line_1": None, "line_2": None}
        },
        "borrower": {"full_name": "Alex Johnson"},
        "property": {
            "address": {
                "street": "2457 Maplewood Avenue",
                "city": "Dallas",
                "state": "TX",
                "zip_code": "75204"
            }
        },
        "loan": {"note_reference": "Secured Promissory Note — OptiFinance Corporation"},
        "title": {"title_company_or_agent": None, "date_of_title_review": "2026-01-01"},
        "dates": {
            "document_date": "2026-01-01",
            "borrower_signature_date": "2026-01-01",
            "lender_signature_date": "2026-01-01"
        },
        "regulatory_compliance": {
            "laws": ["RESPA", "TILA", "TRID", "E-SIGN Act"]
        },
        "disclosure_package_contents": [
            "Loan Estimate (LE)",
            "Truth in Lending Disclosure (TILA)",
            "Servicing Disclosure Statement (MSR-1)",
            "Privacy Policy / Information Sharing Notice",
            "Fair Lending / Equal Credit Opportunity Notice",
            "Credit Score Disclosure",
            "Authorization to Obtain Credit, Employment, and Asset Information",
            "State-specific disclosures (if applicable)"
        ],
        "borrower_certifications": {
            "received_and_reviewed": True,
            "opportunity_for_questions": True,
            "no_loan_approval_implied": True,
            "terms_subject_to_underwriting": True,
            "no_obligation_to_proceed": True,
            "esign_compliance_acknowledged": True
        },
        "signatures": {
            "borrower": {"printed_name": "Alex Johnson", "signature": None},
            "lender_authorized_representative": {"company_name": "OptiFinance Corporation", "signature": None}
        }
    }
]



async def seed_default_checklist():
    """Seed default VA and FHA checklist templates"""
    
    # Clear existing data
    await db.document_va_checklist.delete_many({})
    await db.document_fha_checklist.delete_many({})
    
    va_checklist_items = []
    fha_checklist_items = []
    # Process VA checklist
    for item in DEFAULT_VA_CHECKLIST:
        va_checklist_items.append({
            "code": item["id"],
            "name": item["name"],
            "description": item["description"],
            "loan_type": "VA",
            "template_data": item,
            "is_system": True,
            "is_default": True
        })
    
    # Process FHA checklist
    for item in DEFAULT_FHA_CHECKLIST:
        fha_checklist_items.append({
            "code": item["id"],
            "name": item["name"],
            "description": item["description"],
            "loan_type": "FHA",
            "template_data": item,
            "is_system": True,
            "is_default": True
        })
    
    # Insert all checklist items
    if va_checklist_items:
        await db.document_va_checklist.insert_many(va_checklist_items)
        print(f"✅ Successfully seeded {len(va_checklist_items)} checklist items")
    if fha_checklist_items:
        await db.document_va_checklist.insert_many(fha_checklist_items)
        print(f"✅ Successfully seeded {len(fha_checklist_items)} checklist items")
    
    
    print("✅ Default categories and document types seeded successfully")


if __name__ == "__main__":
    asyncio.run(seed_default_checklist())