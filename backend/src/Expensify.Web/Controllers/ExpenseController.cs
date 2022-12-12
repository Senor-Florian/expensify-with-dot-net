using Expensify.Web.Auth;
using Expensify.Web.DTOs;
using Expensify.Web.Services;
using Microsoft.AspNetCore.Mvc;

namespace Expensify.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/expenses")]
    [AuthByApiKey]
    [ApiController]
    public class ExpenseController : ControllerBase
    {
        private readonly ExpenseService _expenseService;

        public ExpenseController(ExpenseService expenseService)
        {
            _expenseService = expenseService;
        }

        [HttpGet]
        public async Task<IActionResult> ListExpensesAsync()
        {
            var expenses = await _expenseService.ListExpensesAsync();
            return Ok(expenses);
        }

        [HttpPost]
        public async Task<IActionResult> CreateExpenseAsync([FromBody] ExpensePostPutDTO dto)
        {
            var expense = await _expenseService.CreateExpenseAsync(dto);
            return Ok(expense);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateExpenseAsync(Guid id, [FromBody] ExpensePostPutDTO dto)
        {
            await _expenseService.UpdateExpenseAsync(id, dto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExpenseAsync(Guid id)
        {
            await _expenseService.DeleteExpenseAsync(id);
            return NoContent();
        }
    }
}
