using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using FluentAssertions;
using Moq;
using TodoList.Api.Models.DataModel;
using TodoList.Api.Models.Dto;
using TodoList.Api.Repositories;
using TodoList.Api.Services;
using Xunit;

namespace TodoList.Api.UnitTests
{
    public class TodoItemServiceTests
    {
        [Fact]
        public async void GivenId_WhenGetTodoItemAsync_ThenReturnsMatchingItem()
        {
            //Arrange
            var ct = new CancellationToken();
            var itemId = Guid.NewGuid();
            var mockRepo = new Mock<ITodoItemRepository>();
            mockRepo.Setup(r => r.GetTodoItemAsync(itemId, ct)).ReturnsAsync(new TodoItem
            {
                Id = itemId,
                Description = "test item"
            });
            var serviceUnderTest = new TodoItemService(mockRepo.Object);

            //Act
            var actualItem = await serviceUnderTest.GetTodoItemAsync(itemId, ct);

            //Assert
            actualItem.Should().NotBeNull();
            actualItem.Id.Should().Be(Convert.ToString(itemId));
            actualItem.Description.Should().Be("test item");
        }
        
        [Fact]
        public async void WhenGetIncompleteTodoItemsAsync_ThenReturnsIncompletedItems()
        {
            //Arrange
            var ct = new CancellationToken();
            var mockRepo = new Mock<ITodoItemRepository>();
            var itemId = Guid.NewGuid();
            mockRepo.Setup(r => r.GetTodoItemsAsync(ct)).ReturnsAsync(new List<TodoItem>
            {
                new()
                {
                    Id = Guid.NewGuid(),
                    Description = "Completed item",
                    IsCompleted = true
                },
                new()
                {
                    Id = itemId,
                    Description = "Incomplete item"
                }
            });
            var serviceUnderTest = new TodoItemService(mockRepo.Object);

            //Act
            var actualItems = await serviceUnderTest.GetIncompleteTodoItemsAsync(ct);

            //Assert
            actualItems.Should().NotBeNull();
            actualItems.Count.Should().Be(1);
            actualItems.All(item => item.IsCompleted).Should().Be(false);
        }
        
        [Fact]
        public async void GivenTodoItem_WhenAddTodoItemAsync_ThenAddsToTheRepository()
        {
            //Arrange
            var ct = new CancellationToken();
            var mockRepo = new Mock<ITodoItemRepository>();
            var itemId = Guid.NewGuid();
            
            var item = new TodoItemDto
            {

                
            }
            
            mockRepo.Setup(r => r.GetTodoItemsAsync(ct)).ReturnsAsync(new List<TodoItem>
            {
                new()
                {
                    Id = Guid.NewGuid(),
                    Description = "Completed item",
                    IsCompleted = true
                },
                new()
                {
                    Id = itemId,
                    Description = "Incomplete item"
                }
            });
            var serviceUnderTest = new TodoItemService(mockRepo.Object);

            //Act
            var actualItems = await serviceUnderTest.GetIncompleteTodoItemsAsync(ct);

            //Assert
            actualItems.Should().NotBeNull();
            actualItems.Count.Should().Be(1);
            actualItems.All(item => item.IsCompleted).Should().Be(false);
        }
    }
}
