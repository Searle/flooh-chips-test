const fs = require('fs');
const path = require('path');

// Paths for input and output directories
const inputDir = path.join(__dirname, '../fips-deploy/chips-test/wasm-ninja-release');
// const outputDir = path.join(__dirname, '../../../dr-c64emu/public');
const outputDir = path.join(__dirname, '../../../../re6502a/app/public');

// Define file sets
const files = [
    'c64.js', 'c64.html', 'c64.wasm',
    'c64-ui.js', 'c64-ui.html', 'c64-ui.wasm'
];

// Read, modify, and write files
files.forEach(file => {
    // Read file content as binary data
    const content = fs.readFileSync(path.join(inputDir, file));

    // Modify JavaScript files by wrapping in a function if required
    let modifiedContent;
    if (file.endsWith('.js')) {
        const jsPrefix = Buffer.from(`window.initC64 = function (Module) {\n`);
        const jsPostfix = Buffer.from(`\n}`);
        modifiedContent = Buffer.concat([jsPrefix, content, jsPostfix]);
    } else {
        modifiedContent = content;
    }

    // Write the file as binary data to the output directory
    fs.writeFileSync(path.join(outputDir, file), modifiedContent);
});

console.log('Files have been successfully processed and written to the output directory.');
