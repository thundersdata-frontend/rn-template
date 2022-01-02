import { Container } from 'components';
import { IndexBar, ContentType } from 'components/IndexBar';
import { lorem } from 'utils/lorem';

export function IndexBarDemo() {
  const preparedData = prepare(data);

  return (
    <Container>
      <IndexBar data={preparedData} />
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
    items: getRandomList(3, 10).map(() => ({ name: lorem.generateWords(2) })),
  }));

function prepare(data: any[]) {
  const result: any[] = [];
  data.forEach(({ title, items }) => {
    result.push({ type: ContentType.TITLE, name: title });
    result.push(...items.map((ele: any) => ({ type: ContentType.CONTENT, name: ele.name })));
  });
  return result;
}
