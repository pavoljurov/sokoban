import { and, or, shift, toBitString, setBit } from './bitboard-utils';
import { Bitboard } from './types';

describe('Bitboard Utils', () => {
  // Sample bitboards for testing
  const emptyBoard: Bitboard = { high: 0, low: 0 };
  const fullBoard: Bitboard = { high: 0xFFFFFFFF, low: 0xFFFFFFFF };
  const topLeftCorner: Bitboard = { high: 0x80000000, low: 0 };
  const topRightCorner: Bitboard = { high: 0x01000000, low: 0 };
  const bottomLeftCorner: Bitboard = { high: 0, low: 0x80 };
  const bottomRightCorner: Bitboard = { high: 0, low: 0x01 };
  const centerPiece: Bitboard = { high: 0x00010000, low: 0 };
  
  describe('and', () => {
    it('should perform bitwise AND between two bitboards', () => {
      console.log(toBitString(fullBoard), toBitString(topLeftCorner), toBitString(and(fullBoard, topLeftCorner)));
      expect(and(fullBoard, topLeftCorner)).toEqual(topLeftCorner);
      expect(and(emptyBoard, topLeftCorner)).toEqual(emptyBoard);
      expect(and(topLeftCorner, topRightCorner)).toEqual(emptyBoard);
      expect(and(fullBoard, fullBoard)).toEqual(fullBoard);
    });
  });
  
  describe('or', () => {
    it('should perform bitwise OR between two bitboards', () => {
      expect(or(emptyBoard, topLeftCorner)).toEqual(topLeftCorner);
      expect(or(topLeftCorner, topRightCorner)).toEqual({ high: 0x81000000, low: 0 });
      expect(or(emptyBoard, emptyBoard)).toEqual(emptyBoard);
      expect(or(fullBoard, topLeftCorner)).toEqual(fullBoard);
    });
  });
  
  describe('shift', () => {
    describe('North shift', () => {
      it('should shift bits north correctly', () => {
        // Shifting top row should result in empty board (out of bounds)
        expect(shift(topLeftCorner, 'N')).toEqual(emptyBoard);
        expect(shift(topRightCorner, 'N')).toEqual(emptyBoard);
        
        // Shifting center up
        const shiftedCenter = shift(centerPiece, 'N');
        expect(shiftedCenter.high).toBe(0x01000000);
        expect(shiftedCenter.low).toBe(0);
      });
    });
    
    describe('South shift', () => {
      it('should shift bits south correctly', () => {
        // Shifting bottom row should result in empty board (out of bounds)
        expect(shift(bottomLeftCorner, 'S')).toEqual(emptyBoard);
        expect(shift(bottomRightCorner, 'S')).toEqual(emptyBoard);
        
        // Shifting center down
        const shiftedCenter = shift(centerPiece, 'S');
        expect(shiftedCenter.high).toBe(0x00000100);
        expect(shiftedCenter.low).toBe(0);
      });
    });
    
    describe('East shift', () => {
      it('should shift bits east correctly', () => {
        // Shifting rightmost column should result in empty board (out of bounds)
        
        expect(shift(topRightCorner, 'E')).toEqual(emptyBoard);
        expect(shift(bottomRightCorner, 'E')).toEqual(emptyBoard);
        expect(shift(centerPiece, 'E')).toEqual(emptyBoard);
      });
    });
    
    describe('West shift', () => {
      it('should shift bits west correctly', () => {
        // Shifting leftmost column should result in empty board (out of bounds)
        console.log(toBitString({ high: 0x7f7f7f7f, low: 0x7f7f7f7f }))
        console.log(toBitString(centerPiece), toBitString(shift(centerPiece, 'E')), toBitString(shift(centerPiece, 'W')));
        expect(shift(topLeftCorner, 'W')).toEqual(emptyBoard);
        expect(shift(bottomLeftCorner, 'W')).toEqual(emptyBoard);
        
        // Shifting center left
        const shiftedCenter = shift(centerPiece, 'W');
        expect(shiftedCenter.high).toBe(0x00020000);
        expect(shiftedCenter.low).toBe(0);
      });
    });
  });
  
  describe('setBit', () => {
    it('should set the specified bit in an empty board', () => {
      // Set top-left corner (position 31)
      expect(setBit(emptyBoard, 63)).toEqual(topLeftCorner);
      
      // Set top-right corner (position 24)
      expect(setBit(emptyBoard, 56)).toEqual({ high: 0x01000000, low: 0 });

      // Set bottom-left corner (position 7)
      expect(setBit(emptyBoard, 7)).toEqual({ high: 0, low: 0x80 });
      
      // Set bottom-right corner (position 0)
      expect(setBit(emptyBoard, 0)).toEqual({ high: 0, low: 0x01 });
    });
  });
  
  describe('toBitString works', () => {
    it('should convert bitboard to a bit string', () => {
      // Empty board should be all zeros
      expect(toBitString(emptyBoard)).toBe('0'.repeat(64));
      
      // Top left corner (MSB)
      expect(toBitString(topLeftCorner)).toBe('1' + '0'.repeat(63));
      
      // Bottom right corner (LSB)
      expect(toBitString(bottomRightCorner)).toBe('0'.repeat(63) + '1');
    });
  });
}); 