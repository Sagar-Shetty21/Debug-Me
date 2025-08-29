/**
 * Error Handling and Debugging
 *
 * This module demonstrates comprehensive error handling patterns
 * and debugging techniques for different types of errors.
 */

class ErrorHandlingDebugging {
    constructor() {
        this.errorCount = 0;
        this.errorLog = [];
    }

    /**
     * Basic Try-Catch Error Handling
     */
    basicTryCatch() {
        console.log("\n=== 1. BASIC TRY-CATCH ===");

        try {
            // DEBUGGING: Set a breakpoint here and step through
            console.log("Attempting risky operation...");

            // This will throw an error
            const result = this.riskyFunction();
            console.log("Result:", result);
        } catch (error) {
            // DEBUGGING: Examine the error object in the debugger
            console.error("❌ Caught error:", error.message);
            console.error("Error stack:", error.stack);

            // Log error details for debugging
            this.logError("basicTryCatch", error);
        } finally {
            console.log("🧹 Cleanup code always runs");
        }
    }

    /**
     * Specific Error Types
     */
    specificErrorTypes() {
        console.log("\n=== 2. SPECIFIC ERROR TYPES ===");

        // Syntax Error (would prevent script from running)
        // try {
        //     eval('const x = ;'); // Invalid syntax
        // } catch (error) {
        //     console.log('SyntaxError:', error.name);
        // }

        // Reference Error
        try {
            console.log(undefinedVariable); // ReferenceError
        } catch (error) {
            console.error("ReferenceError caught:", error.message);
            // DEBUGGING: Check error.name and error.stack
            debugger; // Programmatic breakpoint
        }

        // Type Error
        try {
            const num = null;
            num.toFixed(2); // TypeError: Cannot read property 'toFixed' of null
        } catch (error) {
            console.error("TypeError caught:", error.message);
            console.log("Error type:", error.constructor.name);
        }

        // Range Error
        try {
            const arr = new Array(-1); // RangeError: Invalid array length
        } catch (error) {
            console.error("RangeError caught:", error.message);
        }

        // Custom error detection
        try {
            throw new Error("This is a custom error");
        } catch (error) {
            if (error instanceof Error) {
                console.log("✓ Caught an Error instance");
                console.log("Error details:", {
                    name: error.name,
                    message: error.message,
                    stack: error.stack?.split("\n")[0], // First line of stack
                });
            }
        }
    }

    /**
     * Nested Try-Catch Blocks
     */
    nestedTryCatch() {
        console.log("\n=== 3. NESTED TRY-CATCH ===");

        try {
            console.log("Outer try block");

            try {
                console.log("Inner try block");
                // DEBUGGING: Step through nested blocks
                throw new Error("Inner error");
            } catch (innerError) {
                console.error("Inner catch:", innerError.message);

                // Re-throw to outer catch
                throw new Error(`Handled inner error: ${innerError.message}`);
            }
        } catch (outerError) {
            console.error("Outer catch:", outerError.message);
            // DEBUGGING: Examine the call stack here
        }

        // Multiple catch scenarios
        try {
            this.functionThatMightFailInDifferentWays("type-error");
        } catch (error) {
            // DEBUGGING: Use conditional breakpoints based on error type
            // Condition: error instanceof TypeError
            if (error instanceof TypeError) {
                console.error("🔧 Handling TypeError specifically");
            } else if (error instanceof ReferenceError) {
                console.error("🔍 Handling ReferenceError specifically");
            } else {
                console.error("❓ Handling unknown error type");
            }
        }
    }

    /**
     * Error Propagation and Re-throwing
     */
    errorPropagation() {
        console.log("\n=== 4. ERROR PROPAGATION ===");

        try {
            this.level1Function();
        } catch (error) {
            console.error("🎯 Final error handler:", error.message);
            // DEBUGGING: Examine the full call stack to trace error origin
            console.log("Full stack trace:");
            console.log(error.stack);
        }
    }

