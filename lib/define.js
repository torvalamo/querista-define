'use strict';

const names = {
  Condition: Condition,
  Either: Either,
  Enclose: Enclose,
  Expression: Expression,
  Identifier: Identifier,
  Keyword: Keyword,
  List: List,
  Operator: Operator,
  Option: Option,
  Query: Query,
  Recursive: Recursive,
  Statement: Statement,
  Type: Type,
  Value: Value
};

module.exports = Object.assign((obj) => {
  return Object.assign(obj, names);
}, names);

/**
 * Containers
 */

function Either(...elements) {
  return {
    type: 'either',
    elements: elements.reduce((prev, cur) => {
      // Automatically collapse nested Eithers.
      if (cur.type == 'either') {
        prev.push(...cur.elements);
      } else {
        prev.push(cur);
      }
      return push;
    }, [])
  }
}

function Enclose(...elements) {
  return {
    type: 'enclose',
    elements: elements
  }
}

function List(...elements) {
  return {
    type: 'list',
    elements: elements
  }
}

function Option(...elements) {
  return {
    type: 'option',
    elements: elements
  }
}

function Recursive(label, ...elements) {
  return {
    type: 'recursive',
    label: label,
    elements: elements
  }
}

function Clause(...elements) {
  // Clauses with one element are unnecessary.
  if (elements.length == 1) return elements[0];
  return {
    type: 'clause',
    elements: elements
  }
}

function Statement(...elements) {
  // Statements are root clauses. Exception to allow single elements.
  return {
    type: 'statement',
    elements: elements
  }
}

/**
 * Leaf nodes.
 */

function Condition(label) {
  return {
    type: 'condition',
    label: label
  }
}

function Query(label) {
  return {
    type: 'query',
    label: label
  }
}

function Expression(label) {
  return {
    type: 'expression',
    label: label
  }
}

function Identifier(label) {
  return {
    type: 'identifier',
    label: label
  }
}

function Keyword(name) {
  return {
    type: 'keyword',
    name: name
  }
}

function Operator(label) {
  return {
    type: 'operator',
    label: label
  }
}

function Type(label) {
  return {
    type: 'type',
    label: label
  }
}

function Value(label) {
  return {
    type: 'value',
    label: label
  }
}