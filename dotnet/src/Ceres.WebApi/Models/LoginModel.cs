using System.ComponentModel.DataAnnotations;

namespace Ceres.WebApi.Models
{
    public class LoginModel
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}