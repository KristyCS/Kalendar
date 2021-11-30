import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";


const Maps = ({ apiKey, event , GMapSetting}) => {
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: apiKey,
	});

	const containerStyle = {
		width: '100%',
		height: '100%'
	};

	const center = {
		lat:event.lat,
		lng:event.lng,
	};

	return (
		<>
			{event && isLoaded && (
				<>
						<GoogleMap
							mapContainerStyle={containerStyle}
							center={center}
							zoom={GMapSetting.zoom}
						>
							<Marker
								key={event.id}
								position={{
									lat: event.lat,
									lng: event.lng,
								}}
							/>
						</GoogleMap>
				</>
			)}
		</>
	);
};

export default React.memo(Maps);
