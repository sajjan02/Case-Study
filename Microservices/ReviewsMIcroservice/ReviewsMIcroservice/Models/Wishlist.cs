using System;
using System.Collections.Generic;

namespace ReviewsMIcroservice.Models;

public partial class Wishlist
{
    public int WishlistId { get; set; }

    public int? UserId { get; set; }

    public DateOnly? CreatedDate { get; set; }

    public virtual User? User { get; set; }

    public virtual ICollection<WishlistItem> WishlistItems { get; set; } = new List<WishlistItem>();
}
