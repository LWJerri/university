namespace Pr3
{
  class Program
  {
    static void Main()
    {
      Console.WriteLine("Task #1:");

      Console.WriteLine("Введіть назву книги:");
      string name = Console.ReadLine()!;

      Console.WriteLine("Введіть автора книги:");
      string author = Console.ReadLine()!;

      Console.WriteLine("Напишіть контент книги:");
      string content = Console.ReadLine()!;

      Book book = new Book(name, author, content);
      book.Show();
    }
  }
}
