namespace WishlistMicroservice.Models
{
    public class WishlistItemDto
    {
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public string? Name { get; set; }
        public decimal? Price { get; set; }

        public int WishlistItemId { get; set; }
    }
}
