package ua.lwjerri;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Category electronics = new Category(1, "Електроніка");
    Category smartphones = new Category(2, "Смартфони");
    Category accessories = new Category(3, "Аксесуари");

    Product product1 = new Product(1, "Ноутбук", 19999.99, "Високопродуктивний ноутбук для роботи та ігор",
        electronics);
    Product product2 = new Product(2, "Смартфон", 12999.50, "Смартфон з великим екраном та високою автономністю",
        smartphones);
    Product product3 = new Product(3, "Навушники", 2499.00, "Бездротові навушники з шумозаглушенням", accessories);

    List<Product> productList = new ArrayList<>();
    productList.add(product1);
    productList.add(product2);
    productList.add(product3);

    Scanner scanner = new Scanner(System.in);

    Cart cart = new Cart();
    History history = new History();

    while (true) {
      System.out.println("\nВиберіть опцію:");
      System.out.println("1 - Переглянути список товарів");
      System.out.println("2 - Додати товар до кошика");
      System.out.println("3 - Переглянути кошик");
      System.out.println("4 - Зробити замовлення");
      System.out.println("5 - Видалити товар з кошика");
      System.out.println("6 - Пошук по назві товару або категорії");
      System.out.println("7 - Історія замовлень");
      System.out.println("0 - Вийти");

      int choice = scanner.nextInt();
      switch (choice) {
        case 1:
          productList.forEach(System.out::println);

          break;

        case 2:
          System.out.println("Введіть ID товару для додавання до кошика:");
          int selectProductId = scanner.nextInt();

          switch (selectProductId) {
            case 1:
              cart.addProduct(product1);

              break;
            case 2:
              cart.addProduct(product2);

              break;
            case 3:
              cart.addProduct(product3);

              break;
            default:
              System.out.println("Товар з таким ID не знайдено");

              break;
          }

          break;

        case 3:
          System.out.println(cart);

          break;

        case 4:
          if (cart.getProducts().isEmpty()) {
            System.out.println("Кошик порожній. Додайте товари перед оформленням замовлення.");
          } else {
            Order order = new Order(cart);

            System.out.println("Замовлення оформлено:");
            System.out.println(order);

            history.addProducts(cart.getProducts());

            cart.clear();
          }

          break;

        case 5:
          if (cart.getProducts().isEmpty()) {
            System.out.println("Кошик порожній. Додайте товари перед оформленням замовлення.");
          } else {
            System.out.println("Введіть ID товару для видалення з кошика:");

            int removeProductId = scanner.nextInt();

            switch (removeProductId) {
              case 1:
                cart.removeProduct(product1);

                break;
              case 2:
                cart.removeProduct(product2);

                break;
              case 3:
                cart.removeProduct(product3);

                break;
              default:
                System.out.println("Товар з таким ID не знайдено");

                break;
            }
          }

          break;

        case 6:
          System.out.println("Введіть ключове слово для пошуку.");

          scanner.nextLine();
          String searchKeyword = scanner.nextLine();

          List<Product> result = Search.searchProducts(productList, searchKeyword);
          result.forEach(System.out::println);

          break;

        case 7:
          System.out.println(history);

          break;

        case 0:
          System.out.println("Дякуємо, що використовували наш магазин!");

          return;

        default:
          System.out.println("Невідома опція. Спробуйте ще раз.");

          break;
      }
    }
  }
}
