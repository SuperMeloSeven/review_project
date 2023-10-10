import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
        width: 0,
        height: 0
    }
});

const page = await browser.newPage();

await page.goto('http://www.baidu.com');

await page.focus('#kw');

await page.keyboard.type('hello', {
    delay: 200
});

await page.click('#su');
