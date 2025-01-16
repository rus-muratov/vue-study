import { test, expect } from '@playwright/test';
test.describe('Login Tests', () => {

    test.beforeEach(async ({ page }) => {
        // Navigate to the Login Page before each test
        await page.goto('/login');
        const loginForm = page.locator('#login-form');
        await expect(loginForm).toBeVisible({ timeout: 1000 });
    });


    test('Login', async ({ page }) => {
        await page.goto('/login');
        const loginForm = page.locator('#login-form');

        await page.fill('#login', 'admin');
        await page.fill('#password', '123');
        await page.click('.btn-login');
        const userName = page.locator('.user-name');
        await expect(userName).toBeVisible()
        await expect(userName).toHaveText('Admin');

        const logout = page.locator('.log-out-btn');
        await expect(userName).toBeVisible()
        await expect(logout).toBeVisible()
        await expect(userName).toHaveText('Admin');
        await expect(logout).toHaveText('Logout');
    });

    test('Fill personal data', async ({ page }) => {
        await page.goto('/login');
        const loginForm = page.locator('#login-form');
        const testName = 'Ruslan'

        await page.fill('#login', 'admin');
        await page.fill('#password', '123');
        await page.click('.btn-login');
        const userForm = page.locator('#user-form');
        await expect(userForm).toBeVisible()
        await page.fill('#firstName', testName);
        await page.fill('#lastName', 'Muratov');
        await page.fill('#email', 'test@test.com');
        await page.click('#submit-personal');

        page.on('dialog', async dialog => {
            expect(dialog.type()).toBe('alert');
            expect(dialog.message()).toBe('Form submitted successfully!');
            await dialog.accept();
        });

        await page.reload();
        const userName = page.locator('.user-name');
        await expect(userName).toHaveText(testName);
    });

});
