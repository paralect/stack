using System.ComponentModel.DataAnnotations;

namespace Ceres.WebApi.Models.Auth
{
    public class ForgotPasswordModel
    {
        [Required]
        public string Email { get; set; }
    }
}