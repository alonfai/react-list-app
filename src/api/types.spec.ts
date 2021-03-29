import { ResponseError } from './types';

describe('ResponseError class', () => {
  it('status flag', () => {
    const e = new ResponseError('My Error', 404);
    expect(e.status).toEqual(404);
  });

  it('toString()', () => {
    const err = new ResponseError('My Error', 500);
    expect(err.toString()).toEqual('500: My Error');
  });
});
