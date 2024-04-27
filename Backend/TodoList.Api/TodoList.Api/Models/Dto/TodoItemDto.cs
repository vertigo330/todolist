namespace TodoList.Api.Models.Dto
{
    //NOTE: We dont pass data models over a service boundary
    public class TodoItemDto
    {
        public string Id { get; set; }

        public string Description { get; set; }

        public bool IsCompleted { get; set; }
    }
}
