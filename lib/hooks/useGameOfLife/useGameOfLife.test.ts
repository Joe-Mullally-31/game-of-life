import { renderHook } from '@testing-library/react-hooks';
import useGameOfLife from '@hooks/useGameOfLife';
import { act } from 'react-dom/test-utils';

describe('handleWidthChange', () => {
  it('should reset aliveCoordinates when handleWidthChange called', () => {
    const { result } = renderHook(() => useGameOfLife());

    act(() => {
      result.current.toggleAlive({ x: 0, y: 2 });
    });
    expect(result.current.aliveCount).toBe(1);

    act(() => {
      result.current.handleWidthChange('4');
    });
    expect(result.current.aliveCount).toBe(0);
  });

  it('should set gridWidth to 3 when handleWidthChange called with width < 3', () => {
    const { result } = renderHook(() => useGameOfLife());
    act(() => {
      result.current.handleWidthChange('2');
    });
    expect(result.current.gridWidth).toBe(3);
  });

  it('should set gridWidth to 100 when handleWidthChange called with width > 100', () => {
    const { result } = renderHook(() => useGameOfLife());
    act(() => {
      result.current.handleWidthChange('102');
    });
    expect(result.current.gridWidth).toBe(100);
  });

  it('should set gridWidth when handleWidthChange called with 3 < width < 100', () => {
    const { result } = renderHook(() => useGameOfLife());
    act(() => {
      result.current.handleWidthChange('54');
    });
    expect(result.current.gridWidth).toBe(54);
  });
});

describe('handleHeightChange', () => {
  it('should reset aliveCoordinates when handleHeightChange called', () => {
    const { result } = renderHook(() => useGameOfLife());

    act(() => {
      result.current.toggleAlive({ x: 0, y: 2 });
    });
    expect(result.current.aliveCount).toBe(1);

    act(() => {
      result.current.handleHeightChange('4');
    });
    expect(result.current.aliveCount).toBe(0);
  });

  it('should set gridHeight to 3 when handleHeightChange called with height < 3', () => {
    const { result } = renderHook(() => useGameOfLife());
    act(() => {
      result.current.handleHeightChange('2');
    });
    expect(result.current.gridHeight).toBe(3);
  });

  it('should set gridHeight to 100 when handleHeightChange called with height > 100', () => {
    const { result } = renderHook(() => useGameOfLife());
    act(() => {
      result.current.handleHeightChange('102');
    });
    expect(result.current.gridHeight).toBe(100);
  });

  it('should set gridHeight when handleHeightChange called with 3 < height < 100', () => {
    const { result } = renderHook(() => useGameOfLife());
    act(() => {
      result.current.handleHeightChange('54');
    });
    expect(result.current.gridHeight).toBe(54);
  });
});

describe('toggleAlive', () => {
  it('should add a coordinate into aliveCoordinates if not already present', () => {
    const { result } = renderHook(() => useGameOfLife());

    act(() => {
      result.current.toggleAlive({ x: 0, y: 2 });
    });
    expect(result.current.aliveCount).toBe(1);
    expect(result.current.isCellAlive({ x: 0, y: 2 })).toBe(true);

    act(() => {
      result.current.toggleAlive({ x: 1, y: 1 });
    });
    expect(result.current.aliveCount).toStrictEqual(2);
    expect(result.current.isCellAlive({ x: 0, y: 2 })).toBe(true);
    expect(result.current.isCellAlive({ x: 1, y: 1 })).toBe(true);
  });

  it('should remove a coordinate from aliveCoordinates if already present', () => {
    const { result } = renderHook(() => useGameOfLife());

    act(() => {
      result.current.toggleAlive({ x: 0, y: 2 });
    });
    act(() => {
      result.current.toggleAlive({ x: 1, y: 1 });
    });
    expect(result.current.aliveCount).toBe(2);
    expect(result.current.isCellAlive({ x: 0, y: 2 })).toBe(true);
    expect(result.current.isCellAlive({ x: 1, y: 1 })).toBe(true);

    act(() => {
      result.current.toggleAlive({ x: 0, y: 2 });
    });
    expect(result.current.aliveCount).toBe(1);
    expect(result.current.isCellAlive({ x: 0, y: 2 })).toBe(false);
    expect(result.current.isCellAlive({ x: 1, y: 1 })).toBe(true);
  });
});

