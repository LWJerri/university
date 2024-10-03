package ua.lwjerri;

import java.util.List;

public class Main {
    public static void main(String[] args) {
        String filePath = "https://informer.com.ua/dut/java/pr2.csv";

        DataReader linkReader = new LinkReader();
        TransactionProcessor transactionProcessor = new TransactionProcessor();
        TransactionCSVReader reader = new TransactionCSVReader(linkReader, transactionProcessor);

        List<Transaction> transactions = reader.readTransactions(filePath);

        TransactionAnalyzer analyzer = new TransactionAnalyzer(transactions);
        TransactionReportGenerator reportGenerator = new TransactionReportGenerator();

        double totalBalance = analyzer.calculateTotalBalance();

        System.out.println("Загальний баланс: " + totalBalance);

        reportGenerator.printBalanceReport(totalBalance);
        String monthYear = "01-2024";
        int transactionsCount = analyzer.countTransactionsByMonth(monthYear);
        reportGenerator.printTransactionsCountByMonth(monthYear, transactionsCount);

        System.out.println("Кількість транзакцій за " + monthYear + ": " + transactionsCount);

        List<Transaction> topExpenses = analyzer.findTopExpenses();
        reportGenerator.printTopExpensesReport(topExpenses);

        Transaction maxExpensesInPeriod = analyzer.findMaxExpenseInPeriod("05-12-2023", "12-12-2023");
        System.err.println("Найбільші витрати за вказаний період: " + maxExpensesInPeriod.getAmount());

        Transaction minExpensesInPeriod = analyzer.findMinExpenseInPeriod("05-12-2023", "12-12-2023");
        System.err.println("Найменші витрати за вказаний період: " + minExpensesInPeriod.getAmount());

        analyzer.generateReport();
    }
}