using RestCaseStudyLibrary.Models;
using RestCaseStudyLibrary.Repo;
using RestCaseStudyLibrary.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;


namespace RestCaseStudyLibrary.Extensions
{
    public static class ServiceExtension
    {
        public static IServiceCollection AddDBLibrary(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<RetailManagement1Context>(options =>
                options.UseSqlServer(connectionString));
            // Register repositories
            services.AddScoped<IUser,UserClass>();
            //services.AddScoped<ILogin, LoginClass>();
            services.AddScoped<IProduct, ProductClass>();


            return services;
        }
    }
}