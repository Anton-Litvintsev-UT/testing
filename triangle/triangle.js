function classifyTriangle(a, b, c) {
    const MIN = 1;
    const MAX = 200;

    // Boundary/Range Conditions (c1, c2, c3)
    if (a < MIN || a > MAX) return "Value of a is not in the range of permitted values.";
    if (b < MIN || b > MAX) return "Value of b is not in the range of permitted values.";
    if (c < MIN || c > MAX) return "Value of c is not in the range of permitted values.";

    // Triangle Inequality Conditions (c4, c5, c6)
    // A triangle is invalid if any one side is greater than or equal to the sum of the other two.
    if (a >= b + c || b >= a + c || c >= a + b) {
        return "NotATriangle";
    }

    // Classification
    if (a === b && b === c) {
        return "Equilateral";
    } else if (a === b || b === c || a === c) {
        return "Isosceles";
    } else {
        return "Scalene";
    }
}

module.exports = classifyTriangle;