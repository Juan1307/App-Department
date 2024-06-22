import { createContext } from "react";

interface PropsProvideAppContext {
	children: React.ReactNode;
	data: object[] | object;
}

const AppContext = createContext<Pick<PropsProvideAppContext, "data">>({
	data: {},
});

function ProviderAppContext(props: PropsProvideAppContext) {
	return (
		<AppContext.Provider
			value={{
				data: props.data,
			}}
		>
			{props.children}
		</AppContext.Provider>
	);
}

export { ProviderAppContext, AppContext };
