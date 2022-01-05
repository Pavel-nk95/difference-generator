import * as fs from 'fs';
import * as path from 'path';
import _ from 'lodash';
import parse from './parsers/parser.js';
import render from './formatters/index.js';

function generateData(filepath) {
  const fullPath = path.resolve(process.cwd(), filepath);
  const presentData = fs.readFileSync(fullPath, 'utf-8');
  const fileExt = path.extname(filepath);
  const result = parse(presentData, fileExt);
  return result;
}

const buildAstTree = (data1, data2 = {}, depth = 1) => {
  const allKeys = _.sortBy(_.uniq(Object.keys(data1).concat(Object.keys(data2))));

  const result = allKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    switch (true) {
      case !_.has(data1, key):
        return {
          name: key,
          status: 'added',
          value: value2,
          depth,
        };
      case !_.has(data2, key):
        return {
          name: key,
          status: 'deleted',
          value: value1,
          depth,
        };
      case _.isPlainObject(value1) && _.isPlainObject(value2):
        return {
          name: key,
          status: 'nested',
          depth,
          children: buildAstTree(value1, value2, depth + 1),
        };
      case _.isEqual(value1, value2):
        return {
          name: key,
          status: 'unchanged',
          value: value1,
          depth,
        };
      case !_.isEqual(value1, value2):
        return {
          name: key,
          status: 'changed',
          depth,
          value: value2,
          oldValue: value1,
        };
      default:
        console.error('Unable to generate data');
        break;
    }
    return null;
  });
  return result;
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = generateData(filepath1);
  const data2 = generateData(filepath2);

  const astTree = buildAstTree(data1, data2, 1);
  return render(astTree, formatName);
};

export default genDiff;
