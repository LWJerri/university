package ua.lwjerri;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

public class LinkReader implements DataReader {
  @Override
  public List<String> readData(String source) throws IOException {
    List<String> data = new ArrayList<>();

    URL url = new URL(source);

    try (BufferedReader br = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"))) {
      String line;

      while ((line = br.readLine()) != null) {
        data.add(line);
      }
    }

    return data;
  }
}