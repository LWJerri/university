package ua.lwjerri;

import java.util.List;
import java.util.stream.Collectors;

import lombok.experimental.UtilityClass;

@UtilityClass
public class Search {

  public List<Product> searchProducts(List<Product> products, String keyword) {
    return products.stream()
        .filter(product -> product.getName().equalsIgnoreCase(keyword)
            || product.getCategory().getName().equalsIgnoreCase(keyword))
        .collect(Collectors.toList());
  }
}