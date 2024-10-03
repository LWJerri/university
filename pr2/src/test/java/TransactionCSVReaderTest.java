import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import ua.lwjerri.DataReader;
import ua.lwjerri.Transaction;
import ua.lwjerri.TransactionCSVReader;
import ua.lwjerri.TransactionProcessor;

public class TransactionCSVReaderTest {
  private DataReader mockDataReader;
  private TransactionProcessor transactionProcessor;
  private TransactionCSVReader transactionCSVReader;

  @BeforeEach
  public void setUp() {
    mockDataReader = Mockito.mock(DataReader.class);
    transactionProcessor = new TransactionProcessor();
    transactionCSVReader = new TransactionCSVReader(mockDataReader, transactionProcessor);
  }

  @Test
  public void testReadTransactions() throws IOException {
    List<String> mockCSVData = Arrays.asList(
        "T1,100.0,Description1",
        "T2,200.0,Description2",
        "T3,300.0,Description3");

    when(mockDataReader.readData("test.csv")).thenReturn(mockCSVData);

    List<Transaction> transactions = transactionCSVReader.readTransactions("test.csv");

    assertEquals(3, transactions.size());

    Transaction transaction1 = transactions.get(0);

    assertEquals(100.0, transaction1.getAmount());
    assertEquals("Description1", transaction1.getDescription());

    Transaction transaction2 = transactions.get(1);

    assertEquals(200.0, transaction2.getAmount());
    assertEquals("Description2", transaction2.getDescription());

    Transaction transaction3 = transactions.get(2);

    assertEquals(300.0, transaction3.getAmount());
    assertEquals("Description3", transaction3.getDescription());
  }
}