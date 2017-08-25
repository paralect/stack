using System.ComponentModel.DataAnnotations;

namespace Ceres.WebApi.Models.Auth
{
    public class UpdatePasswordModel
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Token { get; set; }

        [Required]
        public string NewPassword { get; set; }
    }
}