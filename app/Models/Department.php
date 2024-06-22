<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    protected $fillable = ['up_department_id', 'name', 'embassador', 'level', 'employees'];

    public function detail_department()
    {
        return $this->hasMany(DetailDepartment::class);
    }
    public function up_department()
    {
        return $this->hasOne(Department::class, 'up_department_id');
    }
}
