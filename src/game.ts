import { emptyBitboard, getActiveBits, shift, and, or, xor, isEmpty } from "./bitboard-utils";
import { Bitboard, Direction, GameState, Position } from "./types";

const gameState: GameState = {
    position: {
        walls: emptyBitboard(),
        player: emptyBitboard(),
        boxes: emptyBitboard(),
        targets: emptyBitboard(),
    },
    history: [],
}

const gameContainer = document.querySelector('.game-grid')!;

document.querySelector('#reset-level')?.addEventListener('click', () => {
    gameState.history = [];
    render(gameState.position);
});

document.querySelector('#undo-move')?.addEventListener('click', () => {
    gameState.history.pop();
    const previousPosition = gameState.history[gameState.history.length - 1] ?? gameState.position;
    previousPosition && render(previousPosition);
});

window.addEventListener('keydown', handleKeyboardEvent);

// Touch event handling
let touchStartX = 0;
let touchStartY = 0;

window.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
});

window.addEventListener('touchmove', (event) => {
    event.preventDefault(); // Prevent scrolling while swiping
});

window.addEventListener('touchend', (event) => {
    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;
    
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // Minimum swipe distance threshold
    const minSwipeDistance = 30;
    
    if (Math.abs(deltaX) > minSwipeDistance || Math.abs(deltaY) > minSwipeDistance) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Horizontal swipe
            if (deltaX > 0) {
                move('E');
            } else {
                move('W');
            }
        } else {
            // Vertical swipe
            if (deltaY > 0) {
                move('S');
            } else {
                move('N');
            }
        }
    }
});

export function initGame(position: Position) {
    gameState.position = position;
    gameState.history = [];

    render(position);
    (document.querySelector('.game-controls') as HTMLElement).style.display = 'block';
}

function handleKeyboardEvent(event: KeyboardEvent) {
    event.preventDefault();
    switch (event.key) {
        case 'ArrowUp':
            move('N');
            break;
        case 'ArrowDown':
            move('S');
            break;
        case 'ArrowLeft':
            move('W');
            break;
        case 'ArrowRight':
            move('E');
            break;
    }
}

export function render(position: Position) {
    gameContainer.innerHTML = '';

    const walls = getActiveBits(position.walls);
    const player = getActiveBits(position.player);
    const boxes = getActiveBits(position.boxes);
    const targets = getActiveBits(position.targets);

    for (const wall of walls) {
        gameContainer.appendChild(renderBox(wall, 'wall'));
    }

    for (const box of boxes) {
        gameContainer.appendChild(renderBox(box, 'box'));
    }

    for (const target of targets) {
        gameContainer.appendChild(renderBox(target, 'target'));
    }

    for (const playerPosition of player) {
        gameContainer.appendChild(renderBox(playerPosition, 'player'));
    }    
}

function renderBox(position: number, style: string) {
    const boxElement = document.createElement('div');
    boxElement.setAttribute('class', `square ${style}`);
    boxElement.style.left = `${(7 - position % 8) * 30}px`;
    boxElement.style.top = `${Math.floor(8 - (position / 8)) * 30}px`;
    return boxElement;
}

function move (direction: Direction) {
    const position = {
        ...gameState.history[gameState.history.length - 1] ?? gameState.position
    }
    const newPlayerPosition = shift(position.player, direction);
    const boxToMove = and(newPlayerPosition, position.boxes);
    const newBoxPosition = shift(boxToMove, direction);
    
    if (isCollision(newPlayerPosition, position.walls) || isCollision(newBoxPosition, position.walls, position.boxes)) {
        return;
    } else {
        const newPosition = { ...position };
        newPosition.player = newPlayerPosition;
        newPosition.boxes = xor(newPosition.boxes, boxToMove);
        newPosition.boxes = xor(newPosition.boxes, newBoxPosition);
        gameState.history.push(newPosition);
    }
    
    render(gameState.history[gameState.history.length - 1]);

    if (isWin()) {
        setTimeout(() => alert('You won!'), 100);
    }  
}

function isCollision(item: Bitboard, ...obstacles: Bitboard[]) {
    const allObstacles = obstacles.reduce((acc, obstacle) => or(acc, obstacle), emptyBitboard());
    return !isEmpty(and(item, allObstacles));
}

function isWin() {
    const position = gameState.history[gameState.history.length - 1] ?? gameState.position;
    return isEmpty(xor(position.boxes, position.targets));
}