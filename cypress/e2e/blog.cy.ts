describe('Blog', () => {
  it('should navigate to the blog index page, click on the first post, and verify the content', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/blog');

    // Find the first blog post link and click it
    cy.get('a[href*="/blog/"]').first().click();

    // The new url should include "/blog/"
    cy.url().should('include', '/blog/');

    // Verify that the post header is visible
    cy.get('header').should('be.visible');

    // Verify that the post title is visible
    cy.get('h1').should('be.visible');

    // Verify that the post content is visible
    cy.get('article').should('be.visible');
  });
});