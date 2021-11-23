import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

import CustomMarker from "./googleMarker2.png";
// import styles from "./Maps.module.css";

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
                icon
								//  icon={{
								// 	url: CustomMarker,
								// 	scaledSize: new window.google.maps.Size(38, 26),
								// 	labelOrigin: new window.google.maps.Point(18, 11),
								// }}
							/>
						</GoogleMap>
				</>
			)}
		</>
	);
};

export default React.memo(Maps);
