<?php

namespace Database\Seeders;

use App\Models\{DetailDepartment, Department};
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Department::factory()
            ->recycle(DetailDepartment::factory()->count(10)->create())
            ->create();
    }
}
