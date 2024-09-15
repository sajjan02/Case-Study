using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AddressMicroservice.Data;
using AddressMicroservice.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace MyOrderMicroservices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressesController : ControllerBase
    {
        private readonly RetailManagement1Context _context;

        public AddressesController(RetailManagement1Context context)
        {
            _context = context;
        }

        // GET: api/Addresses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Address>>> GetAddresses()
        {
            return await _context.Addresses.ToListAsync();
        }

        // GET: api/Addresses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Address>> GetAddress(int id)
        {
            var address = await _context.Addresses.FindAsync(id);

            if (address == null)
            {
                return NotFound();
            }

            return address;
        }

        // GET: api/Addresses/user/5
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Address>>> GetAddressesByUserId(int userId)
        {
            var addresses = await _context.Addresses
                .Where(a => a.UserId == userId)
                .ToListAsync();

            if (addresses == null || addresses.Count == 0)
            {
                return NotFound();
            }

            return addresses;
        }

        [HttpPut("{addressId}")]
        public async Task<IActionResult> PutAddress(int addressId, AddressClass2 addressClass2)
        {
            if (addressId != addressClass2.AddressId2)
            {
                return BadRequest();
            }

            // Find the existing Address entity from the database
            var existingAddress = await _context.Addresses.FindAsync(addressId);

            if (existingAddress == null)
            {
                return NotFound();
            }

            // Manually map properties from AddressClass2 to Address
            existingAddress.UserId = addressClass2.UserId2;
            existingAddress.StreetAddress = addressClass2.StreetAddress2;
            existingAddress.City = addressClass2.City2;
            existingAddress.State = addressClass2.State2;
            existingAddress.PostalCode = addressClass2.PostalCode2;
            existingAddress.Country = addressClass2.Country2;

            _context.Entry(existingAddress).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AddressExists(addressId))
                {
                    throw;
                }
                else
                {
                    return NotFound();
                }
            }

            return NoContent();
        }

      


        // POST: api/Addresses
        [HttpPost]
        public async Task<ActionResult<Address>> PostAddress(AddressClass addressClass)
        {
            // Retrieve the current maximum AddressId from the Address list
            int maxAddressId = _context.Addresses.Any() ? _context.Addresses.Max(a => a.AddressId) : 0;

            // Map AddressClass to Address
            var address = new Address
            {
                AddressId = maxAddressId + 1, // Increment the max AddressId by 1
                UserId = addressClass.UserId1,
                StreetAddress = addressClass.StreetAddress1,
                City = addressClass.City1,
                State = addressClass.State1,
                PostalCode = addressClass.PostalCode1,
                Country = addressClass.Country1
            };

            // Add the new address to the context
            _context.Addresses.Add(address);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (AddressExists(address.AddressId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetAddress", new { id = address.AddressId }, address);
        }




        // DELETE: api/Addresses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAddress(int id)
        {
            Console.WriteLine($"Attempting to delete address with ID: {id}");  // Debugging log
            var address = await _context.Addresses.FindAsync(id);

            if (address == null)
            {
                Console.WriteLine("Address not found");
                return NotFound();
            }

            _context.Addresses.Remove(address);
            await _context.SaveChangesAsync();

            Console.WriteLine("Address deleted successfully");
            return NoContent();
        }

        private bool AddressExists(int id)
        {
            return _context.Addresses.Any(e => e.AddressId == id);
        }
    }
}
