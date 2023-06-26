document.getElementById('numerologyForm').addEventListener('submit', function(event) {
   event.preventDefault(); // Prevent form submission

   // Retrieve user input
   const name = document.getElementById('nameInput').value;
   const birthdate = document.getElementById('birthdateInput').value;

   // Perform calculations and display results
   const destinyNumber = calculateDestinyNumber(birthdate);
   const lifePathNumber = calculateLifePathNumber(birthdate);
   const soulUrgeNumber = calculateSoulUrgeNumber(name);

   const resultsContainer = document.getElementById('results');
   resultsContainer.innerHTML = `
      <h2>Results</h2>
      <p><strong>Destiny Number:</strong> ${destinyNumber}</p>
      <p><strong>Life Path Number:</strong> ${lifePathNumber}</p>
      <p><strong>Soul Urge Number:</strong> ${soulUrgeNumber}</p>
   `;

   const numberDetailsContainer = document.getElementById('numberDetails');
   numberDetailsContainer.innerHTML = `
      <h2>Number Details</h2>
      <p>${getNumberExplanation(destinyNumber)}</p>
      <p>${getNumberExplanation(lifePathNumber)}</p>
      <p>${getNumberExplanation(soulUrgeNumber)}</p>
   `;
});

// Functions to perform numerology calculations
function calculateDestinyNumber(birthdate) {
   // Remove dashes from the birthdate (e.g., "1990-05-21" becomes "1990521")
   const cleanDate = birthdate.replace(/-/g, '');

   // Sum all the digits of the cleaned birthdate
   let sum = 0;
   for (let i = 0; i < cleanDate.length; i++) {
      sum += parseInt(cleanDate.charAt(i));
   }

   // Reduce the sum to a single-digit number
   while (sum > 9) {
      sum = reduceToSingleDigit(sum);
   }

   return sum;
}

function calculateLifePathNumber(birthdate) {
   // Extract the numeric digits from the birthdate
   const digits = birthdate.match(/\d/g);
   if (!digits) {
      return "Invalid birthdate";
   }

   // Calculate the destiny number first
   const destinyNumber = calculateDestinyNumber(birthdate);

   // Sum the individual digits of the birthdate
   let sum = 0;
   for (let i = 0; i < digits.length; i++) {
      sum += parseInt(digits[i]);
   }

   // Reduce the sum to a single-digit number
   let lifePathNumber = sum;
   while (lifePathNumber > 9) {
      lifePathNumber = reduceToSingleDigit(lifePathNumber);
   }

   // Calculate the final life path number by adding the destiny number
   lifePathNumber += destinyNumber;
   lifePathNumber = reduceToSingleDigit(lifePathNumber);

   return lifePathNumber;
}

function calculateSoulUrgeNumber(name) {
   // Convert name to uppercase and remove any spaces
   const cleanName = name.toUpperCase().replace(/\s/g, '');

   // Assign numerical values to each letter
   const letterValues = {
      A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9, J: 1, K: 2, L: 3, M: 4,
      N: 5, O: 6, P: 7, Q: 8, R: 9, S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
   };

   // Calculate the soul urge number by summing the values of each letter
   let sum = 0;
   for (let i = 0; i < cleanName.length; i++) {
      sum += letterValues[cleanName.charAt(i)];
   }

   // Reduce the soul urge number to a single-digit number
   sum = reduceToSingleDigit(sum);

   return sum;
}

function reduceToSingleDigit(number) {
   // Keep reducing the number until it becomes a single-digit
   while (number > 9) {
      let sum = 0;
      while (number > 0) {
         sum += number % 10;
         number = Math.floor(number / 10);
      }
      number = sum;
   }
   return number;
}

// Function to provide a brief explanation of a numerology number
function getNumberExplanation(number) {
   const explanations = {
      1: "You are a natural-born leader. You possess strong willpower and determination.",
      2: "You have a nurturing and diplomatic nature. Cooperation and balance are important to you.",
      3: "You are creative, expressive, and enjoy socializing. You have a natural charm.",
      4: "You are practical, disciplined, and hardworking. You value stability and order.",
      5: "You seek adventure, freedom, and change. You are versatile and adaptable.",
      6: "You are a caring and responsible person. Family and community are essential to you.",
      7: "You have a deep interest in spirituality and introspection. You value knowledge and wisdom.",
      8: "You possess ambition, authority, and financial acumen. You strive for success and material abundance.",
      9: "You are compassionate, generous, and idealistic. You have a strong sense of justice and empathy."
   };

   return explanations[number] || "No information available for this number.";
}
