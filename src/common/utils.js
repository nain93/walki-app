import { Dimensions } from "react-native";

export function d2p(size) {
	return size / 375 * Dimensions.get("window").width;
}

export function h2p(size) {
	return size / 812 * Dimensions.get("window").height
}