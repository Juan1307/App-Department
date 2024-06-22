<?php

namespace Database\Factories;

use App\Models\Department;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Department>
 */
class DepartmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'up_department_id' => fake()->numberBetween(1, 5),
            'name' => strtoupper(fake()->jobTitle()),
            'embassador' => fake()->unique()->firstName(),
            'level' => fake()->numberBetween(1, 10),
            'employees' => fake()->randomNumber(4),
        ];
    }
}
