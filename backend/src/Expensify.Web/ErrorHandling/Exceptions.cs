using System.Net;
using System.Text.Json;

namespace Expensify.Web.ErrorHandling
{
    public abstract class HttpException : Exception
    {
        public HttpStatusCode Code { get; private set; }
        public string ErrorId { get; private set; }

        public HttpException(HttpStatusCode code, string errorId, string message) : base(message)
        {
            Code = code;
            ErrorId = errorId;
        }

        public string ToJson()
        {
            return JsonSerializer.Serialize(new
            {
                errorId = ErrorId,
                message = Message
            });
        }
    }

    public class BadRequestException : HttpException
    {
        public BadRequestException(string errorId, string message) : base(HttpStatusCode.BadRequest, errorId, message)
        {
        }
    }

    public class UnauthorizedException : HttpException
    {
        public UnauthorizedException(string errorId, string message) : base(HttpStatusCode.Unauthorized, errorId, message)
        {
        }
    }

    public class ForbiddenException : HttpException
    {
        public ForbiddenException(string errorId, string message) : base(HttpStatusCode.Forbidden, errorId, message)
        {
        }
    }

    public class NotFoundException : HttpException
    {
        public NotFoundException(string errorId, string message) : base(HttpStatusCode.NotFound, errorId, message)
        {
        }
    }
}
