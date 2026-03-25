const classifyTriangle = require('./triangle');

describe('Triangle Classification Tests', () => {

    // --- Boundary Value Analysis (BVA) ---
    describe('Boundary Value Analysis', () => {
        test('a is below minimum bound', () => {
            expect(classifyTriangle(0, 100, 100)).toBe("Value of a is not in the range of permitted values.");
        });
        test('a is above maximum bound', () => {
            expect(classifyTriangle(201, 100, 100)).toBe("Value of a is not in the range of permitted values.");
        });
        test('b is below minimum bound', () => {
            expect(classifyTriangle(100, 0, 100)).toBe("Value of b is not in the range of permitted values.");
        });
        test('c is above maximum bound', () => {
            expect(classifyTriangle(100, 100, 205)).toBe("Value of c is not in the range of permitted values.");
        });
    });

    // --- Equivalence Partitioning (EP) ---
    describe('Equivalence Partitioning', () => {
        test('Valid Equilateral Triangle', () => {
            expect(classifyTriangle(50, 50, 50)).toBe("Equilateral");
        });
        test('Valid Scalene Triangle', () => {
            expect(classifyTriangle(3, 4, 5)).toBe("Scalene");
        });
        test('Valid Isosceles Triangle (a=b)', () => {
            expect(classifyTriangle(5, 5, 3)).toBe("Isosceles");
        });
        test('Valid Isosceles Triangle (b=c)', () => {
            expect(classifyTriangle(3, 5, 5)).toBe("Isosceles");
        });
        test('Valid Isosceles Triangle (a=c)', () => {
            expect(classifyTriangle(5, 3, 5)).toBe("Isosceles");
        });
    });

    // --- White Box Testing (Condition / Branch Coverage) ---
    describe('Condition Coverage for Triangle Inequality', () => {
        test('Fails condition c4: a >= b + c', () => {
            expect(classifyTriangle(10, 4, 5)).toBe("NotATriangle");
        });
        test('Fails condition c5: b >= a + c', () => {
            expect(classifyTriangle(4, 10, 5)).toBe("NotATriangle");
        });
        test('Fails condition c6: c >= a + b', () => {
            expect(classifyTriangle(4, 5, 10)).toBe("NotATriangle");
        });
    });
});