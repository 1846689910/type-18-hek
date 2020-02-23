const { Builder, By, Key, until, Origin } = require("selenium-webdriver");
const Promise = require("bluebird");
require("chromedriver");

(async () => {
  const driver = await new Builder().forBrowser("chrome").build();
  const actions = driver.actions();

  async function driverWaitTime(ms){
    return driver.wait(Promise.delay(ms).then(() => false), ms);
  }

  /**
   * @description ensure url or the current page <body> located
   * @param {String} url load page url
   * @param {Number} timeout the timeout ms for page loading
   */
  async function driverWaitUntilBodyLocated(url, timeout=3000, doFocus=true){
    if (url) await driver.get(url);
    const located = await driver.wait(until.elementLocated(By.css("body")), timeout);
    return doFocus ? focusViewport() : located;
  }

  async function focusViewport(){
    return actions
      .move({
        origin: Origin.VIEWPORT
      })
      .click()
      .perform();
  }

  try {
    await driverWaitUntilBodyLocated("https://www.google.com/");

    await driver
      .findElement(By.css("input[type=text]"))
      .sendKeys("1846689910/type-18-hek", Key.RETURN);

    await driverWaitUntilBodyLocated();

    await actions
      .move({
        duration: 500,
        origin: await driver.findElement(
          By.css("a[href='https://github.com/1846689910/type-18-hek']")
        )
      })
      .click().perform();
    
    await driverWaitTime(3000);

  } finally {
    await driver.quit();
  }
})();
