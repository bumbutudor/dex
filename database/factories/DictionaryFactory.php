<?php

namespace Database\Factories;

use App\Models\Dictionary;
use Illuminate\Database\Eloquent\Factories\Factory;

class DictionaryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Dictionary::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
		$dictNames = "Dicționar ".random_int(1, 10 );
        return [
            'name' => $dictNames,
            'description' => $this->faker->realText,
        ];
    }
}
