// To run tests do npm i; node register_student.js

const { chromium } = require('playwright');

const STUDENT = {
  firstName: 'Emma',
  lastName:  'Johnson',
  password:  'P@ssw0rd_2025!',
  birthday:  { month: 'June', day: '15', year: '1995' },
  gender:    'Female'
};

STUDENT.email = `${STUDENT.firstName}.${STUDENT.lastName}.${Date.now()}@gmail.com`.toLowerCase();

async function declineCookies(page) {
  console.log('Looking for cookie banner...');
  const labels = [
    /Decline optional cookies/i,
    /Only allow essential cookies/i,
    /Reject all/i,
    /Decline/i,
  ];

  const deadline = Date.now() + 10_000;
  while (Date.now() < deadline) {
    for (const label of labels) {
      const button = page.getByRole('button', { name: label }).first();
      if (await button.isVisible().catch(() => false)) {
        await button.click().catch(() => {});
        console.log('Cookie banner dismissed.');
        await page.waitForTimeout(800);
        return true;
      }
    }
    await page.waitForTimeout(400);
  }
  console.log('No cookie banner found - continuing.');
  return false;
}

async function typeInto(locator, text) {
  await locator.click();
  await locator.fill('');
  await locator.pressSequentially(text, { delay: 70 });
}

async function inputByLabel(page, labelText) {
  const label = page.locator(`label:text-is("${labelText}")`).first();
  await label.waitFor({ timeout: 15_000 });
  const id = await label.getAttribute('for');
  if (!id) throw new Error(`<label> "${labelText}" has no "for" attribute`);
  return page.locator(`#${id}`);
}

async function chooseFromCombobox(page, comboboxLocator, value) {
  await comboboxLocator.click();
  const option = page
    .getByRole('option', { name: value, exact: true })
    .first();
  await option.waitFor({ state: 'visible', timeout: 5_000 });
  await option.click();
}

async function main() {
  const headless = process.env.HEADLESS === 'true';

  const browser = await chromium.launch({ headless });
  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
      '(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    viewport: { width: 1366, height: 900 },
    locale: 'en-US',
  });

  const page = await context.newPage();
  let exitCode = 0;

  try {
    console.log('Opening Facebook signup page...');
    await page.goto('https://www.facebook.com/signup', {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    });

    await declineCookies(page);

    await page.getByText('Get started on Facebook').waitFor({ timeout: 20_000 });

    console.log(`Filling the form for "${STUDENT.firstName} ${STUDENT.lastName}"...`);
    await typeInto(await inputByLabel(page, 'First name'), STUDENT.firstName);
    await typeInto(await inputByLabel(page, 'Last name'),  STUDENT.lastName);

    console.log('Selecting date of birth...');
    await chooseFromCombobox(
      page,
      page.getByRole('combobox', { name: 'Select Month' }),
      STUDENT.birthday.month,
    );
    await chooseFromCombobox(
      page,
      page.getByRole('combobox', { name: 'Select Day' }),
      STUDENT.birthday.day,
    );
    await chooseFromCombobox(
      page,
      page.getByRole('combobox', { name: 'Select Year' }),
      STUDENT.birthday.year,
    );

    console.log(`Selecting gender: ${STUDENT.gender}`);
    await chooseFromCombobox(
      page,
      page.locator('[role="combobox"]', { hasText: 'Select your gender' }),
      STUDENT.gender,
    );

    await typeInto(await inputByLabel(page, 'Mobile number or email'), STUDENT.email);
    await typeInto(await inputByLabel(page, 'Password'),               STUDENT.password);

    console.log('Submitting the form...');
    await page.getByRole('button', { name: 'Submit', exact: true }).click();

    await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {});
    await page.waitForTimeout(3000);

    console.log('Successfully submitted the form');
  } catch (error) {
    exitCode = 1;
    console.error('Automation failed:', error.message);
    try {
      await page.screenshot({ path: 'error.png', fullPage: true });
      console.error('Saved error.png');
    } catch (_) { /* ignore */ }
  } finally {
    await browser.close();
    process.exit(exitCode);
  }
}

main();
