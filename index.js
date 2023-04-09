const parser = require("@babel/parser");
const fs = require("fs-extra");
const filePath = "D:\\cms-test\\button2\\src\\index.tsx";
const traverse = require("@babel/traverse").default;
const path = require("path");
const t = require("@babel/types");

const packageName = "input-component";
const tempPath = path.join(process.cwd(), "temp");
const entryFilePath = path.join(tempPath, "src", "index.tsx");
const sourceDirPath = path.join(tempPath, "node_modules", packageName, "src");
const destDirPath = path.join(tempPath, "src", "components", packageName);
const sourcFile = path.join(destDirPath, "index.tsx");
const sourceCode = fs.readFileSync(sourcFile, "utf-8");
// console.log(sourceCode);

fs.ensureDirSync(destDirPath);

fs.copySync(sourceDirPath, destDirPath);

let exportModuleName = "";
let exportInterfaceName = "";

const ast = parser.parse(sourceCode, {
  sourceType: "module",
  plugins: ["typescript", "jsx"],
});
fs.writeFileSync(path.resolve("./ast.json"), JSON.stringify(ast, null, 2));
traverse(ast, {
  ExportNamedDeclaration(path) {
    const node = path.node;
    // console.log(node);
    const copyNode = t.cloneNode(node);
    traverse(
      copyNode,
      {
        TSInterfaceDeclaration(path) {
          console.log(path.node.id.name);
          exportInterfaceName = path.node.id.name;
        },
      },
      {},
      path
    );
  },
  ExportDefaultDeclaration(path) {
    const node = path.node;
    // console.log(node);
    if (node.exportKind === "value" && node.declaration.type === "Identifier") {
      exportModuleName = node.declaration.name;
    }
  },
  // TSInterfaceDeclaration(path) {
  //   console.log(path.node);
  // },
});

const destCode = `
import { createElement } from 'react'; \n
export type { ${exportInterfaceName} } from './components/${packageName}/index'; \n
export { default as ${exportModuleName}} from './components/${packageName}/index'; \n
const bizCssPrefix = 'bizpack'; \n export{ bizCssPrefix };
`;

fs.writeFileSync(entryFilePath, destCode, "utf-8");
