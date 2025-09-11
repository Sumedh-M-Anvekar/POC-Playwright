class Header {
  constructor(page) {
    this.page = page;
    this.logoutButton = page.getByRole('button', { name: 'Sign Out' });
  }

  async logout() {
          await this.logoutButton.click();
          console.log('✅ Logged out successfully');
  }
}

module.exports = { Header };
