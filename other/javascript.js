function gen(length) {
  // Define possible characters
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789_';

  let password = '';
  for (let i = 0; i < length; i++) {
    // Pick a random character
    const randomIndex = Math.floor(Math.random() * characters.length);
    const randomCharacter = characters[randomIndex];

    // Add the character to the password
    password += randomCharacter;
  }

  return password;
}
const run = document.getElementById('run-button');
// Add a click event listener to the vote button
run.addEventListener('click', () => {
  const box_data = document.getElementById('fetch-data').value;
  const fetch_location = document.getElementById('fetch-location').value;
  const fetch_count = document.getElementById('fetch-count').value;
  for (let i = 0; i < fetch_count; i++) {

    fetch(`${fetch_location}/${gen(box_data)}`, { method: 'POST' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network ERROR.');
        }
        return response.json();
      })
      .then(data => {
        document.getElementById('logs').innerHTML = document.getElementById('logs').innerHTML + `Successfully fetched ${fetch_location} for ${fetch_count} times.<br>`
      })
      .catch(error => {
        throw new Error('Fetch Error:', error);
      });
  }
});