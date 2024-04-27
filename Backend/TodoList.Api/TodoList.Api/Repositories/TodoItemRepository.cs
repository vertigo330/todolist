using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TodoList.Api.Models.DataModel;

namespace TodoList.Api.Repositories;

public class TodoItemRepository : ITodoItemRepository
{
    private readonly TodoContext _context;

    public TodoItemRepository(TodoContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
    }

    public async Task<TodoItem> GetTodoItemAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _context.TodoItems.Where(x => x.Id == id).SingleAsync(cancellationToken);
    }

    public async Task<IList<TodoItem>> GetTodoItemsAsync(CancellationToken cancellationToken)
    {
        return await _context.TodoItems.ToListAsync(cancellationToken);
    }

    public async Task<TodoItem> AddTodoItemAsync(TodoItem todoItem, CancellationToken cancellationToken)
    {
        _context.TodoItems.Add(todoItem);
        await _context.SaveChangesAsync(cancellationToken);
        return todoItem;
    }

    public async Task UpdateTodoItemAsync(Guid id, TodoItem todoItem, CancellationToken cancellationToken)
    {
        _context.Entry(todoItem).State = EntityState.Modified;
        await _context.SaveChangesAsync(cancellationToken);
    }
}