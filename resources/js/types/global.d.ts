import type { AxiosInstance } from "axios";
import type { route as ziggyRoute } from "ziggy-js";

declare global {
	interface Window {
		axios: AxiosInstance;
	}

    type Unpacked<T> = T extends (infer U)[] ? U : T;

	var route: typeof ziggyRoute;
}
