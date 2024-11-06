export default async function getAddress(latitude, longitude) {
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === "OK" && data.results[0]) {
      const addressComponents = data.results[0].address_components;

      let street = "";
      let district = "";

      addressComponents.forEach((component) => {
        if (component.types.includes("route")) {
          street = component.long_name;
        }
        if (component.types.includes("sublocality")) {
          district = component.long_name;
        }
      });

      return { street, district };
    } else {
      console.error("No results found");
      return { street: "", district: "" };
    }
  } catch (error) {
    console.error("Error fetching address:", error);
    return { street: "", district: "" };
  }
}
