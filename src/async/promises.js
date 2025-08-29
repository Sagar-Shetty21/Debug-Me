/**
 * Async Debugging - Promises, Async/Await, and Callbacks
 *
 * This module demonstrates debugging techniques for asynchronous JavaScript code,
 * including promises, async/await, and callback-based code.
 */

class AsyncDebugging {
    constructor() {
        this.requestId = 0;
        this.pendingOperations = new Set();
        this.completedOperations = [];
    }

    /**
     * Basic Promise Debugging
     */
    basicPromiseDebugging() {
        console.log("\n=== 1. BASIC PROMISE DEBUGGING ===");

        // DEBUGGING TIP: Set breakpoint here and step through promise creation
        const simplePromise = new Promise((resolve, reject) => {
            console.log("🏗️  Promise executor runs immediately");
            // DEBUGGING: This executes synchronously
            debugger;

            setTimeout(() => {
                const success = Math.random() > 0.5;
                if (success) {
                    console.log("✅ Promise resolving");
                    resolve("Promise resolved successfully");
                } else {
                    console.log("❌ Promise rejecting");
                    reject(new Error("Promise rejected"));
                }
            }, 100);
        });

        // DEBUGGING: .then() and .catch() are added to microtask queue
        simplePromise
            .then((result) => {
                console.log("📥 Promise result:", result);
                // DEBUGGING: Set breakpoint here to examine resolved value
                return result;
            })
            .catch((error) => {
                console.error("📥 Promise error:", error.message);
                // DEBUGGING: Examine error object and stack trace
                debugger;
            })
            .finally(() => {
                console.log("🏁 Promise finally block");
            });

        return simplePromise;
    }

    /**
     * Promise Chaining Debugging
     */
    promiseChaining() {
        console.log("\n=== 2. PROMISE CHAINING DEBUGGING ===");

        return this.fetchUser(1)
            .then((user) => {
                console.log("👤 User fetched:", user.name);
                // DEBUGGING: Examine user object
                debugger;

                // Return promise for chaining
                return this.fetchUserPosts(user.id);
            })
            .then((posts) => {
                console.log(`📝 Posts fetched: ${posts.length} posts`);
                // DEBUGGING: Set conditional breakpoint: posts.length > 2

                // Chain another promise
                return this.fetchPostComments(posts[0].id);
            })
            .then((comments) => {
                console.log(`💬 Comments fetched: ${comments.length} comments`);
                return comments;
            })
            .catch((error) => {
                // DEBUGGING: Any error in the chain ends up here
                console.error("❌ Chain error:", error.message);
                console.trace("Error location trace");
                throw error; // Re-throw if you want it to propagate
            });
    }

    /**
     * Async/Await Debugging
     */
    async asyncAwaitDebugging() {
        console.log("\n=== 3. ASYNC/AWAIT DEBUGGING ===");

        try {
            // DEBUGGING: Step through async function execution
            console.log("🚀 Starting async operation");

            // Each await pauses execution here
            const user = await this.fetchUser(2);
            console.log("✅ User loaded:", user.name);
            // DEBUGGING: Function pauses here until promise resolves

            const posts = await this.fetchUserPosts(user.id);
            console.log("✅ Posts loaded:", posts.length);
            // DEBUGGING: Another pause point

            // Parallel async operations
            console.log("🔄 Running parallel operations...");
            const [comments, likes, shares] = await Promise.all([
                this.fetchPostComments(posts[0].id),
                this.fetchPostLikes(posts[0].id),
                this.fetchPostShares(posts[0].id),
            ]);

            console.log(
                `✅ Parallel results: ${comments.length} comments, ${likes} likes, ${shares} shares`
            );

            return {
                user,
                posts: posts.length,
                engagement: { comments: comments.length, likes, shares },
            };
        } catch (error) {
            // DEBUGGING: Async/await errors have cleaner stack traces
            console.error("❌ Async/await error:", error.message);
            console.error("Stack trace:", error.stack);

            // DEBUGGING: Set breakpoint to examine error state
            debugger;
            throw error;
        }
    }

