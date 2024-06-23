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
        $sort = $search['sort'] ?? 'DESC';
        $sort_column = $search['sort_column'] ?? 'id';
        $search_param = $search['search'] ?? '';
        $search_column = $search['search_column'] ?? 'name';

        if ($search_param) {

            $departments =  Department::with(['detail_department.department', 'up_department'])
                ->withCount('detail_department');
            // search coun
            if ($search_column === 'sub_departments_count') {
                $departments = $departments->having('detail_department_count', '=', $search_param);
            } else {
                $departments = $departments->where($search_column, 'like', "%{$search_param}%");
            }
            $departments =  $departments->paginate($per_page);
        } else {
            $current_sort_column = $sort_column === 'sub_departments_count' ? 'detail_department_count' : $sort_column;

            $departments =  Department::with(['detail_department.department', 'up_department'])
                ->withCount('detail_department')
                ->orderBy($current_sort_column, $sort)
                ->paginate($per_page);
        }

        $total_employees = Department::sum('employees');
        return inertia('Organization/Index', [
            'departments' => fn () => DepartmentResource::collection($departments),
            'total_employees' => fn () => $total_employees,
        ]);
    }

    public function create(DepartmentCreateRequest $request)
    {
        $department = $request->validated();
        $department['level'] = fake()->numberBetween(1, 5);
        $department['employees'] = fake()->randomNumber(4);

        Department::create($department);

        return redirect('/organizacion');
    }
    public function update(Request $request)
    {
    }
    public function delete(string $id)
    {
        Department::find($id)->delete();
        return redirect('/organizacion');
    }
    
    public function deleteMultiple(Request $request)
    {
        $request->validate(['ids' => ['array']]);
        Department::destroy($request['ids']);

        return redirect('/organizacion');
    }
}
