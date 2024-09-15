using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserRegistrationMicroservices.Data;
using UserRegistrationMicroservices.Models;
using UserRegistrationMicroservices.Services;

namespace UserRegistrationMicroservices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly RetailManagementContext _context;
        private readonly SendEmailService _emailService;

        public UsersController(RetailManagementContext context, SendEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        // POST: api/Users
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            // Check if email is valid
            if (!IsValidEmail(user.Email))
            {
                return BadRequest("Invalid email address.");
            }

            // Check if user already exists by email or other unique identifiers
            if (UserExistsByEmail(user.Email))
            {
                return Conflict("User with this email already exists.");
            }

            try
            {
                List<User> userlist = _context.Users.ToList();
                user.UserId = userlist.Count + 1;
                // Add user to context
                _context.Users.Add(user);
                _context.SaveChangesAsync();

                // Send confirmation email
                 _emailService.SendEmail(user.Email, "Welcome to Our App", "<h1>Thank you for registering!</h1>");

                return Ok("User registration successful");
            }
            catch (DbUpdateException ex)
            {
                // Handle database exceptions
                return StatusCode(StatusCodes.Status500InternalServerError, $"Database error: {ex.Message}");
            }
        }

        private bool UserExistsByEmail(string email)
        {
            return _context.Users.Any(e => e.Email == email);
        }

        private bool IsValidEmail(string email)
        {
            try
            {
                var addr = new MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }
    }
}
