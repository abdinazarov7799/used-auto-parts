import {Button, Input} from "antd";
import {useState} from "react";
import {GoogleMap, LoadScript, Marker} from "@react-google-maps/api";



const containerStyle = {
    width: '100%',
    height: '400px'
};

const API_KEY = 'AIzaSyC5dKdEhkdbrG8XV0iEMDTG8jmrShJ6BjI';


function DraggableMarker({ location, onDragEnd }) {
    return (
        <Marker
            position={location}
            draggable={true}
            onDragEnd={(event) => {
                const newPosition = {
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng(),
                };
                onDragEnd(newPosition);
            }}
        />
    );
}

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

    const handleDragEnd = (newPosition) => {
        setLocation(newPosition);
    };
    return (
        <div>
            <Button onClick={handleGetLocation}>Locatsiyani olish</Button>
            <Input placeholder="Latitude" value={location.lat} readOnly />
            <Input placeholder="Longitude" value={location.lng} readOnly />

            {location.lat && location.lng && (
                <LoadScript googleMapsApiKey={API_KEY}>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={location}
                        zoom={10}
                    >
                        <DraggableMarker location={location} onDragEnd={handleDragEnd} />
                    </GoogleMap>
                </LoadScript>
            )}
        </div>
    );
}
export default EnterLoaction;
