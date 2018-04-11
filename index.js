const ansiToSVG = require('ansi-to-svg')
const deepmerge = require('deepmerge')
const svgToDataURL = require('svg-to-dataurl')
const puppeteer = require('puppeteer')

const saveImage = async (url, opts, dimensions) => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()

	page.setViewport({
		width: dimensions.width,
		height: dimensions.height,
		deviceScaleFactor: opts.scale
	})

	await page.goto(url)

	const screenShotSettings = {
		path: opts.filename,
		omitBackground: true
	}

	if (opts.type === 'jpg') {
		screenShotSettings.quality = opts.quality
	}

	await page.screenshot(screenShotSettings)

	await browser.close()
}

const defaultOptions = {
	type: 'png',

	// Pixel Values:
	fontSize: 14,
	lineHeight: 18,
	paddingTop: 0,
	paddingLeft: 0,
	paddingBottom: 0,
	paddingRight: 0,

	// Font: (use monospace fonts for best results)
	fontFamily: 'SauceCodePro Nerd Font, Source Code Pro, Courier',

	// Assume we would like a Retina-ready image
	scale: 2
}

const handler = async (ansiStr, opts) => {
	opts = deepmerge(defaultOptions, opts || {})
	const svg = ansiToSVG(ansiStr, opts)

	const viewBoxCoords = svg.match(/viewBox="([0-9.]+, [0-9.]+, [0-9.]+, [0-9.]+)"/)[1]
		.split(',').map(n => Math.floor(Number(n)))

	const dataUrl = svgToDataURL(svg)

	const dimensions = {
		width: viewBoxCoords[2],
		height: viewBoxCoords[3]
	}

	await saveImage(dataUrl, opts, dimensions)

	return {
		size: dimensions
	}
}

module.exports = handler
