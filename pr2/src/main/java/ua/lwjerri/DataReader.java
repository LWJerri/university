package ua.lwjerri;

import java.io.IOException;
import java.util.List;

public interface DataReader {
  List<String> readData(String source) throws IOException;
}