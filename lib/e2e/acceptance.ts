import { Selector } from 'testcafe';

fixture`Acceptance Tests`.page`http://localhost:3000`;

type SparseAlive = Array<string>;

interface TestCase {
  label: string;
  width: number;
  height: number;
  steps: number;
  initial: SparseAlive;
  final?: SparseAlive;
}

const testCases: TestCase[] = [
  {
    label: 'Blinker',
    width: 5,
    height: 5,
    steps: 7,
    initial: ['2-1', '2-2', '2-3'],
    final: ['1-2', '2-2', '3-2'],
  },
  {
    label: 'Pentadecathlon',
    width: 16,
    height: 9,
    steps: 15,
    initial: [
      '3-4',
      '4-4',
      '5-3',
      '5-5',
      '6-4',
      '7-4',
      '8-4',
      '9-4',
      '10-3',
      '10-5',
      '11-4',
      '12-4',
    ],
  },
];

const getTestExact = (name: string) => `[data-test="${name}"]`;
const getTestPrefix = (prefix: string) => `[data-test^="${prefix}"]`;

test('Game of Life renders and plays correctly', async (t) => {
  await testCases.reduce(
    async (last, { label, steps, height, width, initial, final }) => {
      await last;
      console.log(`Testing ${label}...`);

      const expected = final ?? initial;
      const expectedCellCount = width * height;

      const expectAlive = async (expectedCount: number) => {
        await t
          .expect(Selector(getTestExact('alive-count')).value)
          .eql(expectedCount.toString());
      };

      await t
        .typeText(getTestExact('x'), width.toString(), { replace: true })
        .typeText(getTestExact('y'), height.toString(), { replace: true })

        .expect(Selector(getTestPrefix('cell-')).count)
        .eql(expectedCellCount);

      await expectAlive(0);

      await initial.reduce(async (last, ref) => {
        await last;
        await t.click(getTestPrefix(`cell-${ref}`));
      }, Promise.resolve());

      await expectAlive(initial.length);

      while (steps--) await t.click(getTestExact('next'));

      await expectAlive(expected.length);

      await expected.reduce(async (last, ref) => {
        await last;
        await t
          .expect(Selector(getTestPrefix(`cell-${ref}-alive`)).count)
          .eql(1);
      }, Promise.resolve());
    },
    Promise.resolve(),
  );
});
