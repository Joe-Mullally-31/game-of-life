import useGameOfLife from '@hooks/useGameOfLife';
import { Button, TextField } from '@mui/material';
import styles from './GameOfLife.module.scss';

export default function GameOfLife() {
  const {
    gridWidth,
    handleWidthChange,
    gridHeight,
    handleHeightChange,
    toggleAlive,
    isCellAlive,
    advanceGame,
    aliveCount,
    handleReset,
    displayWidth,
    displayHeight,
  } = useGameOfLife();

  const columns = Array.from(Array(gridWidth).keys());
  const rows = Array.from(Array(gridHeight).keys());

  return (
    <div className={styles.container}>
      <div className={styles.gridControls}>
        <div className={styles.gridInputs}>
          <TextField
            className={styles.controlElement}
            id="grid-width"
            inputProps={{ 'data-test': 'x' }}
            label="Grid Width"
            type="number"
            value={displayWidth}
            onChange={(e) => handleWidthChange(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            className={styles.controlElement}
            id="gris-height"
            inputProps={{ 'data-test': 'y' }}
            label="Grid Height"
            type="number"
            value={displayHeight}
            onChange={(e) => handleHeightChange(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            className={styles.controlElement}
            disabled
            id="alive-count"
            inputProps={{ 'data-test': 'alive-count' }}
            label="Alive Count"
            value={aliveCount}
          />
        </div>
        <div className={styles.controlButtons}>
          <div className={styles.controlElement}>
            <Button
              variant="contained"
              data-test="next"
              onClick={() => advanceGame()}
            >
              Next
            </Button>
          </div>
          <div className={styles.controlElement}>
            <Button
              onClick={handleReset}
              className={styles.controlElement}
              variant="contained"
              color="error"
              data-test="reset"
            >
              Reset Game
            </Button>
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridWidth}, 1fr)`,
          gridAutoRows: `1fr`,
          flex: 1,
        }}
      >
        {rows.map((row) => {
          return columns.map((column) => {
            const coordinate = { x: column, y: row };
            const dataTestId = `cell-${column}-${row}-${
              isCellAlive(coordinate) ? 'alive' : 'dead'
            }`;
            return (
              <button
                data-test={dataTestId}
                data-testid={dataTestId}
                onClick={() => toggleAlive(coordinate)}
                key={`${row}-${column}`}
                className={isCellAlive(coordinate) ? styles.alive : styles.dead}
              ></button>
            );
          });
        })}
      </div>
    </div>
  );
}
