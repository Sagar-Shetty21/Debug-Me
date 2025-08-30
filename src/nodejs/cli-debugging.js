#!/usr/bin/env node

/**
 * CLI DEBUGGING FOR NODE.JS
 *
 * This file demonstrates various command-line debugging techniques:
 *
 * RUNNING COMMANDS:
 * 1. Basic execution: node src/nodejs/cli-debugging.js
 * 2. With inspect: node --inspect src/nodejs/cli-debugging.js
 * 3. With inspect-brk: node --inspect-brk src/nodejs/cli-debugging.js
 * 4. Debug specific port: node --inspect=9229 src/nodejs/cli-debugging.js
 * 5. With debug logs: DEBUG=* node src/nodejs/cli-debugging.js
 * 6. With trace warnings: node --trace-warnings src/nodejs/cli-debugging.js
 * 7. With stack trace: node --stack-trace-limit=50 src/nodejs/cli-debugging.js
 */

const util = require("util");
const debug = require("debug")("app:main");
const debugDatabase = require("debug")("app:database");
const debugAuth = require("debug")("app:auth");

// =============================================================================
// 1. COMMAND LINE ARGUMENTS DEBUGGING
// =============================================================================

console.log("\n=== COMMAND LINE ARGUMENTS ===");

function debugCommandLineArgs() {
    console.log("Process arguments:");
    process.argv.forEach((arg, index) => {
        console.log(`  [${index}]: ${arg}`);
    });

    // Parsed arguments (simple example)
    const args = process.argv.slice(2);
    console.log("\nParsed arguments:", args);

    // Environment variables
    console.log("\nRelevant environment variables:");
    console.log("NODE_ENV:", process.env.NODE_ENV || "not set");
    console.log("DEBUG:", process.env.DEBUG || "not set");
    console.log("PORT:", process.env.PORT || "not set");
}

debugCommandLineArgs();

// =============================================================================
// 2. DEBUG MODULE USAGE
// =============================================================================

console.log("\n=== DEBUG MODULE USAGE ===");

function simulateApplicationFlow() {
    debug("Application starting...");

    // Simulate database operations
    debugDatabase("Connecting to database...");
    setTimeout(() => {
        debugDatabase("Database connected successfully");
        debugDatabase("Executing query: SELECT * FROM users");
    }, 100);

    // Simulate authentication
    debugAuth("Processing authentication...");
    setTimeout(() => {
        debugAuth("User authenticated: john.doe@example.com");
        debugAuth("Generating JWT token...");
    }, 200);

    debug("Application flow completed");
}

simulateApplicationFlow();

// =============================================================================
// 3. PROCESS DEBUGGING UTILITIES
// =============================================================================

console.log("\n=== PROCESS DEBUGGING UTILITIES ===");

function processDebuggingInfo() {
    console.log("Process ID (PID):", process.pid);
    console.log("Platform:", process.platform);
    console.log("Node.js version:", process.version);
    console.log(
        "Memory usage:",
        util.inspect(process.memoryUsage(), { colors: true })
    );
    console.log(
        "CPU usage:",
        util.inspect(process.cpuUsage(), { colors: true })
    );
    console.log("Uptime:", process.uptime(), "seconds");
}

processDebuggingInfo();

// =============================================================================
// 4. SIGNAL HANDLING FOR DEBUGGING
// =============================================================================

console.log("\n=== SIGNAL HANDLING ===");

function setupSignalHandlers() {
    // SIGINT handler (Ctrl+C)
    process.on("SIGINT", () => {
        console.log("\n📊 Received SIGINT. Graceful shutdown...");
        console.log("Final memory usage:", process.memoryUsage());
        process.exit(0);
    });

    // SIGTERM handler
    process.on("SIGTERM", () => {
        console.log("\n📊 Received SIGTERM. Shutting down...");
        process.exit(0);
    });

    // Unhandled exception handler
    process.on("uncaughtException", (error) => {
        console.error("🚨 Uncaught Exception:", error);
        console.error("Stack:", error.stack);
        process.exit(1);
    });

    // Unhandled promise rejection handler
    process.on("unhandledRejection", (reason, promise) => {
        console.error("🚨 Unhandled Promise Rejection at:", promise);
        console.error("Reason:", reason);
        // Don't exit in production - log and continue
        // process.exit(1);
    });

    console.log("✅ Signal handlers configured");
}

