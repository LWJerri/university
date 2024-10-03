package ua.lwjerri;

public class Transaction {
  private String date;
  private double amount;
  private String description;

  public Transaction(String date, double amount, String description) {
    this.date = date;
    this.amount = amount;
    this.description = description;
  }

  @Override
  public String toString() {
    return "Transaction{" + "date='" + date + '\'' + ", amount=" + amount + ", description='" + description + '\''
        + '}';
  }

  public String getDescription() {
    return description;
  }

  public double getAmount() {
    return amount;
  }

  public String getDate() {
    return date;
  }
}