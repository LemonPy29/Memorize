import { triangle, star, circle, square } from './figures';
import { sequenceRandomizer } from './utils';

export const CANVAS_WIDTH: number = 900;
export const CANVAS_HEIGHT: number = 650;
const BORDER: number = 50;
const N_CARD: number = 8;
const CARD_WIDTH: number = 150;
const CARD_HEIGHT: number = 200;

interface vertex {
  x: number;
  y: number;
};

export const cardIndices: number[] = Array.from(
  { length: N_CARD }, (x, i) => i
);

export const vertices = Object.fromEntries(
  cardIndices.map(
    i => {
      const v: vertex = {
        x: BORDER + (i%4) * (CARD_WIDTH + BORDER),
        y: BORDER + ((i/4)|0) * (CARD_HEIGHT + BORDER)
      };
    return [i, v];
    }
  )
);

const card = (x: number, y: number): Path2D => {
  const rectangle = new Path2D();
  rectangle.rect(x, y, CARD_WIDTH, CARD_HEIGHT);
  return rectangle;
};

export const cards = Object.fromEntries(
  cardIndices.map(i => {
      const { x, y } = vertices[i];
      return [i, card(x, y)];
    }
  )
);

const figures = [triangle, star, circle, square];

export const underFiguresGenerator = () => {
  const randomSeq: number[] = sequenceRandomizer(cardIndices);
  return Object.fromEntries(
    randomSeq.map( 
      (r, i) => {
        const { x, y } = vertices[r];
        return [r, figures[(i%4)](x + CARD_WIDTH/2, y + CARD_HEIGHT/2)];
      }
    )
  )
};

export const innerCards = cardIndices.map(
  i => {
    const eps: number = 10;
    const { x, y } = vertices[i];
    const params = {
      x: x + eps, 
      y: y + eps,
      w: CARD_WIDTH - 2 * eps,
      h: CARD_HEIGHT - 2 * eps,
    };
    return params;
  }
);
