namespace Pr3
{
  public class Point
  {
    public int X { get; private set; }
    public int Y { get; private set; }
    public string Name { get; private set; }

    public Point(int x, int y, string name)
    {
      X = x;
      Y = y;
      Name = name;
    }
  }

  public class Figure
  {
    private Point[] points;

    public Figure(Point p1, Point p2, Point p3)
    {
      points = new Point[] { p1, p2, p3 };
    }

    public Figure(Point p1, Point p2, Point p3, Point p4)
    {
      points = new Point[] { p1, p2, p3, p4 };
    }

    public Figure(Point p1, Point p2, Point p3, Point p4, Point p5)
    {
      points = new Point[] { p1, p2, p3, p4, p5 };
    }

    private double LengthSide(Point A, Point B)
    {
      return Math.Sqrt(Math.Pow(B.X - A.X, 2) + Math.Pow(B.Y - A.Y, 2));
    }

    public void PerimeterCalculator()
    {
      double perimeter = 0;
      string name = "";

      for (int i = 0; i < points.Length; i++)
      {
        int nextIndex = (i + 1) % points.Length;

        perimeter += LengthSide(points[i], points[nextIndex]);
      }

      switch (points.Length)
      {
        case 3:
          name = "Трикутник";
          
          break;
        case 4:
          name = "Чотирикутник";
          
          break;
        case 5:
          name = "Пятикутник";
          
          break;
      }

      Console.WriteLine("Назва: {0}", name);
      Console.WriteLine("Периметр {0}: {1}", name, perimeter);
    }
  }
}
