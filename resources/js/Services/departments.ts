import { useEffect, useRef, useState } from "react";
import { Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { FilterDropdownProps } from "antd/es/table/interface";
import type {
    TableColumnsType,
    TableColumnType,
    InputRef,
    TableProps,
} from "antd";

import { generateRows } from "@/Utils/generate/index";

export interface Department {
    key: React.Key;
    name: string;
    employees: number;
    level: number;
    up_department: string;
    sub_departments: SubDepartment[] | string;
    embassador: string;
}

export interface SubDepartment {
    name: string;
    level: number;
    employees: number;
}


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
            console.log('visible', visible);
        },

        onFilter: (value, record) => record.name.includes(value as string),
        sorter: true,
        showSorterTooltip: false,
    },
    {
        title: "División superior",
        dataIndex: "up_department",
        key: "up_department",
        sorter: true,
        showSorterTooltip: false,
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
];

export { columns };
