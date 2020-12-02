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
    const abc = cy
      .request({
        method: 'post',
        url: '/users',
        body: {
          name: 'John Doe',
          email: `johndoe${Date.now()}@email.com`,
          password: '123456',
        },
      })
      // .its('body.email')
      // .should('not.be.empty')
      .as('user_mail')
      .then((res) => {
        assert.equal(res.status, 201);
        return res.body.email;
      });

    const vini = cy.get('@user_mail');

    console.log(abc);
    console.log(vini);
    console.log(String(vini));

    cy.request({
      method: 'post',
      url: '/users',
      body: {
        name: 'John Doe',
        email: String(vini),
        password: '123456',
      },
      failOnStatusCode: false,
    }).as('response');

    cy.get('@response').then((res) => {
      assert(res.status, '400');
      // assert(res.body.message, )
    });
  });
});
