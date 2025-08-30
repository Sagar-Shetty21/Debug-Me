/**
 * DEBUGGER STATEMENTS - Node.js Debugging with debugger keyword
 *
 * Run with: node --inspect-brk debugger-statements.js
 * Then open Chrome DevTools or connect your IDE
 *
 * The debugger statement creates a breakpoint in your code when
 * running in debug mode, allowing you to inspect variables,
 * call stack, and step through execution.
 */

console.log("🐛 DEBUGGER STATEMENTS EXAMPLES\n");

// =============================================================================
// 1. BASIC DEBUGGER USAGE
// =============================================================================

function basicDebugging() {
    console.log("--- Basic Debugger Usage ---");

    let name = "Alice";
    let age = 25;

    // Debugger will pause execution here when in debug mode
    debugger; // 🔍 Inspect variables: name, age

    let greeting = `Hello ${name}, you are ${age} years old`;
    console.log(greeting);

    return greeting;
}

// =============================================================================
// 2. CONDITIONAL DEBUGGING
// =============================================================================

function conditionalDebugging(items) {
    console.log("--- Conditional Debugging ---");

    for (let i = 0; i < items.length; i++) {
        let item = items[i];

        // Only break on specific conditions
        if (item.price > 100) {
            debugger; // 🔍 Only pause for expensive items
        }

        console.log(`Processing: ${item.name} - $${item.price}`);
    }
}

// =============================================================================
// 3. FUNCTION DEBUGGING
// =============================================================================

function calculateTotal(cart) {
    console.log("--- Function Entry/Exit Debugging ---");

    debugger; // 🔍 Function entry - inspect parameters

    let total = 0;
    let taxRate = 0.08;

    cart.forEach((item, index) => {
        // Debug specific iterations
        if (index === 2) {
            debugger; // 🔍 Pause on 3rd item
        }

        total += item.price * item.quantity;
    });

    let tax = total * taxRate;
    let finalTotal = total + tax;

    debugger; // 🔍 Function exit - inspect final values

    return {
        subtotal: total,
        tax: tax,
        total: finalTotal,
    };
}

// =============================================================================
// 4. ASYNC FUNCTION DEBUGGING
// =============================================================================

async function fetchUserData(userId) {
    console.log("--- Async Function Debugging ---");

    debugger; // 🔍 Before async operation

    try {
        // Simulate API call
        const userData = await simulateApiCall(userId);

        debugger; // 🔍 After successful API call

        return userData;
    } catch (error) {
        debugger; // 🔍 Error handling

        console.error("Failed to fetch user data:", error.message);
        throw error;
    }
}

function simulateApiCall(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({
                    id: userId,
                    name: `User ${userId}`,
                    email: `user${userId}@example.com`,
                });
            } else {
                reject(new Error("Invalid user ID"));
            }
        }, 100);
    });
}

// =============================================================================
// 5. LOOP DEBUGGING
// =============================================================================

function debugLoops() {
    console.log("--- Loop Debugging ---");

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let evenNumbers = [];
    let oddNumbers = [];

    for (let i = 0; i < numbers.length; i++) {
        let current = numbers[i];

        // Debug every 3rd iteration
        if (i % 3 === 0) {
            debugger; // 🔍 Pause every 3rd iteration
        }

        if (current % 2 === 0) {
            evenNumbers.push(current);
        } else {
            oddNumbers.push(current);
        }
    }

    debugger; // 🔍 Final results

    return { evenNumbers, oddNumbers };
}

// =============================================================================
// 6. OBJECT MANIPULATION DEBUGGING
// =============================================================================

function debugObjectManipulation() {
    console.log("--- Object Manipulation Debugging ---");

    let user = {
        name: "John Doe",
        age: 30,
        hobbies: ["reading", "gaming"],
        address: {
            street: "123 Main St",
            city: "Anytown",
            country: "USA",
        },
    };

    debugger; // 🔍 Initial object state

    // Modify object
    user.age += 1;
    user.hobbies.push("cooking");
    user.address.city = "New City";

    debugger; // 🔍 After modifications

    // Deep clone for comparison
    let userCopy = JSON.parse(JSON.stringify(user));
    userCopy.name = "Jane Doe";

    debugger; // 🔍 Compare original and copy

    return { original: user, copy: userCopy };
}

