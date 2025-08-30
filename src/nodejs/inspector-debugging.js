/**
 * Node.js Inspector Debugging - Chrome DevTools Integration
 *
 * This file demonstrates various techniques for debugging Node.js applications
 * using the Chrome DevTools inspector protocol.
 *
 * To run with inspector:
 * node --inspect inspector-debugging.js
 * node --inspect-brk inspector-debugging.js (breaks on first line)
 * node --inspect=0.0.0.0:9229 inspector-debugging.js (custom host/port)
 */

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

// =============================================================================
// 1. BASIC INSPECTOR SETUP AND USAGE
// =============================================================================

console.log("🔍 Node.js Inspector Debugging Examples");
console.log("Open Chrome and go to: chrome://inspect");
console.log(
    'Click "Open dedicated DevTools for Node" or inspect this process\n'
);

// Function to demonstrate basic debugging
function basicDebugging() {
    console.log("\n📌 1. Basic Inspector Debugging");

    let counter = 0;
    const data = [1, 2, 3, 4, 5];

    // Set breakpoint here in DevTools Sources tab
    debugger; // This will trigger a breakpoint when inspector is attached

    for (let i = 0; i < data.length; i++) {
        counter += data[i];
        console.log(
            `Processing item ${i}: ${data[i]}, running total: ${counter}`
        );

        // Conditional breakpoint example
        if (counter > 10) {
            debugger; // Will break when counter exceeds 10
        }
    }

    return counter;
}

// =============================================================================
// 2. ASYNC DEBUGGING WITH INSPECTOR
// =============================================================================

async function asyncDebugging() {
    console.log("\n📌 2. Async Operations Debugging");

    // Simulate async operations
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    try {
        console.log("Starting async operation...");
        debugger; // Break before async chain

        const result1 = await processData(100);
        console.log("First result:", result1);

        const result2 = await processData(200);
        console.log("Second result:", result2);

        return { result1, result2 };
    } catch (error) {
        console.error("Async error:", error);
        debugger; // Break on error
        throw error;
    }
}

async function processData(value) {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    await delay(500); // Simulate async work

    // Simulate potential error
    if (value > 150) {
        debugger; // Break before throwing error
        throw new Error(`Value too high: ${value}`);
    }

    return value * 2;
}

// =============================================================================
// 3. MEMORY DEBUGGING WITH INSPECTOR
// =============================================================================

function memoryDebugging() {
    console.log("\n📌 3. Memory Usage Debugging");

    // Create objects to monitor memory usage
    const largeArray = [];
    const objectCache = new Map();

    console.log("Initial memory usage:", process.memoryUsage());

    // Fill array with data
    for (let i = 0; i < 10000; i++) {
        largeArray.push({
            id: i,
            data: `Item ${i}`.repeat(10),
            timestamp: new Date(),
        });

        // Cache some objects
        if (i % 100 === 0) {
            objectCache.set(i, largeArray[i]);
        }
    }

    debugger; // Break to inspect memory in DevTools Memory tab

    console.log("After array creation:", process.memoryUsage());

    // Potential memory leak simulation
    const leakyData = [];
    setInterval(() => {
        leakyData.push(new Array(1000).fill("leak"));

        if (leakyData.length > 50) {
            debugger; // Break when potential leak detected
            console.warn("Potential memory leak detected!");
        }
    }, 100);

    return { largeArray: largeArray.length, cacheSize: objectCache.size };
}

// =============================================================================
// 4. PERFORMANCE PROFILING WITH INSPECTOR
// =============================================================================

function performanceProfiling() {
    console.log("\n📌 4. Performance Profiling");

    // CPU intensive function
    function fibonacci(n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }

    // Profile CPU usage
    const start = performance.now();

    console.log("Starting CPU intensive task...");
    debugger; // Break before performance test

    const results = [];
    for (let i = 1; i <= 30; i++) {
        const fibStart = performance.now();
        const result = fibonacci(i);
        const fibEnd = performance.now();

        results.push({
            n: i,
            result,
            duration: fibEnd - fibStart,
        });

        // Break on slow operations
        if (fibEnd - fibStart > 10) {
            debugger; // Break when operation takes too long
        }
    }

    const end = performance.now();
    console.log(`Total execution time: ${end - start}ms`);

    return results;
}

// =============================================================================
// 5. FILE SYSTEM DEBUGGING
// =============================================================================

function fileSystemDebugging() {
    console.log("\n📌 5. File System Operations Debugging");

    const tempFile = path.join(__dirname, "debug-temp.txt");

    try {
        debugger; // Break before file operations

        // Write file
        const data = "Debug data\n".repeat(1000);
        fs.writeFileSync(tempFile, data);
        console.log("File written successfully");

        // Read file
        const readData = fs.readFileSync(tempFile, "utf8");
        console.log(`Read ${readData.length} characters`);

        // File stats
        const stats = fs.statSync(tempFile);
        debugger; // Break to inspect file stats
        console.log("File stats:", {
            size: stats.size,
            created: stats.birthtime,
            modified: stats.mtime,
        });
    } catch (error) {
        console.error("File system error:", error);
        debugger; // Break on file system errors
    } finally {
        // Cleanup
        if (fs.existsSync(tempFile)) {
            fs.unlinkSync(tempFile);
            console.log("Temp file cleaned up");
        }
    }
}

