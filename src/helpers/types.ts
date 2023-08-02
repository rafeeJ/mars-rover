export interface RoverPosition {
  x: number;
  y: number;
  direction: number;
}
export interface Rover {
  position: RoverPosition;
  instructions: string[];
}
