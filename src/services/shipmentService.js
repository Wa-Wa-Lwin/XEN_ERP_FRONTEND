const BASE_URL = "http://192.168.60.31/api/logistics";

export const getShipments = async () => {
  try {
    const res = await fetch(`${BASE_URL}/shipment_request/`);
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();
    return data.shipment_requests || [];
  } catch (err) {
    console.error("Error fetching shipments:", err);
    return [];
  }
};
