import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import ua.lwjerri.Transaction;
import ua.lwjerri.TransactionAnalyzer;

public class TransactionAnalyzerTest {

  @Test
  public void testCalculateTotalBalance() {
    Transaction transaction1 = new Transaction("2023-01-01", 100.0, "Дохід");
    Transaction transaction2 = new Transaction("2023-01-02", -50.0, "Витрата");
    Transaction transaction3 = new Transaction("2023-01-03", 150.0, "Дохід");
    List<Transaction> transactions = Arrays.asList(transaction1, transaction2, transaction3);

    TransactionAnalyzer analyzer = new TransactionAnalyzer(transactions);

    double result = analyzer.calculateTotalBalance();

    Assertions.assertEquals(200.0, result, "Розрахунок загального балансу неправильний");
  }

  @Test
  public void testCountTransactionsByMonth() {
    Transaction transaction1 = new Transaction("01-02-2023", 50.0, "Дохід");
    Transaction transaction2 = new Transaction("15-02-2023", -20.0, "Витрата");
    Transaction transaction3 = new Transaction("05-03-2023", 100.0, "Дохід");
    List<Transaction> transactions = Arrays.asList(transaction1, transaction2, transaction3);

    TransactionAnalyzer analyzer = new TransactionAnalyzer(transactions);

    int countFeb = analyzer.countTransactionsByMonth("02-2023");
    int countMar = analyzer.countTransactionsByMonth("03-2023");

    Assertions.assertEquals(2, countFeb, "Кількість транзакцій за лютий неправильна");
    Assertions.assertEquals(1, countMar, "Кількість транзакцій за березень неправильна");
  }

  @Test
  public void testFindTopExpenses() {

    Transaction transaction1 = new Transaction("2023-01-01", -500.0, "Витрата");
    Transaction transaction2 = new Transaction("2023-01-02", -150.0, "Витрата");
    Transaction transaction3 = new Transaction("2023-01-03", -300.0, "Витрата");
    Transaction transaction4 = new Transaction("2023-01-04", -100.0, "Витрата");
    Transaction transaction5 = new Transaction("2023-01-05", -50.0, "Витрата");
    Transaction transaction6 = new Transaction("2023-01-06", -700.0, "Витрата");
    Transaction transaction7 = new Transaction("2023-01-07", -200.0, "Витрата");
    Transaction transaction8 = new Transaction("2023-01-08", 1000.0, "Дохід");
    Transaction transaction9 = new Transaction("2023-01-09", -400.0, "Витрата");
    Transaction transaction10 = new Transaction("2023-01-10", -250.0, "Витрата");
    Transaction transaction11 = new Transaction("2023-01-11", -50.0, "Витрата");

    List<Transaction> transactions = Arrays.asList(
        transaction1, transaction2, transaction3, transaction4, transaction5, transaction6,
        transaction7, transaction8, transaction9, transaction10, transaction11);

    TransactionAnalyzer analyzer = new TransactionAnalyzer(transactions);

    List<Transaction> topExpenses = analyzer.findTopExpenses();

    Assertions.assertEquals(10, topExpenses.size(), "Повинно бути рівно 10 витрат");

    Assertions.assertEquals(-700.0, topExpenses.get(0).getAmount(), "Найбільша витрата повинна бути -700.0");

    Assertions.assertEquals(-500.0, topExpenses.get(1).getAmount(), "Друга найбільша витрата повинна бути -500.0");

    Assertions.assertEquals(-50.0, topExpenses.get(9).getAmount(), "Остання витрата в топ-10 повинна бути -50.0");
  }
}