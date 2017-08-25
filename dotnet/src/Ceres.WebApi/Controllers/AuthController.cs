using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Ceres.Data;
using Ceres.Data.Entities;
using Ceres.Data.Entities.Auth;
using Ceres.Services.Mail;
using Ceres.WebApi.Configuration;
using Ceres.WebApi.Models;
using Ceres.WebApi.Models.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.MongoDB;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Ceres.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly JwtSettings _jwtSettings;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IPasswordHasher<IdentityUser> _passwordHasher;
        private readonly IMailService _mailService;

        public AuthController(IOptions<JwtSettings> jwtOptions, UserManager<IdentityUser> userManager, IPasswordHasher<IdentityUser> passwordHasher, IMailService mailService)
        {
            _jwtSettings = jwtOptions.Value;
            _userManager = userManager;
            _passwordHasher = passwordHasher;
            _mailService = mailService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage));
            }

            var identityUser = new IdentityUser
            {
                Email = model.Email,
                UserName = model.UserName
            };

            var createResult = await _userManager.CreateAsync(identityUser, model.Password);
            if (!createResult.Succeeded)
            {
                return BadRequest(createResult.Errors.Select(x => x.Description).ToList());
            }

            var token = GetToken(identityUser);
            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = token.ValidTo,
                payload = token.Payload
            });
        }

        [HttpPost("signin")]
        public async Task<IActionResult> SignIn([FromBody] LoginModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage));
            }

            var identityUser = await _userManager.FindByEmailAsync(model.Email);
            if (identityUser != null)
            {
                var passwordVerificationResult = _passwordHasher.VerifyHashedPassword(identityUser, identityUser.PasswordHash,
                    model.Password);

                if (passwordVerificationResult != PasswordVerificationResult.Success)
                {
                    return BadRequest(new[] {"Invalid email or password."});
                }

                var token = GetToken(identityUser);
                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo,
                    payload = token.Payload
                }); 
            }

            return BadRequest(new[] { "Invalid email or password." });
        }

        [HttpPost("forgotpassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage));
            }

            var identityUser = await _userManager.FindByEmailAsync(model.Email);
            if (identityUser != null)
            {
                var token = await _userManager.GeneratePasswordResetTokenAsync(identityUser);
                await _mailService.Send(model.Email, "Reset password", "forgotpassword", new Dictionary<string, object> {{"ticket", token}});
                return Ok("Reset password ticekt send to your email.");

            }
            return NotFound($"User with email {model.Email} not found.");
        }

        [HttpPost("updatepassword")]
        public async Task<IActionResult> UpdatePassword([FromBody] UpdatePasswordModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage));
            }

            var identityUser = await _userManager.FindByEmailAsync(model.Email);
            if (identityUser != null)
            {
                await _userManager.ResetPasswordAsync(identityUser, model.Token, model.NewPassword);
                return Ok("Password reset successfully.");

            }
            return NotFound($"User with email {model.Email} not found.");
        }



        private JwtSecurityToken GetToken(IdentityUser user)
        {
            return new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                claims: GetClaims(user),
                expires: DateTime.UtcNow.AddMinutes(10),
                signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey)), SecurityAlgorithms.HmacSha256)
            );
        }

        private IEnumerable<Claim> GetClaims(IdentityUser user)
        {
            return new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Email, user.Email)
            };
        }
    }
}
