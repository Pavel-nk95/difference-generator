import renderStylish from './stylish.js';
import renderPlain from './plain.js';

export default (astTree, formatName) => {
  if (formatName === 'plain') {
    return renderPlain(astTree);
  }
  return renderStylish(astTree);
};
