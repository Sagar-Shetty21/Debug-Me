/**
 * Advanced Console Debugging Techniques
 * 
 * This module covers advanced console debugging patterns and techniques
 * for complex applications and debugging scenarios.
 */

class AdvancedConsoleDebugging {
    constructor() {
        this.logHistory = [];
        this.debugContext = new Map();
    }

    /**
     * Console Proxy for Intercepting All Console Calls
     */
    setupConsoleProxy() {
        console.log('\n=== CONSOLE PROXY SETUP ===');
        
        // Store original console methods
        const originalConsole = { ...console };
        
        // Create proxy to intercept console calls
        const consoleProxy = new Proxy(console, {
            get(target, prop) {
                if (typeof target[prop] === 'function') {
                    return (...args) => {
                        // Add timestamp and context to all console calls
                        const timestamp = new Date().toISOString();
                        const context = Error().stack.split('\n')[2]?.trim() || 'unknown';
                        
                        // Store in history
                        this.logHistory.push({
                            method: prop,
                            args: args,
                            timestamp,
                            context
                        });
                        
                        // Call original method with enhanced information
                        return originalConsole[prop].call(
                            target, 
                            `[${timestamp}]`, 
                            ...args
                        );
                    }.bind(this);
                }
                return target[prop];
            }.bind(this)
        });
        
        // Replace global console (be careful in production!)
        // global.console = consoleProxy;
        
        console.log('Console proxy setup complete');
        return consoleProxy;
    }

    /**
     * Smart Logging with Context
     */
    contextualLogging() {
        console.log('\n=== CONTEXTUAL LOGGING ===');
        
        const createContextLogger = (context) => {
            return {
                log: (...args) => console.log(`[${context}]`, ...args),
                error: (...args) => console.error(`[${context}]`, ...args),
                warn: (...args) => console.warn(`[${context}]`, ...args),
                debug: (...args) => console.debug(`[${context}]`, ...args)
            };
        };
        
        // Create loggers for different modules
        const authLogger = createContextLogger('AUTH');
        const dbLogger = createContextLogger('DATABASE');
        const apiLogger = createContextLogger('API');
        
        authLogger.log('User login attempt');
        authLogger.error('Invalid credentials');
        
        dbLogger.log('Connecting to database');
        dbLogger.warn('Connection pool nearly full');
        
        apiLogger.log('Processing GET /users request');
        apiLogger.debug('Query parameters:', { limit: 10, offset: 0 });
        
        // DEBUGGING TIP: Contextual loggers help identify which part of your
        // application generated specific log messages
    }

    /**
     * Performance Monitoring with Console
     */
    performanceMonitoring() {
        console.log('\n=== PERFORMANCE MONITORING ===');
        
        const performanceTracker = {
            timers: new Map(),
            
            start(label) {
                this.timers.set(label, {
                    start: performance.now(),
                    checkpoints: []
                });
                console.time(label);
            },
            
            checkpoint(label, description) {
                const timer = this.timers.get(label);
                if (timer) {
                    const now = performance.now();
                    const elapsed = now - timer.start;
                    timer.checkpoints.push({ description, time: elapsed });
                    console.timeLog(label, description, `${elapsed.toFixed(2)}ms`);
                }
            },
            
            end(label) {
                const timer = this.timers.get(label);
                if (timer) {
                    console.timeEnd(label);
                    const totalTime = performance.now() - timer.start;
                    
                    console.group(`📊 Performance Summary: ${label}`);
                    console.table(timer.checkpoints);
                    console.log(`Total time: ${totalTime.toFixed(2)}ms`);
                    console.groupEnd();
                    
                    this.timers.delete(label);
                }
            }
        };
        
        // Demonstrate performance tracking
        performanceTracker.start('Data Processing');
        
        // Simulate work with checkpoints
        this.simulateAsyncWork(100).then(() => {
            performanceTracker.checkpoint('Data Processing', 'Data loaded');
            
            return this.simulateAsyncWork(50);
        }).then(() => {
            performanceTracker.checkpoint('Data Processing', 'Data transformed');
            
            return this.simulateAsyncWork(25);
        }).then(() => {
            performanceTracker.checkpoint('Data Processing', 'Data validated');
            performanceTracker.end('Data Processing');
        });
    }

