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

  it('Should not be able to authenticate with non existing user', () => {
    cy.request({
      method: 'POST',
      url: 'sessions',
      body: {
        email: 'nonexistent-user@example.com',
        password: '123456',
      },
      failOnStatusCode: false,
    }).as('response');

    cy.get('@response').then((res) => {
      assert.equal(res.status, 401);
      assert.equal(res.body.status, 'error');
      assert.equal(res.body.message, 'Incorrect email/password combination');
    });
  });

  it('Should not be able to authenticate with wrong password', () => {
    const email = `johndoe${Date.now()}@email.com`;

    cy.request({
      method: 'POST',
      url: '/users',
      body: {
        name: 'John Doe',
        email,
        password: '123456',
      },
    }).then((res) => {
      assert.equal(res.status, 201);
    });

    cy.request({
      method: 'POST',
      url: 'sessions',
      body: {
        email,
        password: 'wrong-password',
      },
      failOnStatusCode: false,
    }).as('response');

    cy.get('@response').then((res) => {
      assert.equal(res.status, 401);
      assert.equal(res.body.status, 'error');
      assert.equal(res.body.message, 'Incorrect email/password combination');
    });
  });
});
