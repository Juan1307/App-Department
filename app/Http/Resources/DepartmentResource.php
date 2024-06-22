<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DepartmentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        $sub_departments = (count($this->detail_department) > 0) ?
            $this->detail_department->pluck('department')->select(['name', 'level', 'employees'])
            : 'Sin departamentos';
        $up_department = $this->up_department ? $this->up_department->name : 'Sin superior';

        return [
            'key' => $this->id,
            'name' => $this->name,
            'employees' => $this->employees,
            'level' => $this->level,
            'up_department' => $up_department,
            'sub_departments_count' =>  $this->detail_department_count,
            'sub_departments' =>  $sub_departments,
            'embassador' => $this->embassador,
        ];
    }
}
