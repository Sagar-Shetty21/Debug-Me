/**
 * Main Entry Point - JavaScript Debugging Mastery
 *
 * This file demonstrates various debugging entry points and serves as
 * the main application launcher for different debugging scenarios.
 */

const path = require("path");

// Import debugging modules
const consoleDebugging = require("./console/console-methods");
const errorHandling = require("./errors/try-catch");
const asyncDebugging = require("./async/promises");
const performanceDebugging = require("./performance/performance-issues");

console.log("🐛 JavaScript Debugging Mastery Project Started");
console.log("=".repeat(50));

/**
 * Main application controller
 * Practice debugging: Set breakpoints here and step through
 */
class DebugMaster {
    constructor() {
        this.modules = new Map();
        this.currentDemo = null;
        this.setupModules();
    }

    /**
     * Setup available debugging modules
     * DEBUGGING TIP: Use 'Step Into' (F11) to explore each module
     */
    setupModules() {
        this.modules.set("console", {
            name: "Console Debugging",
            module: consoleDebugging,
            description: "Learn console methods and techniques",
        });

        this.modules.set("errors", {
            name: "Error Handling",
            module: errorHandling,
            description: "Practice error debugging and handling",
        });

        this.modules.set("async", {
            name: "Async Debugging",
            module: asyncDebugging,
            description: "Debug promises and async/await",
        });

        this.modules.set("performance", {
            name: "Performance Debugging",
            module: performanceDebugging,
            description: "Profile and debug performance issues",
        });

        // DEBUGGING EXERCISE: Add a conditional breakpoint here
        // Condition: this.modules.size > 3
        console.log(`📚 Loaded ${this.modules.size} debugging modules`);
    }

    /**
     * Run a specific debugging demo
     * @param {string} demoName - Name of the demo to run
     */
    async runDemo(demoName) {
        console.log(`\n🚀 Running ${demoName} demo...`);

        // DEBUGGING TIP: Set a breakpoint here and inspect the 'module' variable
        const module = this.modules.get(demoName);

        if (!module) {
            // DEBUGGING: This error should be caught by global error handler
            throw new Error(`Demo '${demoName}' not found`);
        }

        try {
            this.currentDemo = demoName;

            // DEBUGGING: Use 'Step Over' (F10) to avoid stepping into module execution
            if (typeof module.module.run === "function") {
                await module.module.run();
            } else {
                console.log(`${module.name}: ${module.description}`);
            }
        } catch (error) {
            console.error(`❌ Error running ${demoName}:`, error.message);
            // DEBUGGING: Examine the call stack when this executes
            debugger; // Programmatic breakpoint
        }
    }

    /**
     * List all available demos
     */
    listDemos() {
        console.log("\n📋 Available Debugging Demos:");
        console.log("-".repeat(40));

        // DEBUGGING: Set a logpoint here instead of breakpoint
        // Logpoint message: "Demo: {demoName}, Description: {demo.description}"
        this.modules.forEach((demo, demoName) => {
            console.log(`  ${demoName.padEnd(12)} - ${demo.description}`);
        });
    }

    /**
     * Run all demos in sequence
     */
    async runAllDemos() {
        console.log("\n🎯 Running all debugging demos...\n");

        for (const [demoName, demo] of this.modules) {
            console.log(`\n${"=".repeat(50)}`);
            await this.runDemo(demoName);

            // DEBUGGING: Add a watch expression for 'this.currentDemo'
            await this.delay(1000); // Pause between demos
        }

        console.log("\n✅ All demos completed!");
    }

    /**
     * Utility delay function
     * @param {number} ms - Milliseconds to delay
     */
    delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    /**
     * Demonstrate different debugging scenarios
     */
    debuggingScenarios() {
        console.log("\n🎮 Interactive Debugging Scenarios:");

        // Scenario 1: Variable inspection
        const userData = {
            id: 1,
            name: "Debug User",
            preferences: {
                theme: "dark",
                language: "en",
                notifications: true,
            },
        };

        // DEBUGGING: Hover over userData to inspect, or add to watch
        console.log("User data loaded:", userData.name);

        // Scenario 2: Loop debugging
        const numbers = [1, 2, 3, 4, 5];
        let sum = 0;

        // DEBUGGING: Set a breakpoint inside this loop and examine variables
        for (let i = 0; i < numbers.length; i++) {
            sum += numbers[i];
            // Add conditional breakpoint: i === 2
            console.log(`Added ${numbers[i]}, sum is now ${sum}`);
        }

        // Scenario 3: Function call debugging
        const result = this.complexCalculation(10, 5);
        console.log("Calculation result:", result);

        return result;
    }

    /**
     * Complex calculation for debugging practice
     * @param {number} a - First number
     * @param {number} b - Second number
     */
    complexCalculation(a, b) {
        // DEBUGGING: Step into this function and inspect parameters
        const step1 = a * 2;
        const step2 = b + 10;
        const step3 = step1 - step2;

        // DEBUGGING: Examine the call stack at this point
        if (step3 < 0) {
            console.warn("Negative result detected");
        }

        return step3;
    }
}

/**
 * Global error handler for uncaught exceptions
 * DEBUGGING: This catches unhandled errors - useful for debugging
 */
process.on("uncaughtException", (error) => {
    console.error("🚨 Uncaught Exception:", error);
    // In a real app, you'd log this and gracefully shut down
    // debugger; // Uncomment to break on uncaught exceptions
});

/**
 * Global handler for unhandled promise rejections
 */
process.on("unhandledRejection", (reason, promise) => {
    console.error(
        "🚨 Unhandled Promise Rejection at:",
        promise,
        "reason:",
        reason
    );
    // debugger; // Uncomment to break on unhandled promise rejections
});

/**
 * Main execution
 * DEBUGGING TIPS:
 * 1. Set breakpoint on line below and practice stepping through
 * 2. Use F5 (Continue), F10 (Step Over), F11 (Step Into), Shift+F11 (Step Out)
 * 3. Add variables to watch panel
 * 4. Try conditional breakpoints
 * 5. Use the debug console to evaluate expressions
 */
async function main() {
    const debugMaster = new DebugMaster();

    // DEBUGGING: Right-click here and "Add to Watch" for debugMaster
    debugMaster.listDemos();

    // Run interactive debugging scenarios
    debugMaster.debuggingScenarios();

    // Uncomment different lines to practice different debugging approaches:

    // Run single demo
    // await debugMaster.runDemo('console');

    // Run all demos
    // await debugMaster.runAllDemos();

    console.log("\n🎉 Debugging practice session complete!");
    console.log("💡 Try setting breakpoints and running with: npm run debug");
}

// Start the application
if (require.main === module) {
    main().catch((error) => {
        console.error("Application failed:", error);
        process.exit(1);
    });
}

module.exports = { DebugMaster };
