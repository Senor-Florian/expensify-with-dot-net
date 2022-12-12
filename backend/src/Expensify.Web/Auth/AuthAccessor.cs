namespace Expensify.Web.Auth
{
    public class AuthAccessor
    {
        private readonly IHttpContextAccessor _contextAccessor;

        public AuthAccessor(IHttpContextAccessor contextAccessor)
        {
            _contextAccessor = contextAccessor;
        }

        public string ExtractUserIdFromToken()
        {
            return _contextAccessor.HttpContext.Request.Headers["User-Id"];
        }
    }
}
