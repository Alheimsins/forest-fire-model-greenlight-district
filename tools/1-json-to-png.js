const Jimp = require('jimp')
const file = require('./map.json')
const fs = require('fs')

const myMap = file.map(line => {
  return line.map(cell => {
    if (cell === 0) {
      return "0,0,0"
    }
    return "255,255,255"
  })
})
// fs.writeFileSync('new_map.json', JSON.stringify({data: a}))


var pixels = myMap
new Jimp(pixels[0].length, pixels.length, (err, image) => {
  if (err) {throw err}
  pixels.forEach((rowPixels, y) => {
    rowPixels.forEach((pixel, x) => {
      var rgb = pixel.split(',')
      var r = Number(rgb[0])
      var g = Number(rgb[1])
      var b = Number(rgb[2])
      var color = Jimp.rgbaToInt(r, g, b, 255)
      image.setPixelColor(color, x, y)
    })
  })
  image.write('OUTPUT_IMAGE.png', (err) => {
    if (err) {throw err}
  })
})
