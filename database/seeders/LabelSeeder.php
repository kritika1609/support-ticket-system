<?php

namespace Database\Seeders;
use App\Models\Label;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LabelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $labels = ['Urgent', 'Low Priority', 'Feature Request', 'Bug', 'In Progress', 'Pending Response'];

        foreach ($labels as $name) {
            Label::create(['name' => $name]);
        }
    }
}
