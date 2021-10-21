import userEvent from '@testing-library/user-event'

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Saurav Bajracharya',
      username: 'saurav',
      password: 'saurav',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('saurav')
      cy.get('#password').type('saurav')
      cy.get('#login-button').click()

      cy.contains('Saurav Bajracharya logged-in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('sauraasav')
      cy.get('#password').type('saurav')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })

    it('notification color with wrong credentials is red', function () {
      cy.get('#username').type('sauraasav')
      cy.get('#password').type('saurav')
      cy.get('#login-button').click()

      cy.get('.error').should('have.css', 'color', 'rgb(216, 0, 12)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('saurav')
      cy.get('#password').type('saurav')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('blog created via cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('cypress.com')

      cy.get('#create').click()

      cy.contains('blog created via cypress')
    })

    describe('when there is blog', function () {
      beforeEach(function () {
        cy.contains('create new blog').click()
        cy.get('#title').type('blog created via cypress')
        cy.get('#author').type('cypress')
        cy.get('#url').type('cypress.com')
        cy.get('#create').click()
      })

      it('blog can be liked', function () {
        cy.contains('create new blog').click()
        cy.get('#title').type('another blog')
        cy.get('#author').type('cypress')
        cy.get('#url').type('cypress.com')
        cy.get('#create').click()

        //   cy.contains('blog created via cypress').contains('view')
        // cy.get('.blog')
        //   .contains('blog created via cypress')
        //   .contains('view')
        //   .click()
        // cy.contains('like').click()
        // cy.contains('likes 1')
      })
    })
  })
})
