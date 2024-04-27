using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using TodoList.Api.Models.DataModel;

namespace TodoList.Api.Repositories;

public interface ITodoItemRepository
{
    Task<TodoItem> GetTodoItemAsync(Guid id, CancellationToken cancellationToken);
    
    Task<IList<TodoItem>> GetTodoItemsAsync(CancellationToken cancellationToken);

    Task<TodoItem> AddTodoItemAsync (TodoItem todoItem, CancellationToken cancellationToken);
    
    Task UpdateTodoItemAsync(Guid id, TodoItem todoItem, CancellationToken cancellationToken);
}