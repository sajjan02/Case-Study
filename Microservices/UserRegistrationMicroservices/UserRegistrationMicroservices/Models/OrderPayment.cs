using System;
using System.Collections.Generic;

namespace UserRegistrationMicroservices.Models;

public partial class OrderPayment
{
    public int OrderPaymentId { get; set; }

    public int? OrderId { get; set; }

    public int? PaymentMethodId { get; set; }

    public decimal? Amount { get; set; }

    public virtual Order? Order { get; set; }

    public virtual PaymentMethod? PaymentMethod { get; set; }
}
