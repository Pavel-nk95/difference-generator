import renderStylish from './stylish.js';
import renderPlain from './plain.js';
import renderJson from './json.js';

export default (astTree, formatName) => {
  if (formatName === 'plain') {
    return renderPlain(astTree);
  }
  if (formatName === 'json') {
    return renderJson(astTree);
  }
  return renderStylish(astTree);
};
