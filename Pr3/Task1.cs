namespace Pr3
{
  class Title
  {
    private string title;

    public Title(string title)
    {
      this.title = title;
    }

    public void Show()
    {
      Console.ForegroundColor = ConsoleColor.Blue;
      Console.WriteLine("Title: {0}", title);
      Console.ResetColor();
    }
  }

  class Author
  {
    private string name;

    public Author(string name)
    {
      this.name = name;
    }

    public void Show()
    {
      Console.ForegroundColor = ConsoleColor.Yellow;
      Console.WriteLine("Author: {0}", name);
      Console.ResetColor();
    }
  }

  class Content
  {
    private string content;

    public Content(string content)
    {
      this.content = content;
    }

    public void Show()
    {
      Console.ForegroundColor = ConsoleColor.Red;
      Console.WriteLine("Content: {0}", content);
      Console.ResetColor();
    }
  }

  public class Book
  {
    private Title title;
    private Author author;
    private Content content;

    public Book(string title, string author, string content)
    {
      this.title = new Title(title);
      this.author = new Author(author);
      this.content = new Content(content);
    }

    public void Show()
    {
      Console.WriteLine("Some info about book:");
      title.Show();
      author.Show();
      content.Show();
    }
  }
}
