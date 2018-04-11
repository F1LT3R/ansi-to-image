import fs from 'fs'
import test from 'ava'
import chalk from 'chalk'
import pixelmatch from 'pixelmatch'
// eslint-disable-next-line no-unused-vars
import open from 'open'
import ansiToImage from '.'

const generateRefs = false
const imgDiffPassThreshold = 100

const fixtures = {
	chalkBaseStylesANSI: String(fs.readFileSync('./fixtures/fixture.chalk-styles.ansi'))
}

const image = filepath => {
	return fs.readFileSync(filepath)
}

test('Basic example', async t => {
	const ansiText = chalk`Your {red $wish}\n is {bgYellow.cyan my} command.`

	const ref = 'examples/basic-example.png'
	const tmp = 'tmp/basic-example.png'

	const result = await ansiToImage(ansiText, {
		filename: generateRefs ? ref : tmp,
		type: 'png',
		scale: 2
	})

	console.log('data:image/png;base64,' + fs.readFileSync(tmp, {encoding: 'base64'}))

	const expectedImg = image(ref)
	const actualImg = image(tmp)
	const threshold = pixelmatch(expectedImg, actualImg, null, result.size.width, result.size.height)
	t.true(threshold < imgDiffPassThreshold)

	// // Open
	// open(tmp)
})

// test('iTerm2Colors colors file', async t => {
// 	const ansiText = chalk`Your {red $wish}\n is {bgYellow.cyan my} command.`
// 	const colorFile = './fixtures/base16-flat-dark-f1lt3r-256.itermcolors'

// 	const ref = 'examples/iterm2colors-file.png'
// 	const tmp = 'tmp/iterm2colors-file.png'

// 	const result = await ansiToImage(ansiText, {
// 		filename: generateRefs ? ref : tmp,
// 		colors: colorFile
// 	})

// 	const expectedImg = image(ref)
// 	const actualImg = image(tmp)
// 	const threshold = pixelmatch(expectedImg, actualImg, null, result.size.width, result.size.height)
// 	t.true(threshold < imgDiffPassThreshold)

// 	// // Open
// 	// open(ref)
// })

// test('Emojis', async t => {
// 	const ansiText = chalk.bgRed('🌈') +
// 		chalk.bgYellow('🦄') +
// 		chalk.bgGreen('🐘') +
// 		chalk.bgCyan('🍄') +
// 		chalk.bgBlue('🎃') +
// 		chalk.bgMagenta('🐦') +
// 		chalk.bgRed('🖤') +
// 		chalk.bgYellow('😳') +
// 		chalk.bgGreen('😒') +
// 		chalk.bgCyan('😮') +
// 		chalk.bgBlue('😐') +
// 		chalk.bgMagenta('😱') +
// 		chalk.bgRed('😕') +
// 		chalk.bgYellow('😕') +
// 		chalk.bgGreen('😑') +
// 		chalk.bgCyan('😘')

// 	const colorFile = './fixtures/base16-flat-dark-f1lt3r-256.itermcolors'

// 	const ref = 'examples/emojis.png'
// 	const tmp = 'tmp/emojis.png'

// 	const result = await ansiToImage(ansiText, {
// 		filename: generateRefs ? ref : tmp,
// 		colors: colorFile
// 	})

// 	const expectedImg = image(ref)
// 	const actualImg = image(tmp)
// 	const threshold = pixelmatch(expectedImg, actualImg, null, result.size.width, result.size.height)
// 	t.true(threshold < imgDiffPassThreshold)

// 	// // Open
// 	// open(ref)
// })

// test('Chalk base styles', async t => {
// 	const ansiText = fixtures.chalkBaseStylesANSI

// 	const ref = 'examples/chalk-base-styles.png'
// 	const tmp = 'tmp/chalk-base-styles.png'

// 	const result = await ansiToImage(ansiText, {
// 		filename: generateRefs ? ref : tmp,
// 		colors: './fixtures/base16-flat-dark-f1lt3r-256.itermcolors'
// 	})

