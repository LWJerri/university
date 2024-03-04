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

      Console.WriteLine();

      Console.WriteLine("Task #2:");

      Point A = new Point(5, 3, "A");
      Point B = new Point(10, 3, "B");
      Point C = new Point(15, 6, "C");
      // Point D = new Point(3, 6, "D");

      Figure figure = new Figure(A, B, C);
      figure.PerimeterCalculator();
    }
  }
}
