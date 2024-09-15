using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using RestCaseStudyLibrary.Data;
using RestCaseStudyLibrary.Models;
using RestCaseStudyLibrary.Repo;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace RestCaseStudyLibrary.Repo
{
    internal class UserClass : ControllerBase, IUser
    {
        RetailManagement1Context _context;
        IConfiguration _config;
        public UserClass(RetailManagement1Context retailManagement1Context, IConfiguration config)
        {
            _context = retailManagement1Context;
            _config = config;
        }

        public List<User> GetAllUsers()
        {
            List<User> list = _context.Users.ToList();
            return list;
        }

        public User GetUserById(int id)
        {
            User user = _context.Users.Where(u => u.UserId == id).FirstOrDefault();
            return user;
        }

        public void AddUser(User user)
        {
            _context.Add(user);
            _context.SaveChangesAsync();
        }

        public void DeleteUserById(int id)
        {
            User user = _context.Users.Find(id);
            _context.Remove(user);
            _context.SaveChangesAsync();
        }

        public void UpdateUser(User user)
        {
            User exitCust = _context.Users.Find(user.UserId);

            if (exitCust != null)
            {
                exitCust.UserId = user.UserId;
                exitCust.FirstName = user.FirstName;
                exitCust.LastName = user.LastName;
                exitCust.Email = user.Email;
                _context.SaveChanges();
                //throw new NotImplementedException();
            }
        }

        public async Task<IActionResult> Authenticate([FromBody] User user)
        {
            // Log incoming user data for debugging
            Console.WriteLine($"Authenticating User: {user.UserId}");

            // Check for user existence and password match
            var dbUser = await _context.Users
                .FirstOrDefaultAsync(u => u.UserId == user.UserId);

            if (dbUser == null)
            {
                return Unauthorized("Invalid username or password");
            }

            // Verify password
            bool passwordMatch = BCrypt.Net.BCrypt.Verify(user.Upassword, dbUser.Upassword);

            if (passwordMatch)
            {
                var key = Encoding.UTF8.GetBytes(_config["JWT:Key"]);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                    {new Claim(ClaimTypes.Name, dbUser.UserId.ToString()),

                    // Add other claims if needed
                }),
                    Issuer = _config["JWT:Issuer"],
                    Audience = _config["JWT:Audience"],
                    Expires = DateTime.UtcNow.AddMinutes(10),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var token = tokenHandler.CreateToken(tokenDescriptor);
                return Ok(tokenHandler.WriteToken(token));
            }
            else
            {
                return Unauthorized("Invalid username or password");
            }
        }

        public int? GetUserIdByUsername(string username)
        {
            // Find the user by their username
            var user = _context.Users.FirstOrDefault(u => u.Username == username);

            // Return the UserId if the user exists, otherwise return null
            return user?.UserId;
        }

        //public IActionResult GetUserId(string username)
        //{
        //    throw new NotImplementedException();
        //}
    }
}
