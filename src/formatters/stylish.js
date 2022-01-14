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
  const iter = (data, depth) => {
    const lines = data.map((element) => {
      const {
        name,
        status,
        value,
        children,
        oldValue,
      } = element;

      const currentIndent = space.repeat(depth).slice(0, -2);
      const currentValue = _.isPlainObject(value) ? renderObj(value, space, depth + 1)
        : value;
      const currentOldValue = _.isPlainObject(oldValue)
        ? renderObj(oldValue, space, depth + 1) : oldValue;

      switch (true) {
        case status === 'added':
          return `${currentIndent}+ ${name}: ${currentValue}`;
        case status === 'deleted':
          return `${currentIndent}- ${name}: ${currentValue}`;
        case status === 'nested':
          return `${currentIndent}  ${name}: ${iter(children, depth + 1)}`;
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
      ...lines, `${space.repeat(depth - 1)}}`,
    ].join('\n');
  };
  return iter(astTree, 1);
};

export default render;
