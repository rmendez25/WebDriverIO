import Page from "./page.js";

class LoginPage extends Page {
  get username() {
    return $("#user-name");
  }

  get password() {
    return $("#password");
  }

  get submitButton() {
    return $("#login-button");
  }

  get loginErrorMessage() {
    return $('[data-test="error"]');
  }

  //METHODS
  async open() {
    await super.open("");
  }

  async submit() {
    await this.submitButton.click();
  }

  async doLogin(username, password) {
    await this.username.setValue(username);
    await this.password.setValue(password);
    await this.submit();
  }
}

export default new LoginPage();
