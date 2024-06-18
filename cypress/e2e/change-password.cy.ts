describe('Change Password Feature', () => {
  const originalUsername = 'jackb';
  const originalPassword = 'password';
  const newPassword = '123';

  it('should login with the original credentials', () => {
    cy.visit('/login'); // Adjust URL as per your application
    cy.get('input[formcontrolname="email"]').should('exist').clear().type(originalUsername);
    cy.get('input[formcontrolname="password"]').clear().type(originalPassword);
    cy.get('button[type="submit"]').click();
    cy.url().should('not.include', '/login'); // Verify login was successful
  });

  it('should login with the original credentials', () => {
    cy.visit('/login'); // Adjust URL as per your application
    cy.get('input[formcontrolname="email"]').clear().type(originalUsername);
    cy.get('input[formcontrolname="password"]').clear().type(originalPassword);
    cy.get('button[type="submit"]').click();
    cy.url().should('not.include', '/login'); // Verify login was successful
  });

  it('should reset the password and redirect to login page', () => {
    // Assuming user is logged in and there's a UI flow to reset password
    cy.visit('/user'); // Navigate to profile or password reset page

    // Fill in new password details
    cy.get('input[formcontrolname="password"]').type(newPassword);
    cy.get('input[formcontrolname="retype_password"]').type(newPassword);
    cy.get('button[type="submit"]').click(); // Submit new password

    // Check redirection to login page
    cy.url().should('include', '/login');
  });

  it('should login with the new password', () => {
    cy.visit('/login');
    cy.get('input[formcontrolname="email"]').clear().type(originalUsername);
    cy.get('input[formcontrolname="password"]').clear().type(newPassword);
    cy.get('button[type="submit"]').click();
    cy.url().should('not.include', '/login'); // Verify login was successful with new password
  });

  it('should validate the data schema has not changed', () => {
    const userdata = localStorage.getItem('user') || '{}';
    const expectedKeys = ['id', 'role', 'username', 'status', 'passwordHash'];
    expect(Object.keys(JSON.parse(userdata)).length).to.eq(expectedKeys.length);
  });
});
