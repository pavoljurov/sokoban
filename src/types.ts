export interface Bitboard {
    high: number;
    low: number;
};

export type Direction = 'N' | 'S' | 'E' | 'W';

export interface Position {
    walls: Bitboard;
    player: Bitboard;
    boxes: Bitboard;
    targets: Bitboard;
}

export interface GameState {
    position: Position;
    history: Position[];
}




