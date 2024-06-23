<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Department extends Model
{
    use HasFactory, SoftDeletes;

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
