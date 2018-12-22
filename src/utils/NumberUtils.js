const padZero = (num, size) => {
  let s = String(num);
  while (s.length < size) {
    s = `0${s}`;
  }
  return s;
};

export const formatSeconds = num => {
  const intNum = Math.floor(num);
  const minutes = padZero(Math.floor(intNum / 60), 2);
  const seconds = padZero(intNum % 60, 2);
  return `${minutes}:${seconds}`;
};
