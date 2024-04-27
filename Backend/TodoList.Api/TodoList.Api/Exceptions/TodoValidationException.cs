using System;

namespace TodoList.Api.Exceptions;

public class TodoValidationException : ArgumentException
{
    public TodoValidationException(string message) : base(message)
    {
    }
}