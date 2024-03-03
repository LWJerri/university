namespace Pr2
{
  class Program
  {
    static void Main()
    {
      Console.WriteLine("Task #1:");

      Task1 task1 = new Task1();
      task1.Run();

      Console.WriteLine();

      Console.WriteLine("Task #2:");

      Task2 task2 = new Task2();
      task2.Run();

      Console.WriteLine();
    }
  }
}
