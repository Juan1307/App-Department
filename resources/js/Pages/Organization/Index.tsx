import { Tabs, Form, Input, Modal, Typography, Button } from "antd";
import type { TabsProps } from "antd";
import {
	PlusOutlined,
	DownloadOutlined,
	UploadOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";

// layouts
import Application from "@/Layouts/Application";
// context
import { ProviderAppContext } from "@/Context/AppContext";
// ./
import List from "./List";

const { Title } = Typography;
interface PropsIndex {
	departments: object[];
}

export default function Index(props: PropsIndex) {
	// data
	const [open, setOpen] = useState(false);
	const [title, setTitle] = useState("Agregar departamento");
	const [titleButton, setTitleButton] = useState("Agregar");

	const { data, setData, reset, processing, post, errors, clearErrors } =
		useForm({
			name: "",
			embassador: "",
		});

	// modal
	const onToggleModal = (value: boolean) => {
		if (!value) {
			reset("name", "embassador");
			clearErrors();
		}
		setOpen(value);
	};
	// modal

	/**
	 * Create/Update data
	 * @param evt
	 */
	const onAcceptModal = (
		evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		evt.preventDefault();

		post("/organizacion/create", {
			onSuccess: () => onToggleModal(false),
		});
	};

	const onChange = (key: string) => {
		console.log(key);
	};

	const items: TabsProps["items"] = [
		{
			key: "1",
			label: "Divisiones",
			children: <List />,
		},
		{
			key: "2",
			label: "Colaboradores",
			children: "Content of Tab Pane 2",
		},
	];

	return (
		<Application>
			<ProviderAppContext data={props}>
				<section className="px-8 py-5 relative">
					<Title level={5}>Organización</Title>
					<Tabs defaultActiveKey="1" items={items} onChange={onChange} />

					<div className="absolute flex gap-3 top-10 right-8">
						<Button
							type="primary"
							onClick={() => onToggleModal(true)}
							icon={<PlusOutlined />}
							size="large"
						/>
						<Button icon={<DownloadOutlined />} size="large" />
						<Button icon={<UploadOutlined />} size="large" />

						{/* CREATE - EDIT  */}
						<Modal
							title={title}
							centered
							open={open}
							onOk={onAcceptModal}
							confirmLoading={processing}
							onCancel={() => onToggleModal(false)}
							okText={titleButton}
							cancelText="Cancelar"
						>
							<div className="grid gap-3 my-5">
								<label htmlFor="name">
									<span>Departamento</span>
									<Input
										className="mt-2"
										id="name"
										suffix
										value={data.name}
										onChange={(e) => setData("name", e.target.value)}
										placeholder="Ingrese nombre del departamento"
										status={errors.name ? "error" : ""}
									/>
									{errors.name && (
										<small className="text-red-500">{errors.name}</small>
									)}
								</label>

								<label htmlFor="embassador">
									<span>Embajador</span>
									<Input
										className="mt-2"
										id="embassador"
										suffix
										value={data.embassador}
										onChange={(e) => setData("embassador", e.target.value)}
										placeholder="Ingrese nombre del embajador"
										status={errors.embassador ? "error" : ""}
									/>
									{errors.embassador && (
										<small className="text-red-500">{errors.embassador}</small>
									)}
								</label>
							</div>
						</Modal>
						{/* CREATE - EDIT  */}
					</div>
				</section>
			</ProviderAppContext>
		</Application>
	);
}
