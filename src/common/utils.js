import { Dimensions } from "react-native";

export function d2p(size) {
	return size / 375 * Dimensions.get("window").width;
}

export function h2p(size) {
	if (Dimensions.get("window").height > 600) {
		return size / 375 * Dimensions.get("window").width;
	}
	else {
		return size / 812 * Dimensions.get("window").height
	}
}