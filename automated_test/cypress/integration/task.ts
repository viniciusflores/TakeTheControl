/// <reference types="cypress" />

import '../support/commands';

describe('Task Happy Path', () => {
  it('Should be able to create a task', () => {
    const email = `johndoe${Date.now()}@email.com`;
    const password = '123456';

    cy.CreateAUserAndAuthenticatedHim('John Doe', email, password).then(
      (token) => {
        cy.request({
          method: 'post',
          url: 'tasks',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: {
            title: 'New Todo',
            status: 'open',
          },
        }).then((res) => {
          assert.equal(res.status, 201);
          assert.isNotNull(res.body.id);
          assert.isNotNull(res.body.user_id);
          assert.equal(res.body.title, 'New Todo');
          assert.equal(res.body.status, 'open');
        });
      },
    );
  });

  it('Should be able to find a task by Id', () => {
    const username = 'John Doe';
    const email = `johndoe${Date.now()}@email.com`;
    const password = '123456';
    const taskTitle = 'New Todo';
    const taskStatus = 'open';

    cy.CreateAUserAndAuthenticateHimAndAlsoATaskForHim(
      username,
      email,
      password,
      taskTitle,
      taskStatus,
    ).then(({ token, taskId }) => {
      assert.isNotNull(token);
      assert.isNotNull(taskId);

      cy.request({
        method: 'get',
        url: `tasks/${taskId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.id, taskId);
        assert.isNotNull(res.body.user_id);
        assert.equal(res.body.title, taskTitle);
        assert.equal(res.body.status, taskStatus);
      });
    });
  });

  it.skip('Should be able to update a task', () => {
    const username = 'John Doe';
    const email = `johndoe${Date.now()}@email.com`;
    const password = '123456';
    const taskTitle = 'New Todo';
    const taskStatus = 'open';

    cy.CreateAUserAndAuthenticateHimAndAlsoATaskForHim(
      username,
      email,
      password,
      taskTitle,
      taskStatus,
    ).then(({ token, taskId }) => {
      assert.isNotNull(token);
      assert.isNotNull(taskId);

      cy.request({
        method: 'post',
        url: `tasks/${taskId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          title: 'Todo updated',
          status: 'closed',
        },
      }).then((res) => {
        assert.equal(res.status, 201);
        assert.equal(res.body.id, taskId);
        assert.isNotNull(res.body.user_id);
        assert.equal(res.body.title, 'Todo updated');
        assert.equal(res.body.status, 'closed');
      });
    });
  });
});
