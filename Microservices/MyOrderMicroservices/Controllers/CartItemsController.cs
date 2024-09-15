using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyOrderMicroservices.Models;

namespace MyOrderMicroservices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartItemsController : ControllerBase
    {
        private readonly RetailManagement1Context _context;

        public CartItemsController(RetailManagement1Context context)
        {
            _context = context;
        }

        // GET: api/CartItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CartItem>>> GetCartItems()
        {
            return await _context.CartItems.ToListAsync();
        }

        // GET: api/CartItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CartItem>> GetCartItem(int id)
        {
            var cartItem = await _context.CartItems.FindAsync(id);

            if (cartItem == null)
            {
                return NotFound();
            }

            return cartItem;
        }

        // PUT: api/CartItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutCartItem(int id, CartItem cartItem)
        //{
        //    if (id != cartItem.CartItemId)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(cartItem).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!CartItemExists(id))
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

        [HttpPut("decrease")]
        public async Task<IActionResult> DecreaseCartItemQuantity(int cartId, int productId)
        {
            var cartItem = await _context.CartItems
                .FirstOrDefaultAsync(c => c.CartId == cartId && c.ProductId == productId);

            if (cartItem == null)
            {
                return NotFound();
            }

            if (cartItem.Quantity > 1)
            {
                cartItem.Quantity -= 1;
                _context.Entry(cartItem).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return Ok(cartItem);
            }
            else
            {
                // Optionally: If quantity is 1, you can delete the item
                _context.CartItems.Remove(cartItem);
                await _context.SaveChangesAsync();
                return NoContent();
            }
        }

        // POST: api/CartItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CartItem>> PostCartItem(int cartId,int productId)
        {

            CartItem cartItem = await _context.CartItems.FirstOrDefaultAsync(c => c.CartId == cartId && c.ProductId == productId );
            if (cartItem == null) {
                Random rnd = new Random();
                CartItem newCartItem= new CartItem();
                newCartItem.CartItemId = rnd.Next(1, 1000);
                newCartItem.ProductId = productId;
                newCartItem.Quantity = 1;
                newCartItem.CartId=cartId;
                _context.Add(newCartItem);
                await _context.SaveChangesAsync();
                return newCartItem;
            
            }
            else
            {
                cartItem.Quantity += 1 ;
                _context.Entry(cartItem).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return cartItem;

            }

            
        }



        // DELETE: api/CartItems
        [HttpDelete]
        public async Task<IActionResult> DeleteCartItem(int cartId, int productId)
        {
            var cartItem = await _context.CartItems
                .FirstOrDefaultAsync(c => c.CartId == cartId && c.ProductId == productId);

            if (cartItem == null)
            {
                return NotFound();
            }

            _context.CartItems.Remove(cartItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<CartItemDto>>> GetCartItemsByUserId(int userId)
        {
            var cartItems = await _context.CartItems
                .Include(ci => ci.Product)
                .Where(c => c.CartId == userId) // Assuming CartId is the same as userId
                .Select(c => new CartItemDto
                {
                    ProductId=(int)c.ProductId,
                    ProductName = c.Product.Name, // Assuming Product entity has a Name property
                    Price = (decimal)c.Product.Price,// Assuming Product entity has a Price property
                    Quantity = (int)c.Quantity
                })
                .ToListAsync();

            if (cartItems == null || cartItems.Count == 0)
            {
                return NotFound();
            }

            return Ok(cartItems);
        }



        private bool CartItemExists(int id)
        {
            return _context.CartItems.Any(e => e.CartItemId == id);
        }
        
    }
}
