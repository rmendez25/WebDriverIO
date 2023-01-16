import LoginPage from "../pageobjects/login.page.js";
import ProductsPage from "../pageobjects/products.page.js";

describe("Login Functionality", () => {
  beforeEach(() => {
    browser.maximizeWindow();
  });

  it("Login Happy path", async () => {
    await LoginPage.open();
    await LoginPage.username.setValue("standard_user");
    await LoginPage.password.setValue("secret_sauce");
    await LoginPage.submit();

    await expect(browser).toHaveTitle("Swag Labs");
    await expect(ProductsPage.title).toBeExisting();
    await expect(ProductsPage.title).toHaveTextContaining("PRODUCTS");
  });

  it("Should display Error: Username is required", async () => {
    await LoginPage.open();
    await LoginPage.submit();

    await expect(LoginPage.loginErrorMessage).toHaveTextContaining(
      "Username is required"
    );
  });

  it("Should display Error: Password is required", async () => {
    await LoginPage.open();
    await LoginPage.username.setValue("standard_user");
    await LoginPage.submit();

    await expect(LoginPage.loginErrorMessage).toHaveTextContaining(
      "Password is require"
    );
  });

  it("Shouldn't Login with locked user", async () => {
    await LoginPage.open();
    await LoginPage.username.setValue("locked_out_user");
    await LoginPage.password.setValue("secret_sauce");
    await LoginPage.submit();

    await expect(LoginPage.loginErrorMessage).toHaveTextContaining(
      "Sorry, this user has been locked out"
    );
  });

  it("Should display error when username or password is incorrect", async () => {
    await LoginPage.open();
    await LoginPage.doLogin("standard_user", "wrong_password");

    await expect(LoginPage.loginErrorMessage).toHaveTextContaining(
      "Username and password do not match any user in this service"
    );
  });

  it("Should be able to logout", async function () {
    this.retries(3);
    await LoginPage.open();
    await LoginPage.doLogin("standard_user", "secret_sauce");

    await expect(ProductsPage.title).toHaveTextContaining("PRODUCTS");

    await ProductsPage.burgerMenuBtn.click();
    await ProductsPage.logoutMenuOption.click();

    //ProductsPage.logout();

    await expect(browser).toHaveUrl("https://www.saucedemo.com/");
  });
});
