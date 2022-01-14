import _ from 'lodash';

const buildTree = (data1, data2) => {
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
        };
      case !_.has(data2, key):
        return {
          name: key,
          status: 'deleted',
          value: value1,
        };
      case _.isPlainObject(value1) && _.isPlainObject(value2):
        return {
          name: key,
          status: 'nested',
          children: buildTree(value1, value2),
        };
      case _.isEqual(value1, value2):
        return {
          name: key,
          status: 'unchanged',
          value: value1,
        };
      case !_.isEqual(value1, value2):
        return {
          name: key,
          status: 'changed',
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

export default buildTree;
