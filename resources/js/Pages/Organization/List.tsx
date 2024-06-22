import { Space, Radio, Select, Input, Button } from "antd";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState, useContext, useEffect } from "react";
import { router, useRemember } from "@inertiajs/react";

// components
import BaseTable from "@/Components/table/BaseTable";
// services
import { columns } from "@/Services/departments";
import type { Department } from "@/Services/departments";
// context
import { AppContext } from "@/Context/AppContext";
// types
import { Pagination } from "@/types/index";
// utils
import { setItem, getItem, removeItem } from "@/Utils/storage/index";
import { getSelectedRows } from "@/Utils/pagination/index";

const columnsTable = [
	{ value: "name", label: "División" },
	{ value: "up_department", label: "División superior" },
	{ value: "embassador", label: "Embajadores" },
	{ value: "employees", label: "N° Colaboradores" },
	{ value: "level", label: "N° Nivel" },
];

export default function List() {
	const { data } = useContext(AppContext) as {
		data: {
			departments: Pagination<Department>;
			total_employees: number;
		};
	};
	const { departments: pagination, total_employees } = data;
	const storageKey = "Organization/Index"; // storage
	const [selectedKeys, setSelectedKeys] = useState<React.Key[]>(
		() => getItem(storageKey) ?? []
	);
	const [position, setPosition] = useState<"list" | "tree">("list");

	/**
	 * Sleccionar columna
	 * @param value
	 */
	const handleSelectChange = (value: string) => {
		console.log(`selected-column ${value}`);
	};

	/**
	 * Buscar por columna
	 * @param evt
	 */
	const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		evt.preventDefault();
		const { target } = evt;

		console.log(`input-search ${target.value}`);
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
				for (let index = 0; index < storageKeys.length; index++) {
					const element = storageKeys[index];
					if (filterKeys.includes(element)) storageKeys.splice(index, 1);
				}
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

	const activeButtonPrimary = selectedKeys.length ? "primary" : "default";

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
							type={activeButtonPrimary}
							onClick={handleOnClearSelectedKeys}
						>
							Limpiar seleccionados : {selectedKeys.length}
						</Button>
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
