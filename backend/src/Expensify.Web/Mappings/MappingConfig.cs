using Expensify.Web.DTOs;
using Expensify.Web.Entities;
using Mapster;

namespace Expensify.Web.Mappings
{
    public class MappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.ForType<Expense, ExpenseGetDTO>().GenerateMapper(MapType.Map);
        }
    }
}
