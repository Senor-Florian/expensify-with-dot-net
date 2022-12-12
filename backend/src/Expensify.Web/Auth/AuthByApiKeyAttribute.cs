using Expensify.Web.ErrorHandling;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Net;
using System.Text.Json;

namespace Expensify.Web.Auth
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthByApiKeyAttribute : Attribute, IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var appSettings = context.HttpContext.RequestServices.GetRequiredService<IConfiguration>();
            var apiKey = appSettings.GetValue<string>("ApiKey");

            if (!context.HttpContext.Request.Headers.TryGetValue("Api-Key", out var extractedApiKey) || apiKey != extractedApiKey)
            {
                context.Result = new ContentResult()
                {
                    StatusCode = (int)HttpStatusCode.Unauthorized,
                    Content = JsonSerializer.Serialize(new
                    {
                        errorId = nameof(ErrorMessages.MISSING_OR_INVALID_API_KEY),
                        message = ErrorMessages.MISSING_OR_INVALID_API_KEY
                    })
                };
                return;
            }

            await next();
        }
    }
}
