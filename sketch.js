const ground = 0
const tree = 1
const burning = -1
const burned = -2

let groundColor, treeColor, burnedColor, burningColor
let forest, canvas

const value = 0

function probability() {
  return !!pGrowth && Math.random() <= pGrowth
}

function touchStarted(event) {
  if (event.target.id === "p5-canvas") {
    const y = Math.round(mouseY)
    const x = Math.round(mouseX)
    forest[y][x] = burning
  }
}

function mouseClicked(event) {
  if (event.target.id === "p5-canvas") {
    const y = Math.round(mouseY)
    const x = Math.round(mouseX)
    forest[y][x] = burning
  }
}

function preload() {
  forest = [...data]
}

function setup() {
  canvas = createCanvas(800, 600)
  canvas.parent("myCanvas")
  canvas.id("p5-canvas")
  // if the animation runs slow uncomment
  // frameRate(30)
  setInterval(ashes, 500)

  // our colors for different terrain
  groundColor = color(65, 35, 0)
  treeColor = color(60, 150, 50)
  burnedColor = color(0, 0, 0)
  burningColor = color(207, 128, 0)
}

function ashes() {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (forest[y][x] === burning) forest[y][x] = burned
    }
  }
}

function draw() {
  // go through all the values in our forest...
  loadPixels()
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {

      // update the burn
      burn(x, y)

      // draw the forest
      const value = forest[y][x]
      if (value === ground) {
        set(x, y, groundColor)
      }
      else if (value === tree) {
        set(x, y, treeColor)
      }
      else if (value === burning) {
        set(x, y, burningColor)
      }
      else if (value === burned) {
        set(x, y, burnedColor)
      }
    }

    updatePixels()
  }

  function burn(x, y) {
    // if already not burned yet, skip
    // (since it's not on fire!)
    if (forest[y][x] != burning && forest[y][x] != burned) return

    // otherwise, burn this pixel's neighbors...

    // neighbor to the left
    if (x - 1 >= 0 && forest[y][x - 1] === tree) {
      forest[y][x - 1] = probability() ? burning : tree
    }

    // right
    if (x + 1 < width && forest[y][x + 1] === tree) {
      forest[y][x + 1] = probability() ? burning : tree
    }

    // up
    if (y - 1 >= 0 && forest[y - 1][x] === tree) {
      forest[y - 1][x] = probability() ? burning : tree
    }

    // down
    if (y + 1 < height && forest[y + 1][x] === tree) {
      forest[y + 1][x] = probability() ? burning : tree
    }
  }
}
