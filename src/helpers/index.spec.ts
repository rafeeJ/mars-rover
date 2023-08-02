import { describe, expect, test } from "@jest/globals";
import {
  cardinalToNumber,
  getRovers,
  moveRover,
  numberToCardinal,
  parseGridSize,
  parseRoverPosition,
  turnRover,
} from "./index";
import { moveRoverArray, northRover } from "../tests/helpers";
import { Rover } from "./types";

describe("helpers", () => {
  describe("parseGridSize", () => {
    test("should return an object with x and y properties", () => {
      const gridSize = parseGridSize("5 5");
      expect(gridSize).toEqual({ x: 5, y: 5 });
      expect(gridSize).toHaveProperty("x");
      expect(gridSize).toHaveProperty("y");
    });
    test("should return an object if more whitespace than usual", () => {
      const gridSize = parseGridSize("5  5");
      expect(gridSize).toEqual({ x: 5, y: 5 });
    });
  });

  describe("moveRover", () => {
    test.each(moveRoverArray)(
      "Move rover facing $rover.position.direction",
      ({ rover, expected }) => {
        moveRover(rover);
        expect(rover.position.x).toBe(expected.x);
        expect(rover.position.y).toBe(expected.y);
        expect(rover.position.direction).toBe(expected.direction);
      },
    );
  });

  describe("turnRover", () => {
    let rover: Rover;
    beforeEach(() => {
      rover = {
        position: {
          x: 0,
          y: 0,
          direction: 0,
        },
        instructions: [],
      };
    });

    test("should turn rover left", () => {
      turnRover(rover, "L");
      expect(rover.position.direction).toBe(3);
    });

    test("should turn rover right", () => {
      turnRover(rover, "R");
      expect(rover.position.direction).toBe(1);
    });

    test("should go back to zero after turning left 4 times", () => {
      turnRover(rover, "L");
      turnRover(rover, "L");
      turnRover(rover, "L");
      turnRover(rover, "L");
      expect(rover.position.direction).toBe(0);
    });

    test("should go back to zero after turning right 4 times", () => {
      turnRover(rover, "R");
      turnRover(rover, "R");
      turnRover(rover, "R");
      turnRover(rover, "R");
      expect(rover.position.direction).toBe(0);
    });
  });

  describe("cardinalToNumber", () => {
    test("should return 0 for N", () => {
      expect(cardinalToNumber("N")).toBe(0);
    });
    test("should return 1 for E", () => {
      expect(cardinalToNumber("E")).toBe(1);
    });
    test("should return 2 for S", () => {
      expect(cardinalToNumber("S")).toBe(2);
    });
    test("should return 3 for W", () => {
      expect(cardinalToNumber("W")).toBe(3);
    });
  });

  describe("numberToCardinal", () => {
    test("should return N for 0", () => {
      expect(numberToCardinal(0)).toBe("N");
    });
    test("should return E for 1", () => {
      expect(numberToCardinal(1)).toBe("E");
    });
    test("should return S for 2", () => {
      expect(numberToCardinal(2)).toBe("S");
    });
    test("should return W for 3", () => {
      expect(numberToCardinal(3)).toBe("W");
    });
  });

  describe("parseRoverPosition", () => {
    test("should return an object with x, y and direction properties", () => {
      const roverPosition = parseRoverPosition("1 2 N");
      expect(roverPosition).toEqual({ x: 1, y: 2, direction: 0 });
      expect(roverPosition).toHaveProperty("x");
      expect(roverPosition).toHaveProperty("y");
      expect(roverPosition).toHaveProperty("direction");
    });
    test("should return an object if more whitespace than usual", () => {
      const roverPosition = parseRoverPosition("1  2 N");
      expect(roverPosition).toEqual({ x: 1, y: 2, direction: 0 });
    });
  });

  describe("getRovers", () => {
    test("should return an array of rovers", () => {
      const rovers = getRovers(["1 2 N", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM"]);
      expect(rovers).toHaveLength(2);
      expect(rovers[0]).toEqual({
        instructions: ["L", "M", "L", "M", "L", "M", "L", "M", "M"],
        position: { direction: 0, x: 1, y: 2 },
      });
    });

    test("should throw an error if input length is not multiple of 2", () => {
      expect(() => {
        getRovers(["1 2 N", "LMLMLMLMM", "3 3 E"]);
      }).toThrow("Invalid input");
    });
  });
});