    /**
     * Memory Usage Tracking
     */
    memoryTracking() {
        console.log('\n=== MEMORY TRACKING ===');
        
        const memoryTracker = {
            snapshots: [],
            
            takeSnapshot(label) {
                if (typeof process !== 'undefined') {
                    const usage = process.memoryUsage();
                    const snapshot = {
                        label,
                        timestamp: Date.now(),
                        heapUsed: usage.heapUsed,
                        heapTotal: usage.heapTotal,
                        rss: usage.rss,
                        external: usage.external
                    };
                    
                    this.snapshots.push(snapshot);
                    console.log(`📸 Memory snapshot: ${label}`);
                    console.table({
                        'Heap Used': `${Math.round(usage.heapUsed / 1024 / 1024)} MB`,
                        'Heap Total': `${Math.round(usage.heapTotal / 1024 / 1024)} MB`,
                        'RSS': `${Math.round(usage.rss / 1024 / 1024)} MB`
                    });
                }
            },
            
            compare(label1, label2) {
                const snap1 = this.snapshots.find(s => s.label === label1);
                const snap2 = this.snapshots.find(s => s.label === label2);
                
                if (snap1 && snap2) {
                    const heapDiff = snap2.heapUsed - snap1.heapUsed;
                    const rssDiff = snap2.rss - snap1.rss;
                    
                    console.group(`🔍 Memory Comparison: ${label1} → ${label2}`);
                    console.log(`Heap difference: ${Math.round(heapDiff / 1024)} KB`);
                    console.log(`RSS difference: ${Math.round(rssDiff / 1024)} KB`);
                    console.groupEnd();
                }
            }
        };
        
        // Demonstrate memory tracking
        memoryTracker.takeSnapshot('Initial');
        
        // Create some objects to consume memory
        const largeArray = new Array(100000).fill(0).map((_, i) => ({ id: i }));
        memoryTracker.takeSnapshot('After array creation');
        
        // Clear the array
        largeArray.length = 0;
        memoryTracker.takeSnapshot('After cleanup');
        
        memoryTracker.compare('Initial', 'After array creation');
        memoryTracker.compare('After array creation', 'After cleanup');
    }

    /**
     * Conditional and Filtered Logging
     */
    conditionalAndFilteredLogging() {
        console.log('\n=== CONDITIONAL & FILTERED LOGGING ===');
        
        const logger = {
            levels: {
                ERROR: 0,
                WARN: 1,
                INFO: 2,
                DEBUG: 3,
                VERBOSE: 4
            },
            
            currentLevel: 2, // INFO level
            
            log(level, message, data) {
                if (this.levels[level] <= this.currentLevel) {
                    const timestamp = new Date().toISOString();
                    const colorMap = {
                        ERROR: '❌',
                        WARN: '⚠️',
                        INFO: 'ℹ️',
                        DEBUG: '🐛',
                        VERBOSE: '📝'
                    };
                    
                    console.log(
                        `${colorMap[level]} [${timestamp}] ${level}: ${message}`,
                        data ? data : ''
                    );
                }
            },
            
            error: function(message, data) { this.log('ERROR', message, data); },
            warn: function(message, data) { this.log('WARN', message, data); },
            info: function(message, data) { this.log('INFO', message, data); },
            debug: function(message, data) { this.log('DEBUG', message, data); },
            verbose: function(message, data) { this.log('VERBOSE', message, data); }
        };
        
        // Test different log levels
        logger.error('This is an error message');
        logger.warn('This is a warning message');
        logger.info('This is an info message');
        logger.debug('This debug message will not show (level too high)');
        logger.verbose('This verbose message will not show (level too high)');
        
        // Change log level and test again
        console.log('\n--- Changing log level to VERBOSE ---');
        logger.currentLevel = 4;
        
        logger.debug('Now debug messages show');
        logger.verbose('And verbose messages too');
    }

