using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WishlistMicroservice.Models;

namespace WishlistMicroservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishlistItemsController : ControllerBase
    {
        private readonly RetailManagement1Context _context;

        public WishlistItemsController(RetailManagement1Context context)
        {
            _context = context;
        }

        // GET: api/WishlistItems
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<WishlistItem>>> GetWishlistItems()
        //{
        //    return await _context.WishlistItems.ToListAsync();
        //}

        // GET: api/WishlistItems/5
        [HttpGet("{id}")]
        public IEnumerable<WishlistItemDto> GetWishlistItem(int id)
        {
            IEnumerable<WishlistItemDto> wishlistItem = _context.WishlistItems.Where(w => w.UserId == id).Select(
                w => new WishlistItemDto
                {
                    UserId = id,
                    ProductId = w.Product.ProductId,
                    Name = w.Product.Name,
                    Price=w.Product.Price,
                    WishlistItemId=w.WishlistItemId,

                });

            if (wishlistItem == null)
            {
                return null;
            }

            return wishlistItem;
        }
        [HttpPost("{UserId}/{ProductId}")]
        public async Task<IActionResult> AddProductToWishlistItem(int ProductId, int UserId)
        {
            // Check if the product exists
            var product = await _context.Products.FindAsync(ProductId);
            if (product == null)
            {
                return NotFound("Product not found.");
            }

            // Check if the product is already in the user's wishlist
            var existingWishlistItem = _context.WishlistItems
                                               .FirstOrDefault(w => w.UserId == UserId && w.ProductId == ProductId);

            if (existingWishlistItem != null)
            {
                return BadRequest("Product is already in the wishlist.");
            }
            Random random = new Random();

            // Create a new WishlistItem object
            var wishlistItem = new WishlistItem
            {
                WishlistItemId = random.Next(1, 1000),
                WishlistId = UserId,  // Assign WishlistId as UserId
                ProductId = ProductId,
                UserId = UserId
                // WishlistItemId will be auto-incremented by the database
            };

            // Add to WishlistItems table
            _context.WishlistItems.Add(wishlistItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetWishlistItem), new { id = wishlistItem.WishlistItemId }, wishlistItem);
        }


        // PUT: api/WishlistItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutWishlistItem(int id, WishlistItem wishlistItem)
        //{
        //    if (id != wishlistItem.WishlistItemId)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(wishlistItem).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!WishlistItemExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        //// POST: api/WishlistItems
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<WishlistItem>> PostWishlistItem(WishlistItem wishlistItem)
        //{
        //    _context.WishlistItems.Add(wishlistItem);
        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateException)
        //    {
        //        if (WishlistItemExists(wishlistItem.WishlistItemId))
        //        {
        //            return Conflict();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return CreatedAtAction("GetWishlistItem", new { id = wishlistItem.WishlistItemId }, wishlistItem);
        //}

        // DELETE: api/WishlistItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWishlistItem(int id)
        {
            var wishlistItem = await _context.WishlistItems.FindAsync(id);
            if (wishlistItem == null)
            {
                return NotFound();
            }

            _context.WishlistItems.Remove(wishlistItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WishlistItemExists(int id)
        {
            return _context.WishlistItems.Any(e => e.WishlistItemId == id);
        }
    }
}
