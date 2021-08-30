const Jimp = require('jimp')
const fs = require('fs')


const texture = (rgb) => {
  const ground = "0, 0, 0"
  const tree = "255, 255, 255"
  const water = "0, 37, 255"
  const stone = "80, 80, 80"

  if (rgb === ground) {
    return 0
  }

  if (rgb === tree) {
    return 1
  }

  if (rgb === water) {
    return 2
  }

  if (rgb === stone) {
    return 3
  }
}

// Create two-dimensional pixels rgb array based on png image
Jimp.read('OUTPUT_IMAGE.png')
  .then(image => {
    const width = image.bitmap.width
    const height = image.bitmap.height
    const pixels = []
    for (var y = 0; y < height; y++) {
      var rowPixels = []
      for (var x = 0; x < width; x++) {
        var pixel = Jimp.intToRGBA(image.getPixelColor(x, y))
        const rgb = `${pixel.r}, ${pixel.g}, ${pixel.b}`

        rowPixels.push(texture(rgb))
      }
      pixels.push(rowPixels)
    }
    fs.writeFile('INPUT_DATA.json', JSON.stringify(pixels), 'utf8', err => {
      if (err) {throw err}
    }
    );
  })
  .catch(err => {throw err})
