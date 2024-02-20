namespace TodoApp.Models
{
    public class Todo
    {
        public int Id { get; set; }

        public string? TaskName { get; set; }

        public bool Completed { get; set; }

        public DateTime? Deadline { get; set; } // Nullable DateTime
    }
}