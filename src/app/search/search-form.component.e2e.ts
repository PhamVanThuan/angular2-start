'use strict';

var sendKeys = function (el, word) {
  let keys = word.split('');
  for (var i = 0; i < keys.length; ++i) {
    el.sendKeys(keys[i]);
    browser.sleep(500);
  }
};

describe('SearchFormComponent', () => {

  beforeEach((done) => {
    browser.get('/search');
    $('router-outlet').isPresent().then(() => {
      browser.sleep(1000);
      done();
    }, () => {
      // error skipped
      done();
    });
  });

  it('should have input "query" with value set to empty string', () => {
    let input = element(by.css('app #query'));
    let result = '';
    expect(input.getAttribute('value')).toBe(result);
  });

  it('should update view when updating "name" input field', () => {
    let modelDisplay = element(by.css('app pre')),
        input = element(by.css('app #query')),
        result = 'foobar';

    input.clear();
    browser.sleep(500);
    // sending all the keys at once fails on IE10
    sendKeys(input, result);
    expect(modelDisplay.getText()).toContain(result);
  });

  it('should go to "results" page', () => {
    let btn = element(by.buttonText('Submit')),
        input = element(by.css('app #query')),
        result = 'Results',
        query = 'london';

    input.clear();
    browser.sleep(500);
    // sending all the keys at once fails on IE10
    sendKeys(input, query);

    btn.click().then(function() {
      return browser.driver.wait(function() {
        return browser.driver.getCurrentUrl().then(function(url) {
          let h1 = element(by.css('app results h1'));
          expect(h1.getText()).toContain(result);
          return /results\?query=london/.test(url);
        });
      }, 30000);
    });
  });

});