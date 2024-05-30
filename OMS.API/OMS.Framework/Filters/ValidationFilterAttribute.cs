using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace OMS.Framework.Filters
{
    public class ValidationFilterAttribute : IActionFilter
    {
        public void OnActionExecuted(ActionExecutedContext context)
        {

        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            if (!context.ModelState.IsValid)
            {
                // Create a custom error response
                var customErrorResponse = new
                {
                    Message = " Input data validation failed.",
                    Errors = context.ModelState
                        .Where(entry => entry.Value.Errors.Any())
                        .ToDictionary(entry => entry.Key, entry => entry.Value.Errors.Select(e => e.ErrorMessage))
                };

                // Return a Bad Request response with the custom error
                context.Result = new BadRequestObjectResult(customErrorResponse);
            }

        }
    }
}
