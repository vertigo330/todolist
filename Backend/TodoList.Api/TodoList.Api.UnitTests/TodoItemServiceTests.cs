using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Moq;
using TodoList.Api.Exceptions;
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
        public async void GivenBothCompleteAndIncompleteItems_WhenGetIncompleteTodoItemsAsync_ThenReturnsIncompletedItems()
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
        
        [Theory]
        [InlineData("")]
        [InlineData("     ")]
        [InlineData(null)]
        public async void GivenEmptyDescription_WhenAddTodoItemAsync_ThenThrows(string invalidDescription)
        {
            //Arrange
            var ct = new CancellationToken();
            var mockRepo = new Mock<ITodoItemRepository>();
            var itemToAdd = new TodoItemDto
            {
                Description = invalidDescription,
            };
            
            mockRepo.Setup(r => r.GetTodoItemsAsync(ct)).ReturnsAsync(new List<TodoItem>());
                        
            var serviceUnderTest = new TodoItemService(mockRepo.Object);

            //Act
            Func<Task> act = async () => { await serviceUnderTest.AddTodoItemAsync(itemToAdd, ct); };
            
            //Assert
             await act.Should().ThrowAsync<TodoValidationException>().WithMessage("Description is required");
        }
        
        [Fact]
        public async void GivenDescriptionAlreadyExists_WhenAddTodoItemAsync_ThenThrows()
        {
            //Arrange
            var ct = new CancellationToken();
            var mockRepo = new Mock<ITodoItemRepository>();
            var itemToAdd = new TodoItemDto
            {
                Description = "I pre-exist",
            };
            
            mockRepo.Setup(r => r.GetTodoItemsAsync(ct)).ReturnsAsync(new List<TodoItem>{
                new TodoItem
                {
                    Description = "I pre-exist"
                }
            });
                       
            var serviceUnderTest = new TodoItemService(mockRepo.Object);

            //Act
            Func<Task> act = async () => { await serviceUnderTest.AddTodoItemAsync(itemToAdd, ct); };
            
            //Assert
             await act.Should().ThrowAsync<TodoValidationException>().WithMessage("Description already exists");
        }

        [Fact]
        public async void GivenTodoItem_WhenAddTodoItemAsync_ThenAddsToTheRepository()
        {
            //Arrange
            var ct = new CancellationToken();
            var mockRepo = new Mock<ITodoItemRepository>();
            var itemId = Guid.NewGuid();
            
            var itemToAdd = new TodoItemDto
            {
                Description = "test item",
            };
            
            mockRepo.Setup(r => r.GetTodoItemsAsync(ct)).ReturnsAsync(new List<TodoItem>());
            mockRepo.Setup(r => r.AddTodoItemAsync(It.IsAny<TodoItem>(), ct)).ReturnsAsync(new TodoItem
            {
                Id = itemId
            });
            var serviceUnderTest = new TodoItemService(mockRepo.Object);

            //Act
            var actualInsertedId = await serviceUnderTest.AddTodoItemAsync(itemToAdd, ct);

            //Assert
            actualInsertedId.Should().Be(itemId);
            mockRepo.Verify(m=>m.AddTodoItemAsync(It.Is<TodoItem>(item => item.Description == "test item"), ct), Times.Once);
        }

        [Fact]
        public async void GivenTodoItemWithUnmatchedId_WhenUpdateTodoItemAsync_ThenThrows()
        {
             //Arrange
            var ct = new CancellationToken();
            var mockRepo = new Mock<ITodoItemRepository>();
            var itemId1 = Guid.NewGuid();
            var itemId2 = Guid.NewGuid();
            
            var itemToUpdate = new TodoItemDto
            {
                Id = Convert.ToString(itemId2),
                Description = "test item",
            };
            
            var serviceUnderTest = new TodoItemService(mockRepo.Object);

            //Act
            Func<Task> act = async () => {  await serviceUnderTest.UpdateTodoItemAsync(itemId1, itemToUpdate, ct); };

            //Assert
             await act.Should().ThrowAsync<MismatchedIdException>().WithMessage("Mismatched Id detected");
        }

        [Fact]
        public async void GivenTodoItemWithNotFoundId_WhenUpdateTodoItemAsync_ThenThrows()
        {
                //Arrange
            var ct = new CancellationToken();
            var mockRepo = new Mock<ITodoItemRepository>();
            var itemId = Guid.NewGuid();
            
            var itemToUpdate = new TodoItemDto
            {
                Id = Convert.ToString(itemId),
                Description = "test item",
            };
            
            //Simulate a database exception thrown from the repo
            mockRepo
                .Setup(m => m.UpdateTodoItemAsync(It.IsAny<Guid>(), It.IsAny<TodoItem>(), ct))
                .Throws<DbUpdateConcurrencyException>();

            mockRepo.Setup(r => r.GetTodoItemsAsync(ct)).ReturnsAsync(new List<TodoItem>{
                new()
                {
                    Description = "I pre-exist"
                }
            });
            
            var serviceUnderTest = new TodoItemService(mockRepo.Object);

            //Act
            Func<Task> act = async () => {  await serviceUnderTest.UpdateTodoItemAsync(itemId, itemToUpdate, ct); };

            //Assert
             await act.Should().ThrowAsync<TodoItemNotFoundException>().WithMessage("The todo item was not found");
        }
    }
}
