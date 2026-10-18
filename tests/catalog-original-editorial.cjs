// Read the rendered Russian feature set without importing the Next page module.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const babel = require('next/dist/compiled/babel/core');
const parser = require('next/dist/compiled/babel/parser');
const source = fs.readFileSync(path.join(process.cwd(), 'src/app/slots/catalog/[slug]/page.tsx'), 'utf8');
const ast = parser.parse(source, { sourceType: 'module', plugins: ['typescript', 'jsx'] });
let literal;
const functions = {};
for (const statement of ast.program.body) {
  if (statement.type === 'VariableDeclaration') {
    for (const declaration of statement.declarations) {
      if (declaration.id.name === 'catalogEditorial') literal = source.slice(declaration.init.start, declaration.init.end);
    }
  }
  if (statement.type === 'FunctionDeclaration' && statement.id) functions[statement.id.name] = source.slice(statement.start, statement.end);
}
if (!literal || !functions.russianMechanicTitle || !functions.expandedEditorialFeatures) throw Error('Original editorial structure changed');
const code = `const catalogEditorial=${literal};${functions.russianMechanicTitle}\n${functions.expandedEditorialFeatures}\nmodule.exports={catalogEditorial,expandedEditorialFeatures};`;
const compiled = babel.transformSync(code, {
  filename: 'catalog-editorial.ts', configFile: false, babelrc: false, compact: true,
  presets: [require('next/dist/compiled/babel/preset-typescript')],
}).code;
const context = { module: { exports: {} } };
vm.runInNewContext(compiled, context, { timeout: 1000 });
module.exports = context.module.exports;
