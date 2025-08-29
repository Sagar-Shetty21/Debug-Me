/**
 * Console Debugging Methods - Complete Guide
 *
 * This module demonstrates all console methods available for debugging
 * in both Node.js and browser environments.
 */

class ConsoleDebugging {
    constructor() {
        this.data = [
            { id: 1, name: "Alice", age: 30, department: "Engineering" },
            { id: 2, name: "Bob", age: 25, department: "Design" },
            { id: 3, name: "Charlie", age: 35, department: "Engineering" },
            { id: 4, name: "Diana", age: 28, department: "Marketing" },
        ];
    }

    /**
     * Basic Console Methods
     */
    basicConsoleMethods() {
        console.log("\n=== 1. BASIC CONSOLE METHODS ===");

        // Standard logging
        console.log("📝 console.log() - Basic logging");
        console.info("ℹ️  console.info() - Information");
        console.warn("⚠️  console.warn() - Warning message");
        console.error("❌ console.error() - Error message");

        // Debug level (may be filtered in some environments)
        console.debug("🐛 console.debug() - Debug information");

        // DEBUGGING TIP: In browser DevTools, you can filter by log level
        // Click the filter dropdown in Console tab
    }

    /**
     * Object and Data Inspection
     */
    objectInspection() {
        console.log("\n=== 2. OBJECT INSPECTION ===");

        const user = {
            id: 123,
            profile: {
                name: "John Doe",
                email: "john@example.com",
                settings: {
                    theme: "dark",
                    notifications: true,
                },
            },
        };

        // Different ways to inspect objects
        console.log("Object with console.log:", user);
        console.dir(user); // Shows object properties in a tree format
        console.dirxml(user); // XML representation (mainly for DOM elements)

        // JSON representation
        console.log("JSON format:", JSON.stringify(user, null, 2));

        // DEBUGGING TIP: console.dir() is better for deep object inspection
        // In browser, it provides an expandable tree view
    }

    /**
     * Table Display for Arrays and Objects
     */
    tableDisplay() {
        console.log("\n=== 3. TABLE DISPLAY ===");

        // Display array of objects as a table
        console.table(this.data);

        // Display specific columns only
        console.table(this.data, ["name", "department"]);

        // Table with object
        const performance = {
            "Load Time": "2.3s",
            "First Paint": "1.2s",
            Interactive: "3.1s",
        };
        console.table(performance);

        // DEBUGGING TIP: console.table() is excellent for comparing data
        // Much easier to read than regular object dumps
    }

    /**
     * Grouping Console Output
     */
    grouping() {
        console.log("\n=== 4. GROUPING OUTPUT ===");

        console.group("👤 User Processing");
        console.log("Loading user data...");
        console.log("Validating permissions...");

        console.group("🔐 Authentication");
        console.log("Checking token...");
        console.log("Token valid ✓");
        console.groupEnd(); // End Authentication group

        console.log("User processing complete");
        console.groupEnd(); // End User Processing group

        // Collapsed group
        console.groupCollapsed("📊 Performance Metrics (collapsed)");
        console.log("CPU usage: 45%");
        console.log("Memory usage: 230MB");
        console.log("Network requests: 12");
        console.groupEnd();

        // DEBUGGING TIP: Use groups to organize complex debugging output
        // Especially useful for tracing execution flow
    }

    /**
     * Timing and Performance
     */
    timingMethods() {
        console.log("\n=== 5. TIMING METHODS ===");

        // Basic timing
        console.time("Operation Timer");

        // Simulate some work
        const data = this.simulateWork(1000);

        console.timeLog("Operation Timer", "Checkpoint: work simulation done");

        // More work
        const processedData = data.map((item) => ({
            ...item,
            processed: true,
        }));

        console.timeEnd("Operation Timer");

        // Multiple timers
        console.time("Timer A");
        console.time("Timer B");

        setTimeout(() => console.timeEnd("Timer A"), 100);
        setTimeout(() => console.timeEnd("Timer B"), 200);

        // DEBUGGING TIP: Use timers to identify performance bottlenecks
        // Name your timers descriptively
    }

    /**
     * Counting and Tracking
     */
    countingMethods() {
        console.log("\n=== 6. COUNTING METHODS ===");

        // Count function calls or events
        for (let i = 0; i < 5; i++) {
            console.count("Loop iteration");

            if (i % 2 === 0) {
                console.count("Even number");
            } else {
                console.count("Odd number");
            }
        }

        // Reset counter
        console.countReset("Loop iteration");
        console.count("Loop iteration"); // Starts from 1 again

        // DEBUGGING TIP: Use counters to track how often code paths execute
        // Useful for debugging loops and conditional logic
    }

    /**
     * Assertions for Debugging
     */
    assertions() {
        console.log("\n=== 7. ASSERTIONS ===");

        const user = { name: "Alice", age: 30 };

        // Assertion that passes (no output)
        console.assert(user.age >= 18, "User must be adult");

        // Assertion that fails (shows error)
        console.assert(user.age > 50, "This assertion will fail", { user });

        // More complex assertions
        const numbers = [1, 2, 3, 4, 5];
        console.assert(numbers.length > 0, "Array should not be empty");
        console.assert(
            numbers.every((n) => n > 0),
            "All numbers should be positive"
        );

        // DEBUGGING TIP: Use assertions to validate assumptions in your code
        // They only log when the condition is false
    }

