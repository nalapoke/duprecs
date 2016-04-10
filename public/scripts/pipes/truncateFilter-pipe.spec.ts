import { TruncateFilterPipe } from './truncateFilter-pipe';

describe('TruncateFilterPipe', () => {
  let pipe: TruncateFilterPipe;

  beforeEach(() => {
    pipe = new TruncateFilterPipe();
  });

  it('Returns original value if no argument is passed', () => {
    let input = 'This is the input string';
    expect(pipe.transform(input, [])).toEqual(input);
  });

  it('Does not truncate if input string length is lesser than limit passed in', () => {
    let input = 'This is the input string';
    expect(pipe.transform(input, [30])).toEqual(input);
  });

  it('Truncates if input string length is greater than limit passed in', () => {
    let input = 'This is the input string';
    let expected = 'This is...';
    expect(pipe.transform(input, [10])).toEqual(expected);
  });
});
