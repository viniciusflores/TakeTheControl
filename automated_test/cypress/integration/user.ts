/// <reference types="cypress" />

describe('User Test', () => {
  it('Should be possible to create a new user', () => {
    cy.request({
      method: 'post',
      url: '/users',
      body: {
        name: 'John Doe',
        email: `johndoe${Date.now()}@email.com`,
        password: '123456',
      },
    }).then((res) => {
      assert.equal(res.status, 201);
      assert.exists(res.body.id);
      assert.equal(res.body.name, 'John Doe');
    });
  });

  it('Should not possible to create a user with same email from another', () => {
    const userEmail = `johndoe${Date.now()}@email.com`;

    const abc = cy
      .request({
        method: 'post',
        url: '/users',
        body: {
          name: 'John Doe',
          email: userEmail,
          password: '123456',
        },
      })
      .its('body.id')
      .should('not.be.empty');

    cy.request({
      method: 'post',
      url: '/users',
      body: {
        name: 'John Doe',
        email: userEmail,
        password: '123456',
      },
      failOnStatusCode: false,
    }).as('response');

    cy.get('@response').then((res) => {
      assert.equal(res.status, 400);
      assert.equal(res.body.status, 'error');
      assert.equal(res.body.message, 'Email address already used.');
    });
  });
});
