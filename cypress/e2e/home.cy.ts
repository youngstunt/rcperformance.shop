// Chadson v69.0.0: E2E tests for the Guerrilla Automotive homepage.
// V4: Updated tests to reflect the new single-column, vertical scroll layout.

describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display all sections in a vertical flow on all viewports', () => {
    const viewports: Cypress.ViewportPreset[] = ['iphone-6', 'macbook-16'];

    viewports.forEach(viewport => {
      cy.viewport(viewport);
      
      // Verify Hero content is visible
      cy.contains('h1', 'Guerrilla Automotive').should('be.visible');

      // Verify Services content is visible
      cy.contains('h2', 'Our Services').should('be.visible');
      cy.contains('h3', 'ECU Remapping').should('be.visible');

      // Verify Contact content is visible
      cy.contains('h3', 'Get in Touch').should('be.visible');

      // Verify Tabs are NOT present
      cy.get('button[role="tab"]').should('not.exist');
    });
  });
});

describe('Contact Section', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  
  it('should submit the form successfully and show a success message', () => {
    // Intercept the API call and mock a successful response
    cy.intercept('POST', '/api/contact', {
      statusCode: 200,
      body: { message: 'Email sent successfully' },
    }).as('contactRequest');

    // Fill out and submit the form
    cy.get('input[id="name"]').type('Cypress Test');
    cy.get('input[id="email"]').type('cypress@test.com');
    cy.get('textarea[id="message"]').type('This is an E2E test message.');
    cy.get('button[type="submit"]').click();

    // Assertions
    cy.contains('Sending...').should('be.visible');
    cy.wait('@contactRequest');
    cy.contains('Message sent successfully! We will get back to you shortly.').should('be.visible');
    cy.get('input[id="name"]').should('have.value', '');
  });

  it('should show an error message if the form submission fails', () => {
    // Intercept the API call and mock a failed response
    cy.intercept('POST', '/api/contact', {
      statusCode: 500,
      body: { message: 'Failed to send email' },
    }).as('contactRequest');
    
    // Fill out and submit the form
    cy.get('input[id="name"]').type('Cypress Fail');
    cy.get('input[id="email"]').type('cypress.fail@test.com');
    cy.get('textarea[id="message"]').type('This message should fail.');
    cy.get('button[type="submit"]').click();

    // Assertions
    cy.contains('Sending...').should('be.visible');
    cy.wait('@contactRequest');
    cy.contains('Failed to send email').should('be.visible');
    cy.get('input[id="name"]').should('have.value', 'Cypress Fail');
  });

  it('should display the service area map', () => {
    cy.get('.leaflet-container', { timeout: 10000 }).should('be.visible');
  });
});