/**
 * Fetches country data from a JSON file.
 *
 * @async
 * @function fetchCountryData
 * @returns {Promise<Object>} A promise that resolves to the JSON object containing country data.
 * @throws {Error} Will throw an error if the fetch request fails.
 * @example
 * fetchCountryData()
 *   .then(data => console.log(data))
 *   .catch(error => console.error(error));
 */
export const fetchCountryData = async () => {
  try {
    const response = await fetch('src/data/countries.json');
    if (!response.ok) throw new Error('Failed to fetch country data');
    return response.json();
  } catch (err) {
    alert(err);
  }
};
