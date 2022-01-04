const render = (data) => {
  const lines = data.map((element) => {
    const {
      name,
      status,
      value,
      oldValue,
    } = element;
    const space = '    ';
    switch (true) {
      case status === 'added':
        return `${space}+ ${name}: ${value}`;
      case status === 'deleted':
        return `${space}- ${name}: ${value}`;
      case status === 'changed':
        return `${space}- ${name}: ${oldValue}\n${space}+ ${name}: ${value}`;
      case status === 'unchanged':
        return `${space}  ${name}: ${value}`;
      default:
        console.error('Unable to render data');
        break;
    }
    return null;
  });
  return [
    '{',
    ...lines, '}',
  ].join('\n');
};

export default render;
