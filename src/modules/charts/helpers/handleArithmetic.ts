import type {ArithmeticOperation} from "../types/Charts";

export const handleArithmetic: ArithmeticOperation = (field1, field2, arithmetic) => {
  switch (arithmetic) {
    case "addition":
      return field1 + field2;
    case "subtraction":
      return field1 - field2;
    case "division":
      return field1 / field2;
    case "multiplication":
    default:
      return field1 * field2;
  }
};