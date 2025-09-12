import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');
  
  // Check if the main heading is visible
  await expect(page.locator('h1')).toContainText('Chen Yue');
  
  // Check if navigation is present
  await expect(page.locator('nav')).toBeVisible();
  
  // Check if hero section is present
  await expect(page.locator('section')).toBeVisible();
});

test('navigation works', async ({ page }) => {
  await page.goto('/');
  
  // Test navigation to About page
  await page.click('text=About');
  await expect(page).toHaveURL('/about');
  await expect(page.locator('h1')).toContainText('About Me');
  
  // Test navigation to Projects page
  await page.click('text=Projects');
  await expect(page).toHaveURL('/projects');
  await expect(page.locator('h1')).toContainText('Projects');
  
  // Test navigation to Skills page
  await page.click('text=Skills');
  await expect(page).toHaveURL('/skills');
  await expect(page.locator('h1')).toContainText('Skills');
  
  // Test navigation to Contact page
  await page.click('text=Contact');
  await expect(page).toHaveURL('/contact');
  await expect(page.locator('h1')).toContainText('Get In Touch');
});
