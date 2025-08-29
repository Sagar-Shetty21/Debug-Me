# Debug-Me - JavaScript Debugging Mastery Project

A comprehensive project designed to teach and practice all types of JavaScript debugging techniques.

## 🎯 Project Overview

This project contains examples and exercises for mastering different debugging approaches:

### 1. **Console Debugging** (`src/console/`)

-   `console-methods.js` - All console methods and techniques
-   `console-advanced.js` - Advanced console features and styling

### 2. **Browser DevTools** (`public/devtools/`)

-   `elements-tab.html` - DOM inspection and manipulation
-   `console-tab.html` - Console debugging in browser
-   `sources-tab.html` - Breakpoints and source debugging
-   `network-tab.html` - Network monitoring and debugging
-   `performance-tab.html` - Performance profiling
-   `application-tab.html` - Storage, PWA, and application debugging
-   `security-tab.html` - Security issues debugging
-   `lighthouse-tab.html` - Lighthouse audits

### 3. **Node.js Debugging** (`src/nodejs/`)

-   `inspector-debugging.js` - Chrome DevTools integration
-   `debugger-statements.js` - Using debugger keyword
-   `cli-debugging.js` - Command line debugging

### 4. **VS Code Debugging** (`.vscode/`)

-   `launch.json` - VS Code debug configurations
-   Examples for different debugging scenarios

### 5. **Error Handling** (`src/errors/`)

-   `try-catch.js` - Exception handling
-   `custom-errors.js` - Custom error types
-   `async-errors.js` - Async/await error handling
-   `unhandled-errors.js` - Global error handlers

### 6. **Testing & Debugging** (`src/testing/`)

-   `unit-tests.js` - Jest debugging
-   `integration-tests.js` - Integration test debugging
-   `mock-debugging.js` - Debugging with mocks

### 7. **Performance Debugging** (`src/performance/`)

-   `memory-leaks.js` - Memory leak detection
-   `performance-issues.js` - Performance bottlenecks
-   `profiling.js` - CPU and memory profiling

### 8. **Async Debugging** (`src/async/`)

-   `promises.js` - Promise debugging
-   `callbacks.js` - Callback debugging
-   `async-await.js` - Async/await debugging

### 9. **Network Debugging** (`src/network/`)

-   `api-calls.js` - API debugging
-   `websockets.js` - WebSocket debugging
-   `fetch-issues.js` - Fetch API debugging

## 🚀 Setup Instructions

1. **Clone/Download the project**
2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Start the development server:**

    ```bash
    npm run serve
    ```

4. **Run Node.js examples:**
    ```bash
    npm start
    ```

## 🐛 Debugging Methods Covered

### Browser DevTools

-   **Elements Tab**: DOM inspection, CSS debugging, accessibility
-   **Console Tab**: Interactive debugging, logging, command execution
-   **Sources Tab**: Breakpoints, watch expressions, call stack
-   **Network Tab**: Request/response analysis, timing, caching
-   **Performance Tab**: Runtime performance, memory usage
-   **Application Tab**: Local storage, session storage, cookies, PWA
-   **Security Tab**: Mixed content, certificate issues
-   **Lighthouse Tab**: Performance, accessibility, SEO audits

### Node.js Debugging

-   Chrome DevTools integration (`--inspect`)
-   VS Code built-in debugger
-   Command line debugging
-   Debugger statements
-   Debug modules

### Advanced Techniques

-   Source maps debugging
-   Remote debugging
-   Mobile debugging
-   Performance profiling
-   Memory leak detection
-   Error boundary debugging

## 🎮 How to Use

### 1. Browser Debugging

Open `http://localhost:8080` and navigate to different HTML files in the `devtools/` folder.

### 2. Node.js Debugging

```bash
# Start with Chrome DevTools
npm run debug-chrome

# Start with breakpoint on first line
npm run debug

# Debug tests
npm run test:debug
```

### 3. VS Code Debugging

1. Open project in VS Code
2. Go to Run and Debug panel (Ctrl+Shift+D)
3. Select desired debug configuration
4. Press F5 to start debugging

## 📁 Project Structure

```
js-debugging-mastery/
├── .vscode/
│   ├── launch.json          # VS Code debug configs
│   └── settings.json        # Project settings
├── public/
│   ├── devtools/           # Browser DevTools examples
│   ├── css/               # Stylesheets
│   └── js/                # Client-side JavaScript
├── src/
│   ├── console/           # Console debugging
│   ├── nodejs/            # Node.js debugging
│   ├── errors/            # Error handling
│   ├── testing/           # Test debugging
│   ├── performance/       # Performance debugging
│   ├── async/             # Async debugging
│   ├── network/           # Network debugging
│   └── index.js           # Main entry point
├── tests/                 # Test files
├── package.json
└── README.md
```

## 🎯 Learning Objectives

By working through this project, you'll master:

-   ✅ All browser DevTools tabs and features
-   ✅ Node.js debugging with Chrome DevTools
-   ✅ VS Code debugging configurations
-   ✅ Console debugging techniques
-   ✅ Breakpoint strategies
-   ✅ Error handling and debugging
-   ✅ Async code debugging
-   ✅ Performance profiling
-   ✅ Network request debugging
-   ✅ Test debugging
-   ✅ Memory leak detection
-   ✅ Remote debugging techniques

## 🔧 Debug Commands Quick Reference

```bash
# Node.js Debugging
node --inspect src/index.js           # Chrome DevTools
node --inspect-brk src/index.js       # Break on first line
node --prof src/performance-issues.js  # Performance profiling

# Testing
npm test                              # Run tests
npm run test:debug                    # Debug tests

# Development
npm run dev                           # Watch mode with nodemon
npm run lint                          # Code linting
```

## 🤝 Contributing

Feel free to add more debugging examples or improve existing ones! Each debugging technique should be well-commented and include both working and buggy code examples.
