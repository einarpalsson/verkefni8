/**
 * Verkefni 8 – Caesar dulmál með vefviðmóti
 *
 * Verður að passa _nákvæmlega_ við gefið HTML, mun annars brotna.
 * Þ.e.a.s., ekki þarf að skrifa meðhöndlun á HTML elementum sem vantar
 */

/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {string} alphabet Stafróf sem afkóða á út frá
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */

function encode(str, m, alphabet) {
  const n = parseInt(m, 10);
  const lettersArr = alphabet.split('');
  const newStrUpp = str.toLocaleUpperCase();
  const newStr = newStrUpp.split('');
  const tester = [];
  for (let i = 0; i < newStr.length; i += 1) {
    for (let j = 0; j < lettersArr.length; j += 1) {
      if (newStr[i] === lettersArr[j] && (j + n) <= alphabet.length - 1) {
        tester[i] = lettersArr[j + n];
      } else if (newStr[i] === lettersArr[j] && (j + n) > alphabet.length - 1) {
        tester[i] = lettersArr[j - (alphabet.length - n)];
      }
    }
  }

  const returnedStr = tester.join('');
  return returnedStr;
}

/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {string} alphabet Stafróf sem afkóða á út frá
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, m, alphabet) {
  const n = parseInt(m, 10);
  const lettersArr = alphabet.split('');
  const newStrUpp = str.toLocaleUpperCase();
  const newStr = newStrUpp.split('');
  const tester = [];

  for (let i = 0; i < newStr.length; i += 1) {
    for (let j = 0; j < lettersArr.length; j += 1) {
      if (newStr[i] === lettersArr[j] && j - n >= 0) {
        tester[i] = lettersArr[j - n];
      } else if (newStr[i] === lettersArr[j] && j - n < 0) {
        tester[i] = lettersArr[j + (alphabet.length - n)];
      }
    }
  }
  const returnedStr = tester.join('');
  return returnedStr;
}

const Caesar = (() => {
  // Default type, uppfært af radio input
  let type = 'encode';

  // Default hliðrun, uppfært af "shift"
  let shift = 3;

  function changeString() {
    let timeout;
    const testV2 = document.getElementById('input');

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const alphabet = document.getElementById('alphabet').value.toLocaleUpperCase();
      if (type === 'encode') {
        document.getElementById('result').innerHTML = encode(testV2.value, shift, alphabet);
      } else {
        document.getElementById('result').innerHTML = decode(testV2.value, shift, alphabet);
      }
    });
  }

  function init() {
    // Setja event handlera á viðeigandi element

    // ALPHABET 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ'
    const alph = document.getElementById('alphabet');

    alph.addEventListener('keyup', (e) => {
      const letterCount = e.target.value.length;
      const shiftEl = document.getElementById('shift');
      shiftEl.max = letterCount;
      changeString();
    });

    // alph.onkeyup = function() {
    //     alphabet = alphabet.value;
    //     changeString();
    //     console.log(alphabet);
    // }

    // RADIO
    const radioEncode = document.getElementById('encode');
    radioEncode.addEventListener('click', () => {
      type = 'encode';
      changeString();
    });

    const radioDecode = document.getElementById('decode');
    radioDecode.addEventListener('click', () => {
      type = 'decode';
      changeString();
    });

    // SHIFT
    const range = document.querySelector('input[type=range]');
    range.addEventListener('input', (e) => {
      shift = e.target.value;
      document.querySelector('.shiftValue').innerHTML = e.target.value;
      changeString();
    });

    // RESULT
    const defaultInput = document.getElementById('input');
    defaultInput.addEventListener('keyup', () => {
      changeString();
    });
  }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const ceasarForm = document.querySelector('.ceasar');

  Caesar.init(ceasarForm);
});
