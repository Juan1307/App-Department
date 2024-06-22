import { useState, useRef, useEffect } from "react";
import { Table } from "antd";
import type { PaginationProps, TableColumnsType } from "antd";
import { router, useRemember } from "@inertiajs/react";

// types
import type { PaginationBase } from "@/types/index";

interface PropsBaseTable<T> {
	selectedKeys?: React.Key[];
	onSelectedKeys?: (value: React.Key[]) => void;
	partialReloadKeys: string[];
	data: T[];
	columns: TableColumnsType<T>;
	pagination: PaginationBase;
}

interface ITableSorter {
	field: string;
	order: "ascend" | "descend";
}

export default function BaseTable<T>(props: PropsBaseTable<T>) {
	const { data, columns, pagination, partialReloadKeys } = props;
	const tableRef = useRef(null);
	const [selectedKeys, setSelectedKeys] = useState<React.Key[]>(
		() => props.selectedKeys ?? [],
	);
	const [paginationState, setPaginationState] = useState("");
	const [ordenationState, setOrdenationState] = useState("");

	const { meta } = pagination;

	/**
	 * Filas seleccionadas
	 * @param newSelectedRowKeys
	 */
	const onSelectChange = (
		newSelectedRowKeys: React.Key[],
		selectedRows: never[],
		info: unknown,
	) => {
		console.log(newSelectedRowKeys);

		setSelectedKeys(newSelectedRowKeys);
		if (props.onSelectedKeys) {
			props.onSelectedKeys(newSelectedRowKeys);
		}
	};

	/**
	 * Evento al cambiar nro de filas (rows)
	 * @param current
	 * @param size
	 */
	const onShowSizeChange = (current: number, size: number) => {
		setPaginationState(`page=${current}&per_page=${size}`);
	};

	/**
	 * Evento al seleccionar página
	 * @param page
	 * @param pageSize
	 */
	const onPaginateSelect = (page: number, pageSize: number) => {
		setPaginationState(`page=${page}&per_page=${pageSize}`);
	};

	/**
	 *Buscar por columna
	 */
	const onSorterColumn = (pagination: unknown, sorter: ITableSorter) => {
		if (sorter.field) {
			const { field, order } = sorter;
			const currentOrder = order === "ascend" ? "ASC" : "DESC";
			setOrdenationState(() => `sort=${currentOrder}&sort_column=${field}`);
		}
	};

	useEffect(() => {
		if (props.selectedKeys) {
			setSelectedKeys(props.selectedKeys);
		}
	}, [props.selectedKeys]);

	useEffect(() => {

		if (ordenationState.length) {
			console.log("on ordenated", ordenationState);
		}
        
		if (paginationState.length) {
            console.log("on paginated", ordenationState);
			// router.visit(
			// 	`/organizacion?${}`,
			// 	{
			// 		only: partialReloadKeys,
			// 	},
			// );
		}
	}, [ordenationState, paginationState]);

	return (
		<Table
			ref={tableRef}
			rowSelection={{
				selectedRowKeys: selectedKeys,
				onChange: onSelectChange,
			}}
			dataSource={data as []}
			columns={columns as []}
			onChange={(pagination, filters, sorter, extra) => {
				return onSorterColumn(pagination, sorter as ITableSorter);
			}}
			pagination={{
				pageSizeOptions: [5, 10, 15, 20],
				pageSize: meta.per_page,
				current: meta.current_page,
				total: meta.total,
				showSizeChanger: true,
				onChange: (page, pageSize) => onPaginateSelect(page, pageSize),
				onShowSizeChange,
			}}
		/>
	);
}
