import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getKey } from "../../store/map";
import Maps from "./Maps";

const MapContainer = ({ event, GMapSetting }) => {
	const key = useSelector((state) => state.map.key);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!key) {
			dispatch(getKey());
		}
	}, [dispatch, key]);

	if (!key) {
		return null;
	}

	return <Maps apiKey={key} event={event} GMapSetting={GMapSetting}/>;
};

export default MapContainer;
