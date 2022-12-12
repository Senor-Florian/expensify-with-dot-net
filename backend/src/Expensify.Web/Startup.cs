using Expensify.Web.Auth;
using Expensify.Web.ErrorHandling;
using Expensify.Web.Infrastructure;
using Expensify.Web.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Expensify.Web
{
    public class Startup
    {
        public IConfiguration config { get; }
        public Startup(IConfiguration configuration)
        {
            config = configuration;
        }
        public void ConfigureServices(IServiceCollection services)
        {
            // todo separate code into more projects (maybe not)
            // todo move the configurations to extensions
            services.AddHttpContextAccessor();

            services.AddControllers()
                    .AddJsonOptions(options =>
                    {
                        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
                        options.JsonSerializerOptions.Encoder = JavaScriptEncoder.Default;
                        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                    });

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins",
                    builder =>
                    {
                        builder
                            .AllowAnyOrigin()
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            });

            services.AddSwaggerGen(setup => {
                setup.EnableAnnotations();
                setup.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "Expensify API"
                });
                setup.OperationFilter<UserIdHeader>();
                setup.AddSecurityDefinition("ApiKey", new OpenApiSecurityScheme
                {
                    Description = "ApiKey must appear in header",
                    Type = SecuritySchemeType.ApiKey,
                    Name = "Api-Key",
                    In = ParameterLocation.Header,
                    Scheme = "ApiKeyScheme"
                });
                var apiKey = new OpenApiSecurityScheme()
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "ApiKey"
                    },
                    In = ParameterLocation.Header
                };
                var requirement = new OpenApiSecurityRequirement
                {
                            { apiKey, new List<string>() }
                };
                setup.AddSecurityRequirement(requirement);
            });

            var connectionString = config.GetConnectionString("ConnectionString");

            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(connectionString)
            );

            services.AddScoped<ExpenseService>();
            services.AddSingleton<AuthAccessor>();
        }

        public void Configure(IApplicationBuilder app)
        {            
            // todo move the configurations to extensions

            app.UseMiddleware<CustomErrorHandler>();

            app.UseCors("AllowAllOrigins");
            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSwagger();
            app.UseSwaggerUI(setup => {
                setup.EnableFilter();
                setup.DisplayRequestDuration();
            });

            app.UseHttpsRedirection();
        }
    }
}
