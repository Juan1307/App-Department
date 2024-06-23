import { Space, Radio, Select, Input, Button, Popconfirm } from "antd";
import type { TableColumnsType } from "antd";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState, useContext, useEffect } from "react";
import { router, useRemember } from "@inertiajs/react";

// components
import BaseTable from "@/Components/table/BaseTable";
// services
import type { Department } from "@/Services/departments";
// context
import { AppContext } from "@/Context/AppContext";
// types
import { Pagination } from "@/types/index";
// utils
import { setItem, getItem, removeItem } from "@/Utils/storage/index";

const columnsTable = [
	{ value: "name", label: "División" },
	{ value: "embassador", label: "Embajadores" },
	{ value: "employees", label: "N° Colaboradores" },
	{ value: "level", label: "N° Nivel" },
	{ value: "sub_departments_count", label: "Sub divisiones" },
];

export default function List() {
	const handleDeleteEvent = (value: Department) => {
		router.delete(`/organizacion/delete/${value.key}`);
	};

	const columns: TableColumnsType<Department> = [
		{
			title: "División",
			dataIndex: "name",
			key: "name",
			filters: [
				{
					text: "ceo",
					value: "Ceo",
				},
				{
					text: "grow",
					value: "Grow",
				},
			],
			filterSearch: true,
			onFilterDropdownOpenChange(visible) {
				console.log("visible", visible);
			},
			onFilter: (value, record) => record.name.includes(value as string),
			sorter: true,
			showSorterTooltip: true,
			sortDirections: ["ascend", "descend"],
		},
		{
			title: "División superior",
			dataIndex: "up_department",
			key: "up_department",
			sorter: false,
		},
		{
			title: "Colaboradores",
			dataIndex: "employees",
			key: "employees",
			sorter: true,
			showSorterTooltip: false,
		},
		{
			title: "Nivel",
			dataIndex: "level",
			key: "level",
			sorter: true,
			showSorterTooltip: false,
		},
		{
			title: "Subdivisiones",
			dataIndex: "sub_departments_count",
			key: "sub_departments_count",
			sorter: true,
			showSorterTooltip: false,
		},
		{
			title: "Embajadores",
			dataIndex: "embassador",
			key: "embassador",
			sorter: true,
			showSorterTooltip: false,
		},
		{
			title: "Acción",
			dataIndex: "operation",
			key: "operation",
			render: (_, record) => (
				<Popconfirm
					title="¿Deseas eliminar este departamento?"
					onConfirm={() => handleDeleteEvent(record)}
				>
					<Button danger size="small">
						Eliminar
					</Button>
				</Popconfirm>
			),
		},
	];

	const { data } = useContext(AppContext) as {
		data: {
			departments: Pagination<Department>;
			total_employees: number;
		};
	};
	const { departments: pagination, total_employees } = data;
	const storageKey = "Organization/Index"; // storage
	const [selectedKeys, setSelectedKeys] = useState<React.Key[]>(
		() => getItem(storageKey) ?? [],
	);
	const [selectedColumns, setSelectedColumns] = useState("");
	const [position, setPosition] = useState<"list" | "tree">("list");

	/**
	 * Sleccionar columna
	 * @param value
	 */
	const handleSelectChange = (value: string) => {
		setSelectedColumns(value);
	};

	/**
	 * Buscar por columna
	 * @param evt
	 */
	const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		evt.preventDefault();
		const { target } = evt;
		console.log(`input-search ${target.value}`, selectedColumns);

		router.get(
			`/organizacion`,
			{
				search: target.value,
				search_column: selectedColumns,
			},
			{
				preserveState: true,
			},
		);
	};

	/**
	 * Marcar filas con estado
	 * @param keys
	 */
	const handleOnSelectedKeys = (keys: React.Key[]) => {
		// [1, 2, 3, 4, 5]
		const tableids = pagination.data.map((ele) => ele.key);
		// console.log("tableids", tableids);
		// [ 2, 3, 4, 5]
		const filterKeys = tableids.filter((ele) => !keys.includes(ele));
		// console.log("filterKeys", filterKeys);
		// [1, 2, 3, 4, 5]
		let storageKeys: React.Key[] = getItem(storageKey) ?? [];
		// console.log("storageKeys", storageKeys);
		// [1] | [3, 4, 5]

		if (storageKeys.length > 0) {
			// saber si inluye removesids
			const canRemove = storageKeys.some((num) => filterKeys.includes(num));

			if (canRemove) {
				const newStorageKeys = [];
				for (let index = 0; index < storageKeys.length; index++) {
					const element = storageKeys[index];
					if (!filterKeys.includes(element)) {
						newStorageKeys.push(element);
					}
				}

				storageKeys = newStorageKeys;
			} else {
				storageKeys = [...new Set([...storageKeys, ...(keys as number[])])];
			}
		} else {
			storageKeys = keys;
		}

		const saveKeys = storageKeys.sort();
		setItem(storageKey, saveKeys);
		setSelectedKeys(() => getItem(storageKey));
	};

	const handleOnClearSelectedKeys = () => {
		removeItem(storageKey);
		setSelectedKeys(() => []);
	};

	const handleOnDeletedSelectedKeys = () => {
		router.post(
			"organizacion/delete-multiple",
			{
				ids: getItem(storageKey),
			},
			{
				onSuccess: () => handleOnClearSelectedKeys(),
			},
		);
	};

	const activeButtonDanger = selectedKeys.length ? "primary" : "default";

	return (
		<section className="my-4">
			<div className="grid grid-cols-6 mb-5">
				<div className="col-span-2">
					<Space>
						<Radio.Group
							value={position}
							onChange={(e) => setPosition(e.target.value)}
						>
							<Radio.Button value="list">Listado</Radio.Button>
							<Radio.Button value="tree">Árbol</Radio.Button>
						</Radio.Group>

						<Button
							icon={<DeleteOutlined />}
							onClick={handleOnClearSelectedKeys}
						>
							Limpiar seleccionados : {selectedKeys.length}
						</Button>

						<Popconfirm
							title="¿Deseas eliminar todos los registros seleccionados?"
							onConfirm={() => handleOnDeletedSelectedKeys()}
							disabled={!selectedKeys.length}
						>
							<Button
								icon={<DeleteOutlined />}
								danger
								type={activeButtonDanger}
							>
								Eliminar seleccionados : {selectedKeys.length}
							</Button>
						</Popconfirm>
					</Space>
				</div>
				<div className="col-span-4">
					<div className="flex gap-3 justify-end items-center">
						<Select
							placeholder="Columnas"
							style={{ width: "12rem" }}
							onChange={handleSelectChange}
							options={columnsTable}
						/>
						<Input
							style={{ width: "20rem" }}
							placeholder="Buscar"
							onChange={handleInputChange}
							suffix={<SearchOutlined />}
						/>
					</div>
				</div>
			</div>

			<article className="relative">
				<BaseTable<Department>
					selectedKeys={selectedKeys}
					onSelectedKeys={handleOnSelectedKeys}
					partialReloadKeys={["departments"]}
					data={pagination.data}
					columns={columns}
					pagination={pagination}
				/>
				<div className="absolute bottom-6 left-2">
					Total de colaboradores: {total_employees}
				</div>
			</article>
		</section>
	);
}
