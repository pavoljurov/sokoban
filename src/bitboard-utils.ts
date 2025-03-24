import { Bitboard, Direction } from "./types";

export function and(a: Bitboard, b: Bitboard): Bitboard {
    return {
        high: (a.high & b.high) >>> 0,
        low: (a.low & b.low) >>> 0,
    };
}

export function or(a: Bitboard, b: Bitboard): Bitboard {
    return {
        high: (a.high | b.high) >>> 0,
        low: (a.low | b.low) >>> 0,
    };
}

export function xor(a: Bitboard, b: Bitboard): Bitboard {
    return {
        high: (a.high ^ b.high) >>> 0,
        low: (a.low ^ b.low) >>> 0,
    };
}

export function shift(board: Bitboard, direction: Direction): Bitboard {
    switch (direction) {
        case 'N':
            return shiftNorth(board);
        case 'S':
            return shiftSouth(board);
        case 'E':
            return shiftEast(board);
        case 'W':
            return shiftWest(board);
    }
}

function shiftNorth(board: Bitboard): Bitboard {
    return {
        high: ((board.high << 8) >>> 0 | ((board.low >>> 24) >>> 0)) >>> 0,
        low: ((board.low << 8) >>> 0),
    };
}

function shiftSouth(board: Bitboard): Bitboard {
    return {
        high: (board.high >>> 8) >>> 0,
        low: (((board.low >>> 8) >>> 0) | ((board.high & 0xFF) << 24)) >>> 0,
    };
}

function shiftWest(board: Bitboard): Bitboard {
    return and({
        high: ((board.high << 1) & ~0x01010101) >>> 0,
        low: (((board.low << 1) >>> 0) | ((board.high & 0x01) << 31)) >>> 0,
    }, {
        high: 0xfefefefe,
        low: 0xfefefefe,
    });
}

function shiftEast(board: Bitboard): Bitboard {
    return and({
        high: (((board.high >>> 1) >>> 0) & (~0x80808080 >>> 0)) >>> 0,
        low: (((board.low >>> 1) >>> 0) | ((board.high & 0x80) << 31) >>> 0) >>> 0,
    }, {
        high: 0x7f7f7f7f,
        low: 0x7f7f7f7f,
    });
}

export function setBit(board: Bitboard, position: number): Bitboard {
    const high = position < 32 ? board.high : (board.high | (1 << position) >>> 0) >>> 0;
    const low = position < 32 ? (board.low | (1 << position) >>> 0) >>> 0 : board.low;
    return { high, low };
}

export function getActiveBits(board: Bitboard): number[] {
    const activeBits = [];
    for (let i = 0; i < 32; i++) {
        if (board.high & (1 << i)) {
            activeBits.push(i + 32);
        }
    }
    for (let i = 0; i < 32; i++) {
        if (board.low & (1 << i)) {
            activeBits.push(i);
        }
    }
    return activeBits;
}

export function toBitString(board: Bitboard, pretty: boolean = false): string {
    const bitString = board.high.toString(2).padStart(32, '0') + board.low.toString(2).padStart(32, '0');
    if (pretty) {
        return bitString.replace(/(\d{8})(?=\d)/g, '$1\n');
    }
    return bitString;
}

export function emptyBitboard(): Bitboard {
    return {
        high: 0,
        low: 0,
    }
}

export function isEmpty(board: Bitboard): boolean {
    return board.high === 0 && board.low === 0;
}
