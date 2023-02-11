export const precisionRound = (number: number, precision: number) => {
  if (Number.isNaN(Number(number))) return number;
  const factor = 10 ** precision;
  return Math.round(number * factor) / factor;
};

export const returnEven = (num: number) => (num !== 0 ? num - 1 * (num % 2) : 0);
export const returnOdd = (num: number) => (num !== 0 ? num - 1 + 1 * (num % 2) : 0);

export const gapMapping: any = [
  '48px',
  '200px',
  '516px',
  '1150px',
  '2410px',
  '4800px',
  '9600px',
  '19200px',
  '38400px',
  '76800px'
]


export function limitStringLength(str: string, maxLength: number = 12) {
  let plainStr = str.replace(/\s/g, ''); // remove all spaces
  if (plainStr.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength - 2) + "..";
}

export const sortArrayOfObjects = (array: [], key: string) => {
  return array.sort((a, b) => (Number(a[key]) > Number(b[key])) ? 1 : -1);
};