import { initGame } from "./game";
import { Position } from "./types";

let availableLevels: Position[] = [];

export function renderLevelSelector(levels: Position[]) {
    availableLevels = levels;
    const levelSelector = document.querySelector('.level-selector')!;
    levelSelector.innerHTML = '';
    for (const [index, level] of availableLevels.entries()) {
        const levelBtn = document.createElement('button');
        levelBtn.classList.add('levelBtn');
        levelBtn.textContent = `Level ${index + 1}`;
        levelBtn.addEventListener('click', () => initGame(level));
        levelSelector.appendChild(levelBtn);
    }
}
