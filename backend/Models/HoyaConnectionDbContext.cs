using System;
using System.Reflection;
using backend.Models.UserModels;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace backend.Models
{
    public class HoyaConnectionDbContext : ApiAuthorizationDbContext<HoyaConnectionUser>
    {
        public HoyaConnectionDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationStoreOptions): base(options, operationStoreOptions)
        {
        }

        // configure the tables, add FK, relation or seeding data
        /// <summary>
        /// configure the tables, add FK, relation or seeding data
        /// </summary>
        /// <param name="modelBuilder"></param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Automatically get model builder from all the files
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());


            // seeding user and roles
            #region seed custom admin role
            string ADMIN_ID = Guid.NewGuid().ToString();
            string ROLE_ID = ADMIN_ID;
            //seed custom admin role
            modelBuilder.Entity<HoyaConnectionRole>().HasData(new HoyaConnectionRole
            {
                Id = ROLE_ID,
                Name = "root",
                NormalizedName = "ROOT"
            });
            modelBuilder.Entity<HoyaConnectionRole>().HasData(new HoyaConnectionRole
            {
                Id = Guid.NewGuid().ToString(),
                Name = "admin",
                NormalizedName = "ADMIN"
            });
            modelBuilder.Entity<HoyaConnectionRole>().HasData(new HoyaConnectionRole
            {
                Id = Guid.NewGuid().ToString(),
                Name = "VIP",
                NormalizedName = "VIP"
            });
            modelBuilder.Entity<HoyaConnectionRole>().HasData(new HoyaConnectionRole
            {
                Id = Guid.NewGuid().ToString(),
                Name = "user",
                NormalizedName = "USER"
            });
            //seed admins
            var hasher = new PasswordHasher<HoyaConnectionUser>();
            modelBuilder.Entity<HoyaConnectionUser>().HasData(new HoyaConnectionUser
            {
                Id = ADMIN_ID,
                FirstName = "Admin",
                LastName = "Admin",
                NickName = "louis",
                UserName = "admin@test.com",
                NormalizedUserName = "admin@test.com".ToUpper(),
                Email = "admin@x.com",
                NormalizedEmail = "admin@x.com".ToUpper(),
                EmailConfirmed = true,
                PasswordHash = hasher.HashPassword(null, "admin"),
                SecurityStamp = string.Empty
            });
            //seed admin into role
            modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
            {
                RoleId = ROLE_ID,
                UserId = ADMIN_ID
            });
            #endregion
        }
    }
}