// =============================================================================
// 7. ERROR DEBUGGING
// =============================================================================

function debugErrorScenarios() {
    console.log("--- Error Scenario Debugging ---");

    const testCases = [
        { input: "valid", shouldError: false },
        { input: null, shouldError: true },
        { input: undefined, shouldError: true },
        { input: "", shouldError: true },
    ];

    testCases.forEach((testCase, index) => {
        debugger; // 🔍 Before each test case

        try {
            let result = processInput(testCase.input);
            console.log(`Test ${index + 1}: Success - ${result}`);

            if (testCase.shouldError) {
                debugger; // 🔍 Expected error but didn't get one
            }
        } catch (error) {
            debugger; // 🔍 Error occurred

            console.log(`Test ${index + 1}: Error - ${error.message}`);

            if (!testCase.shouldError) {
                debugger; // 🔍 Unexpected error
            }
        }
    });
}

function processInput(input) {
    if (!input || input.trim() === "") {
        throw new Error("Input cannot be empty");
    }

    return `Processed: ${input.toUpperCase()}`;
}

// =============================================================================
// 8. RECURSIVE FUNCTION DEBUGGING
// =============================================================================

function fibonacci(n, depth = 0) {
    // Debug specific recursion levels
    if (depth === 0 || n <= 2) {
        debugger; // 🔍 Base cases and initial call
    }

    if (n <= 1) return n;
    if (n === 2) return 1;

    return fibonacci(n - 1, depth + 1) + fibonacci(n - 2, depth + 1);
}

function debugRecursion() {
    console.log("--- Recursive Function Debugging ---");

    debugger; // 🔍 Before recursion starts

    let result = fibonacci(6);

    debugger; // 🔍 After recursion completes

    console.log(`Fibonacci(6) = ${result}`);
    return result;
}

// =============================================================================
// 9. CLASS DEBUGGING
// =============================================================================

class BankAccount {
    constructor(owner, initialBalance = 0) {
        debugger; // 🔍 Constructor debugging

        this.owner = owner;
        this.balance = initialBalance;
        this.transactions = [];
    }

    deposit(amount) {
        debugger; // 🔍 Method entry

        if (amount <= 0) {
            debugger; // 🔍 Invalid input
            throw new Error("Deposit amount must be positive");
        }

        this.balance += amount;
        this.transactions.push({
            type: "deposit",
            amount: amount,
            timestamp: new Date(),
            balanceAfter: this.balance,
        });

        debugger; // 🔍 Method exit
        return this.balance;
    }

    withdraw(amount) {
        debugger; // 🔍 Withdrawal debugging

        if (amount <= 0) {
            throw new Error("Withdrawal amount must be positive");
        }

        if (amount > this.balance) {
            debugger; // 🔍 Insufficient funds
            throw new Error("Insufficient funds");
        }

        this.balance -= amount;
        this.transactions.push({
            type: "withdrawal",
            amount: amount,
            timestamp: new Date(),
            balanceAfter: this.balance,
        });

        return this.balance;
    }
}

function debugClassUsage() {
    console.log("--- Class Debugging ---");

    debugger; // 🔍 Before creating instance

    let account = new BankAccount("Alice", 1000);

    debugger; // 🔍 After instance creation

    try {
        account.deposit(500);
        account.withdraw(200);
        account.withdraw(2000); // This will fail
    } catch (error) {
        debugger; // 🔍 Exception in class method
        console.log("Transaction failed:", error.message);
    }

    debugger; // 🔍 Final state inspection

    return account;
}

// =============================================================================
// 10. PERFORMANCE DEBUGGING
// =============================================================================

