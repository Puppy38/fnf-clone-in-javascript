const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Resize canvas to fit window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load the sprite sheet
const alphabetSheet = new Image();
alphabetSheet.src = "assets/sprites/alphabet.png";  // Path to your alphabet sprite sheet

let alphabetData; // This will hold the loaded JSON data

// Load the JSON data
fetch("assets/sprites/alphabet.json")  // Path to your JSON file
  .then(response => response.json())
  .then(data => {
    alphabetData = data.characters;
    alphabetSheet.onload = () => {
      drawText("Hello, FNF!", 100, 200);  // Example text
    };
  })
  .catch(error => console.error("Error loading JSON data:", error));

// Function to draw text on the canvas using the alphabet sprites
function drawText(text, x, y) {
  let currentX = x; // Starting X position

  // Loop through each character in the text string
  for (let char of text) {
    // Check if the character is allowed in the alphabet
    if (alphabetData[char]) {
      const charData = alphabetData[char];
      
      // Check if the character has "bold" or "normal" variant
      const variant = "normal";  // Set this dynamically if you want to handle bold text
      const charCoords = charData[variant] || charData.normal;

      if (charCoords) {
        // Draw the character sprite from the sprite sheet
        ctx.drawImage(
          alphabetSheet,
          charCoords[0], charCoords[1], 32, 32,  // Source (from sprite sheet)
          currentX, y, 32, 32  // Destination (on canvas)
        );
        currentX += 32; // Move the X position for the next character
      }
    }
  }
}

// Example of drawing text on the canvas when the sprite sheet is loaded
alphabetSheet.onload = () => {
  drawText("Hello, FNF!", 100, 200);  // Text will appear at (100, 200)
};
