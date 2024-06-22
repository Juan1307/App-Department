import { useState, useEffect, useRef } from "react";

import { Divider, Input, Checkbox } from "antd";

const CheckboxGroup = Checkbox.Group;

export default function FilterDropdown(params: type) {
	const [checkedList, setCheckedList] = useState<string[]>(defaultCheckedList);

	const checkAll = plainOptions.length === checkedList.length;
	const indeterminate =
		checkedList.length > 0 && checkedList.length < plainOptions.length;

	const onChange = (list: string[]) => {
		setCheckedList(list);
	};

	const onCheckAllChange: CheckboxProps["onChange"] = (e) => {
		setCheckedList(e.target.checked ? plainOptions : []);
	};

	return (
		<div>
			<CheckboxGroup />
		</div>
	);
}
