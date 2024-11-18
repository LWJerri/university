package ua.lwjerri;

import ua.lwjerri.exceptions.InvalidInputException;
import ua.lwjerri.interactions.Console;

public class Main {
  public static void main(String[] args) {
    Console consoleInteraction = new Console();
    Calculator calculator = new Calculator();

    try {
      consoleInteraction.userInput();

      double firstNumber = consoleInteraction.getFirstNumber();
      double secondNumber = consoleInteraction.getSecondNumber();

      double result = 0;

      switch (consoleInteraction.getOperation()) {
        case "+":
          result = calculator.add(firstNumber, secondNumber);

          break;
        case "-":
          result = calculator.subtract(firstNumber, secondNumber);

          break;
        case "*":
          result = calculator.multiply(firstNumber, secondNumber);

          break;
        case "/":
          result = calculator.divide(firstNumber, secondNumber);

          break;
        default:
          System.out.println("Невідома операція.");

          return;
      }

      System.out.println("Результат обрахунку: " + result);
    } catch (NumberFormatException e) {
      System.out.println("Помилка! Введіть коректні числа.");
    } catch (ArithmeticException e) {
      System.out.println("Помилка при обрахунку: " + e.getMessage());
    } catch (InvalidInputException e) {
      System.out.println("Помилка при обрабці вхідних даних: " + e.getMessage());
    } finally {
      System.out.println("\nОбробка запиту завершена.\n");
    }
  }
}