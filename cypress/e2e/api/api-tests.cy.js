/**
 * API Test Suite
 * Tests API endpoints and responses
 */
describe('API Tests', () => {
  const apiUrl = Cypress.env('apiUrl') || 'https://jsonplaceholder.typicode.com';

  beforeEach(() => {
    cy.fixture('api').as('apiData');
  });

  it('@smoke @regression - Should get list of users', () => {
    cy.request({
      method: 'GET',
      url: `${apiUrl}/users`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.greaterThan(0);
      expect(response.body[0]).to.have.property('id');
      expect(response.body[0]).to.have.property('name');
      expect(response.body[0]).to.have.property('email');
    });
  });

  it('@regression - Should get specific user by ID', () => {
    const userId = 1;
    cy.request({
      method: 'GET',
      url: `${apiUrl}/users/${userId}`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', userId);
      expect(response.body).to.have.property('name');
      expect(response.body).to.have.property('email');
      expect(response.body).to.have.property('address');
      expect(response.body).to.have.property('phone');
    });
  });

  it('@regression - Should create a new post', () => {
    cy.fixture('api').then((apiData) => {
      cy.request({
        method: 'POST',
        url: `${apiUrl}/posts`,
        body: apiData.testData.newPost,
        headers: {
          'Content-Type': 'application/json'
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('id');
        expect(response.body).to.have.property('title', apiData.testData.newPost.title);
        expect(response.body).to.have.property('body', apiData.testData.newPost.body);
        expect(response.body).to.have.property('userId', apiData.testData.newPost.userId);
      });
    });
  });

  it('@regression - Should update an existing post', () => {
    const postId = 1;
    const updatedPost = {
      title: 'Updated Post Title',
      body: 'Updated post body',
      userId: 1
    };

    cy.request({
      method: 'PUT',
      url: `${apiUrl}/posts/${postId}`,
      body: updatedPost,
      headers: {
        'Content-Type': 'application/json'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', postId);
      expect(response.body).to.have.property('title', updatedPost.title);
      expect(response.body).to.have.property('body', updatedPost.body);
    });
  });

  it('@regression - Should delete a post', () => {
    const postId = 1;
    cy.request({
      method: 'DELETE',
      url: `${apiUrl}/posts/${postId}`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('@regression - Should handle 404 for non-existent user', () => {
    cy.request({
      method: 'GET',
      url: `${apiUrl}/users/99999`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it('@regression - Should verify API response headers', () => {
    cy.request({
      method: 'GET',
      url: `${apiUrl}/users/1`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.headers).to.have.property('content-type');
      expect(response.headers['content-type']).to.include('application/json');
    });
  });

  it('@regression - Should get posts for a specific user', () => {
    const userId = 1;
    cy.request({
      method: 'GET',
      url: `${apiUrl}/posts?userId=${userId}`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      response.body.forEach((post) => {
        expect(post).to.have.property('userId', userId);
      });
    });
  });

  it('@regression - Should verify API response time', () => {
    const startTime = Date.now();
    cy.request({
      method: 'GET',
      url: `${apiUrl}/users`,
      failOnStatusCode: false
    }).then((response) => {
      const responseTime = Date.now() - startTime;
      expect(response.status).to.eq(200);
      expect(responseTime).to.be.lessThan(5000); // Should respond within 5 seconds
    });
  });

  it('@regression - Should handle API error gracefully', () => {
    cy.request({
      method: 'GET',
      url: `${apiUrl}/invalid-endpoint`,
      failOnStatusCode: false
    }).then((response) => {
      // API might return 404 or other error status
      expect([404, 400, 500]).to.include(response.status);
    });
  });
});

