<?php

namespace App\Http\Controllers;

use App\Http\Requests\{DepartmentCreateRequest, DepartmentIndexRequest};
use App\Http\Resources\DepartmentResource;
use App\Models\{DetailDepartment, Department};

use Illuminate\Http\Request;
// use Illuminate\Pagination\Paginator;

class DepartmentController extends Controller
{
    public function index(DepartmentIndexRequest $request)
    {
        $search = $request->validated();
        $per_page = $search['per_page'] ?? 5;

        $departments =  Department::with('up_department')
            ->with('detail_department.department')
            ->withCount('detail_department')
            ->paginate($per_page);

        $total_employees = Department::sum('employees');

        return inertia('Organization/Index', [
            'departments' => fn () => DepartmentResource::collection($departments),
            'total_employees' => fn () => $total_employees,
        ]);
    }

    public function create(DepartmentCreateRequest $request)
    {
        $department = $request->validated();
        $department['up_department_id'] = NULL;
        $department['level'] = fake()->numberBetween(1, 5);
        $department['employees'] = fake()->randomNumber(4);

        Department::create($department);

        return redirect('/organizacion');
    }
    public function update(Request $request)
    {
    }
    public function delete(Request $request)
    {
    }
}
