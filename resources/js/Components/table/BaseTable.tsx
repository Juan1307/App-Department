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
		const _paginationState = `page=${current}&per_page=${size}`;
		router.get(
			`/organizacion`,
			{ page: current, per_page: size },
			{
				only: partialReloadKeys,
				preserveState: true,
			},
		);
	};

	/**
	 * Evento al seleccionar página
	 * @param page
	 * @param pageSize
	 */
	const onPaginateSelect = (page: number, pageSize: number) => {
		const _paginationState = `page=${page}&per_page=${pageSize}`;
		router.get(
			`/organizacion`,
			{ page: page, per_page: pageSize },
			{
				only: partialReloadKeys,
				preserveState: true,
			},
		);
		// router.visit(`/organizacion?${_paginationState}`, {
		// 	only: partialReloadKeys,
		// });
	};

	/**
	 *Buscar por columna
	 */
	const onSorterColumn = (pagination: unknown, sorter: ITableSorter) => {
		if (sorter.field) {
			const { field, order } = sorter;
			const currentOrder =
				order === "ascend" ? "ASC" : order === "descend" ? "DESC" : undefined;

			if (currentOrder) {
				const _ordenationState = `page=${meta.current_page}&per_page=${meta.per_page}&sort=${currentOrder}&sort_column=${field}`;
				router.visit(`/organizacion?${_ordenationState}`, {
					only: partialReloadKeys,
				});
			}
		}
	};

	return (
		<Table
			ref={tableRef}
			rowSelection={{
				selectedRowKeys: props.selectedKeys,
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
