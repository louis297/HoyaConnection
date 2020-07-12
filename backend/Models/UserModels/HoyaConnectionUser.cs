using System;
using Microsoft.AspNetCore.Identity;

namespace backend.Models.UserModels
{
    public class HoyaConnectionUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string NickName { get; set; }

    }
}
