/* eslint-disable import/no-extraneous-dependencies */
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { expect, test, beforeAll } from '@jest/globals';
import genDiff from '../src/diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let result;

beforeAll(() => {
  result = readFile('expected_result.txt');
});

test('Check generate diff in .json format', () => {
  const diff1 = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(diff1).toEqual(result);
});

test('Check generate diff in .yaml(.yml) format', () => {
  const diff1 = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'));
  const diff2 = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  const diff3 = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'));
  expect(diff1).toEqual(result);
  expect(diff2).toEqual(result);
  expect(diff3).toEqual(result);
});

test('Check generate diff in .yaml(.yml) and .json format', () => {
  const diff1 = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.json'));
  const diff2 = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.json'));
  expect(diff1).toEqual(result);
  expect(diff2).toEqual(result);
});
