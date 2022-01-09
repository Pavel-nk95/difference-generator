/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable object-curly-newline */
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { expect, test, beforeAll, describe } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedResult = {
  json: null,
  plain: null,
  stylish: null,
};

const extensions = ['json', 'yaml', 'yml'];

beforeAll(() => {
  expectedResult.stylish = readFile('expectedStylishResult.txt');
  expectedResult.plain = readFile('expectedPlainResult.txt');
  expectedResult.json = readFile('expectedJsonResult.txt');
});

describe('Check correct generate diff. Formatters: stylish, plain, json', () => {
  test.each(extensions)('comparison file format: %s', (extension) => {
    const firstFile = getFixturePath(`file1.${extension}`);
    const secondFile = getFixturePath(`file2.${extension}`);
    expect(genDiff(firstFile, secondFile, 'stylish')).toEqual(expectedResult.stylish);
    expect(genDiff(firstFile, secondFile, 'plain')).toEqual(expectedResult.plain);
    expect(genDiff(firstFile, secondFile, 'json')).toEqual(expectedResult.json);
  });
});
