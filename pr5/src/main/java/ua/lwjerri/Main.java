package ua.lwjerri;

import ua.lwjerri.FiniteStateMachine.State;

public class Main {
  public static void main(String[] args) {
    FiniteStateMachine fsm = new FiniteStateMachine();

    String[] testCases = { "abcTESTabc", "abcTES", "TEST", "TESabcTEST", "TE", "abcTTEST" };

    for (String testCase : testCases) {
      fsm.reset();

      State finalState = fsm.process(testCase);

      System.out.println(testCase + " | " + "State: " + finalState + " | " + "Match: " + fsm.isInFinalState());
    }
  }
}