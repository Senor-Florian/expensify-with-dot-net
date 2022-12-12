using System.Net;
using System.Security.Authentication;
using System.Text.Json;

namespace Expensify.Web.ErrorHandling
{
    public class CustomErrorHandler
    {
        private readonly RequestDelegate _next;

        public CustomErrorHandler(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception exception)
            {
                HttpStatusCode code;
                string result;

                if (exception is HttpException httpException)
                {
                    code = httpException.Code;
                    result = httpException.ToJson();
                }
                else
                {
                    code = exception is AuthenticationException ? HttpStatusCode.Unauthorized : HttpStatusCode.InternalServerError;
                    result = JsonSerializer.Serialize(new
                    {
                        error = exception.Message
                    });
                }

                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)code;
                await context.Response.WriteAsync(result);
            }
        }
    }
}
