# Conway’s Game of Life

This is a quick demo of [Conway’s Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life), playable from the browser. The project uses
a [Next.js](https://nextjs.org/) application, set up with unit tests, testcafe e2e test and linting, and follows
the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) pattern for commit messages.

## Setup

- Run `npm i` in this directory
- The development server is started with `npm run dev`
- All tests are run using `npm test`
  - Run only unit tests with `npm run test:unit` (these will pass to start
    with)
  - Run only acceptance tests with `npm run test:acceptance` while the
    development server is running (these will fail to start with)

## Playing the game

Select the number of rows and columns for the grid. Select which cells you want to be "alive" (green). Clicking "Next" will move the game onto the next generation, were cells become "alive" or "dead" based on the following criteria:

- Any live cell with fewer than two live neighbours dies, as if by
  underpopulation.
- Any live cell with two or three live neighbours lives on to the next
  generation.
- Any live cell with more than three live neighbours dies, as if by
  overpopulation.
- Any dead cell with exactly three live neighbours becomes a live cell, as if by
  reproduction.

Pressing reset will make all cells "dead".


