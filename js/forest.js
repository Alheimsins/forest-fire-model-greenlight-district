const GROUND = 0
const TREE = 1
const BURNING = -1
const BURNED = -2

p5.disableFriendlyErrors = true

let GROUND_COLOR, TREE_COLOR, BURNED_COLOR, BURNING_COLOR

let forest, canvas
let burningTrees = []
let burnedTrees = []

function probability() {
  return !!pGrowth && Math.random() <= pGrowth
}

function touchStarted(event) {
  clicked(event)
}

function mouseClicked(event) {
  clicked(event)
}

function clicked(event) {
  if (event.target.id === "terrain") {
    const y = Math.round(mouseY)
    const x = Math.round(mouseX)
    burningTrees.push({x, y})
  }
}

function preload() {
  forest = [...data]
}

function setup() {
  canvas = createCanvas(800, 600)
  canvas.parent("myCanvas")
  canvas.id("terrain")

  // if the animation runs slow uncomment
  // frameRate(30)

  setInterval(burned, 300)

  // our colors for different terrain
  GROUND_COLOR = color(65, 35, 0)
  TREE_COLOR = color(66, 168, 128)
  BURNED_COLOR = color(0, 0, 0)
  BURNING_COLOR = color(207, 128, 0)

  forest.forEach((row, y) =>
    row.forEach((_, x) => {
      // draw the terrain
      const state = forest[y][x] === GROUND ? GROUND_COLOR : TREE_COLOR
      set(x, y, state)
    })
  )
  updatePixels()
}

function draw() {
  burningTrees.forEach(({x, y}, index, object) => {
    burn(x, y)
    if (forest[y][x] === BURNING) {
      set(x, y, BURNING_COLOR)
      burnedTrees.push({x, y})
    }
    object.splice(index, 1)
  })

  updatePixels()

  // uncomment to display frame rate
  // fill('black'); rect(40, 10, 265, 55); fill('red'); textSize(40); text('frame rate: ' + round(frameRate()), 50, 50);
}

function burn(x, y) {
  // neighbor to the left
  if (x - 1 >= 0 && forest[y][x - 1] === TREE && probability()) {
    forest[y][x - 1] = BURNING
    burningTrees.push({x: x - 1, y})
  }

  // right
  if (x + 1 < width && forest[y][x + 1] === TREE && probability()) {
    forest[y][x + 1] = BURNING
    burningTrees.push({x: x + 1, y})
  }

  // up
  if (y - 1 >= 0 && forest[y - 1][x] === TREE && probability()) {
    forest[y - 1][x] = BURNING
    burningTrees.push({x, y: y - 1})
  }

  // down
  if (y + 1 < height && forest[y + 1][x] === TREE && probability()) {
    forest[y + 1][x] = BURNING
    burningTrees.push({x, y: y + 1})
  }
}

function burned() {
  burnedTrees.forEach(({x, y}, index, object) => {
    forest[y][x] = BURNED
    set(x, y, BURNED_COLOR)
    object.splice(index, 1)
  })
}
