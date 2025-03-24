import { emptyBitboard, setBit } from "./bitboard-utils";
import { Position } from "./types";

export function padStringToEight(input: string): string {
    if (input.length >= 8) {
        return input;
    }
    return input.padEnd(8, ' ');
}

export function processLevel(levelString: string): Position {
    const output: Position = {
        walls: emptyBitboard(),
        player: emptyBitboard(),
        boxes: emptyBitboard(),
        targets: emptyBitboard(),
    };

    levelString = levelString.split('\n').map(padStringToEight).join('');

  // Iterate through each row and column
  for (let index = 0; index < levelString.length; index++) {
        const bitIndex = 63 - index;
      const char = levelString[index];
      
      if (char === '#') {
        output.walls = setBit(output.walls, bitIndex)
      } else if (char === '.') {
        output.targets = setBit(output.targets, bitIndex)
      } else if (char === '$') {
        output.boxes = setBit(output.boxes, bitIndex)
      } else if (char === '*') {
        output.boxes = setBit(output.boxes, bitIndex);
        output.targets = setBit(output.targets, bitIndex);
      } else if (char === '@') {
        output.player = setBit(output.player, bitIndex)
      } else if (char === '+') {
        output.player = setBit(output.player, bitIndex);
        output.targets = setBit(output.targets, bitIndex);
      }
  }
  
  return output;
}


