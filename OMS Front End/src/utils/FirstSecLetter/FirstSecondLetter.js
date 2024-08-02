export const FirstSecondLetter = (text) => {
  if (!text) return '?'; // Fallback if text is empty

  // Split text into words
  const words = text.split(' ');

  // Extract the first letter of the first word and the first letter of the second word
  const firstLetter = words[0] ? words[0][0] : ''; // First letter of the first word
  const secondLetter = words[1] ? words[1][0] : ''; // First letter of the second word

  // Combine and ensure the result is uppercase
  return (firstLetter + secondLetter).toUpperCase();
};