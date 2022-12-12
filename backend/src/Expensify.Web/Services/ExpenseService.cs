using Expensify.Web.Auth;
using Expensify.Web.DTOs;
using Expensify.Web.Entities;
using Expensify.Web.ErrorHandling;
using Expensify.Web.Infrastructure;
using Mapster;
using Microsoft.EntityFrameworkCore;

namespace Expensify.Web.Services
{
    public class ExpenseService
    {
        private readonly AppDbContext _dbContext;
        private readonly AuthAccessor _authAccessor;

        public ExpenseService(AppDbContext dbContext, AuthAccessor authAccessor)
        {
            _dbContext = dbContext;
            _authAccessor = authAccessor;
        }

        public async Task<IEnumerable<ExpenseGetDTO>> ListExpensesAsync()
        {
            var userId = _authAccessor.ExtractUserIdFromToken();
            var expenses = await _dbContext.Expense.Where(x => x.UserId == userId).ToListAsync();

            return expenses.AsQueryable().ProjectToType<ExpenseGetDTO>();
        }

        public async Task<ExpenseGetDTO> CreateExpenseAsync(ExpensePostPutDTO dto)
        {
            var userId = _authAccessor.ExtractUserIdFromToken();
            var expense = Expense.Create(userId, dto.Description, dto.Note, dto.Currency, dto.Amount, dto.Date);

            _dbContext.Expense.Add(expense);

            await _dbContext.SaveChangesAsync();

            return expense.Adapt<ExpenseGetDTO>();
        }

        public async Task UpdateExpenseAsync(Guid id, ExpensePostPutDTO dto)
        {
            var userId = _authAccessor.ExtractUserIdFromToken();
            var expense = await _dbContext.Expense.SingleOrDefaultAsync(x => x.Id == id);

            if (expense is null)
                throw new NotFoundException(nameof(ErrorMessages.NOT_FOUND_EXPENSE), ErrorMessages.NOT_FOUND_EXPENSE);

            if (expense.UserId != userId)
                throw new ForbiddenException(nameof(ErrorMessages.FORBIDDEN_EXPENSE_ACCESS), ErrorMessages.FORBIDDEN_EXPENSE_ACCESS);

            expense.Update(dto.Description, dto.Note, dto.Currency, dto.Amount, dto.Date);

            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteExpenseAsync(Guid id)
        {
            var userId = _authAccessor.ExtractUserIdFromToken();
            var expense = await _dbContext.Expense.SingleOrDefaultAsync(x => x.Id == id);

            if (expense is null)
                throw new NotFoundException(nameof(ErrorMessages.NOT_FOUND_EXPENSE), ErrorMessages.NOT_FOUND_EXPENSE);

            if (expense.UserId != userId)
                throw new ForbiddenException(nameof(ErrorMessages.FORBIDDEN_EXPENSE_ACCESS), ErrorMessages.FORBIDDEN_EXPENSE_ACCESS);

            _dbContext.Expense.Remove(expense);

            await _dbContext.SaveChangesAsync();
        }
    }
}
