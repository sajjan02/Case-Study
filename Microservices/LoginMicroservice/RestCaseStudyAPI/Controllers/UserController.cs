using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages;
using RestCaseStudyLibrary.Models;
using RestCaseStudyLibrary.Repo;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RestCaseStudyAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUser user;

        public UserController(IUser iu)
        {
            user = iu;
            // GET: api/<UserController>
        }

        // GET: api/<UserController>
        [HttpGet]
        public List<User> Get()
        {
            return user.GetAllUsers();
        }
            
        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public User Get(int id)
        {
            return user.GetUserById(id);
        }

        // POST api/<UserController>
        [HttpPost]
        public void Post(User value) => user.AddUser(value);

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] User value) => user.UpdateUser(value);

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id) => user.DeleteUserById(id);

        [HttpPost]
        [AllowAnonymous]
        [Route("authenticate")]
        public async Task<ActionResult> Authenticate(UserLogin user1)
        {
            return await user.Authenticate(user1);
        }


        [HttpGet]
        [Route("GetUserIdByUsername/{username}")]
        public IActionResult GetUserId(string username)
        {
            var userId = user.GetUserIdByUsername(username);
            if (userId != null)
            {
                return Ok(userId);
            }
            else
            {
                return NotFound("User not found");
            }
        }

    }
}