function debugPerformance() {
    console.log("--- Performance Debugging ---");

    debugger; // 🔍 Before performance-critical code

    const startTime = performance.now();

    // Simulate heavy computation
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
        result += Math.sqrt(i);

        // Debug at specific intervals
        if (i % 100000 === 0) {
            debugger; // 🔍 Progress checkpoint
        }
    }

    const endTime = performance.now();
    const duration = endTime - startTime;

    debugger; // 🔍 Performance results

    console.log(`Computation took ${duration.toFixed(2)} milliseconds`);
    return { result, duration };
}

// =============================================================================
// MAIN EXECUTION
// =============================================================================

async function runAllExamples() {
    console.log("🚀 Starting Debugger Examples...\n");

    debugger; // 🔍 Main entry point

    try {
        // Run examples
        basicDebugging();

        conditionalDebugging([
            { name: "Book", price: 15 },
            { name: "Laptop", price: 1200 },
            { name: "Coffee", price: 5 },
        ]);

        calculateTotal([
            { price: 10, quantity: 2 },
            { price: 25, quantity: 1 },
            { price: 15, quantity: 3 },
        ]);

        await fetchUserData(123);

        debugLoops();

        debugObjectManipulation();

        debugErrorScenarios();

        debugRecursion();

        debugClassUsage();

        debugPerformance();

        debugger; // 🔍 All examples completed

        console.log("\n✅ All debugging examples completed!");
    } catch (error) {
        debugger; // 🔍 Global error handler
        console.error("❌ Error in examples:", error);
    }
}

// =============================================================================
// DEBUGGING TIPS AND UTILITIES
// =============================================================================

/**
 * Utility function to conditionally add debugger statements
 */
function conditionalDebugger(condition, message = "") {
    if (condition) {
        console.log(`🔍 Debug condition met: ${message}`);
        debugger;
    }
}

/**
 * Debug wrapper for function calls
 */
function debugWrapper(fn, fnName = "anonymous") {
    return function (...args) {
        console.log(`🔍 Calling function: ${fnName}`);
        debugger; // Before function call

        const result = fn.apply(this, args);

        debugger; // After function call
        console.log(`🔍 Function ${fnName} returned:`, result);

        return result;
    };
}

// Example usage of utilities
function exampleUtilities() {
    console.log("--- Debug Utilities Example ---");

    // Conditional debugging
    let value = 42;
    conditionalDebugger(value > 40, "Value exceeds threshold");

    // Function wrapper
    const wrappedCalculate = debugWrapper((a, b) => a + b, "add");
    wrappedCalculate(5, 3);
}

// =============================================================================
// EXPORT FOR MODULE USAGE
// =============================================================================

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        basicDebugging,
        conditionalDebugging,
        calculateTotal,
        fetchUserData,
        debugLoops,
        debugObjectManipulation,
        debugErrorScenarios,
        debugRecursion,
        debugClassUsage,
        debugPerformance,
        conditionalDebugger,
        debugWrapper,
        runAllExamples,
    };
}

// Run examples if this file is executed directly
if (require.main === module) {
    runAllExamples();
}

/**
 * DEBUGGING COMMANDS CHEATSHEET:
 *
 * 1. Start with debugger:
 *    node --inspect-brk debugger-statements.js
 *
 * 2. Chrome DevTools:
 *    - Open chrome://inspect
 *    - Click "Open dedicated DevTools for Node"
 *
 * 3. VS Code:
 *    - Set launch.json configuration
 *    - Use F5 to start debugging
 *
 * 4. Debugger Controls:
 *    - F8 / F10: Continue execution
 *    - F10: Step over
 *    - F11: Step into
 *    - Shift+F11: Step out
 *
 * 5. Console Commands while debugging:
 *    - Inspect variables by typing their names
 *    - Execute code in current context
 *    - Use .help for more commands
 *
 * 6. Best Practices:
 *    - Use conditional debuggers for specific scenarios
 *    - Remove debugger statements before production
 *    - Combine with console.log for context
 *    - Use meaningful variable names for easier debugging
 */
