export const fetchCountryData = async () => {
  try {
    const response = await fetch('src/data/countries.json');
    if (!response.ok) throw new Error('Failed to fetch country data');
    return response.json();
  } catch (err) {
    alert(err);
  }
};
