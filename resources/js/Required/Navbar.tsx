import { Row, Col, Avatar, Menu } from "antd";
import type { MenuProps } from "antd";
import { Link, usePage } from "@inertiajs/react";
import {
	DownOutlined,
	QuestionCircleFilled,
	BellFilled,
} from "@ant-design/icons";
import { useEffect, useState } from "react";

export type NavbarItem = Required<MenuProps>["items"][number];

const NAVBAR_ROUTES = {
	home: {
		path: "/",
		key: "home",
	},
	dashboard: {
		path: "/dashboard",
		key: "dashboard",
	},
	organization: {
		path: "/organizacion",
		key: "organizacion",
	},
	models: {
		path: "/modelos",
		key: "modelos",
	},
	follows: {
		path: "/seguimientos",
		key: "seguimientos",
	},
	question: {
		path: "/preguntas",
		key: "preguntas",
	},
	notifications: {
		path: "/notificaciones",
		key: "notificaciones",
	},
	profile: {
		path: "/perfil",
		key: "perfil",
	},
};

const NAVBAR_ITEMS: NavbarItem[] = [
	{
		label: <img src="/assets/svgs/logo.svg" width={30} alt="logo" />,
		type: "group",
	},
	{
		label: <Link href={NAVBAR_ROUTES.dashboard.path}>Dashboard</Link>,
		key: NAVBAR_ROUTES.dashboard.key,
	},
	{
		label: <Link href={NAVBAR_ROUTES.organization.path}>Organización</Link>,
		key: NAVBAR_ROUTES.organization.key,
	},
	{
		label: (
			<span>
				{" "}
				Modelos <DownOutlined />{" "}
			</span>
		),
		key: NAVBAR_ROUTES.models.key,
		children: [
			{
				key: "1",
				label: <Link href={`${NAVBAR_ROUTES.models.path}/index`}>Indice</Link>,
			},
			{
				key: "2",
				label: <Link href={`${NAVBAR_ROUTES.models.path}/crear`}>Crear</Link>,
			},
		],
	},
	{
		label: (
			<span>
				{" "}
				Seguimiento <DownOutlined />{" "}
			</span>
		),
		key: NAVBAR_ROUTES.follows.key,
		children: [
			{
				key: "4",
				label: <Link href={`${NAVBAR_ROUTES.follows.path}/index`}>Indice</Link>,
			},
			{
				key: "5",
				label: <Link href={`${NAVBAR_ROUTES.follows.path}/crear`}>Crear</Link>,
			},
		],
	},
	{
		label: (
			<Link href={NAVBAR_ROUTES.question.path}>
				<QuestionCircleFilled style={{ fontSize: "20px" }} />
			</Link>
		),
		key: NAVBAR_ROUTES.question.key,
		style: {
			marginLeft: "auto",
		},
	},
	{
		label: (
			<Link href={NAVBAR_ROUTES.notifications.path}>
				<BellFilled style={{ fontSize: "20px", color: "inherit" }} />
			</Link>
		),
		key: NAVBAR_ROUTES.notifications.key,
	},
	{
		label: (
			<span className="flex items-center gap-2">
				<Avatar
					style={{ backgroundColor: "orange", verticalAlign: "middle" }}
					size="default"
				>
					A
				</Avatar>
				Administrador <DownOutlined />{" "}
			</span>
		),
		key: NAVBAR_ROUTES.profile.key,
		children: [
			{
				key: "7",
				label: <Link href={NAVBAR_ROUTES.profile.path}>Perfil</Link>,
			},
			{ key: "8", label: "Cerrar Sessión" },
		],
	},
];

function resolveKeyActive(url: string) {
	const nestedValues = Object.entries(NAVBAR_ROUTES);

	const foundedRoute = nestedValues.find((ele) => {
		const [, value] = ele;
		const { path } = value;
		const [parseUrl] = url.split("?");

		return path === parseUrl;
	});

	if (foundedRoute !== undefined) {
		const [, value] = foundedRoute;
		return [value.key];
	}
	return [];
}

export default function Navbar() {
	const { url } = usePage();
	const [currentKeys, setCurrentKeys] = useState<string[]>([]);

	useEffect(() => {
		setCurrentKeys(() => resolveKeyActive(url));
	}, [url]);

	return (
		<nav>
			<Row>
				<Col span={24}>
					<Menu
						className="p-3 space-x-2"
						selectable={false}
						selectedKeys={currentKeys}
						mode="horizontal"
						items={NAVBAR_ITEMS}
					/>
				</Col>
			</Row>
		</nav>
	);
}
