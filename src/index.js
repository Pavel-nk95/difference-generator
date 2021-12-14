import * as fs from 'fs';
import * as path from 'path';
import _ from 'lodash';

const getResultStr = (str) => {
  const result = str.slice(1, -1).replaceAll('"', '')
    .replaceAll(':', ': ').replaceAll(',', '\n');
  return `{\n${result}\n}`;
};

const genDiff = (filepath1, filepath2) => {
  const path1 = path.resolve(process.cwd(), filepath1);
  const path2 = path.resolve(process.cwd(), filepath2);
  const data1 = JSON.parse(fs.readFileSync(path1));
  const data2 = JSON.parse(fs.readFileSync(path2));

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
