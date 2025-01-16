import { test, expect } from '@playwright/test';
test.describe('Card Component Tests', () => {

    // Вспомогательная ( чтобы запонить пред тест в удалении) функция для добавления товаров в корзину
    async function addItemsToBasket(page, numberOfItems = 2) {
        const cards = page.locator('.cards .card');
        const cardCount = await cards.count();

        // Проверяем, что на странице достаточно карточек
        expect(cardCount).toBeGreaterThanOrEqual(numberOfItems);

        const addedItems = [];

        for (let i = 0; i < numberOfItems; i++) {
            const card = cards.nth(i);
            const itemTitle = await card.locator('.card-title').textContent();
            expect(itemTitle).toBeTruthy();

            const addButton = card.locator('.add-btn');
            await expect(addButton).toHaveText('Add');
            await addButton.click();

            await expect(addButton).toHaveText('Remove');

            addedItems.push(itemTitle?.trim());
        }

        return addedItems;
    }

    // Выполняется перед каждым тестом
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        // Вместо статического ожидания, ждём, когда карточки станут видимыми
        await page.waitForSelector('.cards .card', { timeout: 10000 });
    });

    test('Add items to basket', async ({ page }) => {
        // Добавляем два товара в корзину
        const addedItems = await addItemsToBasket(page, 2);

        // Переходим в корзину
        await page.goto('/basket');
        const basketForm = page.locator('#basket-form');
        await basketForm.waitFor({ state: 'visible', timeout: 10000 });

        // Проверяем общее количество товаров
        const totalItems = basketForm.locator('.total');
        await expect(totalItems).toHaveText('2');

        // Получаем заголовки товаров в корзине
        const basketItems = basketForm.locator('.items a');
        const basketItemCount = await basketItems.count();
        expect(basketItemCount).toBe(2);

        // Сверяем наименования товаров
        for (let i = 0; i < 2; i++) {
            const basketItemTitle = await basketItems.nth(i).textContent();
            expect(basketItemTitle?.trim()).toBe(addedItems[i]);
        }
    });

    test('Remove 1 item from basket', async ({ page }) => {
        // Добавляем два товара в корзину
        const addedItems = await addItemsToBasket(page, 2);

        // Идем в корзину
        await page.goto('/basket');
        const basketForm = page.locator('#basket-form');
        await basketForm.waitFor({ state: 'visible', timeout: 2000 });

        // Проверяем общее количество товаров до удаления
        const totalItemsBefore = basketForm.locator('.total');
        await expect(totalItemsBefore).toHaveText('2');
        await page.waitForTimeout(3000);

        const basketItems = basketForm.locator('.items .item');

        const basketItemCountBefore = await basketItems.count();
        expect(basketItemCountBefore).toBe(2);

        // Идем обратно в на глувную в каталог

        await page.goto('/');

        const firstCard = page.locator('.cards').first()
        const firstRemoveButton = firstCard.locator('.add-btn');
        await expect(firstRemoveButton).toHaveText('Remove')
        await firstRemoveButton.click();
        await expect(firstRemoveButton).toHaveText('Add')

        // Финально идем в корзину

        await page.goto('/basket');

        await expect(basketForm.locator('.total')).toHaveText('1');

        const basketItemCountAfter = await basketForm.locator('.items').count();
        expect(basketItemCountAfter).toBe(1);

        const remainingBasketItemTitle = await basketForm.locator('.items a').nth(0).textContent();
        expect(remainingBasketItemTitle?.trim()).toBe(addedItems[1]);
    });

});
