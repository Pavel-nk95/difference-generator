import _ from 'lodash';

const renderObj = (currentValue, replacer, depth) => {
  const currentIndent = replacer.repeat(depth);
  const bracketIndent = replacer.repeat(depth - 1);
  const lines = Object
    .entries(currentValue)
    .map(([key, val]) => `${currentIndent}${key}: ${_.isPlainObject(val) ? renderObj(val, replacer, depth + 1) : val}`);
  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

const render = (astTree) => {
  const space = '    ';
  const iter = (data, defaultDepth = 1) => {
    const lines = data.map((element) => {
      const {
        name,
        status,
        value,
        children,
        oldValue,
        depth: currentDepth,
      } = element;

      const currentIndent = space.repeat(currentDepth).slice(0, -2);
      const currentValue = _.isPlainObject(value) ? renderObj(value, space, currentDepth + 1)
        : value;
      const currentOldValue = _.isPlainObject(oldValue)
        ? renderObj(oldValue, space, currentDepth + 1) : oldValue;

      switch (true) {
        case status === 'added':
          return `${currentIndent}+ ${name}: ${currentValue}`;
        case status === 'deleted':
          return `${currentIndent}- ${name}: ${currentValue}`;
        case status === 'nested':
          return `${currentIndent}  ${name}: ${iter(children, currentDepth)}`;
        case status === 'changed':
          return `${currentIndent}- ${name}: ${currentOldValue}\n${currentIndent}+ ${name}: ${currentValue}`;
        case status === 'unchanged':
          return `${currentIndent}  ${name}: ${currentValue}`;
        default:
          console.error('Unable to render data');
          break;
      }
      return null;
    });
    return [
      '{',
      ...lines, `${space.repeat(defaultDepth)}}`,
    ].join('\n');
  };
  return iter(astTree, 0);
};

export default render;
