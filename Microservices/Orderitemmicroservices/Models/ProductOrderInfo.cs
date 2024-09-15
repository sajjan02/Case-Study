namespace Orderitemmicroservices.Models
{
    public class ProductOrderInfo
    {
        public int? OrderItemId { get; set; }
        public int? OrderId { get; set; }
        public string ProductName { get; set; }  // This will now map to Product.Name
        public decimal Price { get; set; }
        public DateTime OrderDate { get; set; }
        public string? Status { get; set; }
    }

}
