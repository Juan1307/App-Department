import { ConfigProvider, theme } from "antd";
import type { ThemeConfig } from "antd";

// required
import Navbar from "@/Required/Navbar";

interface PropsApplication {
	children: React.ReactNode;
}

const colors = {
	primary400: "rgb(24, 144, 255)",
	white50: "rgba(255, 255, 255, .1)",
	white100: "rgba(255, 255, 255, .2)",
	white200: "rgba(255, 255, 255, .3)",
	white300: "rgba(255, 255, 255, .7)",
	white400: "rgba(255, 255, 255, 1)",
};

const { useToken } = theme;
const defaultTheme: Partial<ThemeConfig["token"]> = {
	colorPrimary: colors.primary400,
};

const config: ThemeConfig = {
	token: defaultTheme,
	cssVar: true,
	components: {
		Menu: {
			activeBarBorderWidth: 0,
			itemSelectedColor: colors.white400,
			itemColor: colors.white300,
			itemHoverColor: colors.white400,

			horizontalItemBorderRadius: 10,
			horizontalItemSelectedColor: colors.white400,
			horizontalItemSelectedBg: colors.white100,
			horizontalItemHoverColor: colors.white400,
			horizontalItemHoverBg: colors.white100,

			popupBg: colors.primary400,
			activeBarHeight: 0,
			itemBg: colors.primary400,
		},
		Button: {
			defaultColor: colors.primary400,
		},
	},
};
/**
 * Scafold de la  aplicacion
 * @param props
 * @returns
 */
export default function Application(props: PropsApplication) {
	const token = useToken();

	return (
		<main>
			<ConfigProvider theme={config}>
				{/* Navbar */}
				<Navbar />
				{props.children}
			</ConfigProvider>
		</main>
	);
}
