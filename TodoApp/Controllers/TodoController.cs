﻿using Microsoft.AspNetCore.Mvc;
using TodoApp.Models;
using TodoApp.Services;

namespace TodoApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodoController : ControllerBase
{
    private readonly TodoRepository _repository;

    public TodoController(TodoRepository repository)
    {
        _repository = repository;
    }

    [HttpPost]
    public IActionResult CreateTodo([FromBody] Todo todo)
    {
        if (todo.TaskName!.Length < 10)
        {
            return BadRequest("Todo must be at least 10 characters long.");
        }
        if (todo.Deadline.HasValue && todo.Deadline < DateTime.UtcNow)
        {
            return BadRequest("Deadline must be in the future.");
        }

        _repository.AddTodo(todo);
        return CreatedAtAction(nameof(GetTodoById), new { id = todo.Id }, todo);
    }

    [HttpGet]
    public IActionResult GetTodos()
    {
        return Ok(_repository.GetAllTodos());
    }

    [HttpGet("{id}")]
    public IActionResult GetTodoById(int id)
    {
        var todo = _repository.GetTodoById(id);
        if (todo == null)
        {
            return NotFound();
        }
        return Ok(todo);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateTodo(int id, [FromBody] Todo todo)
    {
        var existingTodo = _repository.GetTodoById(id);
        if (existingTodo == null)
        {
            return NotFound();
        }

        if (todo.TaskName != null)
        {
            existingTodo.TaskName = todo.TaskName;
        }
        if (todo.Deadline != null)
        {
            existingTodo.Deadline = todo.Deadline;
        }
        if (todo.Completed != null)
        {
            existingTodo.Completed = todo.Completed;
        }

        _repository.UpdateTodo(existingTodo);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteTodo(int id)
    {
        var existingTodo = _repository.GetTodoById(id);
        if (existingTodo == null)
        {
            return NotFound();
        }

        _repository.DeleteTodo(id);
        return NoContent();
    }
}

