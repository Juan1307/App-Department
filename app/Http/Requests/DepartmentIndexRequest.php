<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DepartmentIndexRequest extends FormRequest
{

    protected $redirect = '/organizacion';

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'per_page' => ['numeric', 'nullable'],
            'sort' => ['contains:ASC,DESC', 'nullable'],
            'sort_column' => ['contains:name,up_department,employees,level,sub_departments_count,embassador', 'nullable']
        ];
    }
}
