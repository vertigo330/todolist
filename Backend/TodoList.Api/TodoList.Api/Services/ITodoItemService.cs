using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using TodoList.Api.Models.Dto;

namespace TodoList.Api.Services;

public interface ITodoItemService
{
    Task<TodoItemDto> GetTodoItemAsync(Guid id, CancellationToken cancellationToken);
    
    Task<IList<TodoItemDto>> GetIncompleteTodoItemsAsync(CancellationToken cancellationToken);

    Task<Guid> AddTodoItemAsync(TodoItemDto todoItemDto, CancellationToken cancellationToken);
    
    Task UpdateTodoItemAsync(Guid id, TodoItemDto todoItemDto, CancellationToken cancellationToken);
}