setupSignalHandlers();

// =============================================================================
// 5. CUSTOM LOGGING UTILITIES
// =============================================================================

console.log("\n=== CUSTOM LOGGING UTILITIES ===");

class CLILogger {
    constructor(name) {
        this.name = name;
        this.startTime = Date.now();
    }

    formatMessage(level, message, data = null) {
        const timestamp = new Date().toISOString();
        const runtime = Date.now() - this.startTime;
        const prefix = `[${timestamp}] [${this.name}] [${level}] [+${runtime}ms]`;

        if (data) {
            return `${prefix} ${message}\n${util.inspect(data, {
                colors: true,
                depth: 3,
                compact: false,
            })}`;
        }
        return `${prefix} ${message}`;
    }

    info(message, data) {
        console.log(this.formatMessage("INFO", message, data));
    }

    warn(message, data) {
        console.warn(this.formatMessage("WARN", message, data));
    }

    error(message, data) {
        console.error(this.formatMessage("ERROR", message, data));
    }

    debug(message, data) {
        if (process.env.DEBUG) {
            console.log(this.formatMessage("DEBUG", message, data));
        }
    }
}

// Usage example
const logger = new CLILogger("MyApp");

logger.info("Application initialized");
logger.debug("Debug information", { userId: 123, action: "login" });
logger.warn("Deprecated API used", { endpoint: "/old-api" });

// =============================================================================
// 6. PERFORMANCE MONITORING
// =============================================================================

console.log("\n=== PERFORMANCE MONITORING ===");

class PerformanceMonitor {
    constructor() {
        this.metrics = new Map();
    }

    startTimer(name) {
        this.metrics.set(name, {
            startTime: process.hrtime.bigint(),
            startMemory: process.memoryUsage(),
        });
    }

    endTimer(name) {
        const metric = this.metrics.get(name);
        if (!metric) {
            console.warn(`⚠️  Timer '${name}' not found`);
            return;
        }

        const endTime = process.hrtime.bigint();
        const endMemory = process.memoryUsage();
        const duration = Number(endTime - metric.startTime) / 1000000; // Convert to ms

        console.log(`⏱️  ${name}:`);
        console.log(`   Duration: ${duration.toFixed(2)}ms`);
        console.log(
            `   Memory delta: ${
                (endMemory.heapUsed - metric.startMemory.heapUsed) / 1024
            } KB`
        );

        this.metrics.delete(name);
    }
}

const perfMonitor = new PerformanceMonitor();

// Example usage
perfMonitor.startTimer("database-query");
setTimeout(() => {
    // Simulate some work
    const data = Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        value: Math.random(),
    }));
    perfMonitor.endTimer("database-query");
}, 50);

// =============================================================================
// 7. CLI DEBUGGING HELPERS
// =============================================================================

console.log("\n=== CLI DEBUGGING HELPERS ===");

function printSystemInfo() {
    console.log("\n🖥️  SYSTEM INFORMATION");
    console.log("─".repeat(50));
    console.log(`Platform: ${process.platform}`);
    console.log(`Architecture: ${process.arch}`);
    console.log(`Node.js: ${process.version}`);
    console.log(`PID: ${process.pid}`);
    console.log(`Current working directory: ${process.cwd()}`);
    console.log(`Execution path: ${process.execPath}`);
}

