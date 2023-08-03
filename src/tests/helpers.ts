import { Rover } from "../helpers/types";

export const northRover: Rover = {
  position: {
    x: 0,
    y: 0,
    direction: 0,
  },
  instructions: [],
};

export const eastRover: Rover = {
  position: {
    x: 0,
    y: 0,
    direction: 1,
  },
  instructions: [],
};

export const southRover: Rover = {
  position: {
    x: 0,
    y: 0,
    direction: 2,
  },
  instructions: [],
};

export const westRover: Rover = {
  position: {
    x: 0,
    y: 0,
    direction: 3,
  },
  instructions: [],
};

export const moveRoverArray = [
  { rover: northRover, expected: { x: 0, y: 1, direction: 0 } },
  { rover: eastRover, expected: { x: 1, y: 0, direction: 1 } },
  { rover: southRover, expected: { x: 0, y: -1, direction: 2 } },
  { rover: westRover, expected: { x: -1, y: 0, direction: 3 } },
];
