using Microsoft.AspNetCore.Mvc;
using RestCaseStudyLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestCaseStudyLibrary.Repo
{
    public interface IUser
    {
        public List<User> GetAllUsers();
        public User GetUserById(int id);
        public void AddUser(User user);
        public void DeleteUserById(int id);
        public void UpdateUser(User user);
        public Task<ActionResult> Authenticate(UserLogin user);
        public int? GetUserIdByUsername(string username);
    }
}