    /**
     * Function Call Tracing
     */
    functionTracing() {
        console.log('\n=== FUNCTION CALL TRACING ===');
        
        const tracer = {
            stack: [],
            
            trace(fn, name) {
                return (...args) => {
                    const depth = '  '.repeat(this.stack.length);
                    console.log(`${depth}→ Entering ${name}`, args);
                    
                    this.stack.push(name);
                    
                    try {
                        const result = fn.apply(this, args);
                        
                        // Handle promises
                        if (result && typeof result.then === 'function') {
                            return result.then(value => {
                                this.stack.pop();
                                console.log(`${depth}← Exiting ${name} (async)`, value);
                                return value;
                            }).catch(error => {
                                this.stack.pop();
                                console.log(`${depth}← Error in ${name}`, error);
                                throw error;
                            });
                        } else {
                            this.stack.pop();
                            console.log(`${depth}← Exiting ${name}`, result);
                            return result;
                        }
                    } catch (error) {
                        this.stack.pop();
                        console.log(`${depth}← Error in ${name}`, error);
                        throw error;
                    }
                };
            }
        };
        
        // Example functions to trace
        const calculator = {
            add: tracer.trace(function(a, b) {
                return a + b;
            }, 'add'),
            
            multiply: tracer.trace(function(a, b) {
                return a * b;
            }, 'multiply'),
            
            calculate: tracer.trace(function(x, y) {
                const sum = this.add(x, y);
                const product = this.multiply(x, y);
                return { sum, product };
            }, 'calculate')
        };
        
        // Test the traced functions
        const result = calculator.calculate(5, 3);
        console.log('Final result:', result);
    }

    /**
     * Async Debug Logging
     */
    asyncDebugLogging() {
        console.log('\n=== ASYNC DEBUG LOGGING ===');
        
        const asyncLogger = {
            requestId: 0,
            
            async logAsyncOperation(operation, fn) {
                const id = ++this.requestId;
                const operationName = `${operation}-${id}`;
                
                console.group(`🔄 Starting async operation: ${operationName}`);
                console.time(operationName);
                
                try {
                    const result = await fn();
                    
                    console.timeEnd(operationName);
                    console.log('✅ Operation completed successfully');
                    console.groupEnd();
                    
                    return result;
                } catch (error) {
                    console.timeEnd(operationName);
                    console.error('❌ Operation failed:', error.message);
                    console.groupEnd();
                    
                    throw error;
                }
            }
        };
        
        // Demonstrate async logging
        Promise.all([
            asyncLogger.logAsyncOperation('fetch-user', () => 
                this.simulateAsyncWork(100, { userId: 123 })),
            asyncLogger.logAsyncOperation('fetch-posts', () => 
                this.simulateAsyncWork(150, { posts: ['post1', 'post2'] })),
            asyncLogger.logAsyncOperation('fetch-comments', () => 
                this.simulateAsyncWork(80, { comments: ['Great post!'] }))
        ]).then(results => {
            console.log('🎉 All async operations completed:', results);
        }).catch(error => {
            console.error('💥 One or more operations failed:', error);
        });
    }

    /**
     * Utility method to simulate async work
     */
    async simulateAsyncWork(delay, returnValue = null) {
        return new Promise(resolve => {
            setTimeout(() => resolve(returnValue || `Work completed after ${delay}ms`), delay);
        });
    }

    /**
     * Run all advanced console debugging examples
     */
    async run() {
        console.log('🚀 Starting Advanced Console Debugging Examples');
        console.log('='.repeat(70));
        
        try {
            this.setupConsoleProxy();
            this.contextualLogging();
            this.performanceMonitoring();
            this.memoryTracking();
            this.conditionalAndFilteredLogging();
            this.functionTracing();
            await this.asyncDebugLogging();
            
            // Wait a bit for async operations to complete
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            console.log('\n🎊 All advanced console debugging examples completed!');
            
        } catch (error) {
            console.error('❌ Error running advanced console examples:', error);
        }
    }
}

module.exports = new AdvancedConsoleDebugging();