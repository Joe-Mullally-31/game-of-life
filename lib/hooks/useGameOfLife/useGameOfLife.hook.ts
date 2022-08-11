import { useState } from 'react';

export type Coordinate = {
  x: number;
  y: number;
};

export default function useGameOfLife() {
  const MAX_WIDTH_OR_HEIGHT = 100;
  const MIN_WIDTH_OR_HEIGHT = 3;

  const [gridWidth, setGridWidth] = useState<number>(MIN_WIDTH_OR_HEIGHT);
  const [gridHeight, setGridHeight] = useState<number>(MIN_WIDTH_OR_HEIGHT);
  const [displayWidth, setDisplayWidth] = useState<string>(
    `${MIN_WIDTH_OR_HEIGHT}`,
  );
  const [displayHeight, setDisplayHeight] = useState<string>(
    `${MIN_WIDTH_OR_HEIGHT}`,
  );
  const [aliveCoordinates, setAliveCoordinates] = useState<Coordinate[]>([]);

  const handleReset = () => {
    setAliveCoordinates([]);
  };

  const handleWidthChange = (displayWidth: string) => {
    handleReset();
    setDisplayWidth(displayWidth);
    const width = parseInt(displayWidth) || 0;
    if (width > MAX_WIDTH_OR_HEIGHT) {
      setGridWidth(MAX_WIDTH_OR_HEIGHT);
    } else if (width < MIN_WIDTH_OR_HEIGHT) {
      setGridWidth(MIN_WIDTH_OR_HEIGHT);
    } else {
      setGridWidth(width);
    }
  };

  const handleHeightChange = (displayHeight: string) => {
    handleReset();
    setDisplayHeight(displayHeight);
    const height = parseInt(displayHeight) || 0;
    if (height > MAX_WIDTH_OR_HEIGHT) {
      setGridHeight(MAX_WIDTH_OR_HEIGHT);
    } else if (height < MIN_WIDTH_OR_HEIGHT) {
      setGridHeight(MIN_WIDTH_OR_HEIGHT);
    } else {
      setGridHeight(height);
    }
  };

  const removeCoordinate = (
    coordinatesList: Coordinate[],
    coordinate: Coordinate,
  ) =>
    coordinatesList.filter(
      ({ x, y }) => x !== coordinate.x || y !== coordinate.y,
    );

  const toggleAlive = (coordinate: Coordinate) => {
    const newAliveCoordinates = isCellAlive(coordinate)
      ? removeCoordinate(aliveCoordinates, coordinate)
      : [...aliveCoordinates, coordinate];
    setAliveCoordinates(newAliveCoordinates);
  };

  const isCellAlive = (coordinate: Coordinate) =>
    aliveCoordinates.some(
      ({ x, y }) => x === coordinate.x && y === coordinate.y,
    );

  const advanceGame = () => {
    const newAliveCoordinates: Coordinate[] = [];
    for (let x = 0; x < gridWidth; x++) {
      for (let y = 0; y < gridHeight; y++) {
        const nearbyCoordinates = [-1, 0, 1].flatMap((dX) =>
          [-1, 0, 1].map((dY) => ({ x: x + dX, y: y + dY })),
        );
        const neighbouringCoordinates = removeCoordinate(nearbyCoordinates, {
          x,
          y,
        });
        const aliveNeighbours =
          neighbouringCoordinates.filter(isCellAlive).length;

        if (
          aliveNeighbours == 3 ||
          (isCellAlive({ x, y }) && aliveNeighbours == 2)
        ) {
          newAliveCoordinates.push({ x, y });
        }
      }
    }
    setAliveCoordinates(newAliveCoordinates);
  };

  const aliveCount = aliveCoordinates.length;

  return {
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
  };
}
