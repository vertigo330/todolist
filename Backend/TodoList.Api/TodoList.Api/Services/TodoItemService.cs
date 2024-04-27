using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TodoList.Api.Exceptions;
using TodoList.Api.Models.DataModel;
using TodoList.Api.Models.Dto;
using TodoList.Api.Repositories;

namespace TodoList.Api.Services;

public class TodoItemService : ITodoItemService
{
    private readonly ITodoItemRepository _itemRepository;
    
    public TodoItemService(ITodoItemRepository itemRepository)
    {
        _itemRepository = itemRepository ?? throw new ArgumentNullException(nameof(itemRepository));
    }

    public async Task<TodoItemDto> GetTodoItemAsync(Guid id, CancellationToken cancellationToken)
    {
        var todoItem = await _itemRepository.GetTodoItemAsync(id, cancellationToken);
        return new TodoItemDto
        {
            Id = Convert.ToString(todoItem.Id),
            Description = todoItem.Description,
            IsCompleted = todoItem.IsCompleted
        };
    }

    public async Task<IList<TodoItemDto>> GetIncompleteTodoItemsAsync(CancellationToken cancellationToken)
    {
        var todoItems = await _itemRepository.GetTodoItemsAsync(cancellationToken);
        return todoItems
            .Where(item => !item.IsCompleted)
            .Select(item => new TodoItemDto
            {
                Id = Convert.ToString(item.Id),
                Description = item.Description,
                IsCompleted = item.IsCompleted
            }).ToList();

    }

    public async Task<Guid> AddTodoItemAsync(TodoItemDto todoItemDto, CancellationToken cancellationToken)
    {
        if (string.IsNullOrEmpty(todoItemDto?.Description))
        {
            throw new TodoValidationException("Description is required");
        }

        if (await TodoItemDescriptionExists(todoItemDto.Description, cancellationToken))
        {
            throw new TodoValidationException("Description already exists");
        }

        var todoItem = new TodoItem
        {
            Description = todoItemDto.Description,
            IsCompleted = todoItemDto.IsCompleted
        };
        await _itemRepository.AddTodoItemAsync(todoItem, cancellationToken);
        return todoItem.Id;
    }

    public async Task UpdateTodoItemAsync(Guid id, TodoItemDto todoItemDto, CancellationToken cancellationToken)
    {
        if (Convert.ToString(id) != todoItemDto.Id)
        {
            throw new MismatchedIdException();
        }
        var todoItem = new TodoItem
        {
            Id = id,
            Description = todoItemDto.Description,
            IsCompleted = todoItemDto.IsCompleted
        };

        try
        {
            await _itemRepository.UpdateTodoItemAsync(todoItem.Id, todoItem, cancellationToken);
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await TodoItemIdExists(id, cancellationToken))
            {
                throw new TodoItemNotFoundException();
            }
            throw;
        }
    }
    
    private async Task<bool> TodoItemIdExists(Guid id, CancellationToken cancellationToken)
    {
        var todoItems = await _itemRepository.GetTodoItemsAsync(cancellationToken);
        return todoItems.Any(x => x.Id == id);
    }
    
    private async Task<bool> TodoItemDescriptionExists(string description, CancellationToken cancellationToken)
    {
        var todoItems = await _itemRepository.GetTodoItemsAsync(cancellationToken);
        //NOTE: This string comparison wont work for other cultures. Good enough for this though.
        return todoItems.Any(x=>string.Equals(x.Description, description, StringComparison.InvariantCultureIgnoreCase) && !x.IsCompleted);
    }
}