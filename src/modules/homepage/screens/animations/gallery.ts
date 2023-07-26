import countryside from './assets/countryside.jpg';
import dawn from './assets/dawn.jpg';
import florence from './assets/florence.jpg';

export const gallery = {
  florence: {
    image: florence,
    title: 'Beautiful city of Florence',
    description:
      'Florence was a centre of medieval European trade and finance and one of the wealthiest cities of that era.',
  },
  countryside: {
    image: countryside,
    title: 'Tuscan countryside',
    description: "Tuscany's picturesque hills attract millions of tourists each year craving postcard-perfect views.",
  },
  dawn: {
    image: dawn,
    title: 'Tuscany at dawn',
    description: 'Tuscany is known for its magical mists in the morning and at sunset.',
  },
};
export const chips = ['Italy', 'Tourism', 'Nature'];

export type Tag = keyof typeof gallery;
