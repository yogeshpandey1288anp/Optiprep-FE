import asyncio
from db.mongo import db



DEFAULT_CHECKLIST = [
    {
        "Documents": "Foreclosure Fees and Costs",
        "Rank": "7",
        "Document Naming Abbreviation": "FCL F&C",
        "File Name as it Appears in Content Explorer/Filenet": [
            "Foreclosure Fees and Costs",
            "Fees and Cost"
        ]
    },
 
    {
        "Documents": "Imminent Default certificate",
        "Rank": "12",
        "Document Naming Abbreviation": "IDI",
        "File Name as it Appears in Content Explorer/Filenet": [
            "Imminent Default certificate"
        ]
    },
   
    {
        "Documents": "Title",
        "Rank": "17",
        "Document Naming Abbreviation": "Title",
        "File Name as it Appears in Content Explorer/Filenet": [
            "Title",
            "Title Commitment",
            "Title Commitment Document",
            "Title Commitment/Policy",
            "Title Commitment/Preliminary report",
            "Title Policy",
            "Title Report",
            "Title Summary",
            "Property Report",
            "Original Title Policy",
            "Title ERPT",
            "Vesting Report"
           
        ]
    },
 
    {
        "Documents": "Title Checklist",
        "Rank": "18",
        "Document Naming Abbreviation": "TC",
        "File Name as it Appears in Content Explorer/Filenet": [
            "Title Checklist",
            "Title QC Checklist"
        ]
    },
 
    {
        "Documents": "NeighborhoodWatch",
        "Rank": "19",
        "Document Naming Abbreviation": "NW",
        "File Name as it Appears in Content Explorer/Filenet": [
            "NeighborhoodWatch"
        ]
    },
 
    {
        "Documents": "SmartIntegratedPortal(SIP)",
        "Rank": "20",
        "Document Naming Abbreviation": "SIP",
        "File Name as it Appears in Content Explorer/Filenet": [
            "SmartIntegratedPortal(SIP)"
        ]
    },
 
    {
        "Documents": "MSR1",
        "Rank": "23",
        "Document Naming Abbreviation": "MSR",
        "File Name as it Appears in Content Explorer/Filenet": [
            "MSR1",
            "N/A-This will be a screen print pulled Director 7"
        ]
    },
 
    {
        "Documents": "CAIVRS",
        "Rank": "25",
        "Document Naming Abbreviation": "CAIVRS",
        "File Name as it Appears in Content Explorer/Filenet": [
            "CAIVRS",
            "CAIVRSs Prescreening"
        ]
    },
 
    {
        "Documents": "MIC",
        "Rank": "26",
        "Document Naming Abbreviation": "MIC",
        "File Name as it Appears in Content Explorer/Filenet": [
            "MIC Certificate",
            "MIC Cert",
            "MIC"
        ]
    },
 
    {
        "Documents": "SAM_LDP",
        "Rank": "27",
        "Document Naming Abbreviation": "SAM_LDP",
        "File Name as it Appears in Content Explorer/Filenet": [
            "SAM_LDP",
            "SAMPLDP"
        ]
    },
 
    {
        "Documents": "Original Mortgage_DOT",
        "Rank": "30",
        "Document Naming Abbreviation": "OM_DOT",
        "File Name as it Appears in Content Explorer/Filenet": [
            "Original Mortage_DOT",
            "Origination Mortgage_DOT",
            "DOT",
            "DEED",
            "Recorded Mortgage",
            "Residential Mortgage",
            "Recorded Mortgage -Deed of Trust",
            "Mortgage/DOT"
        ]
    },
 
    {
        "Documents": "Original Note",
        "Rank": "31",
        "Document Naming Abbreviation": "OM_Note",
        "File Name as it Appears in Content Explorer/Filenet": [
            "Original Note",
            "Note",
            "Copy of Note"
        ]
    },
    {
        "Documents": "Previous MOD_PC",
        "Rank": "32",
        "Document Naming Abbreviation": "PMOD_PC",
        "File Name as it Appears in Content Explorer/Filenet": [
            "Previous MOD_PC"
        ]
    },

[
  {
    "Documents": "Foreclosure Fees and Costs Disclosure",
    "Rank": "1",
    "Document Naming Abbreviation": "FFCD",
    "File Name as it Appears in Content Explorer/Filenet": [
      "Foreclosure Fees Costs Disclosure",
      "VA Foreclosure Disclosure",
      "FFCD VA Loan"
    ]
  },
  {
    "Documents": "VA-Guaranteed Mortgage Loan",
    "Rank": "2",
    "Document Naming Abbreviation": "VA_MTG",
    "File Name as it Appears in Content Explorer/Filenet": [
      "VA Guaranteed Mortgage",
      "VA Loan Agreement"
    ]
  },
  {
    "Documents": "Secured Promissory Note",
    "Rank": "3",
    "Document Naming Abbreviation": "SEC_NOTE",
    "File Name as it Appears in Content Explorer/Filenet": [
      "Secured Promissory Note",
      "Promissory Note OptiFinance"
    ]
  },
  {
    "Documents": "VA Loan Original Promissory Note",
    "Rank": "1",
    "Document Naming Abbreviation": "VA_OPN",
    "File Name as it Appears in Content Explorer/Filenet": [
      "VA Original Promissory Note",
      "VA OPN 987654321",
      "Secured Promissory Note VA"
    ]
  },
  {
    "Documents": "Loan Agreement Details",
    "Rank": "2",
    "Document Naming Abbreviation": "LOAN_DTL",
    "File Name as it Appears in Content Explorer/Filenet": [
      "Loan VA 987654321 Details",
      "Loan Agreement Alex Johnson"
    ]
  },
  {
    "Documents": "Property Security Document",
    "Rank": "4",
    "Document Naming Abbreviation": "PROP_SEC",
    "File Name as it Appears in Content Explorer/Filenet": [
      "Property Security 2457 Maplewood",
      "Security Dallas TX 75204"
    ]
  },
  {
    "Documents": "Lender Information",
    "Rank": "5",
    "Document Naming Abbreviation": "LNDR_INFO",
    "File Name as it Appears in Content Explorer/Filenet": [
      "Lender OptiFinance Corp",
      "OptiFinance Irving TX"
    ]
  },
  {
    "Documents": "VA Guaranty Information",
    "Rank": "6",
    "Document Naming Abbreviation": "VA_GUAR",
    "File Name as it Appears in Content Explorer/Filenet": [
      "VA Guaranty 26456789012",
      "VA Case Number Document"
    ]
  },
  {
    "Documents": "Loan Terms and Conditions",
    "Rank": "7",
    "Document Naming Abbreviation": "LOAN_TC",
    "File Name as it Appears in Content Explorer/Filenet": [
      "Loan Terms Conditions",
      "Payment Schedule Details"
    ]
  },
  {
    "Documents": "Borrower Signatures",
    "Rank": "8",
    "Document Naming Abbreviation": "BORR_SIG",
    "File Name as it Appears in Content Explorer/Filenet": [
      "Borrower Signatures Page",
      "Signed Agreement January 2026"
    ]
  },
  {
    "Documents": "VA Title Commitment",
    "Rank": "1",
    "Document Naming Abbreviation": "VA_TITCOM",
    "File Name as it Appears in Content Explorer/Filenet": [
      "VA Title Commitment",
      "Title Commitment VA Loan",
      "VA TITCOM 2457 Maplewood"
    ]
  },
  {
    "Documents": "Schedule A - Property Information",
    "Rank": "2",
    "Document Naming Abbreviation": "SCHA_PROP",
    "File Name as it Appears in Content Explorer/Filenet": [
      "Schedule A Property Information",
      "Property 2457 Maplewood Dallas",
      "Owner Alex Johnson"
    ]
  },
  {
    "Documents": "Schedule A - Policy Amounts",
    "Rank": "3",
    "Document Naming Abbreviation": "SCHA_POL",
    "File Name as it Appears in Content Explorer/Filenet": [
      "Schedule A Policy Amounts",
      "Owners Lenders Policy",
      "Policy OptiFinance"
    ]
  },
  {
    "Documents": "Schedule B - Requirements",
    "Rank": "4",
    "Document Naming Abbreviation": "SCHB_REQ",
    "File Name as it Appears in Content Explorer/Filenet": [
      "Schedule B Requirements",
      "Title Requirements B1 B6",
      "Pre Closing Requirements"
    ]
  },
  {
    "Documents": "Schedule B - Exceptions",
    "Rank": "5",
    "Document Naming Abbreviation": "SCHB_EXC",
    "File Name as it Appears in Content Explorer/Filenet": [
      "Schedule B Exceptions",
      "Title Exceptions E1 E5",
      "Recorded Exceptions"
    ]
  },
  {
    "Documents": "Loan Note Reference",
    "Rank": "6",
    "Document Naming Abbreviation": "LOAN_REF",
    "File Name as it Appears in Content Explorer/Filenet": [
      "Secured Promissory Note OptiFinance",
      "Loan Note Reference",
      "Lender Mortgagee Information"
    ]
  },
  {
    "Documents": "VA Guarantor Information",
    "Rank": "7",
    "Document Naming Abbreviation": "VA_GUAR",
    "File Name as it Appears in Content Explorer/Filenet": [
      "VA Guarantor DOV",
      "Department of Veterans Affairs",
      "VA Endorsements"
    ]
  },
  {
    "Documents": "Title Commitment Conditions",
    "Rank": "8",
    "Document Naming Abbreviation": "TIT_COND",
    "File Name as it Appears in Content Explorer/Filenet": [
      "Title Commitment Conditions",
      "Commitment Terms Conditions",
      "Public Records Certification"
    ]
  },
  {
    "Documents": "Title Officer Certification",
    "Rank": "9",
    "Document Naming Abbreviation": "TIT_CERT",
    "File Name as it Appears in Content Explorer/Filenet": [
      "Title Officer Certification",
      "Title Officer Signature Page",
      "Certification Date Signed"
    ]
  }
]

]
 


def flatten_checklist(data):
    flat = []
    for item in data:
        if isinstance(item, list):
            flat.extend(item)
        else:
            flat.append(item)
    return flat
 
 
async def seed_default_checklist():

    # Clean slate
    await db.document_checklist.delete_many({})

    checklist_items = []

    flattened_checklist = flatten_checklist(DEFAULT_CHECKLIST)

    for item in flattened_checklist:
        checklist_items.append({
            "code": item["Document Naming Abbreviation"],
            "document_name": item["Documents"],
            "rank": int(item["Rank"]),
            "abbreviation": item["Document Naming Abbreviation"],
            "file_name_aliases": item["File Name as it Appears in Content Explorer/Filenet"],
            "is_system": True,
            "is_default": True
        })

    if not checklist_items:
        print("⚠️ No checklist items found to seed")
        return

    result = await db.document_checklist.insert_many(checklist_items)

    print(f"✅ Successfully seeded {len(result.inserted_ids)} checklist items")
    print("✅ Default categories and document types seeded successfully")


if __name__ == "__main__":
    asyncio.run(seed_default_checklist())
