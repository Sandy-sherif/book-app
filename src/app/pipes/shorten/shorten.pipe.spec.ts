import { ShortenPipe } from './shorten.pipe';

describe('ShortenPipe', () => {
  let pipe: ShortenPipe;

  beforeEach(() => {
    pipe = new ShortenPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should shorten a long string to 10 characters followed by "..."', () => {
    const result = pipe.transform('This is a long string');
    expect(result).toBe('This is a ...');
  });

  it('should return the same string with "..." if it is exactly 10 characters', () => {
    const result = pipe.transform('1234567890');
    expect(result).toBe('1234567890...');
  });

  it('should not throw error on empty string', () => {
    const result = pipe.transform('');
    expect(result).toBe('...');
  });

  it('should handle short strings gracefully', () => {
    const result = pipe.transform('Hi');
    expect(result).toBe('Hi...');
  });
});