// =============================================================================
// 6. ERROR DEBUGGING WITH STACK TRACES
// =============================================================================

function errorDebugging() {
    console.log("\n📌 6. Error Debugging with Stack Traces");

    function level1() {
        console.log("Entering level1");
        level2();
    }

    function level2() {
        console.log("Entering level2");
        level3();
    }

    function level3() {
        console.log("Entering level3");
        debugger; // Break before error
        throw new Error("Intentional error for debugging");
    }

    try {
        level1();
    } catch (error) {
        console.error("Caught error:", error.message);
        console.error("Stack trace:", error.stack);
        debugger; // Break to inspect error in DevTools
    }
}

// =============================================================================
// 7. NETWORK REQUEST DEBUGGING (if applicable)
// =============================================================================

function networkDebugging() {
    console.log("\n📌 7. Network Request Simulation");

    // Simulate network requests (in real app, use http/https modules)
    const requests = [
        { url: "https://api.example.com/users", method: "GET" },
        { url: "https://api.example.com/posts", method: "POST" },
        { url: "https://api.example.com/invalid", method: "GET" },
    ];

    requests.forEach((req, index) => {
        console.log(
            `Simulating request ${index + 1}: ${req.method} ${req.url}`
        );

        // Simulate different response scenarios
        if (req.url.includes("invalid")) {
            debugger; // Break on potential error request
            console.error(`Request failed: ${req.url}`);
        } else {
            console.log(`Request successful: ${req.url}`);
        }
    });
}

// =============================================================================
// 8. INSPECTOR UTILITIES AND HELPERS
// =============================================================================

class DebugHelper {
    static logWithContext(message, context = {}) {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] ${message}`);

        if (Object.keys(context).length > 0) {
            console.table(context);
        }
    }

    static measurePerformance(fn, name = "Function") {
        const start = performance.now();
        const result = fn();
        const end = performance.now();

        console.log(
            `⏱️  ${name} execution time: ${(end - start).toFixed(2)}ms`
        );
        return result;
    }

    static inspectObject(obj, label = "Object") {
        console.log(`\n🔍 Inspecting ${label}:`);
        console.log("Type:", typeof obj);
        console.log("Constructor:", obj?.constructor?.name);

        if (obj && typeof obj === "object") {
            console.log("Keys:", Object.keys(obj));
            console.log("Values:", Object.values(obj));
        }

        debugger; // Break to inspect in DevTools
    }

    static trackMemoryUsage(operation) {
        const before = process.memoryUsage();

        const result = operation();

        const after = process.memoryUsage();
        const diff = {
            rss: after.rss - before.rss,
            heapUsed: after.heapUsed - before.heapUsed,
            heapTotal: after.heapTotal - before.heapTotal,
            external: after.external - before.external,
        };

        console.log("Memory usage change:", diff);
        debugger; // Break to analyze memory changes

        return result;
    }
}

// =============================================================================
// MAIN EXECUTION
// =============================================================================

async function main() {
    console.log("🚀 Starting Inspector Debugging Examples\n");

    try {
        // Run all debugging examples
        DebugHelper.measurePerformance(
            () => basicDebugging(),
            "Basic Debugging"
        );

        await asyncDebugging();

        DebugHelper.trackMemoryUsage(() => memoryDebugging());

        DebugHelper.measurePerformance(
            () => performanceProfiling(),
            "Performance Profiling"
        );

        fileSystemDebugging();

        errorDebugging();

        networkDebugging();

        // Final inspection
        DebugHelper.inspectObject(process.memoryUsage(), "Final Memory Usage");
    } catch (error) {
        console.error("Main execution error:", error);
        debugger; // Final error breakpoint
    }

    console.log("\n✅ Inspector debugging examples completed");
    console.log("💡 Tips for Chrome DevTools:");
    console.log("   - Use the Sources tab to set breakpoints");
    console.log("   - Monitor memory in the Memory tab");
    console.log("   - Profile CPU usage in the Profiler tab");
    console.log("   - Watch variables in the Scope panel");
    console.log("   - Use conditional breakpoints for specific conditions");
}

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    debugger; // Break on unhandled rejections
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
    debugger; // Break on uncaught exceptions
    process.exit(1);
});

// Start the debugging session
if (require.main === module) {
    main();
}

module.exports = {
    basicDebugging,
    asyncDebugging,
    memoryDebugging,
    performanceProfiling,
    fileSystemDebugging,
    errorDebugging,
    networkDebugging,
    DebugHelper,
};
