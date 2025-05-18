import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  let pipe: FilterPipe;

  beforeEach(() => {
    pipe = new FilterPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the original array if filterString is empty', () => {
    const input = [{ name: 'Sandy' }, { name: 'Mayar' }];
    const result = pipe.transform(input, '', 'name');
    expect(result).toEqual(input);
  });

  it('should return the original array if input is empty', () => {
    const result = pipe.transform([], 'Sandy', 'name');
    expect(result).toEqual([]);
  });

  it('should filter array by property value', () => {
    const input = [
      { name: 'Sandy', role: 'developer' },
      { name: 'Mayar', role: 'designer' },
      { name: 'Noura', role: 'developer' },
    ];
    const result = pipe.transform(input, 'developer', 'role');
    expect(result.length).toBe(2);
    expect(result).toEqual([
      { name: 'Sandy', role: 'developer' },
      { name: 'Noura', role: 'developer' },
    ]);
  });

  it('should return empty array if no match is found', () => {
    const input = [{ name: 'Sandy' }, { name: 'Mayar' }];
    const result = pipe.transform(input, 'Ahmed', 'name');
    expect(result).toEqual([]);
  });
});
