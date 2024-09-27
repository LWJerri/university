package ua.lwjerri;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class History {
  private List<Product> products;

  public History() {
    this.products = new ArrayList<>();
  }

  public String toStringResult() {
    StringBuilder sb = new StringBuilder("Список всіх замовлень:\n");

    for (Product product : products) {
      sb.append(product.toString()).append("\n");
    }

    sb.append("Загальна вартість: ").append(getTotalPrice());

    return sb.toString();
  }

  public void addProducts(List<Product> products) {
    this.products.addAll(products);
  }

  public double getTotalPrice() {
    double total = 0;

    for (Product product : products) {
      total += product.getPrice();
    }

    return total;
  }

  public List<Product> getProducts() {
    return new ArrayList<>(products);
  }
}