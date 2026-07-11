/**
 * Render the /cv page to a polished PDF.
 *
 * Used by the GitHub Action (.github/workflows/build-cv-pdf.yml) and runnable
 * locally:  node scripts/generate-pdf.mjs
 *
 * It loads the live CV page, waits for web fonts, and prints it to
 * print/AshotPahlevanyanCV.pdf using the page's own print stylesheet — so the
 * PDF and the website can never drift apart. No LaTeX, no manual upload.
 */
import puppeteer from 'puppeteer';

const URL = process.env.CV_URL || 'http://localhost:8000/cv/';
const OUT = process.env.CV_OUT || 'print/AshotPahlevanyanCV.pdf';

const browser = await puppeteer.launch({
	headless: 'new',
	args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

try {
	const page = await browser.newPage();
	await page.goto(URL, { waitUntil: 'networkidle0', timeout: 60000 });
	// make sure Fraunces/Inter are loaded before we print
	await page.evaluate(() => document.fonts && document.fonts.ready);
	await page.pdf({
		path: OUT,
		format: 'A4',
		printBackground: true,
		preferCSSPageSize: true, // honour @page size/margins in css/site.css
	});
	console.log(`✓ Wrote ${OUT}`);
} finally {
	await browser.close();
}
