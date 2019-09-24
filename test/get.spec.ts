/* eslint-env node, jest */
/* eslint-disable import/no-unresolved,no-unused-vars */
import HashKeyModel from './models/hashkey';
import CompositeKeyModel from './models/composite-keys';
import { clearTables } from './hooks/create-tables';
/* eslint-enable import/no-unresolved,no-unused-vars */

describe('The get method', () => {
  const model = new HashKeyModel();
  const item = {
    hashkey: 'foobar',
    number: 42,
    bool: false,
    string: 'baz',
    stringset: ['1', 'two', 'tres'],
    list: [1, 'yolo'],
    stringmap: {
      hello: 'world',
    },
  };
  beforeAll(async () => {
    await clearTables();
    await model.save(item);
  });
  test('should return the item with the same hash key', async () => {
    expect(await model.get('foobar')).toEqual(item);
  });
  test('should return null if no item is found with this hash key', async () => {
    expect(await model.get('notfound')).toBeNull();
  });
  test('should throw an error if hash key is not given', async () => {
    try {
      await model.get(null);
      /* eslint-disable-next-line no-undef */
      fail('should throw');
    } catch (e) {
      expect(e.message.includes('Missing HashKey')).toBe(true);
    }
  });
});

describe('The get method [1st overload]', () => {
  const model = new CompositeKeyModel();
  const item = {
    hashkey: 'foo',
    rangekey: 'bar',
    number: 42,
    bool: false,
    string: 'baz',
    stringset: ['1', 'two', 'tres'],
    list: [1, 'yolo'],
    stringmap: {
      hello: 'world',
    },
  };
  beforeAll(async () => {
    await clearTables();
    await model.save(item);
  });
  test('should return the item with the same composite key', async () => {
    expect(await model.get('foo', 'bar')).toEqual(item);
  });
  test('should return null if no item is found with this composite key', async () => {
    expect(await model.get('foo', 'baz')).toBeNull();
  });
  test('should throw an error if hash key is not given', async () => {
    try {
      await model.get(null, 'baz');
      /* eslint-disable-next-line no-undef */
      fail('should throw');
    } catch (e) {
      expect(e.message.includes('Missing HashKey')).toBe(true);
    }
  });
  test('should throw an error if range key is not given', async () => {
    try {
      await model.get('foo');
      /* eslint-disable-next-line no-undef */
      fail('should throw');
    } catch (e) {
      expect(e.message.includes('Missing RangeKey')).toBe(true);
    }
  });
});
