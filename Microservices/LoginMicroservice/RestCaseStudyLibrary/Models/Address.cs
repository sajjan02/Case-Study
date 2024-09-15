using System;
using System.Collections.Generic;

namespace RestCaseStudyLibrary.Models;

public partial class Address
{
    public int AddressId { get; set; }

    public int? UserId { get; set; }

    public int? SupplierId { get; set; }

    public string? StreetAddress { get; set; }

    public string? City { get; set; }

    public string? State { get; set; }

    public string? PostalCode { get; set; }

    public string? Country { get; set; }

    public virtual User? User { get; set; }
}
