namespace Pr2
{
  public class Task2
  {
    public void Run()
    {
      Console.WriteLine("Введіть довжини сторін трикутника:");

      double a, b, c;

      Console.Write("Сторона а: ");
      while (!double.TryParse(Console.ReadLine(), out a) || a <= 0)
      {
        Console.WriteLine("Введіть коректне значення для сторони a (додатне число):");
      }

      Console.Write("Сторона b: ");
      while (!double.TryParse(Console.ReadLine(), out b) || b <= 0)
      {
        Console.WriteLine("Введіть коректне значення для сторони b (додатне число):");
      }

      Console.Write("Сторона c: ");
      while (!double.TryParse(Console.ReadLine(), out c) || c <= 0)
      {
        Console.WriteLine("Введіть коректне значення для сторони c (додатне число):");
      }

      if (!isValidInput(a, b, c))
      {
        Console.WriteLine("Трикутник з такими сторонами не існує.");
        
        return;
      }

      double perimeter = a + b + c;
      double s = perimeter / 2;
      double area = Math.Sqrt(s * (s - a) * (s - b) * (s - c));

      Console.WriteLine("Периметр трикутника: {0}", perimeter);
      Console.WriteLine("Площа трикутника: {0}", area);

      if (a == b && b == c)
      {
        Console.WriteLine("Трикутник є рівностороннім.");
      }
      else if (a == b || a == c || b == c)
      {
        Console.WriteLine("Трикутник є рівнобедреним.");
      }
      else
      {
        Console.WriteLine("Трикутник є різностороннім.");
      }
    }
    static bool isValidInput(double a, double b, double c)
    {
        return a + b > c && a + c > b && b + c > a;
    }
  }
}
