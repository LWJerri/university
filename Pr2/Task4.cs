namespace Pr2
{
  public class Task4
  {
    public void Run()
    {
      int[] X = new int[11];

      int M;

      Random rand = new Random();

      for (int i = 0; i < X.Length; i++)
      {
        X[i] = rand.Next(-20, 21);
      }

      Console.Write("Введіть число М: ");
      M = Int32.Parse(Console.ReadLine()!);

      int[] Y = new int[X.Length];
      int count = 0;

      foreach (int num in X)
      {
        if (Math.Abs(num) > M)
        {
          Y[count] = num;

          count++;
        }
      }

      Console.WriteLine("Число М: {0}", M);
      Console.WriteLine("Масив X:");
      PrintArray(X);
      Console.WriteLine("Масив Y:");
      PrintArray(Y, count);
    }

    static void PrintArray(int[] arr, int length = -1)
    {
      if (length == -1)
      {
        length = arr.Length;
      }

      for (int i = 0; i < length; i++)
      {
        Console.Write(arr[i] + " ");
      }
    }
  }
}
