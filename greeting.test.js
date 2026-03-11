// greeting.test.js
const createGreeting = require('./greeting');

test('checks if the greeting string is correctly formed', () => {
    // 1. Set up the expected name
    const myName = "Student"; 
    
    // 2. Call the function to get the string
    const str = createGreeting(myName);
    
    // 3. Assert that the string equals "Hello " + your name
    expect(str).toBe("Hello " + myName);
});