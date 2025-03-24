# Sokoban Game

An implementation of the classic Sokoban puzzle game using bitboards for efficient game logic.

## Game Rules

Sokoban is a puzzle game where the player (warehouse keeper) must push boxes to their designated storage locations. The rules are simple:

1. The player can only push boxes, not pull them
2. Boxes can only be pushed one at a time
3. Boxes cannot be pushed through walls or other boxes
4. The level is solved when all boxes are placed on their target locations

## Implementation

This implementation uses bitboards for efficient game logic processing. A bitboard is a data structure that uses a two integers to represent the game state, where each bit represents a position on the board. This approach provides several benefits:

- Fast state checking and manipulation
- Efficient move validation
- Compact state representation
- Quick win condition checking

Due to the use of bitboards, the game is limited to 8x8 levels to ensure efficient processing and state management.

## Levels

The game levels are sourced from David W. Skinner's public Sokoban puzzle collection, available at [David W. Skinner's Sokoban Page](http://www.abelmartin.com/rj/sokobanJS/Skinner/David%20W.%20Skinner%20-%20Sokoban.htm). These puzzles range from simple to complex, providing a good mix of challenges for players of all skill levels.
