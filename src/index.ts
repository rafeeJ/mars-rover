const inputs = require('../data/inputs.json');

interface RoverPosition {
    x: number;
    y: number;
    direction: number;
}
interface Rover {
    position: RoverPosition;
    instructions: string[];
}


const parseGridSize = (input: string) => {
    const gridSize = input.split(' ');
    return {
        x: parseInt(gridSize[0]),
        y: parseInt(gridSize[1])
    }
}

const moveRover = (rover: Rover) => {
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
}

const turnRover = (rover: Rover, direction: string) => {
    const { position } = rover;
    if (direction === 'L') {
        rover.position.direction -= 1;
        if (position.direction === -1) {
            position.direction = 3;
        }
    }
    if (direction === 'R') {
        rover.position.direction += 1;
        if (position.direction === 4) {
            position.direction = 0;
        }
    }
}

const runRover = (rover: Rover) => {
    const { position, instructions } = rover;
    for (let i = 0; i < instructions.length; i++) {
        const instruction = instructions[i];
        if (instruction === 'M') {
            moveRover(rover);
        } else {
            turnRover(rover, instruction);
        }
    }
    console.log(`${position.x} ${position.y} ${numberToCardinal(position.direction)}`);
}

const cardinalToNumber = (direction: string): number => {
    if (direction === 'E') {
        return 1;
    } else if (direction === 'S') {
        return 2;
    } else if (direction === 'W') {
        return 3;
    }
    return 0;
}
const numberToCardinal = (direction: number): string => {
    if (direction === 1) {
        return 'E';
    }
    if (direction === 2) {
        return 'S';
    }
    if (direction === 3) {
        return 'W';
    }
    return 'N';
}

const parseRoverPosition = (input: string) : RoverPosition => {
    const position = input.split(' ');

    return {
        x: parseInt(position[0]),
        y: parseInt(position[1]),
        direction: cardinalToNumber(position[2])
    }
}

const parseRoverInstructions = (input: string) => {
    return input.split('');
}

const getRovers = (input: string[]) => {
    if (input.length % 2 !== 0) throw new Error('Invalid input');

    const rovers: Rover[] = [];
    for (let i = 0; i < input.length; i+=2) {
        const rover: Rover = {
            position: parseRoverPosition(input[i]),
            instructions: parseRoverInstructions(input[i + 1])
        }
        rovers.push(rover);
    }
    return rovers;
}

const parseInputInstructions = (input: string) => {

    const lines = input.split('\n');
    const gridSize = parseGridSize(lines[0]);

    const rovers = getRovers(lines.slice(1));

    // execute the instructions
    for (let i = 0; i < rovers.length; i++) {
        runRover(rovers[i])
    }
}

for (let i = 0; i < inputs.length; i++) {
    parseInputInstructions(inputs[i]);
}



