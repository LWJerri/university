package ua.lwjerri.interactions;

import java.util.Scanner;

import ua.lwjerri.exceptions.InvalidInputException;

public class Console {
  private double firstNumber;
  private double secondNumber;
  private String operation;

  public double getFirstNumber() {
    return firstNumber;
  }

  public double getSecondNumber() {
    return secondNumber;
  }

  public String getOperation() {
    return operation;
  }

  public void userInput() throws InvalidInputException {
    Scanner scanner = new Scanner(System.in);

    System.out.println("Введіть необхідну операцію, наприклад 5 + 3:");

    String input = scanner.nextLine();

    String[] inputs = input.split(" ");

    try {
      validateInputLength(inputs.length);

      this.firstNumber = Double.parseDouble(inputs[0]);
      this.secondNumber = Double.parseDouble(inputs[2]);
      this.operation = inputs[1];

      validateInputNumbers(this.firstNumber, this.secondNumber);
    } catch (NumberFormatException e) {
      System.out.println("Для коректного обрахунку необхідно ввести корректні дані.");
    } catch (InvalidInputException e) {
      System.out.println("Помилка: " + e.getMessage());
    }
  }

  private void validateInputLength(int length) throws InvalidInputException {
    if (length != 3) {
      throw new InvalidInputException("Для продовження необхідно виконати запит у вказаному порядку.");
    }
  }

  private void validateInputNumbers(double a, double b) throws InvalidInputException {
    if (a < 0 || b < 0) {
      throw new InvalidInputException("Вхідні дані повинні бути невід'ємними числами.");
    }
  }
}