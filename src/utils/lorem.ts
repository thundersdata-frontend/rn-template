import { LoremIpsum } from 'lorem-ipsum';

export const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

// lorem.generateWords(1)
// lorem.generateSentences(5)
// lorem.generateParagraphs(7)

export const randomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const randomRange = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

// 生成卡片渲染所需要的数据
export const getRandomData = (size = 10) => {
  const data = [...Array(size)].fill('').map(() => {
    return {
      // height: randomRange(10, 350),
      backgroundColor: randomColor(),
      title: generateRandomWords(20),
      imageUrl: getRandomImageUri(),
      // isCrossRow: crossIndexs.includes(i + 1) ? true : false,
    };
  });
  return data;
};

export const guid = () => {
  function _p8(s?: boolean) {
    const p = (Math.random().toString(16) + '000000000').substr(2, 8);
    return s ? '-' + p.substr(0, 4) + '-' + p.substr(4, 4) : p;
  }
  return _p8() + _p8(true) + _p8(true) + _p8();
};

export const generateRandomWords = (count: number) => {
  const genCount = count >>> 0;

  const charCodes = [];
  for (let i = 0; i < genCount; ++i) {
    charCodes.push(randomRange(0x4e00, 0x9fbf));
  }

  return String.fromCharCode(...charCodes);
};

export const getRandomImageUri = () => {
  return `https://picsum.photos/200/300?random=${randomRange(2, 19)}`;
};
