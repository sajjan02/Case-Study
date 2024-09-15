using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReviewsMIcroservice.Models;

namespace ReviewsMIcroservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly RetailManagementContext _context;

        public ReviewsController(RetailManagementContext context)
        {
            _context = context;
        }

        // GET: api/Reviews
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Review>>> GetReviews()
        {
            return await _context.Reviews.ToListAsync();
        }



        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Review>>> GetReviews(int id) //product id
        {
            var reviews = await _context.Reviews
                .Where(x => x.ProductId == id)
                .ToListAsync();

            if (reviews == null || !reviews.Any())
            {
                return NotFound(); // Return 404 if no reviews are found
            }

            return Ok(reviews); // Return a list of reviews with a 200 status code
        }



        // PUT: api/Reviews/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReview(int id, Review review)
        {
            if (id != review.ReviewId)
            {
                return BadRequest();
            }

            _context.Entry(review).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReviewExists(id))
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

        // POST: api/Reviews
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Review>> PostReview(Review review)
        {
            // Check if a review already exists for this user and product
            var existingReview = await _context.Reviews
                .FirstOrDefaultAsync(r => r.ProductId == review.ProductId && r.UserId == review.UserId);

            if (existingReview != null)
            {
                return Conflict("A review from this user for this product already exists.");
            }

            // Generate a unique ReviewId
            review.ReviewId = GenerateUniqueReviewId();

            // Add the review to the context
            _context.Reviews.Add(review);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ReviewExists(review.ReviewId))
                {
                    return Conflict("A review with this ID already exists.");
                }
                else
                {
                    throw;
                }
            }

            // Return the created review with a 201 status code
            return CreatedAtAction(nameof(GetReviews), new { id = review.ReviewId }, review);
        }



        // Method to generate a unique ReviewId
        private int GenerateUniqueReviewId()
        {
            // Example: Generate a new ID by finding the maximum current ID and adding 1
            int maxId = _context.Reviews.Max(r => (int?)r.ReviewId) ?? 0;
            return maxId + 1;
        }


        // DELETE: api/Reviews/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReview(int id)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review == null)
            {
                return NotFound();
            }

            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReviewExists(int id)
        {
            return _context.Reviews.Any(e => e.ReviewId == id);
        }
    }
}
