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
    });
  });
});
