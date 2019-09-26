const React = require("react");
const chalk = require("chalk");
const fs = require("fs");
const { execSync } = require("child_process");
const { join } = require("path");

const FUNCTION_REGEX = /function(.*?)[^(]*/ms;
const SPLIT_EXAMPLES_REGEX = /### (.*?$)(.*?)```jsx(.*?)``` ?/gms;
const FIND_COMPONENT_SCOPE_REGEX = /\<((?!React)[^/a-z][^\s|>\n|.]+)/gm;
const FIND_REACT_SCOPE_REGEX = new RegExp(
  `(?<!React\.)(${Object.keys(React).join("|")})`,
  "g"
);

const POLARIS_URL = "https://github.com/Shopify/polaris-react.git";
const POLARIS_CLONING_PATH = "polaris";
const POLARIS_LOCAL_PATH = "./polaris/src/components";
const SNIPPET_LOCAL_PATH = "./snippets/snippets.json";

function main() {
  execSync(`rm -rf ${POLARIS_CLONING_PATH}`);
  execSync(`git clone ${POLARIS_URL} ${POLARIS_CLONING_PATH}`);

  const componentDirectories = fs.readdirSync(POLARIS_LOCAL_PATH, {
    encoding: "utf8"
  });
  const { readMes, componentsWithoutReadMes } = getReadMes(
    componentDirectories,
    POLARIS_LOCAL_PATH
  );

  if (componentsWithoutReadMes.length) {
    console.warn(
      chalk.red(
        `The following components are missing README files: ${componentsWithoutReadMes.join(
          ", "
        )}`
      )
    );
  }

  const parsedExamples = parseExamples(readMes);
  const snippets = createSnippets(parsedExamples);

  fs.writeFileSync(SNIPPET_LOCAL_PATH, JSON.stringify(snippets, null, 2));

  function parseExamples(readMes) {
    const parsedExamples = {};
    for (const { file, component } of readMes) {
      const examplesMatch = /## Examples(.*)---/gms.exec(file);
      if (!examplesMatch) continue;
      const examplesCaptureGroup = examplesMatch[1];

      const matches = [];
      matchAll(
        examplesCaptureGroup,
        SPLIT_EXAMPLES_REGEX,
        outerCurrentMatch => {
          const [, title, description, code] = outerCurrentMatch;

          const componentImports = [];
          matchAll(code, FIND_COMPONENT_SCOPE_REGEX, innerCurrentMatch => {
            const [, component] = innerCurrentMatch;
            componentImports.push(component.replace("\n", ""));
          });

          const reactScope = [...new Set(code.match(FIND_REACT_SCOPE_REGEX))];

          const name = title
            .split(" ")
            .map(w => {
              return w[0].toUpperCase() + w.slice(1);
            })
            .join("");

          // TODO: trim properties that aren't needed
          matches.push({
            name,
            snippetKeys: [`PE${name}`],
            description: description.trim(),
            code: code.trim(),
            body: createPlayground(
              code.trim(),
              [...new Set(componentImports)],
              reactScope
            ),
            components: [...new Set(componentImports)],
            react: reactScope
          });
        }
      );

      parsedExamples[component] = matches;
    }

    return parsedExamples;
  }

  function matchAll(string, regex, callback) {
    let currentMatch;
    while ((currentMatch = regex.exec(string)) !== null) {
      callback(currentMatch);
    }
  }

  function getReadMes(componentDirectories, polarisPath) {
    let componentsWithoutReadMes = [];
    let readMes = [];
    for (const directory of componentDirectories) {
      const directoryPath = join(polarisPath, directory);
      if (!isDirectory(directoryPath)) continue;
      try {
        const file = fs.readFileSync(`./${directoryPath}/README.md`, {
          encoding: "utf8"
        });
        readMes.push({
          component: directory,
          file
        });
      } catch (err) {
        componentsWithoutReadMes.push(directory);
      }
    }

    return { readMes, componentsWithoutReadMes };
  }

  function createSnippets(parsedExamples) {
    let snippets = {};
    Object.keys(parsedExamples).forEach(component => {
      const examples = parsedExamples[component];
      for (const { name, body, description, snippetKeys } of examples) {
        snippets[name] = {
          prefix: snippetKeys,
          body: body,
          description
        };
      }
    });

    return snippets;
  }

  function isDirectory(dir) {
    return fs.lstatSync(dir).isDirectory();
  }

  function createPlayground(code, components, reactScope) {
    const isFunction = code.includes("function");

    if (isFunction) code.replace(FUNCTION_REGEX, "function Playground");

    const hasReactImports = reactScope.length > 0;
    const hasComponentImports = components.length > 0;

    const reactImports = hasReactImports
      ? `import React, {${reactScope.join(", ")}} from 'react';
`
      : `import React from 'react';
`;
    const componentImports = hasComponentImports
      ? `import {${components.join(", ")}} from '../src';

`
      : ``;

    const playgroundCode = isFunction
      ? `export ${code}`
      : `export function Playground() {
  return (
    ${code}
  );
}`;

    return `${reactImports}${componentImports}${playgroundCode}`;
  }
}

module.exports.main = main;
