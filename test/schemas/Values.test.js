/* eslint-env jest */
import { normalize, schema } from '../../src';

describe(schema.Values.name, () => {
  it('normalizes the values of an object with the given schema', () => {
    const cat = new schema.Entity('cats');
    const dog = new schema.Entity('dogs');
    const valuesSchema = new schema.Values({
      dogs: dog,
      cats: cat
    }, (entity, key) => entity.type);

    expect(normalize({
      fido: { id: 1, type: 'dogs' },
      fluffy: { id: 1, type: 'cats' }
    }, valuesSchema)).toMatchSnapshot();
  });

  it('can use a function to determine the schema when normalizing', () => {
    const cat = new schema.Entity('cats');
    const dog = new schema.Entity('dogs');
    const valuesSchema = new schema.Values({
      dogs: dog,
      cats: cat
    }, (entity, key) => `${entity.type}s`);

    expect(normalize({
      fido: { id: 1, type: 'dog' },
      fluffy: { id: 1, type: 'cat' }
    }, valuesSchema)).toMatchSnapshot();
  });
});
