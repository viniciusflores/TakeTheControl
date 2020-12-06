// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('CreateUser', (name, email, password) => {
  cy.request({
    method: 'POST',
    url: '/users',
    body: {
      name,
      email,
      password,
    },
  }).then((res) => {
    assert.equal(res.status, 201);
    assert.isNotNull(res.body.id);
    return res.body.id;
  });
});

Cypress.Commands.add('CreateAuthSession', (email, password) => {
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
    return res.body.token;
  });
});

Cypress.Commands.add(
  'CreateAUserAndAuthenticatedHim',
  (name, email, password) => {
    cy.CreateUser(name, email, password);
    cy.CreateAuthSession(email, password).then((token) => {
      return token;
    });
  },
);

Cypress.Commands.add('CreateTask', (token, title, status) => {
  cy.request({
    method: 'post',
    url: 'tasks',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: {
      title,
      status,
    },
  }).then((res) => {
    assert.equal(res.status, 201);
    assert.isNotNull(res.body.id);
    assert.isNotNull(res.body.user_id);
    assert.equal(res.body.title, title);
    assert.equal(res.body.status, status);
    return res.body.id;
  });
});

Cypress.Commands.add(
  'CreateAUserAndAuthenticateHimAndAlsoATaskForHim',
  (name, email, password, title, status) => {
    cy.CreateUser(name, email, password).then((res) => {
      cy.CreateAuthSession(email, password).then((token) => {
        cy.CreateTask(token, title, status).then((taskId) => {
          const response = { token, taskId };
          assert.isNotNull(response.token);
          assert.isNotNull(response.taskId);

          return response;
        });
      });
    });
  },
);
