package ua.lwjerri;

import java.io.IOException;
import java.util.List;

public class TransactionCSVReader {
  private final DataReader dataReader;
  private final TransactionProcessor transactionProcessor;

  public TransactionCSVReader(DataReader dataReader, TransactionProcessor transactionProcessor) {
    this.dataReader = dataReader;
    this.transactionProcessor = transactionProcessor;
  }

  public List<Transaction> readTransactions(String filePath) {
    List<Transaction> transactions = null;

    try {
      List<String> data = dataReader.readData(filePath);

      transactions = transactionProcessor.processTransactions(data);
    } catch (IOException e) {
      e.printStackTrace();
    }

    return transactions;
  }
}