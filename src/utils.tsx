export const randInt = (n: number) : number => {
  return Math.floor(Math.random() * n);
}

export const sequenceRandomizer = (seq: number[]) => {
  let result : number[] = [];
  let temp: number[] = seq;
  for(let j = 0; j < seq.length; j++) {
    const i: number = randInt(temp.length); 
    const element: number = temp[i];
    temp = temp.filter(item => item !== element);
    result = result.concat(element);
  }
  return result;
}