function printEnvironmentVariables() {
    console.log("\n🌍 ENVIRONMENT VARIABLES");
    console.log("─".repeat(50));
    const relevantEnvVars = [
        "NODE_ENV",
        "DEBUG",
        "PORT",
        "DATABASE_URL",
        "API_KEY",
        "JWT_SECRET",
        "LOG_LEVEL",
    ];

    relevantEnvVars.forEach((varName) => {
        const value = process.env[varName];
        if (value) {
            // Mask sensitive values
            const displayValue =
                varName.includes("SECRET") ||
                varName.includes("KEY") ||
                varName.includes("PASSWORD")
                    ? "***masked***"
                    : value;
            console.log(`${varName}: ${displayValue}`);
        } else {
            console.log(`${varName}: (not set)`);
        }
    });
}

function printMemoryUsage() {
    console.log("\n💾 MEMORY USAGE");
    console.log("─".repeat(50));
    const memory = process.memoryUsage();
    Object.entries(memory).forEach(([key, value]) => {
        console.log(`${key}: ${(value / 1024 / 1024).toFixed(2)} MB`);
    });
}

// =============================================================================
// 8. ERROR SIMULATION FOR TESTING
// =============================================================================

console.log("\n=== ERROR SIMULATION ===");

function simulateErrors() {
    console.log("🧪 Simulating various error conditions...\n");

    // Simulate a handled error
    try {
        throw new Error("This is a handled error for testing");
    } catch (error) {
        logger.error("Caught and handled error:", {
            message: error.message,
            stack: error.stack,
        });
    }

    // Simulate an unhandled promise rejection (commented out to prevent actual rejection)
    // Promise.reject(new Error('Unhandled promise rejection'));

    // Simulate a warning
    process.emitWarning("This is a test warning", "TestWarning");
}

// =============================================================================
// 9. INTERACTIVE DEBUGGING PROMPTS
// =============================================================================

function setupInteractiveDebugging() {
    console.log("\n🔍 INTERACTIVE DEBUGGING");
    console.log("─".repeat(50));
    console.log("Available debugging commands:");
    console.log("- Press Ctrl+C to trigger graceful shutdown");
    console.log("- Send SIGUSR1 to dump current state");
    console.log("- Send SIGUSR2 to toggle debug mode");

    // SIGUSR1 - Dump current state
    process.on("SIGUSR1", () => {
        console.log("\n📊 CURRENT STATE DUMP");
        console.log("─".repeat(50));
        printSystemInfo();
        printMemoryUsage();
        printEnvironmentVariables();
    });

    // SIGUSR2 - Toggle debug mode
    let debugMode = false;
    process.on("SIGUSR2", () => {
        debugMode = !debugMode;
        console.log(`\n🔧 Debug mode ${debugMode ? "ENABLED" : "DISABLED"}`);
        if (debugMode) {
            process.env.DEBUG = "*";
        } else {
            delete process.env.DEBUG;
        }
    });
}

// =============================================================================
// 10. MAIN EXECUTION
// =============================================================================

function main() {
    console.log("\n🚀 CLI DEBUGGING DEMONSTRATION STARTED");
    console.log("═".repeat(60));

    printSystemInfo();
    printMemoryUsage();
    printEnvironmentVariables();
    setupInteractiveDebugging();
    simulateErrors();

    // Keep the process running for interactive debugging
    console.log(
        "\n⏳ Process running... Press Ctrl+C to exit or send signals for debugging"
    );

    // Periodic memory reporting
    setInterval(() => {
        if (process.env.DEBUG) {
            console.log("\n📊 Periodic memory check:", {
                rss: `${(process.memoryUsage().rss / 1024 / 1024).toFixed(
                    2
                )} MB`,
                heapUsed: `${(
                    process.memoryUsage().heapUsed /
                    1024 /
                    1024
                ).toFixed(2)} MB`,
            });
        }
    }, 10000);
}

// Only run main if this file is executed directly
if (require.main === module) {
    main();
}

// =============================================================================
// EXPORTS FOR TESTING
// =============================================================================

module.exports = {
    CLILogger,
    PerformanceMonitor,
    printSystemInfo,
    printMemoryUsage,
    printEnvironmentVariables,
};
