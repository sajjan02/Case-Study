using System;
using System.Collections.Generic;

namespace Orderitemmicroservices.Models;

public partial class OrdersDiscount
{
    public int OrderDiscountId { get; set; }

    public int? OrderId { get; set; }

    public int? DiscountId { get; set; }

    public virtual Discount? Discount { get; set; }

    public virtual Order? Order { get; set; }
}
