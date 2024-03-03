namespace Pr2
{
  public class Task3
  {
    public void Run()
    {
      int[] X = new int[20 + getLastNumber()];

      Random random = new Random();
      
      for (int i = 0; i < X.Length; i++)
      {
        X[i] = random.Next(100);
      }

      Console.WriteLine("Масив X:");
      
      foreach (int num in X)
      {
        Console.Write(num + " ");
      }

      Console.WriteLine();

      int min = X[0];
      int max = X[0];

      for (int i = 1; i < X.Length; i++)
      {
        if (X[i] < min)
          min = X[i];
        if (X[i] > max)
          max = X[i];
      }

      Console.WriteLine("Мінімальне значення: " + min);
      Console.WriteLine("Максимальне значення: " + max);
    }

    static int getLastNumber()
    {
      return 28;
    }
  }
}
