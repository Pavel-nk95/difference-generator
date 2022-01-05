/* eslint-disable import/no-extraneous-dependencies */
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { expect, test, beforeAll } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let stylishResult;
let plainResult;

beforeAll(() => {
  stylishResult = readFile('expectedStylishResult.txt');
  plainResult = readFile('expectedPlainResult.txt');
});

test('Check generate diff in .yaml(.yml) and .json format. Formatter: stylish', () => {
  const diff1 = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  const diff2 = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'));
  const diff3 = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.json'));
  expect(diff1).toEqual(stylishResult);
  expect(diff2).toEqual(stylishResult);
  expect(diff3).toEqual(stylishResult);
});

test('Check generate diff in .yaml(.yml) and .json format. Formatter: plain', () => {
  const diff1 = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
  const diff2 = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'plain');
  const diff3 = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.json'), 'plain');
  expect(diff1).toEqual(plainResult);
  expect(diff2).toEqual(plainResult);
  expect(diff3).toEqual(plainResult);
});
