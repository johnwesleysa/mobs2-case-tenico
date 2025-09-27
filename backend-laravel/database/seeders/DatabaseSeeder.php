<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
    {
        User::create([
            'name' => 'Tester',
            'email' => 'test@example.com',
            'password' => Hash::make('password')
        ]);

        Vehicle::create(['plate' => 'ABC1234', 'model' => 'F-150', 'manufacturer' => 'Ford', 'year' => 2018]);
        Vehicle::create(['plate' => 'XYZ9876', 'model' => 'Civic', 'manufacturer' => 'Honda', 'year' => 2020]);
    }
}
