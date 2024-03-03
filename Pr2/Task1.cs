namespace Pr2
{
  public class Task1
  {
    public void Run()
    {
      Console.WriteLine("Введіть число №1:");
      int numOne = int.Parse(Console.ReadLine()!);

      Console.WriteLine("Введіть число №2:");
      int numTwo = int.Parse(Console.ReadLine()!);

      Console.WriteLine("Введіть число №3:");
      int numThree = int.Parse(Console.ReadLine()!);

      int min = 1;
      int max = 27;

      Console.WriteLine("Числа, які належать інтервалу [1, {0}]:", max);
      
      if (IsWithinInterval(numOne, min, max))
        Console.WriteLine(numOne);
      if (IsWithinInterval(numTwo, min, max))
        Console.WriteLine(numTwo);
      if (IsWithinInterval(numThree, min, max))
        Console.WriteLine(numThree);
    }
    static bool IsWithinInterval(int number, int min, int max)
    {
      return number >= min && number <= max;
    }
  }
}
