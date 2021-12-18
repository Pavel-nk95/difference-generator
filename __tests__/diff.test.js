/* eslint-disable import/no-extraneous-dependencies */
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { expect, test } from '@jest/globals';
import genDiff from '../src/diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('genDiff', () => {
  const result = readFile('expected_result.txt');
  const diff1 = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(diff1).toEqual(result);
});
