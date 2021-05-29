import React from 'react';
import {
  cardIndices, 
  cards, 
  underFiguresGenerator,
  innerCards,
  CANVAS_WIDTH,
  CANVAS_HEIGHT
} from './board-api';

const underFigures = underFiguresGenerator();

export const Board = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isReversed, setIsReversed] = React.useState(
    Object.fromEntries(cardIndices.map(i => [i, 'down'])) 
  );

  React.useEffect(
    () => {
      const canvas = canvasRef?.current;
      const ctx = canvas?.getContext('2d');
      Object.values(cards).forEach(card => ctx?.stroke(card));
    }, []
  );

  React.useEffect(
    () => {
      const canvas = canvasRef?.current;
      const ctx = canvas?.getContext('2d');

      console.log(isReversed);

      const putDown = (i: number) => {
        const { x, y, w, h } = innerCards[i];
        ctx?.clearRect(x, y, w, h);
      }

      const putUp = (i: number) => {
        setIsReversed({ ...isReversed, [i]: 'up' });
        ctx?.fill(underFigures[i].figure);
      }

      const ups: number[] = Object.entries(isReversed)
        .filter(([k, v]) => v === 'up')
        .map(x => parseInt(x[0], 10));
      
      if (ups.length === 2) {
        const [i, j] = ups;
        if (underFigures[i].id === underFigures[j].id) {
          setIsReversed({ ...isReversed, [i]: 'paired', [j]: 'paired' });
        }
        else {
          setTimeout(() => {
            putDown(i);
            putDown(j);
            setIsReversed({ ...isReversed, [i]: 'down', [j]: 'down' });
          }, 1000)
        }
      }

      const reverseFigure = (e: MouseEvent) => {
        cardIndices.forEach(
          i => {
            if (ctx?.isPointInPath(cards[i], e.offsetX, e.offsetY)) { 
              if (isReversed[i] === 'down') {
                putUp(i);
              }
            }
          }  
        )
      }; 

      canvas?.addEventListener('click', reverseFigure);

      return () => {
        console.log(isReversed);
        canvas?.removeEventListener('click', reverseFigure);
      }
    }, [isReversed]
  )

  return (
    <>
      <canvas 
        ref={ canvasRef }
        width={ CANVAS_WIDTH }
        height={ CANVAS_HEIGHT }>
      </canvas>
      <div>Memorice</div>
    </>
  ); 
}
