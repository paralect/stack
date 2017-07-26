using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ceres.WebApi.Configuration
{
    public class JwtSettings
    {
        public string SecretKey { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
    }
}