    level1Function() {
        console.log("Level 1: Starting operation");
        try {
            this.level2Function();
        } catch (error) {
            // Add context and re-throw
            const enhancedError = new Error(`Level 1 - ${error.message}`);
            enhancedError.originalError = error;
            throw enhancedError;
        }
    }

    level2Function() {
        console.log("Level 2: Deeper operation");
        try {
            this.level3Function();
        } catch (error) {
            // DEBUGGING: Set a conditional breakpoint here
            // Condition: error.message.includes('critical')
            console.warn("Level 2: Caught error, adding context");
            throw new Error(`Level 2 - ${error.message}`);
        }
    }

    level3Function() {
        console.log("Level 3: Deepest operation");
        // This will cause an error
        throw new Error("Critical failure at deepest level");
    }

    /**
     * Async Error Handling
     */
    async asyncErrorHandling() {
        console.log("\n=== 5. ASYNC ERROR HANDLING ===");

        // Promise-based error handling
        try {
            console.log("Testing Promise rejection...");
            await this.promiseThatRejects();
        } catch (error) {
            console.error("❌ Caught async error:", error.message);
            // DEBUGGING: Async stack traces can be tricky to follow
        }

        // Multiple async operations
        try {
            const results = await Promise.all([
                this.asyncOperation("success", 100),
                this.asyncOperation("failure", 150), // This will fail
                this.asyncOperation("success", 200),
            ]);
            console.log("All operations succeeded:", results);
        } catch (error) {
            console.error("❌ One of the operations failed:", error.message);
            // DEBUGGING: Promise.all fails fast - only first error is caught
        }

        // Handling individual async operations
        const results = await Promise.allSettled([
            this.asyncOperation("success", 100),
            this.asyncOperation("failure", 150),
            this.asyncOperation("success", 200),
        ]);

        console.log("All operations completed (with some failures):");
        results.forEach((result, index) => {
            if (result.status === "fulfilled") {
                console.log(`✓ Operation ${index}: ${result.value}`);
            } else {
                console.error(
                    `❌ Operation ${index}: ${result.reason.message}`
                );
            }
        });
    }

    /**
     * Error Boundaries and Global Error Handling
     */
    globalErrorHandling() {
        console.log("\n=== 6. GLOBAL ERROR HANDLING ===");

        // Store original handlers
        const originalUncaughtException =
            process.listeners("uncaughtException");
        const originalUnhandledRejection =
            process.listeners("unhandledRejection");

        // Custom global error handler
        const globalErrorHandler = (error, origin) => {
            console.error("🚨 Global error caught:", {
                error: error.message,
                origin: origin,
                stack: error.stack?.split("\n").slice(0, 3),
            });

            // DEBUGGING: Global errors often indicate serious issues
            debugger; // Break when global errors occur
        };

        // Set up global handlers (temporarily)
        process.on("uncaughtException", globalErrorHandler);
        process.on("unhandledRejection", (reason, promise) => {
            console.error("🚨 Unhandled Promise rejection:", reason);
            console.error("Promise:", promise);
        });

        // Simulate an unhandled error (commented out to avoid crashing)
        // setTimeout(() => {
        //     throw new Error('Unhandled error after timeout');
        // }, 100);

        // Simulate unhandled promise rejection
        // Promise.reject(new Error('Unhandled promise rejection'));

        console.log("Global error handlers set up (temporarily)");
    }

