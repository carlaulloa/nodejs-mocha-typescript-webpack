import { expect } from 'chai';
import { request } from './a.test';
import { value } from './data';

describe('GET api/data', () => {

  it('should return data', done => {
    request
      .get('/api/data')
      .send()
      .end((err, res) => {
        expect(res.status).to.be.eq(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.eq(value);
        done();
      });
  });
})