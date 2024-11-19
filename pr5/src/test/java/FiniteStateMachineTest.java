import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import ua.lwjerri.FiniteStateMachine;

class FiniteStateMachineTest {

  private FiniteStateMachine fsm;

  @BeforeEach
  void setUp() {
    fsm = new FiniteStateMachine();
  }

  @ParameterizedTest
  @CsvSource({
      "abcTESTabc, F",
      "abcTES, THREE",
      "TEST, F",
      "TESabcTEST, F",
      "TE, TWO",
      "TETEST, F",
      "abcTTEST, F"
  })
  void testFiniteStateMachine(String input, String expectedFinalState) {
    FiniteStateMachine.State finalState = fsm.process(input);
    System.out.println(expectedFinalState);
    assertEquals(FiniteStateMachine.State.valueOf(expectedFinalState), finalState);
  }

  @Test
  void testIsInFinalStateAfterProcess() {
    fsm.process("TEST");
    assertTrue(fsm.isInFinalState(), "FSM має бути у фінальному стані після обробки 'TEST'.");

    fsm.reset();

    fsm.process("TES");
    assertFalse(fsm.isInFinalState(), "FSM не повинен перебувати в кінцевому стані після обробки 'TES'.");
  }

  @Test
  void testResetFunctionality() {

    fsm.process("TEST");
    assertTrue(fsm.isInFinalState(), "FSM має бути у фінальному стані після обробки 'TEST'.");

    fsm.reset();
    assertFalse(fsm.isInFinalState(), "FSM не повинен перебувати у фінальному стані після скидання.");
  }
}