    /**
     * Error Recovery Strategies
     */
    errorRecovery() {
        console.log("\n=== 7. ERROR RECOVERY STRATEGIES ===");

        // Retry mechanism
        const retryOperation = async (operation, maxRetries = 3) => {
            let attempt = 0;

            while (attempt < maxRetries) {
                try {
                    console.log(`Attempt ${attempt + 1}/${maxRetries}`);
                    const result = await operation();
                    console.log("✓ Operation succeeded");
                    return result;
                } catch (error) {
                    attempt++;
                    console.error(
                        `❌ Attempt ${attempt} failed:`,
                        error.message
                    );

                    if (attempt >= maxRetries) {
                        console.error("💥 All retry attempts exhausted");
                        throw new Error(
                            `Operation failed after ${maxRetries} attempts: ${error.message}`
                        );
                    }

                    // Wait before retry
                    await new Promise((resolve) =>
                        setTimeout(resolve, 100 * attempt)
                    );
                }
            }
        };

        // Test retry mechanism
        retryOperation(() => this.unreliableOperation()).catch((error) => {
            console.error("Final failure:", error.message);
        });

        // Fallback mechanism
        const withFallback = async (primaryOperation, fallbackOperation) => {
            try {
                return await primaryOperation();
            } catch (primaryError) {
                console.warn("Primary operation failed, trying fallback");
                try {
                    return await fallbackOperation();
                } catch (fallbackError) {
                    throw new Error(
                        `Both operations failed. Primary: ${primaryError.message}, Fallback: ${fallbackError.message}`
                    );
                }
            }
        };

        // Test fallback mechanism
        withFallback(
            () => this.asyncOperation("failure", 100),
            () => this.asyncOperation("success", 50)
        )
            .then((result) => {
                console.log("✓ Fallback successful:", result);
            })
            .catch((error) => {
                console.error("❌ Both operations failed:", error.message);
            });
    }

    /**
     * Error Logging and Reporting
     */
    errorLoggingAndReporting() {
        console.log("\n=== 8. ERROR LOGGING & REPORTING ===");

        const errorReporter = {
            report(error, context = {}) {
                const errorReport = {
                    timestamp: new Date().toISOString(),
                    message: error.message,
                    stack: error.stack,
                    type: error.constructor.name,
                    context: context,
                    userAgent:
                        typeof navigator !== "undefined"
                            ? navigator.userAgent
                            : "Node.js",
                    url:
                        typeof window !== "undefined"
                            ? window.location.href
                            : "N/A",
                };

                console.group("📋 Error Report");
                console.table(errorReport);
                console.groupEnd();

                // In a real application, you'd send this to a logging service
                this.sendToLoggingService(errorReport);
            },

            sendToLoggingService(report) {
                // Simulate sending to external service
                console.log("📤 Sending error report to logging service...");
                // In reality: send to Sentry, LogRocket, etc.
            },
        };

        // Test error reporting
        try {
            throw new Error("Reportable error for testing");
        } catch (error) {
            errorReporter.report(error, {
                userId: 123,
                action: "testing-error-reporting",
                additionalData: { testMode: true },
            });
        }
    }

    /**
     * Debugging Error Objects
     */
    debuggingErrorObjects() {
        console.log("\n=== 9. DEBUGGING ERROR OBJECTS ===");

        try {
            this.complexErrorScenario();
        } catch (error) {
            console.group("🔍 Error Object Analysis");

            // Standard error properties
            console.log("Name:", error.name);
            console.log("Message:", error.message);
            console.log("Stack:", error.stack);

            // Custom properties (if any)
            console.log("Custom properties:");
            Object.keys(error).forEach((key) => {
                if (!["name", "message", "stack"].includes(key)) {
                    console.log(`  ${key}:`, error[key]);
                }
            });

            // Error prototype chain
            console.log("Prototype chain:");
            let proto = Object.getPrototypeOf(error);
            let level = 0;
            while (proto && level < 5) {
                console.log(`  Level ${level}:`, proto.constructor.name);
                proto = Object.getPrototypeOf(proto);
                level++;
            }

            console.groupEnd();

            // DEBUGGING: Set a breakpoint here and explore the error object
            // Use the debugger's object inspector to examine all properties
            debugger;
        }
    }

