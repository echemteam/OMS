﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Request.CustomerAccountingNotes
{
    public  class AddEditCustomerSettingRequest
    {
        public int? CustomerAccountingSettingId { get; set; }
        public short? PaymentTermId { get; set; }
        public decimal? CreditLimit { get; set; }
        public short? PaymentMethodId { get; set; }
        public string? InvoiceSubmissionInstruction { get; set; }
        public string? BillingCurrency { get; set; }
    }
}