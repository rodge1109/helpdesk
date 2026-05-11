const SERVICE_CONFIGS = [
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
];
