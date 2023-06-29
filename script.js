document.getElementById('calculator-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Get user input
  var name = document.getElementById('name').value.trim();
  var birthdate = document.getElementById('birthdate').value;
  
  // Calculate life path number, destiny number, soul urge number, and birth number
  var lifePathNumber = calculateLifePathNumber(birthdate);
  var destinyNumber = calculateDestinyNumber(name);
  var soulUrgeNumber = calculateSoulUrgeNumber(name);
  var birthNumber = calculateBirthNumber(birthdate);
  
  // Calculate lucky numbers
  var luckyNumbers = calculateLuckyNumbers(lifePathNumber, destinyNumber, soulUrgeNumber, birthNumber);
  
  // Display the results
  var results = document.getElementById('results');
  results.innerHTML = '<div class="result-section">' +
                      '<h2>Results</h2>' +
                      '<p>Your Life Path Number: ' + lifePathNumber + '</p>' +
                      '<p>Your Destiny Number: ' + destinyNumber + '</p>' +
                      '<p>Your Soul Urge Number: ' + soulUrgeNumber + '</p>' +
                      '<p>Your Birth Number: ' + birthNumber + '</p>' +
                      '</div>';
  
  // Display numbers' characteristics
  var characteristicSection = document.createElement('div');
  characteristicSection.classList.add('characteristic-section');
  
  var numbersCharacteristics = getNumbersCharacteristics();
  numbersCharacteristics.forEach(function(characteristic) {
    if (characteristic.number === lifePathNumber || characteristic.number === destinyNumber || characteristic.number === soulUrgeNumber || characteristic.number === birthNumber) {
      var characteristicBox = document.createElement('div');
      characteristicBox.classList.add('characteristic-box');
      characteristicBox.innerHTML = '<h3>Number ' + characteristic.number + '</h3>' +
                                    '<p>' + characteristic.description + '</p>';
      characteristicSection.appendChild(characteristicBox);
    }
  });
  
  results.appendChild(characteristicSection);
  
  // Display lucky numbers
  var luckyNumbersSection = document.createElement('div');
  luckyNumbersSection.classList.add('lucky-numbers-section');
  luckyNumbersSection.innerHTML = '<h3>Your Lucky Numbers</h3>' +
                                  '<p>' + luckyNumbers.join(', ') + '</p>';
  
  results.appendChild(luckyNumbersSection);
});

function calculateLifePathNumber(birthdate) {
  // Calculate and return the life path number
  var dateParts = birthdate.split('-');
  var day = parseInt(dateParts[2]);
  var month = parseInt(dateParts[1]);
  var year = parseInt(dateParts[0]);
  
  var lifePathNumber = calculateNumber(day) + calculateNumber(month) + calculateNumber(year);
  
  while (lifePathNumber > 9) {
    lifePathNumber = calculateNumber(lifePathNumber);
  }
  
  return lifePathNumber;
}

function calculateDestinyNumber(name) {
  // Calculate and return the destiny number
  var nameValue = 0;
  
  for (var i = 0; i < name.length; i++) {
    if (name[i] !== ' ') {
      nameValue += getAlphabetValue(name[i]);
    }
  }
  
  var destinyNumber = calculateNumber(nameValue);
  
  while (destinyNumber > 9) {
    destinyNumber = calculateNumber(destinyNumber);
  }
  
  return destinyNumber;
}

function calculateSoulUrgeNumber(name) {
  // Calculate and return the soul urge number
  var vowels = ['a', 'e', 'i', 'o', 'u'];
  var nameValue = 0;
  
  for (var i = 0; i < name.length; i++) {
    if (vowels.includes(name[i].toLowerCase())) {
      nameValue += getAlphabetValue(name[i]);
    }
  }
  
  var soulUrgeNumber = calculateNumber(nameValue);
  
  while (soulUrgeNumber > 9) {
    soulUrgeNumber = calculateNumber(soulUrgeNumber);
  }
  
  return soulUrgeNumber;
}

function calculateBirthNumber(birthdate) {
  // Calculate and return the birth number
  var dateParts = birthdate.split('-');
  var day = parseInt(dateParts[2]);
  
  var birthNumber = calculateNumber(day);
  
  while (birthNumber > 9) {
    birthNumber = calculateNumber(birthNumber);
  }
  
  return birthNumber;
}

function calculateNumber(value) {
  // Calculate the single digit number from the given value
  var sum = 0;
  
  while (value > 0) {
    sum += value % 10;
    value = Math.floor(value / 10);
  }
  
  return sum;
}

function getAlphabetValue(char) {
  // Get the numerical value of an alphabet character
  var alphabet = 'abcdefghijklmnopqrstuvwxyz';
  char = char.toLowerCase();
  
  return alphabet.indexOf(char) + 1;
}

function getNumbersCharacteristics() {
  // Define characteristics for each number
  var characteristics = [
    { number: 1, description: 'Leadership, independence, and ambition are key traits of Number 1. They are assertive and determined individuals.' },
    { number: 2, description: 'Number 2 represents harmony, cooperation, and diplomacy. They are compassionate and have a talent for nurturing relationships.' },
    { number: 3, description: 'Creativity, self-expression, and joy define Number 3. They are lively individuals with a natural ability to entertain and inspire.' },
    { number: 4, description: 'Number 4 symbolizes stability, practicality, and hard work. They are disciplined and dependable individuals with a strong sense of responsibility.' },
    { number: 5, description: 'Number 5 represents freedom, adventure, and versatility. They have a restless spirit and embrace change and diversity.' },
    { number: 6, description: 'Number 6 symbolizes harmony, balance, and nurturing. They are responsible and caring individuals who thrive in domestic and community settings.' },
    { number: 7, description: 'Intellectual pursuits, spirituality, and introspection define Number 7. They are analytical thinkers and have a deep thirst for knowledge and understanding.' },
    { number: 8, description: 'Number 8 represents success, abundance, and material wealth. They have strong leadership qualities and are driven to achieve their goals.' },
    { number: 9, description: 'Number 9 symbolizes compassion, idealism, and selflessness. They have a humanitarian nature and are dedicated to making a positive impact in the world.' }
  ];
  
  return characteristics;
}

function calculateLuckyNumbers(lifePathNumber, destinyNumber, soulUrgeNumber, birthNumber) {
  // Calculate and return the lucky numbers based on the given numbers
  var luckyNumbers = [];
  
  if (lifePathNumber > 0) {
    luckyNumbers.push(lifePathNumber);
  }
  if (destinyNumber > 0 && destinyNumber !== lifePathNumber) {
    luckyNumbers.push(destinyNumber);
  }
  if (soulUrgeNumber > 0 && soulUrgeNumber !== lifePathNumber && soulUrgeNumber !== destinyNumber) {
    luckyNumbers.push(soulUrgeNumber);
  }
  if (birthNumber > 0 && birthNumber !== lifePathNumber && birthNumber !== destinyNumber && birthNumber !== soulUrgeNumber) {
    luckyNumbers.push(birthNumber);
  }
  
  return luckyNumbers;
}
