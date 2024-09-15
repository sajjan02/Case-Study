using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Orderitemmicroservices.Models;

namespace Orderitemmicroservices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly RetailManagementContext _context;

        public OrderController(RetailManagementContext context)
        {
            _context = context;
        }

        // GET: api/Order
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetOrdersAsync()
        {
            var orders = await _context.Orders
                .Include(o => o.OrderItems)
                .Include(o => o.User)
                .ToListAsync();

            var orderDtos = orders.Select(o => new OrderDto
            {
                OrderId = o.OrderId,
                UserId = o.UserId ?? 0,
                OrderDate = o.OrderDate,
                TotalAmount = o.TotalAmount ?? 0,
                Status = o.Status,
                Items = o.OrderItems.Select(oi => new OrderItemDto
                {
                    OrderItemId = oi.OrderItemId,
                    ProductId = oi.ProductId ?? 0,
                    ProductName = oi.Product?.Name ?? string.Empty,  // Updated reference to Product Name
                    Quantity = oi.Quantity ?? 0,
                    UnitPrice = oi.UnitPrice ?? 0
                }).ToList()
            }).ToList();

            return Ok(orderDtos);
        }

        // GET: api/Order/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDto>> GetOrderByIdAsync(int id)
        {
            var order = await _context.Orders
                .Include(o => o.OrderItems)
                .Include(o => o.User)
                .FirstOrDefaultAsync(o => o.OrderId == id);

            if (order == null)
            {
                return NotFound();
            }

            var orderDto = new OrderDto
            {
                OrderId = order.OrderId,
                UserId = order.UserId ?? 0,
                OrderDate = order.OrderDate,
                TotalAmount = order.TotalAmount ?? 0,
                Status = order.Status,
                Items = order.OrderItems.Select(oi => new OrderItemDto
                {
                    OrderItemId = oi.OrderItemId,
                    ProductId = oi.ProductId ?? 0,
                    ProductName = oi.Product?.Name ?? string.Empty,  // Updated reference to Product Name
                    Quantity = oi.Quantity ?? 0,
                    UnitPrice = oi.UnitPrice ?? 0
                }).ToList()
            };

            return Ok(orderDto);
        }

        // GET: api/Order/ByUser/{userId}
        [HttpGet("ByUser/{userId}")]
        public async Task<ActionResult<List<ProductOrderInfo>>> GetProductOrdersByUserIdAsync(int userId)
        {
            var query = from p in _context.Products
                        join oi in _context.OrderItems on p.ProductId equals oi.ProductId
                        join o in _context.Orders on oi.OrderId equals o.OrderId
                        where o.UserId == userId
                        select new ProductOrderInfo
                        {
                            OrderItemId=oi.OrderItemId,
                            OrderId = o.OrderId,
                            ProductName = p.Name,  // Correct reference to Product Name
                            Price = oi.UnitPrice ?? 0,
                            OrderDate = (DateTime)o.OrderDate,
                            Status = o.Status
                        };

            var result = await query.ToListAsync();
            if (result == null || !result.Any())
            {
                return NotFound();
            }

            return Ok(result);
        }

        // POST: api/Order
        [HttpPost]
        public async Task<ActionResult<OrderDto>> CreateOrderAsync([FromBody] OrderDto orderDto)
        {
            // Check for null or empty items
            if (orderDto == null || !orderDto.Items.Any())
            {
                return BadRequest("Invalid order data.");
            }

            int nextOrderId = _context.Orders.Count() + 1;
            int nextOrderItemId = _context.OrderItems.Count() + 1;

            // Create a new order entity
            var order = new Order
            {
                
                OrderId = nextOrderId, // if OrderId is auto-generated, you can skip this assignment
                UserId = orderDto.UserId,
                OrderDate = DateTime.Now,
                TotalAmount = orderDto.TotalAmount,
                Status = orderDto.Status,
                OrderItems = orderDto.Items.Select(item => new OrderItem
                {
                    OrderItemId=nextOrderItemId,
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    UnitPrice = item.UnitPrice,
                    // Ensure OrderItemId is not set if auto-incremented
                }).ToList()
            };

            // Add the order to the database
            _context.Orders.Add(order);

            try
            {
                foreach (var item in orderDto.Items)
                {
                    var product = await _context.Products.FindAsync(item.ProductId);
                    if (product == null)
                    {
                        return BadRequest($"Product with ID {item.ProductId} not found.");
                    }

                    if (product.InventoryCount < item.Quantity)
                    {
                        return BadRequest($"Not enough inventory for product {product.Name}. Available: {product.InventoryCount}, Requested: {item.Quantity}");
                    }

                    product.InventoryCount -= item.Quantity; // Decrease inventory
                }

                await _context.SaveChangesAsync();

                // Create a new shipment entry
                var shipment = new Shipment
                {
                    ShipmentId=nextOrderItemId,
                    OrderId = order.OrderId,
                    ShipmentDate = DateOnly.FromDateTime(DateTime.Now),
                    ShippingStatus = "Shipping", // or your default status
                    Carrier = "Delhivery",  // Placeholder for carrier info
                };

                _context.Shipments.Add(shipment);

                // Remove all cart items for this user (assuming you have a user ID)
                var cartItems = _context.CartItems.Where(ci => ci.Cart.UserId == orderDto.UserId);
                _context.CartItems.RemoveRange(cartItems);

                // Save the changes for shipment and cart items
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                // Log the exception or handle the error
                return StatusCode(500, "Error while saving the order: " + ex.InnerException?.Message);
            }

            // Assign the generated OrderId to the DTO
            orderDto.OrderId = order.OrderId;

            // Return the created order with a valid route
            return CreatedAtAction(nameof(GetOrderByIdAsync), new { id = orderDto.OrderId }, orderDto);
        }

        // PUT: api/Order/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrderAsync(int id, [FromBody] OrderDto orderDto)
        {
            if (id != orderDto.OrderId)
            {
                return BadRequest();
            }

            var existingOrder = await _context.Orders
                .Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.OrderId == id);

            if (existingOrder == null)
            {
                return NotFound();
            }

            existingOrder.UserId = orderDto.UserId;
            existingOrder.OrderDate = DateTime.Now;
            existingOrder.TotalAmount = orderDto.TotalAmount;
            existingOrder.Status = orderDto.Status;

            // Update order items
            existingOrder.OrderItems.Clear();
            foreach (var item in orderDto.Items)
            {
                existingOrder.OrderItems.Add(new OrderItem
                {
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    UnitPrice = item.UnitPrice
                });
            }

            _context.Entry(existingOrder).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Order/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderAsync(int id)
        {
            var order = await _context.Orders
                .Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.OrderId == id);

            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.OrderId == id);
        }
    }
}
