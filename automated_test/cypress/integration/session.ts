/// <reference types="cypress" />

describe('AuthenticateTest', () => {
  it('Should be able to authenticate', () => {
    const email = `johndoe${Date.now()}@email.com`;
    const password = '123456';

    cy.request({
      method: 'POST',
      url: '/users',
      body: {
        name: 'John Doe',
        email,
        password,
      },
    }).then((res) => {
      assert.equal(res.status, 201);
    });

    cy.request({
      method: 'POST',
      url: 'sessions',
      body: {
        email,
        password,
      },
    }).then((res) => {
      assert.equal(res.status, 200);
      assert.isNotNull(res.body.token);
      assert.exists(res.body.user);
    });
  });
});
