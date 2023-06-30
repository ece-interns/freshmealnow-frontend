// https://nominatim.openstreetmap.org/reverse?format=json&lat=24.7492963&lon=92.7879498
const getLocation = async (lat, lon) => {
  const uri = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
  let data, error;
  try {
    const response = await fetch(uri);
    data = await response.json();
  } catch (err) {
    error = err;
  }
  return { data, error };
};

export default getLocation;