describe('isCellAlive', () => {
  it('returns true when coordinate is in the aliveCoordinates', () => {
    const { result } = renderHook(() => useGameOfLife());
    act(() => {
      result.current.toggleAlive({ x: 0, y: 2 });
    });

    expect(result.current.isCellAlive({ x: 0, y: 2 })).toBe(true);
  });

  it('returns false when coordinate is not in the aliveCoordinates', () => {
    const { result } = renderHook(() => useGameOfLife());

    expect(result.current.isCellAlive({ x: 0, y: 2 })).toBe(false);
  });
});

describe('advanceGame', () => {
  const setupGame = () => {
    const { result } = renderHook(() => useGameOfLife());
    act(() => {
      result.current.toggleAlive({ x: 0, y: 0 });
    });
    act(() => {
      result.current.toggleAlive({ x: 1, y: 0 });
    });
    act(() => {
      result.current.toggleAlive({ x: 1, y: 2 });
    });
    act(() => {
      result.current.toggleAlive({ x: 2, y: 1 });
    });

    return result;
  };

  it('should set a cell to be alive if surrounded by exactly 3 alive cells', () => {
    const result = setupGame();

    act(() => {
      result.current.advanceGame();
    });

    expect(result.current.isCellAlive({ x: 0, y: 1 })).toBe(true);
  });

  it('should set a cell to be alive if surrounded by exactly 2 alive cells and is already alive', () => {
    const result = setupGame();
    expect(result.current.isCellAlive({ x: 1, y: 0 })).toBe(true);

    act(() => {
      result.current.advanceGame();
    });

    expect(result.current.isCellAlive({ x: 1, y: 0 })).toBe(true);
  });

  it('should set a cell to be dead if surrounded by exactly 2 alive cells but is currently dead', () => {
    const result = setupGame();
    expect(result.current.isCellAlive({ x: 2, y: 2 })).toBe(false);

    act(() => {
      result.current.advanceGame();
    });

    expect(result.current.isCellAlive({ x: 2, y: 2 })).toBe(false);
  });

  it('should set a cell to be dead if surrounded by more than 3 alive cells', () => {
    const result = setupGame();

    act(() => {
      result.current.advanceGame();
    });

    expect(result.current.isCellAlive({ x: 1, y: 1 })).toBe(false);
  });

  it('should set a cell to be dead if surrounded by less than 2 alive cells', () => {
    const result = setupGame();
    expect(result.current.isCellAlive({ x: 2, y: 2 })).toBe(false);

    act(() => {
      result.current.advanceGame();
    });

    expect(result.current.isCellAlive({ x: 0, y: 2 })).toBe(false);
  });
});

describe('aliveCount', () => {
  it('should return the count of alive cells', () => {
    const { result } = renderHook(() => useGameOfLife());
    expect(result.current.aliveCount).toBe(0);
    act(() => {
      result.current.toggleAlive({ x: 0, y: 2 });
    });
    act(() => {
      result.current.toggleAlive({ x: 1, y: 2 });
    });
    expect(result.current.aliveCount).toBe(2);
  });
});

describe('handleReset', () => {
  it('should reset the aliveCoordinates to 0 when handleReset called', () => {
    const { result } = renderHook(() => useGameOfLife());
    act(() => {
      result.current.toggleAlive({ x: 0, y: 2 });
    });
    expect(result.current.aliveCount).toBe(1);

    act(() => {
      result.current.handleReset();
    });
    expect(result.current.aliveCount).toBe(0);
  });
});
