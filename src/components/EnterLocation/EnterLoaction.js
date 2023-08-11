import {Button, Input} from "antd";
import {useState} from "react";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

function EnterLoaction() {
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log("Latitude:", position.coords.latitude);
        console.log("Longitude:", position.coords.longitude);
    });
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null
    });

    const handleGetLocation = () => {
        navigator.geolocation.getCurrentPosition(function(position) {
            setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        });
    };
    return(
      <>
          <Button onClick={handleGetLocation}>Locatsiyani olish</Button>
          {location.latitude && location.longitude && (
              <MapContainer center={[location.latitude, location.longitude]} zoom={13} style={{ width: '100%', height: '400px' }}>
                  <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[location.latitude, location.longitude]}>
                      <Popup>
                          Sizning joriy joylashuvingiz.
                      </Popup>
                  </Marker>
              </MapContainer>
          )}
      </>
    );
}
export default EnterLoaction;
