import { useEffect, useState } from "react";
import { getShipments } from "../services/shipmentService";
import ShipmentTable from "../components/ShipmentTable";

export default function ShipmentList() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getShipments().then((data) => {
      setShipments(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Shipment Requests</h1>
      <ShipmentTable shipments={shipments} />
    </div>
  );
}
