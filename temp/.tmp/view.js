

export { default } from 'D:\\babel-test\\temp\\src\\index.tsx';

import * as componentInstances from 'D:\\babel-test\\temp\\src\\index.tsx';

import 'D:\\babel-test\\temp\\src\\index.scss'

export * from 'D:\\babel-test\\temp\\src\\index.tsx';

const coveredComponents = {};

const library = 'BizComps';
const execCompile = !!true;

if (!execCompile) {
  window[library] = Object.assign({__esModule: true}, componentInstances || {}, coveredComponents || {});
}

function getRealComponent(component, componentName) {
  if (component.default) return component.default;
  if (component[componentName]) return component[componentName];
  return component;
}