    /**
     * Stack Traces
     */
    stackTraces() {
        console.log("\n=== 8. STACK TRACES ===");

        // Get current stack trace
        console.trace("Current execution stack");

        // Trace from a nested function
        this.level1();
    }

    level1() {
        this.level2();
    }

    level2() {
        this.level3();
    }

    level3() {
        console.trace("Stack trace from deeply nested function");
        // DEBUGGING TIP: Use console.trace() to understand call hierarchy
        // Especially useful for tracking complex execution flows
    }

    /**
     * Advanced Console Styling (Browser only)
     */
    consoleStyling() {
        console.log("\n=== 9. CONSOLE STYLING (Browser) ===");

        // Note: Styling works in browsers, limited support in Node.js
        if (typeof window !== "undefined") {
            // CSS styling in console
            console.log(
                "%cStyled Text",
                "color: blue; font-size: 16px; font-weight: bold;"
            );
            console.log(
                "%cError Style",
                "color: red; background: yellow; padding: 2px;"
            );
            console.log(
                "%cSuccess%c Mixed %cStyling",
                "color: green; font-weight: bold;",
                "color: black;",
                "color: purple; font-style: italic;"
            );
        } else {
            console.log("Console styling is primarily for browsers");
        }

        // DEBUGGING TIP: Use styling to make important debug messages stand out
        // Great for highlighting critical information in large logs
    }

    /**
     * Memory Usage (Node.js)
     */
    memoryUsage() {
        console.log("\n=== 10. MEMORY USAGE (Node.js) ===");

        if (typeof process !== "undefined") {
            const usage = process.memoryUsage();

            console.log("Memory Usage:");
            console.table({
                "RSS (Resident Set Size)": `${Math.round(
                    usage.rss / 1024 / 1024
                )} MB`,
                "Heap Total": `${Math.round(usage.heapTotal / 1024 / 1024)} MB`,
                "Heap Used": `${Math.round(usage.heapUsed / 1024 / 1024)} MB`,
                External: `${Math.round(usage.external / 1024 / 1024)} MB`,
                "Array Buffers": `${Math.round(
                    usage.arrayBuffers / 1024 / 1024
                )} MB`,
            });
        } else {
            console.log("Memory usage tracking is Node.js specific");
        }

        // DEBUGGING TIP: Monitor memory usage to detect memory leaks
        // Watch for continuously increasing heap usage
    }

    /**
     * Custom Console Methods
     */
    customMethods() {
        console.log("\n=== 11. CUSTOM CONSOLE METHODS ===");

        // Create custom console methods
        const debugLogger = {
            success: (message, data) => {
                console.log(`✅ SUCCESS: ${message}`, data || "");
            },

            warning: (message, data) => {
                console.log(`⚠️  WARNING: ${message}`, data || "");
            },

            critical: (message, data) => {
                console.log(`🚨 CRITICAL: ${message}`, data || "");
            },

            debug: (level, message, data) => {
                if (process.env.DEBUG_LEVEL >= level) {
                    console.log(`🐛 [L${level}] ${message}`, data || "");
                }
            },
        };

        // Use custom methods
        debugLogger.success("Operation completed successfully");
        debugLogger.warning("Low disk space detected");
        debugLogger.critical("Database connection lost", { retries: 3 });
        debugLogger.debug(1, "Entering function", { userId: 123 });

        // DEBUGGING TIP: Create semantic logging methods for your application
        // Makes logs more readable and easier to filter
    }

    /**
     * Conditional Logging
     */
    conditionalLogging() {
        console.log("\n=== 12. CONDITIONAL LOGGING ===");

        const DEBUG = process.env.NODE_ENV === "development";
        const VERBOSE = process.env.VERBOSE === "true";

        // Environment-based logging
        if (DEBUG) {
            console.log("🔧 DEBUG: This only shows in development");
        }

        if (VERBOSE) {
            console.log("📝 VERBOSE: Detailed logging enabled");
        }

        // Conditional logging function
        const conditionalLog = (condition, ...args) => {
            if (condition) {
                console.log(...args);
            }
        };

        conditionalLog(true, "✓ This will be logged");
        conditionalLog(false, "✗ This will not be logged");

        // DEBUGGING TIP: Use environment variables to control logging levels
        // Prevents production logs from becoming too verbose
    }

    /**
     * Simulate work for timing demonstrations
     */
    simulateWork(iterations) {
        const result = [];
        for (let i = 0; i < iterations; i++) {
            result.push({ id: i, value: Math.random() });
        }
        return result;
    }

    /**
     * Run all console debugging examples
     */
    async run() {
        console.log("🎯 Starting Console Debugging Examples");
        console.log("=".repeat(60));

        try {
            this.basicConsoleMethods();
            this.objectInspection();
            this.tableDisplay();
            this.grouping();
            this.timingMethods();
            this.countingMethods();
            this.assertions();
            this.stackTraces();
            this.consoleStyling();
            this.memoryUsage();
            this.customMethods();
            this.conditionalLogging();

            console.log("\n🎉 All console debugging examples completed!");
        } catch (error) {
            console.error("❌ Error running console examples:", error);
        }
    }
}

// Export for use in main application
module.exports = new ConsoleDebugging();