    /**
     * Performance Impact of Error Handling
     */
    performanceImpactOfErrors() {
        console.log("\n=== 10. PERFORMANCE IMPACT ===");

        const iterations = 10000;

        // Test 1: Normal execution (no errors)
        console.time("Normal execution");
        for (let i = 0; i < iterations; i++) {
            try {
                this.normalFunction();
            } catch (e) {
                // No errors expected
            }
        }
        console.timeEnd("Normal execution");

        // Test 2: Execution with caught errors
        console.time("Execution with errors");
        for (let i = 0; i < iterations; i++) {
            try {
                this.functionThatAlwaysThrows();
            } catch (e) {
                // Expected errors
            }
        }
        console.timeEnd("Execution with errors");

        console.log(
            "💡 Tip: Errors have performance overhead - avoid using them for control flow"
        );
    }

    // Helper methods for demonstrations

    riskyFunction() {
        const random = Math.random();
        if (random < 0.5) {
            throw new Error(`Random failure occurred (${random.toFixed(3)})`);
        }
        return `Success! Random value: ${random.toFixed(3)}`;
    }

    functionThatMightFailInDifferentWays(errorType) {
        switch (errorType) {
            case "type-error":
                const obj = null;
                return obj.someProperty; // TypeError
            case "reference-error":
                return nonExistentVariable; // ReferenceError
            case "range-error":
                return new Array(-1); // RangeError
            default:
                throw new Error("Generic error");
        }
    }

    async promiseThatRejects() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error("Promise rejected after timeout"));
            }, 50);
        });
    }

    async asyncOperation(type, delay) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (type === "success") {
                    resolve(`Async operation completed after ${delay}ms`);
                } else {
                    reject(
                        new Error(`Async operation failed after ${delay}ms`)
                    );
                }
            }, delay);
        });
    }

    async unreliableOperation() {
        // Fails 70% of the time
        if (Math.random() < 0.7) {
            throw new Error("Unreliable operation failed");
        }
        return "Unreliable operation succeeded";
    }

    complexErrorScenario() {
        const customError = new Error("Complex error scenario");
        customError.code = "ERR_COMPLEX_SCENARIO";
        customError.statusCode = 500;
        customError.details = {
            operation: "complexErrorScenario",
            timestamp: Date.now(),
            context: { userId: 123 },
        };
        customError.cause = new Error("Root cause error");

        throw customError;
    }

    normalFunction() {
        return Math.random() * 100;
    }

    functionThatAlwaysThrows() {
        throw new Error("This function always throws");
    }

    logError(context, error) {
        this.errorCount++;
        this.errorLog.push({
            id: this.errorCount,
            context,
            error: {
                name: error.name,
                message: error.message,
                stack: error.stack,
            },
            timestamp: new Date().toISOString(),
        });
    }

    /**
     * Display error statistics
     */
    displayErrorStats() {
        console.log("\n=== ERROR STATISTICS ===");
        console.log(`Total errors logged: ${this.errorCount}`);

        if (this.errorLog.length > 0) {
            console.table(
                this.errorLog.map((log) => ({
                    ID: log.id,
                    Context: log.context,
                    Type: log.error.name,
                    Message: log.error.message.substring(0, 50) + "...",
                }))
            );
        }
    }

    /**
     * Run all error handling examples
     */
    async run() {
        console.log("🎯 Starting Error Handling & Debugging Examples");
        console.log("=".repeat(60));

        try {
            this.basicTryCatch();
            this.specificErrorTypes();
            this.nestedTryCatch();
            this.errorPropagation();
            await this.asyncErrorHandling();
            this.globalErrorHandling();
            this.errorRecovery();
            this.errorLoggingAndReporting();
            this.debuggingErrorObjects();
            this.performanceImpactOfErrors();

            // Wait for async operations
            await new Promise((resolve) => setTimeout(resolve, 500));

            this.displayErrorStats();

            console.log("\n🎉 All error handling examples completed!");
        } catch (error) {
            console.error("❌ Error running error handling examples:", error);
            this.logError("main", error);
        }
    }
}

module.exports = new ErrorHandlingDebugging();