    /**
     * Error Handling in Async Code
     */
    async asyncErrorHandling() {
        console.log("\n=== 4. ASYNC ERROR HANDLING ===");

        // Error in promise chain
        console.log("Testing promise chain error handling...");

        this.fetchUser(999) // Non-existent user
            .then((user) => {
                console.log("This should not execute");
                return user;
            })
            .catch((error) => {
                console.error("🔧 Promise chain caught error:", error.message);
                // DEBUGGING: Examine error propagation in promise chains
            });

        // Error in async/await
        try {
            console.log("Testing async/await error handling...");
            await this.flakyAsyncOperation();
        } catch (error) {
            console.error("🔧 Async/await caught error:", error.message);
            // DEBUGGING: Compare error handling between promises and async/await
        }

        // Unhandled promise rejection (dangerous!)
        console.log("Creating unhandled promise rejection...");
        // Uncomment to see unhandled rejection
        // Promise.reject(new Error('Unhandled rejection'));

        // Promise.all error behavior
        try {
            const results = await Promise.all([
                this.fetchUser(1),
                this.fetchUser(999), // This will fail
                this.fetchUser(2),
            ]);
            console.log("All users fetched:", results);
        } catch (error) {
            console.error("🔧 Promise.all failed fast:", error.message);
            // DEBUGGING: Promise.all fails on first rejection
        }

        // Promise.allSettled for better error handling
        const settledResults = await Promise.allSettled([
            this.fetchUser(1),
            this.fetchUser(999), // This will fail
            this.fetchUser(2),
        ]);

        console.log("Promise.allSettled results:");
        settledResults.forEach((result, index) => {
            if (result.status === "fulfilled") {
                console.log(`✅ User ${index}:`, result.value.name);
            } else {
                console.error(`❌ User ${index}:`, result.reason.message);
            }
        });
    }

    /**
     * Debugging Callback-based Code
     */
    callbackDebugging() {
        console.log("\n=== 5. CALLBACK DEBUGGING ===");

        return new Promise((resolve) => {
            // Nested callbacks (callback hell)
            this.fetchUserCallback(3, (error, user) => {
                if (error) {
                    console.error("❌ Callback error:", error.message);
                    return resolve();
                }

                console.log("👤 Callback user:", user.name);
                // DEBUGGING: Set breakpoint in callback

                this.fetchUserPostsCallback(user.id, (error, posts) => {
                    if (error) {
                        console.error(
                            "❌ Posts callback error:",
                            error.message
                        );
                        return resolve();
                    }

                    console.log(`📝 Callback posts: ${posts.length}`);
                    // DEBUGGING: Nested callback debugging can be tricky

                    this.fetchPostCommentsCallback(
                        posts[0].id,
                        (error, comments) => {
                            if (error) {
                                console.error(
                                    "❌ Comments callback error:",
                                    error.message
                                );
                                return resolve();
                            }

                            console.log(
                                `💬 Callback comments: ${comments.length}`
                            );
                            // DEBUGGING: Deep nesting makes debugging harder
                            debugger;
                            resolve();
                        }
                    );
                });
            });
        });
    }

