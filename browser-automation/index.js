const { Builder, By, Key, until } = require("selenium-webdriver");
const Promise = require("bluebird");
require("selenium-webdriver/testing");
require("chromedriver");

(async () => {
  const driver = await new Builder().forBrowser("chrome").build();
  const actions = driver.actions();

  async function driverWaitTime(ms){
    return driver.wait(Promise.delay(ms).then(() => false), ms);
  }

  try {
    await driver.get("https://www.google.com/");
    // await driver.findElement(By.name("q")).sendKeys("webdriver", Key.RETURN);
    // await driver.wait(Promise.try(() => false), 1000);
    await driverWaitTime(1000);
    await driver.findElement(By.css("input[type=text]")).sendKeys("1846689910/type-18-hek", Key.RETURN);
    await driver.wait(until.elementLocated(By.id("main")), 3000);
    await driverWaitTime(1000);
    await (await driver.findElement(By.css("body"))).click();
    // console.log(driver.findElement(By.css("a[href='https://github.com/1846689910/type-18-hek']")));
    await driver.actions().move({
      duration: 500,
      // origin: driver.findElement(By.css("a[href='https://github.com/1846689910/type-18-hek']")),
      origin: driver.findElement(By.js(() => document.querySelector("a[href='https://github.com/1846689910/type-18-hek']")))
    });
    // (await driver.findElement(By.css("a[href='https://github.com/1846689910/type-18-hek']"))).click();
    // await driver.wait(until.titleContains("1846689910/type-18-hek"), 3000);

    await driverWaitTime(3000);

    // await driver.wait(Promise.delay(10000).then(() => false), 20000);
    // await driver.wait(until.titleIs("webdriver - Google Search"), 1000);
  } finally {
    await driver.quit();
  }
})();
