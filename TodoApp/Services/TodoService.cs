using Microsoft.EntityFrameworkCore;
using TodoApp.Models;
using TodoApp.Data;

namespace TodoApp.Services;

public class TodoRepository
{
    private readonly TodoContext _context;

    public TodoRepository(TodoContext context)
    {
        _context = context;
    }

    public IEnumerable<Todo> GetAllTodos()
    {
        return _context.Set<Todo>().ToList();
    }

    public Todo GetTodoById(int id)
    {
        var todo = _context.Set<Todo>().FirstOrDefault(t => t.Id == id) ?? throw new Exception("Todo not found");
        return todo;
    }

    public void AddTodo(Todo todo)
    {
        _context.Set<Todo>().Add(todo);
        _context.SaveChanges();
    }

    public void UpdateTodo(Todo todo)
    {
        _context.Set<Todo>().Update(todo);
        _context.SaveChanges();
    }

    public void DeleteTodo(int id)
    {
        var todo = _context.Set<Todo>().Find(id);
        if (todo != null)
        {
            _context.Set<Todo>().Remove(todo);
            _context.SaveChanges();
        }
    }
}
