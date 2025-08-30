import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { myLocation } from "@/utils/utils.geolocation";
import { socket } from "@/socket/socket.init";

export default function LeafletMap() {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//   socket.on("connect", () => {
//     console.log("✅ Socket connected:", socket.id);




//   });

//   socket.on("disconnect", (reason) => {
//     console.log("❌ Socket disconnected:", reason);
//   });

//   return () => {
//     socket.off("connect");
//     socket.off("disconnect");
//   };
// }, []);


  // useEffect(() => {
  //   setMounted(true);

  //   // fetch user location once when mounted
  //   (async () => {
  //     try {
  //       const position = await myLocation(); // GeolocationPosition
  //       const { latitude, longitude } = position.coords;

  //       setLat(latitude);
  //       setLng(longitude);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   })();
  // }, []);

  if (!mounted) return <div>Loading map...</div>;
  if (lat === null || lng === null) return <div>Getting your location...</div>;

  return (
    <MapContainer
      center={[lat, lng]} // use user location as map center
      zoom={13}
      style={{ height: "400px", width: "100%" }}
      className="rounded z-50"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={[lat, lng]}>
        <Popup>Your Location 📍</Popup>
      </Marker>
    </MapContainer>
  );
}
