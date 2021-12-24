import * as fs from 'fs';
import * as path from 'path';
import _ from 'lodash';
import parse from './parsers.js';

const getResultStr = (str) => {
  const result = str.slice(1, -1).replaceAll('"', '')
    .replaceAll(':', ': ').replaceAll(',', '\n');
  return `{\n${result}\n}`;
};

const generateData = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const presentData = fs.readFileSync(fullPath, 'utf-8');
  const fileExt = path.extname(filepath);
  const result = parse(presentData, fileExt);
  return result;
};

const genDiff = (filepath1, filepath2) => {
  const data1 = generateData(filepath1);
  const data2 = generateData(filepath2);

  const allKeys = _.sortBy(_.uniq(Object.keys(data1).concat(Object.keys(data2))));
  const resultData = allKeys.reduce((acc, key) => {
    if (_.has(data1, key) && !_.has(data2, key)) {
      acc[`  - ${key}`] = data1[key];
      return acc;
    }
    if (!_.has(data1, key) && _.has(data2, key)) {
      acc[`  + ${key}`] = data2[key];
      return acc;
    }
    if (data1[key] === data2[key]) {
      acc[`    ${key}`] = data1[key];
      return acc;
    }
    acc[`  - ${key}`] = data1[key];
    acc[`  + ${key}`] = data2[key];
    return acc;
  }, {});
  const resultDataStr = JSON.stringify(resultData);
  return getResultStr(resultDataStr);
};

export default genDiff;
