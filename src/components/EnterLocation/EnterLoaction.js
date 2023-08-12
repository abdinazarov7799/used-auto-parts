import {useEffect, useState} from "react";
import {GoogleMap, LoadScript, Marker} from "@react-google-maps/api";


const containerStyle = {
    width: '100%',
    height: '300px'
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

const EnterLoaction = (props) => {
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
            props.setRegistrationUserData((prevState) => ({
                ...prevState,
                ['Latitude']: location.lat,
                ['Longitude']: location.lng
            }))
        });
    };

    const handleDragEnd = (newPosition) => {
        setLocation(newPosition);
        props.setRegistrationUserData((prevState) => ({
            ...prevState,
            ['Latitude']: location.lat,
            ['Longitude']: location.lng
        }))
    };
    useEffect(() =>{
        handleGetLocation();
    },[])
    return (
        <div className="mb-4">
            <h1 className="text-center mt-5 py-4">Enter your location</h1>
            <p>* Select your location from map:</p>
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
