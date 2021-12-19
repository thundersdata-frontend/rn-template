import { Container } from 'components';
import { IndexBar, Section } from 'components/IndexBar';
import { lorem } from 'utils/lorem';

const getRandomList = (min: number, max: number): string[] => {
  return new Array(Math.floor(Math.random() * (max - min) + min)).fill('');
};

const charCodeOfA = 'A'.charCodeAt(0);
const data: Section[] = Array(26)
  .fill('')
  .map((_, i) => ({
    title: String.fromCharCode(charCodeOfA + i),
    items: getRandomList(3, 10).map(() => ({ name: lorem.generateWords(2) })),
  }));

export function Homepage() {
  return (
    <Container hasHeader={false}>
      <IndexBar data={data} />
    </Container>
  );
}
