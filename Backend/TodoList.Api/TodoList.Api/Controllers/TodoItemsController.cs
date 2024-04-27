using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using TodoList.Api.Exceptions;
using TodoList.Api.Models.Dto;
using TodoList.Api.Services;

namespace TodoList.Api.Controllers
{
    //NOTE: These are unsecured endpoints
    [Route("api/[controller]")]
    [ApiController]
    public class TodoItemsController : ControllerBase
    {
        //NOTE: We could have use something like MediatR to slim down the controllers but I oped for simple service injection instead
        private readonly ITodoItemService _itemService;
        private readonly ILogger<TodoItemsController> _logger;

        public TodoItemsController(ITodoItemService itemService, ILogger<TodoItemsController> logger)
        {
            _itemService = itemService ?? throw new ArgumentNullException(nameof(itemService));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        // GET: api/TodoItems
        [HttpGet]
        public async Task<IActionResult> GetTodoItems(CancellationToken cancellationToken = default)
        {
            try
            {
                var results = await _itemService.GetIncompleteTodoItemsAsync(cancellationToken);
                return Ok(results);
            }
            catch (Exception ex)
            {
                //Unhandled returns 500 internal server error
                _logger.LogError(ex, "Error getting the todo items");
                return StatusCode(500);
            }
        }

        // GET: api/TodoItems/...
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTodoItem(Guid id, CancellationToken cancellationToken = default)
        {
            try
            {
                var result = await _itemService.GetTodoItemAsync(id, cancellationToken);

                if (result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                //Unhandled returns 500 internal server error
                _logger.LogError(ex, "Error getting the todo item");
                return StatusCode(500);
            }
        }

        // PUT: api/TodoItems/... 
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoItem(Guid id, TodoItemDto todoItem, CancellationToken cancellationToken = default)
        {
            try
            {
                await _itemService.UpdateTodoItemAsync(id, todoItem, cancellationToken);
            }
            catch (MismatchedIdException ex)
            {
                _logger.LogError(ex, "Error updating the todo item");
                return BadRequest(ex.Message);
            }
            catch (TodoItemNotFoundException ex)
            {
                _logger.LogError(ex, "Error updating the todo item");
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                //Unhandled returns 500 internal server error
                _logger.LogError(ex, "Error updating the todo item");
                return StatusCode(500);
            }

            return NoContent();
        } 

        // POST: api/TodoItems 
        [HttpPost]
        public async Task<IActionResult> PostTodoItem(TodoItemDto todoItem, CancellationToken cancellationToken = default)
        {
            try
            {
                var id = await _itemService.AddTodoItemAsync(todoItem, cancellationToken);
                return CreatedAtAction(nameof(GetTodoItem), new { id }, todoItem);
            }
            catch (TodoValidationException ex)
            {
                _logger.LogError(ex, "Error inserting the todo item");
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                //Unhandled returns 500 internal server error
                _logger.LogError(ex, "Error inserting the todo item");
                return StatusCode(500);
            }
        } 
    }
}
