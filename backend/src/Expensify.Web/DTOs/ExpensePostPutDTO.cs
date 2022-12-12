using Expensify.Web.Enums;

namespace Expensify.Web.DTOs
{
    public class ExpensePostPutDTO
    {
        public string Description { get; set; }
        public string Note { get; set; }
        public Currency Currency { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
    }
}
