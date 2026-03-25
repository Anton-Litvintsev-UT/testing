const classifyTriangle = require('./triangle');

describe('Triangle Classification Tests', () => {

    // --- Boundary Value Analysis (BVA) ---
    describe('Boundary Value Analysis', () => {
        test('a is below minimum bound', () => {
            expect(classifyTriangle(0, 100, 100)).toBe('Value of a is not in the range of permitted values.');
        });
        test('a is above maximum bound', () => {
            expect(classifyTriangle(201, 100, 100)).toBe('Value of a is not in the range of permitted values.');
        });
        test('b is below minimum bound', () => {
            expect(classifyTriangle(100, 0, 100)).toBe('Value of b is not in the range of permitted values.');
        });
        test('b is above maximum bound', () => {
            expect(classifyTriangle(100, 201, 100)).toBe('Value of b is not in the range of permitted values.');
        });
        test('c is below minimum bound', () => {
            expect(classifyTriangle(100, 100, 0)).toBe('Value of c is not in the range of permitted values.');
        });
        test('c is above maximum bound', () => {
            expect(classifyTriangle(100, 100, 201)).toBe('Value of c is not in the range of permitted values.');
        });

        // Valid values at boundaries
        test('a is at minimum bound (1)', () => {
            // Using an isosceles triangle to ensure 'a' is the specific boundary being tested
            expect(classifyTriangle(1, 100, 100)).toBe('Isosceles');
        });
        test('a is at maximum bound (200)', () => {
            // Using an isosceles triangle to ensure 'a' is the specific boundary being tested
            expect(classifyTriangle(200, 100, 100)).toBe('Isosceles');
        });
        test('a is just above minimum bound (2)', () => {
            expect(classifyTriangle(2, 100, 100)).toBe('Isosceles');
        });
        test('a is just below maximum bound (199)', () => {
            expect(classifyTriangle(199, 100, 100)).toBe('Isosceles');
        });

        test('b is at minimum bound (1)', () => {
            // Using an isosceles triangle to ensure 'b' is the specific boundary being tested
            expect(classifyTriangle(100, 1, 100)).toBe('Isosceles');
        });
        test('b is at maximum bound (200)', () => {
            // Using an isosceles triangle to ensure 'b' is the specific boundary being tested
            expect(classifyTriangle(100, 200, 100)).toBe('Isosceles');
        });
        test('b is just above minimum bound (2)', () => {
            expect(classifyTriangle(100, 2, 100)).toBe('Isosceles');
        });
        test('b is just below maximum bound (199)', () => {
            expect(classifyTriangle(100, 199, 100)).toBe('Isosceles');
        });
        test('c is at minimum bound (1)', () => {
            // Using an isosceles triangle to ensure 'c' is the specific boundary being tested
            expect(classifyTriangle(100, 100, 1)).toBe('Isosceles');
        });
        test('c is at maximum bound (200)', () => {
            // Using an isosceles triangle to ensure 'c' is the specific boundary being tested
            expect(classifyTriangle(100, 100, 200)).toBe('Isosceles');
        });
        test('c is just above minimum bound (2)', () => {
            expect(classifyTriangle(100, 100, 2)).toBe('Isosceles');
        });
        test('c is just below maximum bound (199)', () => {
            expect(classifyTriangle(100, 100, 199)).toBe('Isosceles');
        });
        test('all sides at minimum bound (1,1,1)', () => {
            expect(classifyTriangle(1, 1, 1)).toBe('Equilateral');
        });
        test('all sides at maximum bound (200,200,200)', () => {
            expect(classifyTriangle(200, 200, 200)).toBe('Equilateral');
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