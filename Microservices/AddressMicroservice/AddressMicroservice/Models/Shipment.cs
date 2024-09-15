using System;
using System.Collections.Generic;

namespace AddressMicroservice.Models;

public partial class Shipment
{
    public int ShipmentId { get; set; }

    public int? OrderId { get; set; }

    public DateOnly? ShipmentDate { get; set; }

    public DateOnly? DeliveryDate { get; set; }

    public string? ShippingStatus { get; set; }

    public string? Carrier { get; set; }

    public virtual Order? Order { get; set; }
}
