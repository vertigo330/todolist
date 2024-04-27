using System;

namespace TodoList.Api.Exceptions;

public class MismatchedIdException : ArgumentException
{
    public MismatchedIdException() : base("Mismatched Id detected")
    {
    }
}