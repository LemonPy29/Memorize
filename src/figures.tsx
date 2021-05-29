interface figWithID {
  figure: Path2D;
  id: string;
};

export const triangle = (x: number, y: number, s: number=15): figWithID => {
  const f = new Path2D(); 
  f.moveTo(x, y - s);
  f.lineTo(x - s, y + s);
  f.lineTo(x + s, y + s);
  f.lineTo(x, y - s);
  const res: figWithID = { figure: f, id: 'triangle' };
  return res
};

export const star = (x: number, y: number, s: number=20): figWithID => {
  const f = new Path2D(); 
  const theta: number = 2 * Math.PI/10;
  f.moveTo(x + s, y);
  for(let i = 1; i <= 10; i++) {
    const l: number = i%2 === 0? s: s/3;
    f.lineTo(x + l*Math.cos(i*theta), y + l*Math.sin(i*theta));
  };
  const res: figWithID = { figure: f, id: 'star' };
  return res
};

export const circle = (x: number, y: number, s: number=15): figWithID => {
  const f = new Path2D();
  f.arc(x, y, s, 0, 2 * Math.PI);
  const res: figWithID = { figure: f, id: 'circle' };
  return res;
}

export const square = (x: number, y: number, s: number=15): figWithID => {
  const f = new Path2D();
  f.moveTo(x + s, y - s);
  f.lineTo(x - s, y - s);
  f.lineTo(x - s, y + s);
  f.lineTo(x + s, y + s);
  f.lineTo(x + s, y - s);
  const res: figWithID = { figure: f, id: 'square' };
  return res
}