    /**
     * Promise vs Callback Conversion
     */
    promiseCallbackConversion() {
        console.log("\n=== 6. PROMISE/CALLBACK CONVERSION ===");

        // Promisify callback-based function
        const promisifiedFetch = (userId) => {
            return new Promise((resolve, reject) => {
                this.fetchUserCallback(userId, (error, user) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(user);
                    }
                });
            });
        };

        // Use promisified version
        return promisifiedFetch(4)
            .then((user) => {
                console.log("✅ Promisified callback result:", user.name);
                // DEBUGGING: Compare ease of debugging promises vs callbacks
                return user;
            })
            .catch((error) => {
                console.error("❌ Promisified error:", error.message);
            });
    }

    /**
     * Async Debugging Tools and Techniques
     */
    async debuggingToolsAndTechniques() {
        console.log("\n=== 7. ASYNC DEBUGGING TOOLS ===");

        // Track pending operations
        const trackingPromise = this.createTrackedPromise("user-fetch", () =>
            this.fetchUser(5)
        );

        const trackingPromise2 = this.createTrackedPromise("posts-fetch", () =>
            this.fetchUserPosts(5)
        );

        // Monitor pending operations
        this.monitorPendingOperations();

        try {
            const [user, posts] = await Promise.all([
                trackingPromise,
                trackingPromise2,
            ]);
            console.log("✅ Tracked operations completed");
        } catch (error) {
            console.error("❌ Tracked operation failed:", error);
        }

        // Wait for monitoring to complete
        await new Promise((resolve) => setTimeout(resolve, 100));
    }

    /**
     * Race Conditions and Timing Issues
     */
    async raceConditionsDebugging() {
        console.log("\n=== 8. RACE CONDITIONS ===");

        // Race condition example
        let sharedResource = 0;

        const increment = async (id, delay) => {
            console.log(`🏃 Task ${id} starting`);

            // Read shared resource
            const current = sharedResource;
            console.log(`📖 Task ${id} read value: ${current}`);

            // Simulate async work
            await new Promise((resolve) => setTimeout(resolve, delay));

            // Update shared resource (race condition!)
            sharedResource = current + 1;
            console.log(`✏️  Task ${id} wrote value: ${sharedResource}`);

            // DEBUGGING: Set breakpoints to see race condition
            debugger;
        };

        // Start multiple tasks that create race condition
        console.log("Starting tasks with race condition...");
        await Promise.all([
            increment(1, 100),
            increment(2, 50),
            increment(3, 75),
        ]);

        console.log(
            `🏁 Final shared resource value: ${sharedResource} (expected: 3)`
        );

        // Promise.race debugging
        console.log("\nTesting Promise.race...");
        try {
            const winner = await Promise.race([
                this.delayedOperation("Fast", 100, "fast-result"),
                this.delayedOperation("Medium", 200, "medium-result"),
                this.delayedOperation("Slow", 300, "slow-result"),
            ]);

            console.log("🏆 Race winner:", winner);
            // DEBUGGING: Only first resolved promise value is returned
        } catch (error) {
            console.error("❌ Race error:", error.message);
            // DEBUGGING: Promise.race fails if first promise rejects
        }
    }

    /**
     * Memory Leaks in Async Code
     */
    async memoryLeakDebugging() {
        console.log("\n=== 9. ASYNC MEMORY LEAKS ===");

        // Example 1: Unresolved promises (memory leak)
        const createLeakyPromises = () => {
            const promises = [];
            for (let i = 0; i < 1000; i++) {
                // These promises never resolve - memory leak!
                const promise = new Promise((resolve) => {
                    // Never call resolve() - this creates a memory leak
                    setTimeout(() => {
                        // Uncomment to fix the leak:
                        // resolve(`Promise ${i} resolved`);
                    }, 10000); // Long timeout
                });
                promises.push(promise);
            }
            return promises;
        };

        // Uncomment to demonstrate memory leak
        // const leakyPromises = createLeakyPromises();
        // console.log('Created 1000 unresolved promises (potential memory leak)');

        // Example 2: Proper cleanup
        const createCleanPromises = () => {
            const promises = [];
            const cleanup = [];

            for (let i = 0; i < 10; i++) {
                const timeoutId = setTimeout(() => {
                    console.log(`Clean promise ${i} resolved`);
                }, 100);

                const promise = new Promise((resolve) => {
                    const id = setTimeout(() => resolve(`Promise ${i}`), 100);
                    cleanup.push(() => clearTimeout(id));
                });

                promises.push(promise);
            }

            // Return cleanup function
            return {
                promises,
                cleanup: () => cleanup.forEach((fn) => fn()),
            };
        };

        const { promises, cleanup } = createCleanPromises();

        try {
            const results = await Promise.all(promises);
            console.log("✅ Clean promises completed:", results.length);
        } finally {
            cleanup(); // Always cleanup
            console.log("🧹 Cleanup completed");
        }
    }

    // Helper methods for async operations simulation

    async fetchUser(id) {
        const requestId = ++this.requestId;
        console.log(`🔍 Fetching user ${id} (request ${requestId})`);

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (id === 999) {
                    reject(new Error(`User ${id} not found`));
                } else {
                    resolve({
                        id,
                        name: `User ${id}`,
                        email: `user${id}@example.com`,
                    });
                }
            }, Math.random() * 100 + 50);
        });
    }

    async fetchUserPosts(userId) {
        console.log(`📝 Fetching posts for user ${userId}`);

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (userId === 999) {
                    reject(new Error(`Posts for user ${userId} not found`));
                } else {
                    const posts = Array.from(
                        { length: Math.floor(Math.random() * 5) + 1 },
                        (_, i) => ({
                            id: `${userId}-${i}`,
                            title: `Post ${i} by User ${userId}`,
                            content: "Lorem ipsum...",
                        })
                    );
                    resolve(posts);
                }
            }, Math.random() * 100 + 30);
        });
    }

    async fetchPostComments(postId) {
        console.log(`💬 Fetching comments for post ${postId}`);

        return new Promise((resolve) => {
            setTimeout(() => {
                const comments = Array.from(
                    { length: Math.floor(Math.random() * 10) },
                    (_, i) => ({
                        id: `${postId}-comment-${i}`,
                        text: `Comment ${i} on post ${postId}`,
                        author: `Commenter ${i}`,
                    })
                );
                resolve(comments);
            }, Math.random() * 80 + 20);
        });
    }

    async fetchPostLikes(postId) {
        return new Promise((resolve) => {
            setTimeout(() => resolve(Math.floor(Math.random() * 100)), 30);
        });
    }

    async fetchPostShares(postId) {
        return new Promise((resolve) => {
            setTimeout(() => resolve(Math.floor(Math.random() * 20)), 40);
        });
    }

    async flakyAsyncOperation() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() < 0.3) {
                    resolve("Flaky operation succeeded");
                } else {
                    reject(new Error("Flaky operation failed"));
                }
            }, 100);
        });
    }

    // Callback versions for demonstration
    fetchUserCallback(id, callback) {
        setTimeout(() => {
            if (id === 999) {
                callback(new Error(`User ${id} not found`));
            } else {
                callback(null, {
                    id,
                    name: `Callback User ${id}`,
                    email: `user${id}@example.com`,
                });
            }
        }, 50);
    }

    fetchUserPostsCallback(userId, callback) {
        setTimeout(() => {
            const posts = Array.from({ length: 2 }, (_, i) => ({
                id: `${userId}-${i}`,
                title: `Callback Post ${i}`,
            }));
            callback(null, posts);
        }, 30);
    }

    fetchPostCommentsCallback(postId, callback) {
        setTimeout(() => {
            const comments = Array.from({ length: 3 }, (_, i) => ({
                id: `${postId}-comment-${i}`,
                text: `Callback Comment ${i}`,
            }));
            callback(null, comments);
        }, 20);
    }

    createTrackedPromise(name, promiseFactory) {
        const promise = promiseFactory();
        this.pendingOperations.add(name);

        return promise
            .then((result) => {
                this.pendingOperations.delete(name);
                this.completedOperations.push({
                    name,
                    status: "fulfilled",
                    result,
                });
                return result;
            })
            .catch((error) => {
                this.pendingOperations.delete(name);
                this.completedOperations.push({
                    name,
                    status: "rejected",
                    error,
                });
                throw error;
            });
    }

    monitorPendingOperations() {
        const monitor = () => {
            if (this.pendingOperations.size > 0) {
                console.log(
                    "⏳ Pending operations:",
                    Array.from(this.pendingOperations)
                );
                setTimeout(monitor, 50);
            } else {
                console.log("✅ All tracked operations completed");
                console.table(this.completedOperations);
            }
        };

        setTimeout(monitor, 50);
    }

    async delayedOperation(name, delay, result) {
        console.log(`🕐 ${name} operation starting (${delay}ms)`);
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`✅ ${name} operation completed`);
                resolve(result);
            }, delay);
        });
    }

    /**
     * Run all async debugging examples
     */
    async run() {
        console.log("🎯 Starting Async Debugging Examples");
        console.log("=".repeat(60));

        try {
            await this.basicPromiseDebugging();
            await this.promiseChaining();
            await this.asyncAwaitDebugging();
            await this.asyncErrorHandling();
            await this.callbackDebugging();
            await this.promiseCallbackConversion();
            await this.debuggingToolsAndTechniques();
            await this.raceConditionsDebugging();
            await this.memoryLeakDebugging();

            console.log("\n🎉 All async debugging examples completed!");
        } catch (error) {
            console.error("❌ Error running async examples:", error);
        }
    }
}

module.exports = new AsyncDebugging();
