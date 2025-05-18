# Development Guide for WAHA.js

This document provides information for developers who want to contribute to or modify the WAHA.js library.

## Prerequisites

- [Bun](https://bun.sh/) (>= 1.0.0)
- Node.js (>= 14.0.0)

## Setup

```bash
# Clone the repository
git clone https://github.com/ariaseta/waha.js.git
cd waha.js

# Install dependencies
bun install
```

## Building

```bash
# Build the package
bun run build
```

The build process consists of several steps:
- `build:clean`: Removes the previous build artifacts
- `build:types`: Generates TypeScript declaration files
- `build:js`: Compiles the TypeScript code to JavaScript

## Testing

```bash
# Run tests
bun test
```

## Code Quality

```bash
# Lint the code
bun run lint

# Format the code
bun run format
```

## Publishing to npm

To publish this package to npm, follow these steps:

1. Make sure you have an npm account and are logged in:

```bash
npm login
```

2. Update the version in `package.json` following [Semantic Versioning](https://semver.org/):

```bash
# For a patch release (bug fixes)
npm version patch

# For a minor release (new features, backward compatible)
npm version minor

# For a major release (breaking changes)
npm version major
```

3. Build the package:

```bash
bun run build
```

4. Publish to npm:

```bash
npm publish
```

For scoped packages (e.g., @yourusername/waha.js), use:

```bash
npm publish --access public
```

### Publishing a Beta Version

To publish a beta version:

```bash
# Update version with beta tag
npm version prerelease --preid=beta

# Publish with beta tag
npm publish --tag beta
```

Users can then install the beta version with:

```bash
npm install waha.js@beta
```

### Package Files

The package includes the following configuration files:

- `.gitignore`: Specifies files that should be ignored by Git
- `.npmignore`: Specifies files that should be excluded when publishing to npm
- `.npmrc`: Contains npm configuration settings for the package

When publishing to npm, only the following files will be included:
- `dist/`: The compiled JavaScript and TypeScript declaration files
- `README.md`: The main documentation file
- `LICENSE`: The license file
- `API.md`: API reference documentation
- `package.json`: Package metadata and dependencies
