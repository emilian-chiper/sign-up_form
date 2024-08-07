export const fetchCountryData = async () => {
  const response = await fetch('../data/countries.json');
  if (!response.ok) throw new Error('Failed to fetch country data');
  return response.json();
};
