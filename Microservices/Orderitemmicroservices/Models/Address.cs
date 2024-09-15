using System;
using System.Collections.Generic;

namespace Orderitemmicroservices.Models;

public partial class Address
{
    public int AddressId { get; set; }

    public int? UserId { get; set; }

    public string? StreetAddress { get; set; }

    public string? City { get; set; }

    public string? State { get; set; }

    public string? PostalCode { get; set; }

    public string? Country { get; set; }

    public string? Email { get; set; }

    public virtual User? EmailNavigation { get; set; }

    public virtual User? User { get; set; }
}
