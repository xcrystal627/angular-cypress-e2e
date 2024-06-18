describe('Admin Dashboard Feature', () => {
  const originalUsername = 'admin';
  const originalPassword = 'admin';

  it('should login with the original credentials', () => {
    cy.visit('/login'); // Adjust URL as per your application
    cy.get('input[formcontrolname="email"]').should('exist').clear().type(originalUsername);
    cy.get('input[formcontrolname="password"]').clear().type(originalPassword);
    cy.get('button[type="submit"]').click();
    cy.url().should('not.include', '/login'); // Verify login was successful
    cy.visit('/dashboard'); // Adjust URL as per your application
  });


  it('should center the text in the cells', () => {
    // Check if the cells have centered text
    cy.get('th').each(($cell) => {
      cy.wrap($cell).should('have.css', 'text-align', 'center');
    });
    cy.get('td').each(($cell) => {
      cy.wrap($cell).should('have.css', 'text-align', 'center');
    });
  });

  it('should display only the first 5 words in the Summary column followed by ellipsis', () => {
    // Check each summary cell to ensure it displays the first 5 words followed by ...
    cy.get('.summary').each(($summary) => {
      const text = $summary.text().trim();
      const words = text.split(/\s+/); // Split by any whitespace
      if (words.length > 5) {
        const displayedText = words.slice(0, 5).join(' ') + '...';
        expect($summary.text().trim()).to.eq(displayedText);
      }
    });
  });

  it('should open a scrollable popup with the full summary text when ellipsis is clicked', () => {
    // Simulate click on ellipsis to open the popup
    cy.get(':nth-child(6) > .summary > .truncate').click();

    // Verify the popup appears with the full text and is scrollable
    cy.get('.container-popup').should('be.visible');
    cy.get('.container-popup').then(($popup) => {
      const fullText = $popup.text().trim();
      const isScrollable = $popup.prop('scrollHeight') > $popup.height();
      expect(isScrollable).to.be.true;
    });
  });
});
