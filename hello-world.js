const chalk = require('chalk')
const ansiToImage = require('.')

const colorFile = './fixtures/base16-flat-dark-f1lt3r-256.itermcolors'
const ansiText = chalk`{green 👋 Hello}, {blueBright World} 🌏{redBright !}\n` +
	chalk.bgRed('👋') +
	chalk.bgYellow('🦄') +
	chalk.bgGreen('🐘') + ' ' +
	chalk.strikethrough.italic('13') +
	chalk.bold('3') + chalk.underline('7') + ' ' +
	chalk.bgCyan('🍄') +
	chalk.bgBlue('🎃') +
	chalk.bgMagenta('🐦')

ansiToImage(ansiText, {
	filename: 'examples/hello-world.png',
	fontFamily: 'Courier',
	colors: colorFile,
	scale: 4
})
