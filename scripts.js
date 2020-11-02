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
function encode(str, n, alphabet) {
  let LETTERS_arr = alphabet.split("");
  let newStr = str.split("");
  let tester = [];
  for (let i = 0; i < newStr.length; i++) {
    for (let j = 0; j < LETTERS_arr.length; j++) {
      if (newStr[i] === LETTERS_arr[j] && (j + n) <= 31) {
        tester[i] = LETTERS_arr[j + n];
      } else if (newStr[i] === LETTERS_arr[j] && (j + n) > 31) {
        tester[i] = LETTERS_arr[j - (32 - n)];
      }
    }
  }

  str = tester.join("");
  return str;
}

/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {string} alphabet Stafróf sem afkóða á út frá
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n, alphabet = '') {
  let LETTERS_arr = alphabet.split("");
  let newStr = str.split("");
  let tester = [];

  for (let i = 0; i < newStr.length; i++) {
    for (let j = 0; j < LETTERS_arr.length; j++) {
      if (newStr[i] === LETTERS_arr[j] && j - n >= 0) {
        tester[i] = LETTERS_arr[j - n];
      } else if (newStr[i] === LETTERS_arr[j] && j - n < 0) {
        tester[i] = LETTERS_arr[j + (32 - n)];
      }
    }
  }
  str = tester.join("");
  return str;
}

const Caesar = (() => {
  // Default stafróf, uppfært þegar slegið inn í "alphabet"
  let alphabet = 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ';
  let test = document.getElementById('alphabet');

  test.onkeyup = function(){
    document.getElementById('result').innerHTML = test.value;
  }


  // Default type, uppfært af radio input
  let type = 'encode';
  if (document.getElementById('encode').checked) {
  } else if (document.getElementById('decode').checked) {
    type = 'decode';
  }

  // Default hliðrun, uppfært af "shift"
  let shift = 3;

  function init(el) {
    // Setja event handlera á viðeigandi element
    let testV2 = document.getElementById('input');
    testV2.onkeyup = function(){
      document.getElementById('result').innerHTML = encode(testV2.value, shift, alphabet);
    }
  }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const ceasarForm = document.querySelector('.ceasar');

  Caesar.init(ceasarForm);
});
