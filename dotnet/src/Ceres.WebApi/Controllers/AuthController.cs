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
using Ceres.Services;
using Ceres.WebApi.Configuration;
using Ceres.WebApi.Models;
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

        public AuthController(IOptions<JwtSettings> jwtOptions, UserManager<IdentityUser> userManager, IPasswordHasher<IdentityUser> passwordHasher)
        {
            _jwtSettings = jwtOptions.Value;
            _userManager = userManager;
            _passwordHasher = passwordHasher;
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
                expiration = token.ValidTo
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
                    return BadRequest("Invalid email or password.");
                }

                var token = GetToken(identityUser);
                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo
                });
            }

            return BadRequest("Invalid email or password.");
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
