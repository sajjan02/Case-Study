using System;
using System.Collections.Generic;

namespace RestCaseStudyLibrary.Models;

public partial class Discount
{
    public int DiscountId { get; set; }

    public string? Code { get; set; }

    public string? Description { get; set; }

    public decimal? DiscountPercentage { get; set; }

    public virtual ICollection<OrdersDiscount> OrdersDiscounts { get; set; } = new List<OrdersDiscount>();
}
