package ua.lwjerri;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Order {
  private List<Product> products;
  private double totalPrice;
  private String status;

  public Order(Cart cart) {
    this.products = new ArrayList<>(cart.getProducts());
    this.totalPrice = cart.getTotalPrice();
    this.status = "Нове";
  }
}