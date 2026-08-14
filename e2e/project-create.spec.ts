import { test, expect } from "@playwright/test";
import path from "path";

test("프로젝트 작성 후 목록에서 확인할 수 있다.", async ({ page, request }) => {
    const title = `E2E 테스트 프로젝트 ${Date.now()}`;
    const imagePath = path.resolve(process.cwd(), "e2e/fixtures/test-image.jpg");

    try {
        await page.goto("/dhAdmin");

        const passwordInput = page.getByLabel("비밀번호");

        await passwordInput.fill(process.env.E2E_ADMIN_PASSWORD!);

        await passwordInput.press("Enter");

        await page.waitForURL("/");

        await page.goto("/projects/write");

        await page
            .getByLabel("º 프로젝트 이름")
            .fill(title);
        
        await page
            .getByLabel("º 프로젝트 요약")
            .fill("Playwright E2E 테스트를 확인하고 있습니다.");

        await page
            .getByLabel("º 프로젝트 설명")
            .fill("Playwright E2E 테스트");

        const dateInput = page.getByLabel("작업 기간");

        await dateInput.fill("2026년 08월 01일 - 2026년 08월 14일");

        await page
            .getByLabel("º 썸네일")
            .setInputFiles(imagePath);

        await page
            .getByLabel("º 깃허브 주소")
            .fill("Playwright 깃허브");
            
        await page
            .getByRole("button", { name: "개인" })
            .click();
        
        await page
            .getByRole("button", { name: "완료" })
            .click();
        
        await page
            .getByRole("button", { name: "노출" })
            .click();

        await page
            .getByLabel("º 맡은 역할")
            .fill("전체 테스트");

        await page
            .getByLabel("기능", { exact: true })
            .fill("테스트 기능입니다.");

        await page
            .getByLabel("설명", { exact: true })
            .fill("테스트 중입니다.");

        await page
            .getByLabel("º 회고")
            .fill("테스트 회고");

        const responsePromise = page.waitForResponse(
            response =>
                new URL(response.url()).pathname === "/api/project" &&
                response.request().method() === "POST"
        );

        page.once("dialog", async (dialog) => {
            console.log("alert:", dialog.message());
            await dialog.accept();
        });

        await page
            .getByRole("button", { name: "등록"})
            .click();

        const response = await responsePromise;

        expect(response.ok()).toBeTruthy();

        await page.waitForURL("/projects");

        await expect(page.getByText(title)).toBeVisible();
    } finally {
        const response = await request.delete(
            "/api/project/test-cleanup",
            {
                data: {
                    title,
                },
            }
        );

        expect(response.ok()).toBeTruthy();
    };
});