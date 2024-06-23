
export interface Department {
	key: React.Key;
	name: string;
	employees: number;
	level: number;
	up_department: string;
	sub_departments: SubDepartment[] | string;
	embassador: string;
	operation: string;
}

export interface SubDepartment {
	name: string;
	level: number;
	employees: number;
}
