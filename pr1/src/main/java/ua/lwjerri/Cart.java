package ua.lwjerri;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Cart {
  private List<Product> products;

  public Cart() {
    this.products = new ArrayList<>();
  }

  public void addProduct(Product product) {
    products.add(product);
  }

  public void removeProduct(Product product) {
    products.remove(product);
  }

  public double getTotalPrice() {
    return products.stream().mapToDouble(Product::getPrice).sum();
  }

  public void clear() {
    products.clear();
  }
}