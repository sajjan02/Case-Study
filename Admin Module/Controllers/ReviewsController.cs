using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ClosedXML.Excel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using ProductCatalogManagementMicroservice.Data;
using ProductCatalogManagementMicroservice.Models;

namespace ProductCatalogManagementMicroservice.Controllers
{
    [Authorize(Roles = "Admin")]
    public class ReviewsController : Controller
    {
        private readonly RetailManagement1Context _context;

        public ReviewsController(RetailManagement1Context context)
        {
            _context = context;
        }

        public async Task<IActionResult> ExportToExcel()
        {
            var reviews = await _context.Reviews
                .Include(r => r.Product)
                .Include(r => r.User)
                .ToListAsync();

            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("Reviews");
                var currentRow = 1;

                // Adding headers
                worksheet.Cell(currentRow, 1).Value = "Rating";
                worksheet.Cell(currentRow, 2).Value = "Comment";
                worksheet.Cell(currentRow, 3).Value = "Review Date";
                worksheet.Cell(currentRow, 4).Value = "Product ID";
                worksheet.Cell(currentRow, 5).Value = "User ID";

                // Adding data rows
                foreach (var review in reviews)
                {
                    currentRow++;
                    worksheet.Cell(currentRow, 1).Value = review.Rating;
                    worksheet.Cell(currentRow, 2).Value = review.Comment;
                    worksheet.Cell(currentRow, 3).Value = review.ReviewDate.HasValue ? review.ReviewDate.Value.ToString("MMMM d, yyyy") : "Date not available";
                    worksheet.Cell(currentRow, 4).Value = review.Product.ProductId;
                    worksheet.Cell(currentRow, 5).Value = review.User.UserId;
                }

                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();

                    return File(content, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Reviews.xlsx");
                }
            }
        }

        [Authorize(Roles = "Admin")]
        // GET: Reviews
        public async Task<IActionResult> Index()
        {
            var retailManagement1Context = _context.Reviews.Include(r => r.Product).Include(r => r.User);
            return View(await retailManagement1Context.ToListAsync());
        }

        // GET: Reviews/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var review = await _context.Reviews
                .Include(r => r.Product)
                .Include(r => r.User)
                .FirstOrDefaultAsync(m => m.ReviewId == id);
            if (review == null)
            {
                return NotFound();
            }

            return View(review);
        }

        // GET: Reviews/Create
        public IActionResult Create()
        {
            ViewData["ProductId"] = new SelectList(_context.Products, "ProductId", "ProductId");
            ViewData["UserId"] = new SelectList(_context.Users, "UserId", "UserId");
            return View();
        }

        // POST: Reviews/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ReviewId,ProductId,UserId,Rating,Comment,ReviewDate")] Review review)
        {
            if (ModelState.IsValid)
            {
                // Find the maximum CategoryId in the database and increment it by 1
                var maxReviewId = await _context.Reviews.MaxAsync(c => (int?)c.ReviewId) ?? 0;
                review.ReviewId = maxReviewId + 1;

                _context.Add(review);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(review);
        }

        
        // GET: Reviews/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var review = await _context.Reviews.FindAsync(id);
            if (review == null)
            {
                return NotFound();
            }
            ViewData["ProductId"] = new SelectList(_context.Products, "ProductId", "ProductId", review.ProductId);
            ViewData["UserId"] = new SelectList(_context.Users, "UserId", "UserId", review.UserId);
            return View(review);
        }

        // POST: Reviews/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ReviewId,ProductId,UserId,Rating,Comment,ReviewDate")] Review review)
        {
            if (id != review.ReviewId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(review);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ReviewExists(review.ReviewId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["ProductId"] = new SelectList(_context.Products, "ProductId", "ProductId", review.ProductId);
            ViewData["UserId"] = new SelectList(_context.Users, "UserId", "UserId", review.UserId);
            return View(review);
        }

        // GET: Reviews/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var review = await _context.Reviews
                .Include(r => r.Product)
                .Include(r => r.User)
                .FirstOrDefaultAsync(m => m.ReviewId == id);
            if (review == null)
            {
                return NotFound();
            }

            return View(review);
        }

        // POST: Reviews/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review != null)
            {
                _context.Reviews.Remove(review);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ReviewExists(int id)
        {
            return _context.Reviews.Any(e => e.ReviewId == id);
        }
    }
}
