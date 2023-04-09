import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
var _excluded = ["title", "content"];
import * as React from 'react';
import { forwardRef } from 'react';
var ExampleComponent = function ExampleComponent(props, ref) {
  var title = props.title,
    content = props.content,
    others = _objectWithoutPropertiesLoose(props, _excluded);
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: ref,
    className: "ExampleComponent"
  }, others), /*#__PURE__*/React.createElement("h1", null, title), content || 'Hello ExampleComponent');
};
var RefExampleComponent = /*#__PURE__*/forwardRef(ExampleComponent);
RefExampleComponent.displayName = 'ExampleComponent';
export default RefExampleComponent;