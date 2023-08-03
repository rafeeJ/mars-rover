import { Rover, RoverPosition } from "./types";
export const parseGridSize = (input: string) => {
  const gridSize = input.split(" ");
  const x = parseInt(gridSize[0]);
  const y = parseInt(gridSize[1]);

  if (isNaN(x) || isNaN(y)) {
    throw new Error(
      "Invalid grid size, please ensure you have entered two numbers separated by a space",
    );
  }

  return { x, y };
};
export const moveRover = (rover: Rover) => {
  const { position } = rover;
  if (position.direction === 0) {
    position.y++;
  } else if (position.direction === 1) {
    position.x++;
  } else if (position.direction === 2) {
    position.y--;
  } else if (position.direction === 3) {
    position.x--;
  }
};

export const turnRover = (rover: Rover, direction: string) => {
  const { position } = rover;
  if (direction === "L") {
    rover.position.direction -= 1;
    if (position.direction === -1) {
      position.direction = 3;
    }
  }
  if (direction === "R") {
    rover.position.direction += 1;
    if (position.direction === 4) {
      position.direction = 0;
    }
  }
};

const runRover = (rover: Rover) => {
  const { position, instructions } = rover;
  for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i];
    if (instruction === "M") {
      moveRover(rover);
    } else {
      turnRover(rover, instruction);
    }
  }
  console.log(
    `${position.x} ${position.y} ${numberToCardinal(position.direction)}`,
  );
};

export const cardinalToNumber = (direction: string): number => {
  if (direction === "E") {
    return 1;
  } else if (direction === "S") {
    return 2;
  } else if (direction === "W") {
    return 3;
  }
  return 0;
};
export const numberToCardinal = (direction: number): string => {
  if (direction === 1) {
    return "E";
  }
  if (direction === 2) {
    return "S";
  }
  if (direction === 3) {
    return "W";
  }
  return "N";
};

export const parseRoverPosition = (input: string): RoverPosition => {
  const position = input.split(" ");

  if (position.length !== 3) {
    throw new Error(
      "Invalid rover position, please ensure you have entered two numbers and a cardinal direction separated by a space",
    );
  }

  const x = parseInt(position[0]);
  const y = parseInt(position[1]);
  const direction = cardinalToNumber(position[2]);

  if (isNaN(x) || isNaN(y) || isNaN(direction)) {
    throw new Error(
      "Invalid rover position, please ensure you have entered two numbers and a cardinal direction separated by a space",
    );
  }

  return { x, y, direction };
};

const parseRoverInstructions = (input: string) => {
  return input.split("");
};

export const getRovers = (input: string[]) => {
  if (input.length % 2 !== 0) throw new Error("Invalid input");

  const rovers: Rover[] = [];
  for (let i = 0; i < input.length; i += 2) {
    const rover: Rover = {
      position: parseRoverPosition(input[i]),
      instructions: parseRoverInstructions(input[i + 1]),
    };
    rovers.push(rover);
  }
  return rovers;
};

export const parseInputInstructions = (input: string) => {
  const lines = input.split("\n");
  const gridSize = parseGridSize(lines[0]);

  const rovers = getRovers(lines.slice(1));

  // execute the instructions
  for (let i = 0; i < rovers.length; i++) {
    console.log("Running rover", i + 1);
    runRover(rovers[i]);
  }
};
