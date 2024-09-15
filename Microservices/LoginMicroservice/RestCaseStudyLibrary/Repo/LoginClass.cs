//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.Extensions.Configuration;
//using Microsoft.IdentityModel.Tokens;
//using RestCaseStudyLibrary.Data;
//using RestCaseStudyLibrary.Models;
//using System;
//using System.Collections.Generic;
//using System.IdentityModel.Tokens.Jwt;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace RestCaseStudyLibrary.Repo
//{
    
//    internal class LoginClass : ControllerBase, ILogin
//    {
//        RetailManagement1Context _context;
//        IConfiguration _config;

//        public LoginClass(RetailManagement1Context context, IConfiguration config)
//        {
//            _context = context;
//            _config = config;
//        }

//        // GET: api/
//        public async Task<ActionResult<IEnumerable<Login>>> GetLogins()
//        {
//            return await _context.Logins.ToListAsync();
//        }

//        // GET: api/Logins/5

//        public async Task<ActionResult<Login>> GetLogin(string id)
//        {
//            var login = await _context.Logins.FindAsync(id);

//            if (login == null)
//            {
//                return NotFound();
//            }

//            return login;
//        }

//        // PUT: api/Logins/5
//        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754

//        public async Task<IActionResult> PutLogin(string id, Login login)
//        {
//            if (id != login.Username)
//            {
//                return BadRequest();
//            }

//            _context.Entry(login).State = EntityState.Modified;

//            try
//            {
//                await _context.SaveChangesAsync();
//            }
//            catch (DbUpdateConcurrencyException)
//            {
//                if (!LoginExists(id))
//                {
//                    return NotFound();
//                }
//                else
//                {
//                    throw;
//                }
//            }

//            return NoContent();
//        }


//        // POST: api/Logins
//        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754

//        //[Route("authenticate")]

       
//        public async Task<ActionResult> Authenticate(Login user)
//        {
//            using (var context = new RetailManagement1Context(/* DbContextOptions */))
//            {
//                // Validate user from the database
//                var dbUser = await context.Logins
//                                          .FirstOrDefaultAsync(u => u.Username == user.Username && u.upassword == user.upassword);

//                if (dbUser != null)
//                {
//                    // Generate JSON Web Token with the valid details and return
//                    var key = Encoding.UTF8.GetBytes(_config["JWT:Key"]);
//                    var tokenDescriptor = new SecurityTokenDescriptor
//                    {
//                        Issuer = _config["JWT:Issuer"],
//                        Audience = _config["JWT:Audience"],
//                        Expires = DateTime.UtcNow.AddMinutes(10),
//                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
//                    };

//                    var tokenHandler = new JwtSecurityTokenHandler();
//                    var token = tokenHandler.CreateToken(tokenDescriptor);
//                    return Ok(tokenHandler.WriteToken(token));
//                }
//                else
//                {
//                    return Unauthorized("Invalid username/password!!!");
//                }
//            }
//        }

//        // DELETE: api/Logins/5
 
//        public async Task<IActionResult> DeleteLogin(string id)
//        {
//            var login = await _context.Logins.FindAsync(id);
//            if (login == null)
//            {
//                return NotFound();
//            }

//            _context.Logins.Remove(login);
//            await _context.SaveChangesAsync();

//            return NoContent();
//        }

//        private bool LoginExists(string id)
//        {
//            return _context.Logins.Any(e => e.Username == id);
//        }

       
//    }
//}
