using System;
using System.Collections.Generic;

namespace RestCaseStudyLibrary.Models;

public partial class InventoryTransaction
{
    public int TransactionId { get; set; }

    public int? ProductId { get; set; }

    public DateOnly? TransactionDate { get; set; }

    public int? QuantityChange { get; set; }

    public virtual Product? Product { get; set; }
}
