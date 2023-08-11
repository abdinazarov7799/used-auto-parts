import {Button, Input} from "antd";
import {useState} from "react";
import {GoogleMap, LoadScript, Marker} from "@react-google-maps/api";



const containerStyle = {
    width: '100%',
    height: '400px'
};

const API_KEY = 'AIzaSyC5dKdEhkdbrG8XV0iEMDTG8jmrShJ6BjI';

const EnterLoaction = () => {
    const [location, setLocation] = useState({
        lat: null,
        lng: null
    });

    const handleGetLocation = () => {
        navigator.geolocation.getCurrentPosition(function(position) {
            setLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
        });
    };
    return(
      <>
          <Button onClick={handleGetLocation}>Locatsiyani olish</Button>
          {location.lat && location.lng && (
              <LoadScript googleMapsApiKey={API_KEY}>
                  <GoogleMap
                      mapContainerStyle={containerStyle}
                      center={location}
                      zoom={10}
                  >
                      <Marker position={location} />
                  </GoogleMap>
              </LoadScript>
          )}
      </>
    );
}
export default EnterLoaction;
