<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DepartmentCreateRequest extends FormRequest
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
            'name' => ['required', 'unique:departments,name', 'max:45'],
            'embassador' => ['required', 'max:100'],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'El departamento es requerido',
            'name.unique' => 'El departamento debe ser único',
            'name.max' => 'El departamento debe ser menor a 45 caracteres',
            'embassador.required' => 'El embajador es requerido',
            'embassador.max' => 'El embajador debe ser menor a 100 caracteres',
        ];
    }
}
