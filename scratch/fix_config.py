import sys

path = r'c:\website\helpdesk-system\src\SMSBlastPage.jsx'
with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_configs = """const SERVICE_CONFIGS = [
  {
    icon: FileText, label: 'View Bill', desc: 'Check your current water bill',
    tabName: 'BillInquiries',
    headers: ['Name', 'Conscode', 'Account Number', 'Notes', 'Status'],
    fields: [
      { key: 'conscode',      label: 'Conscode',        type: 'text',     required: true  },
    ],
  },
  {
    icon: CreditCard, label: 'Pay Water Bill', desc: 'Pay your outstanding balance',
    tabName: 'PaymentRecords',
    headers: ['Name', 'Conscode', 'Account Number', 'Amount Paid', 'Payment Date', 'Mode of Payment', 'Reference Number', 'Remarks'],
    fields: [
      { key: 'name',            label: 'Full Name',        type: 'text',     required: true  },
      { key: 'conscode',        label: 'Conscode',         type: 'text',     required: false },
      { key: 'accountNumber',   label: 'Account Number',   type: 'text',     required: false },
      { key: 'amountPaid',      label: 'Amount Paid (₱)',  type: 'number',   required: true  },
      { key: 'paymentDate',     label: 'Payment Date',     type: 'date',     required: true  },
      { key: 'modeOfPayment',   label: 'Mode of Payment',  type: 'select',   required: true,
        options: ['Cash', 'GCash', 'Maya', 'Bank Transfer', 'Other'] },
      { key: 'referenceNumber', label: 'Reference Number', type: 'text',     required: false },
      { key: 'remarks',         label: 'Remarks',          type: 'textarea', required: false },
    ],
  },
];\n"""

# Line 1999 is index 1998
# Line 2013 is index 2012
# We replace lines[1998:2013]
lines[1998:2013] = [new_configs]

with open(path, 'w', encoding='utf-8') as f:
    f.writelines(lines)
