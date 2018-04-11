const fs = require('fs')
const PNG = require('pngjs').PNG

const ref = 'examples/basic-example.png'
const tmp = 'tmp/basic-example.png'

const img1 = fs.createReadStream(ref).pipe(new PNG()).on('parsed', doneReading)
// const img2 = fs.createReadStream(tmp).pipe(new PNG()).on('parsed', doneReading)
let filesRead = 0

function doneReading () {
	for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                var idx = ((this.width * y) + x) << 2

                console.log(
                	this.data[idx],
                	this.data[idx + 1],
                	this.data[idx + 2],
                	this.data[idx + 3]
                )


                // invert color
                // this.data[idx] = 255 - this.data[idx];
                // this.data[idx+1] = 255 - this.data[idx+1];
                // this.data[idx+2] = 255 - this.data[idx+2];

                // and reduce opacity
                // this.data[idx+3] = this.data[idx+3] >> 1;
            }
        }

	// const diff = new PNG({width: img1.width, height: img1.height})
	// pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, {threshold: 0.1})
	// diff.pack().pipe(fs.createWriteStream('diff.png'))
}
