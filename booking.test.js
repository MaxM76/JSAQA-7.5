const { clickElement, getText } = require("./lib/commands.js");
let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://qamid.tmweb.ru/client/index.php");
  await page.waitForSelector("h1");
  await clickElement(page, "a:nth-child(2)");
  await clickElement(
    page,
    "body > main > section:nth-child(3) > div:nth-child(2) > ul > li:nth-child(1) > a"
  );
});

afterEach(() => {
  page.close();
});

describe("Booking tickets tests", () => {
  let availableSeatsSelector =
    ".buying-scheme__chair_standart:not(.buying-scheme__chair_taken, .buying-scheme__chair_selected)";

  test("Should book a few tickets", async () => {
    await clickElement(page, availableSeatsSelector);
    await clickElement(page, availableSeatsSelector);
    await clickElement(page, "button.acceptin-button");
    const actual = await getText(page, "h2.ticket__check-title");
    expect(actual).toContain("Вы выбрали билеты:");
  });

  test("Should book vip seat", async () => {
    await clickElement(page, ".buying-scheme__chair_vip");
    await clickElement(page, "button.acceptin-button");
    const actual = await getText(page, "h2.ticket__check-title");
    expect(actual).toContain("Вы выбрали билеты:");
  });

  test("Try to book unavailable seat", async () => {
    await clickElement(page, ".buying-scheme__chair_taken");
    const actual = await page.$eval(".acceptin-button", (link) =>
      link.getAttribute("disabled")
    );
    expect(actual).toEqual("true");
  });
});