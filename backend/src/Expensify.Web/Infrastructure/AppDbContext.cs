using Expensify.Web.Entities;
using Microsoft.EntityFrameworkCore;

namespace Expensify.Web.Infrastructure
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Expense> Expense { get; set; }
    }
}
