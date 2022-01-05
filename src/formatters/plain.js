import _ from 'lodash';

const render = (astTree) => {
  const iter = (data, src) => {
    const lines = data.flatMap((element) => {
      const {
        name,
        status,
        value,
        children,
        oldValue,
      } = element;

      const currentValue = _.isPlainObject(value) ? '[complex value]' : value;
      const currentOldValue = _.isPlainObject(oldValue) ? '[complex value]' : oldValue;
      const srcStr = src === '' ? name : `${src}.${name}`;
      const currentValueStr = typeof currentValue === 'string' && currentValue !== '[complex value]'
        ? `'${currentValue}'` : currentValue;
      const currentOldValueStr = typeof currentOldValue === 'string' && currentOldValue !== '[complex value]'
        ? `'${currentOldValue}'` : currentOldValue;

      switch (true) {
        case status === 'added':
          return `Property '${srcStr}' was added with value: ${currentValueStr}`;
        case status === 'deleted':
          return `Property '${srcStr}' was removed`;
        case status === 'nested':
          return iter(children, `${srcStr}`);
        case status === 'changed':
          return `Property '${srcStr}' was updated. From ${currentOldValueStr} to ${currentValueStr}`;
        case status === 'unchanged':
          return [];
        default:
          console.error('Unable to render data');
          break;
      }
      return null;
    });
    return lines.join('\n');
  };
  return iter(astTree, '');
};

export default render;
