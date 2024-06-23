import { SnippetsOutlined } from "@ant-design/icons";

interface PropsWrapped {
	children: React.ReactNode;
}

export default function Wrapped(props: PropsWrapped) {
	return (
		<div
			style={{
				width: "100%",
				height: "80vh",
			}}
			className="flex items-center justify-center text-gray-600"
		>
			<div className="flex flex-col space-y-2 text-center">
				<SnippetsOutlined
					className="flex justify-center"
					style={{ fontSize: "10rem" }}
				/>
				<section className="inline-flex text-xl">
					Página en: <b>{props.children}</b>{" "}
				</section>
			</div>
		</div>
	);
}
