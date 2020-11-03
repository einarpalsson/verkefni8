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
  let n = parseInt(m);
  let LETTERS_arr = alphabet.split("");
  let newStrUpp = str.toLocaleUpperCase();
  let newStr = newStrUpp.split("");
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
function decode(str, m, alphabet) {
  let n = parseInt(m);
  let LETTERS_arr = alphabet.split("");
  let newStrUpp = str.toLocaleUpperCase();
  let newStr = newStrUpp.split("");
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


  // Default type, uppfært af radio input
  let type = 'encode';

  // Default hliðrun, uppfært af "shift"
  let shift = 3;


  function changeString() {
      let timeout;
      let testV2 = document.getElementById('input');

      clearTimeout(timeout);
      timeout = setTimeout(() => {
          if (type === 'encode') {
              document.getElementById('result').innerHTML = encode(testV2.value, shift, alphabet);
          } else {
              document.getElementById('result').innerHTML = decode(testV2.value, shift, alphabet);
          }

    })
  }


  function init(el) {
    // Setja event handlera á viðeigandi element

      //ALPHABET
      const alph = document.getElementById('alphabet');

      alph.addEventListener('keyup', () => {
          alphabet = alph.value;
          changeString();
          console.log(alphabet);
      });

      // alph.onkeyup = function() {
      //     alphabet = alphabet.value;
      //     changeString();
      //     console.log(alphabet);
      // }

      //RADIO
      const radioEncode = document.getElementById('encode');
      radioEncode.addEventListener('click', () => {
          type = 'encode';
          changeString();
          console.log(type);
        });

      const radioDecode = document.getElementById('decode');
      radioDecode.addEventListener('click', () => {
          type = 'decode';
          changeString();
          console.log(type);
        });


      //SHIFT
      const range = document.querySelector('input[type=range]');
      range.addEventListener('input', (e) => {
          shift = document.querySelector('.shiftValue').innerHTML = e.target.value;
          changeString();
          console.log(shift);
        });

      let maxValue = document.getElementById('shift');
      maxValue = maxValue.max;
      maxValue.max = alphabet.length;


       //RESULT
      let defaultInput = document.getElementById('input');
      defaultInput.addEventListener('keyup', () => {
          changeString();
        })

  }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const ceasarForm = document.querySelector('.ceasar');

  Caesar.init(ceasarForm);
});
