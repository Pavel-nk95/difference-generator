import * as fs from 'fs';
import * as path from 'path';
import parse from './parsers/parser.js';
import render from './formatters/index.js';
import buildTree from './tree.js';

function generateData(filepath) {
  const fullPath = path.resolve(process.cwd(), filepath);
  const presentData = fs.readFileSync(fullPath, 'utf-8');
  const fileExt = path.extname(filepath).substring(1);
  const result = parse(presentData, fileExt);
  return result;
}

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = generateData(filepath1);
  const data2 = generateData(filepath2);
  const astTree = buildTree(data1, data2);
  return render(astTree, formatName);
};

export default genDiff;
