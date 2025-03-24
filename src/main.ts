import { processLevel } from "./level-parser";
import { levels } from "./levels";
import { renderLevelSelector } from "./level-selector";

const parsedLevels = levels.map(processLevel);
renderLevelSelector(parsedLevels);