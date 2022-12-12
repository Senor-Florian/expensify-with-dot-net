using Expensify.Web.Enums;

namespace Expensify.Web.Entities
{
    public class Expense
    {
        public Guid Id { get; protected init; }
        public string Description { get; protected set; }
        public string Note { get; protected set; }
        public Currency Currency { get; set; }
        public decimal Amount { get; protected set; }
        public DateTime Date { get; protected set; } // todo change to dateonly
        public string UserId { get; protected init; }

        public static Expense Create(string userId, string description, string note, Currency currency, decimal amount, DateTime date)
        {
            var expense = new Expense
            {
                Id = Guid.NewGuid(),
                UserId = userId
            };

            expense.Update(description, note, currency, amount, date);

            return expense;
        }

        public void Update(string description, string note, Currency currency, decimal amount, DateTime date)
        {
            Description = description;
            Note = note;
            Currency = currency;
            Amount = amount;
            Date = date;
        }
    }
}
