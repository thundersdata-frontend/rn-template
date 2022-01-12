import { Container, IndexBar } from 'components';
import { lorem } from 'utils/lorem';

export function IndexBarDemo() {
  return (
    <Container>
      <IndexBar
        sections={data}
        windowSize={50}
        initialNumToRender={250}
        maxToRenderPerBatch={250}
        updateCellsBatchingPeriod={50}
      />
    </Container>
  );
}

const getRandomList = (min: number, max: number): string[] => {
  return new Array(Math.floor(Math.random() * (max - min) + min)).fill('');
};

const charCodeOfA = 'A'.charCodeAt(0);

const data = Array(26)
  .fill('')
  .map((_, i) => ({
    title: String.fromCharCode(charCodeOfA + i),
    data: getRandomList(3, 15).map(() => ({ name: lorem.generateWords(2) })),
  }));
