import LoginPage from "../pageobjects/login.page.js";

describe("Selectors", () => {
  beforeEach(() => {
    browser.maximizeWindow();
    LoginPage.open();
    LoginPage.doLogin("standard_user", "secret_sauce");
  });

  it("Link Text", async () => {
    await $("=Sauce Labs Bike Light").click();

    await expect(browser).toHaveUrlContaining("inventory-item.html?id=0");
  });

  it("Partial Link Text", async () => {
    await $("*=Bolt T-Shirt").click();
    await expect(browser).toHaveUrlContaining("inventory-item.html?id=1");
  });

  it("Element With Text", async () => {
    await $("*=Bolt T-Shirt").click();
    const elem = await $("div=Sauce Labs Bolt T-Shirt");
    await expect(elem).toHaveText("Sauce Labs Bolt T-Shirt");
  });
});
