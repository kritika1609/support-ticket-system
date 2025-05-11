<?php

namespace Database\Seeders;

use App\Models\User;
use app\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
        ]);
        // $this->call(LabelSeeder::class);
        // $this->call(CategorySeeder::class);
        // $this->call(RolesTableSeeder::class);



    }
}
