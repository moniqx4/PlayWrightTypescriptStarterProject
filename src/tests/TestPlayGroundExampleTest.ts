describe("Test Playground Tests", () => {
  beforeAll(() => {
    page.goto("http://uitestingplayground.com");
  });

  it("clicking button that ignores dom event ", async () => {
    await page.locator('text="Click"').click();
    await page.locator("#badButton").click();
    expect(page.locator(".btn.btn-success")).toBeTruthy();
  });

  it("checking element visibility", async () => {
    page.locator("#navbarSupportedContent > ul > li:nth-child(1) > a").click();
    await page.locator('text="Visbility"').click();
    await page.locator('text="Hide"').click();
    expect(page.locator('text="Removed"')).toBeNull;
  });
});
