import yaml from 'js-yaml';

// eslint-disable-next-line consistent-return
function parse(data, fileExt) {
  if (fileExt === '.json') {
    return JSON.parse(data);
  }
  if (fileExt === '.yaml' || fileExt === '.yml') {
    return yaml.load(data);
  }
}

export default parse;
