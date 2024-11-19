package ua.lwjerri;

public class FiniteStateMachine {
  public enum State {
    S,
    ONE,
    TWO,
    THREE,
    F
  }

  public FiniteStateMachine() {
    this.currentState = State.S;
  }

  public void reset() {
    this.currentState = State.S;
  }

  private State currentState;

  public State process(String input) {
    for (char c : input.toCharArray()) {
      switch (currentState) {
        case S:
          if (c == 'T')
            currentState = State.ONE;
          break;
        case ONE:
          if (c == 'E')
            currentState = State.TWO;
          else if (c != 'T')
            currentState = State.S;
          break;
        case TWO:
          if (c == 'S')
            currentState = State.THREE;
          else if (c != 'T')
            currentState = State.S;
          else
            currentState = State.ONE;
          break;
        case THREE:
          if (c == 'T')
            currentState = State.F;
          else if (c != 'T')
            currentState = State.S;
          else
            currentState = State.ONE;
          break;
        case F:
          break;
      }
    }

    return currentState;
  }

  public boolean isInFinalState() {
    return currentState == State.F;
  }
}