describe('User Calendar Feature', () => {
  const originalUsername = 'karltheman';
  const originalPassword = 'password';

  it('should login with the original credentials', () => {
    cy.visit('/login'); // Adjust URL as per your application
    cy.get('input[formcontrolname="email"]').should('exist').clear().type(originalUsername);
    cy.get('input[formcontrolname="password"]').clear().type(originalPassword);
    cy.get('button[type="submit"]').click();
    cy.url().should('not.include', '/login'); // Verify login was successful
  });


  it('should highlight dates with exams', () => {
    cy.visit('/user');
    cy.get('.dp-nav-header-btn').click();
    cy.get('.dp-calendar-nav-left').click();
    cy.get('.dp-calendar-nav-left').click();
    cy.get('.dp-calendar-nav-left').click();
    cy.get('[data-date="01-01-2021"]').click();
    cy.get('.highlight-day').should('have.length.greaterThan', 0);
    expect(cy.get('.highlight-day').contains("28"))
  });

  it('should display exam details for the selected date', () => {
    cy.get('.highlight-day').first().click();
    cy.get('.exam-item').should('be.visible');
  });

  it('should show "No exams on this date" for dates without exams', () => {
    // Click a non-highlighted date and check for the no exams message
    cy.get('.dp-calendar-wrapper').not('.highlight-day').first().click();
    cy.contains('No exams on this date').should('be.visible');
  });

  it('should display "Ungraded" link for ungraded exams', () => {
    // Click a date with an ungraded exam and verify the ungraded link is shown
    cy.get('.highlight-day').first().click();
    cy.get('.exam-item list-item:contains("Ungraded")').should('exist');
  });
});
