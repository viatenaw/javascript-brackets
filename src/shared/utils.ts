export const precisionRound = (number: number, precision: number) => {
    if (Number.isNaN(Number(number))) return number;
    const factor = 10 ** precision;
    return Math.round(number * factor) / factor;
};

export const returnEven = (num: number) => (num !== 0 ? num - 1 * (num % 2) : 0);
export const returnOdd = (num: number) => (num !== 0 ? num - 1 + 1 * (num % 2) : 0);

export const gapMapping: any = {
    0: '48px',
    1: '200px',
    2: '516px',
    3: '1150px',
    4: '2410px',
    5: '4800px',
    6: '9600px',
    7: '19200px',
    8: '38400px',
    9: '76800px'
}

export function limitStringLength(str: string, maxLength: number = 12) {
    let plainStr = str.replace(/\s/g, ''); // remove all spaces
    if (plainStr.length <= maxLength) {
      return str;
    }
    return str.substring(0, maxLength - 2) + "..";
  }