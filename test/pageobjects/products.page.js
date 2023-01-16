class ProductPage {
  get title() {
    return $(".title");
  }

  get burgerMenuBtn() {
    return $("#react-burger-menu-btn");
  }

  get logoutMenuOption() {
    return $("#logout_sidebar_link");
  }

  async logout() {
    await this.burgerMenuBtn.click();
    await this.logoutMenuOption.click();
  }
}

export default new ProductPage();
