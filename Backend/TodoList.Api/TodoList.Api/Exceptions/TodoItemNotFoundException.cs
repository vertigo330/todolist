using System;

namespace TodoList.Api.Exceptions;

public class TodoItemNotFoundException : ArgumentException
{
    public TodoItemNotFoundException() : base("The todo item was not found")
    {
    }
}