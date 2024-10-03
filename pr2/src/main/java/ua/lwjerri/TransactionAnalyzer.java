package ua.lwjerri;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class TransactionAnalyzer {
  private List<Transaction> transactions;
  private DateTimeFormatter dateFormatter;

  public TransactionAnalyzer(List<Transaction> transactions) {
    this.transactions = transactions;
    this.dateFormatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
  }

  public double calculateTotalBalance() {
    double balance = 0;

    for (Transaction transaction : transactions) {
      balance += transaction.getAmount();
    }

    return balance;
  }

  public int countTransactionsByMonth(String monthYear) {
    int count = 0;

    for (Transaction transaction : transactions) {
      LocalDate date = LocalDate.parse(transaction.getDate(), dateFormatter);
      String transactionMonthYear = date.format(DateTimeFormatter.ofPattern("MM-yyyy"));

      if (transactionMonthYear.equals(monthYear)) {
        count++;
      }
    }

    return count;
  }

  public List<Transaction> findTopExpenses() {
    return transactions.stream()
        .filter(t -> t.getAmount() < 0)
        .sorted(Comparator.comparing(Transaction::getAmount))
        .limit(10)
        .collect(Collectors.toList());
  }

  public Transaction findMinExpenseInPeriod(String startDate, String endDate) {
    LocalDate start = LocalDate.parse(startDate, dateFormatter);
    LocalDate end = LocalDate.parse(endDate, dateFormatter);

    return transactions.stream()
        .filter(t -> t.getAmount() < 0)
        .filter(t -> {
          LocalDate date = LocalDate.parse(t.getDate(), dateFormatter);

          return !date.isBefore(start) && !date.isAfter(end);
        })
        .max(Comparator.comparing(Transaction::getAmount))
        .orElse(null);
  }

  public Transaction findMaxExpenseInPeriod(String startDate, String endDate) {
    LocalDate start = LocalDate.parse(startDate, dateFormatter);
    LocalDate end = LocalDate.parse(endDate, dateFormatter);

    return transactions.stream()
        .filter(t -> t.getAmount() < 0)
        .filter(t -> {
          LocalDate date = LocalDate.parse(t.getDate(), dateFormatter);

          return !date.isBefore(start) && !date.isAfter(end);
        })
        .min(Comparator.comparing(Transaction::getAmount))
        .orElse(null);
  }

  public Map<String, Double> calculateExpensesByCategory() {
    return transactions.stream()
        .filter(t -> t.getAmount() < 0)
        .collect(Collectors.groupingBy(Transaction::getDescription, Collectors.summingDouble(Transaction::getAmount)));
  }

  public Map<String, Double> calculateExpensesByMonth() {
    return transactions.stream()
        .filter(t -> t.getAmount() < 0)
        .collect(Collectors.groupingBy(t -> {
          LocalDate date = LocalDate.parse(t.getDate(), dateFormatter);
          return date.format(DateTimeFormatter.ofPattern("MM-yyyy"));
        }, Collectors.summingDouble(Transaction::getAmount)));
  }

  public void generateReport() {
    Map<String, Double> expensesByCategory = calculateExpensesByCategory();
    Map<String, Double> expensesByMonth = calculateExpensesByMonth();

    double scaleFactor = 1000;

    System.out.println("Звіт по витратам за категоріями:");

    for (Map.Entry<String, Double> entry : expensesByCategory.entrySet()) {

      String category = entry.getKey();

      double amount = Math.abs(entry.getValue());

      String stars = new String(new char[(int) (amount / scaleFactor)]).replace("\0", "*");

      System.out.printf("%s: %.2f грн %s%n", category, amount, stars);
    }

    System.out.println("\nЗвіт по витратам за місяцями:");

    for (Map.Entry<String, Double> entry : expensesByMonth.entrySet()) {
      String month = entry.getKey();

      double amount = Math.abs(entry.getValue());

      String stars = new String(new char[(int) (amount / scaleFactor)]).replace("\0", "*");

      System.out.printf("%s: %.2f грн %s%n", month, amount, stars);
    }
  }
}
