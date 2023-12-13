
describe('Registration success', () => {
  it('should register a new user', () => {
    cy.visit('http://localhost:3000/register.html');

    // Fill in the registration form
    cy.get('#regName').type('John Doe');
    cy.get('#regUsername').type('john_doo');
    cy.get('#regPassword').type('paasssss');
    cy.get('#regEmail').type('john.doe@example.com');

    // Click the register button
    cy.get('button').contains('Register').click();

    // Assert that the registration was successful
    cy.url().should('include', '/register.html'); // Adjust the URL accordingly
    cy.get('div').should('have.class', 'notification success');
  });

  // Add more test cases as needed
});

describe('Registration failed: User already registered', () => {
  it('should register a new user', () => {
    cy.visit('http://localhost:3000/register.html');

    // Fill in the registration form
    cy.get('#regName').type('John Doe');
    cy.get('#regUsername').type('john_doe');
    cy.get('#regPassword').type('paasssss');
    cy.get('#regEmail').type('john.doe@example.com');

    // Click the register button
    cy.get('button').contains('Register').click();

    // Assert that the registration was successful
    cy.url().should('include', '/register.html'); // Adjust the URL accordingly
    cy.get('div').should('have.class', 'notification error');
  });

  // Add more test cases as needed
});

describe('Password validation', () => {
  it('should register a new user', () => {
    cy.visit('http://localhost:3000/register.html');

    // Fill in the registration form
    cy.get('#regName').type('John Doe');
    cy.get('#regUsername').type('john_doe');
    cy.get('#regPassword').type('pa');
    cy.get('#regEmail').type('john.doe@example.com');

    // Click the register button
    cy.get('button').contains('Register').click();

    // Assert that the registration was successful
    cy.url().should('include', '/register.html'); // Adjust the URL accordingly
    cy.get('.error-message').should('have.text', 'Password must be at least 6 characters');
  });

  // Add more test cases as needed
});


describe('Login Page', () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit('http://localhost:3000'); // Adjust the URL accordingly
  });

  it('should display an error for invalid login', () => {
    // Enter invalid credentials
    cy.get('#username').type('invalid_username');
    cy.get('#password').type('invalid_password');

    // Click the login button
    cy.get('button').contains('Login').click();

    // Assert that the error message is displayed
    cy.get('#loginError').should('have.text', 'Invalid username or password');
  });


  it('should redirect to the home page on successful login', () => {
    // Mock a successful login by intercepting the request

    // Enter valid credentials
    cy.get('#username').type('Robbie_Mayer');
    cy.get('#password').type('ccGty0TB0vwRsb9');

    // Click the login button
    cy.get('button').contains('Login').click();


    // Assert that the URL has changed to the home page
    cy.url().should('include', '/home.html'); // Adjust the URL accordingly
  });
});