// 	const expectedImg = image(ref)
// 	const actualImg = image(tmp)
// 	const threshold = pixelmatch(expectedImg, actualImg, null, result.size.width, result.size.height)
// 	t.true(threshold < imgDiffPassThreshold)

// 	// // Open
// 	// open(ref)
// })

// test('Powerline font compatibility', async t => {
// 	const ansiText = chalk` {bgGreen.white Testing background colors } butting adjacent lines. \n` +
// 		chalk` {red ✘ }{bgBlue.black  ~/repos/minkjs/ansi-to }{bgYellow.blue  }{bgYellow.black  svg-image-plugins ● }{yellow } ava powerline-fonts.test.js \n` +
// 		chalk`  {green 1 passed}`

// 	const ref = 'examples/powerline-font.png'
// 	const tmp = 'tmp/powerline-font.png'

// 	const result = await ansiToImage(ansiText, {
// 		filename: generateRefs ? ref : tmp,
// 		colors: './fixtures/base16-flat-dark-f1lt3r-256.itermcolors',
// 		fontFamily: 'SauceCodePro Nerd Font'
// 	})

// 	const expectedImg = image(ref)
// 	const actualImg = image(tmp)
// 	const threshold = pixelmatch(expectedImg, actualImg, null, result.size.width, result.size.height)
// 	t.true(threshold < imgDiffPassThreshold)

// 	// // Open
// 	// open(ref)
// })

// test('Light iTerm2 color scheme', async t => {
// 	const ansiText = fixtures.chalkBaseStylesANSI

// 	const ref = 'examples/light-iterm2-color-scheme.png'
// 	const tmp = 'tmp/light-iterm2-color-scheme.png'

// 	const result = await ansiToImage(ansiText, {
// 		filename: generateRefs ? ref : tmp,
// 		colors: './fixtures/base16-tomorrow-256.itermcolors'
// 	})

// 	const expectedImg = image(ref)
// 	const actualImg = image(tmp)
// 	const threshold = pixelmatch(expectedImg, actualImg, null, result.size.width, result.size.height)
// 	t.true(threshold < imgDiffPassThreshold)

// 	// // Open
// 	// open(ref)
// })

// test('Padding', async t => {
// 	const ansiText = chalk`{red.bold padding} {green.italic woo!}`

// 	const ref = 'examples/padding.png'
// 	const tmp = 'tmp/padding.png'

// 	const result = await ansiToImage(ansiText, {
// 		filename: generateRefs ? ref : tmp,
// 		colors: './fixtures/base16-flat-dark-f1lt3r-256.itermcolors',
// 		paddingTop: 14,
// 		paddingLeft: 14,
// 		paddingRight: 14,
// 		paddingBottom: 14
// 	})

// 	const expectedImg = image(ref)
// 	const actualImg = image(tmp)
// 	const threshold = pixelmatch(expectedImg, actualImg, null, result.size.width, result.size.height)
// 	t.true(threshold < imgDiffPassThreshold)

// 	// // Open
// 	// open(ref)
// })

// test('Save jpeg: 0% quality, scale 1', async t => {
// 	const ansiText = fixtures.chalkBaseStylesANSI

// 	const ref = 'examples/jpeg-0-percent-quality.jpg'
// 	const tmp = 'tmp/jpeg-0-percent-quality.jpg'

// 	const result = await ansiToImage(ansiText, {
// 		filename: generateRefs ? ref : tmp,
// 		colors: './fixtures/base16-flat-dark-f1lt3r-256.itermcolors',
// 		type: 'jpeg',
// 		quality: 0,
// 		scale: 1
// 	})

// 	const expectedImg = image(ref)
// 	const actualImg = image(tmp)
// 	const threshold = pixelmatch(expectedImg, actualImg, null, result.size.width, result.size.height)
// 	t.true(threshold < imgDiffPassThreshold)

// 	// // Open
// 	// open(ref)
// 	// open(tmp)
// })
