<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Account;
use App\Models\Contact;
use App\Models\Organization;
use App\Models\Dictionary;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $account = Account::create(['name' => 'IFR-IMI']);
        // $organization = Organization::create(['name' => 'IMI']);

        User::factory()->create([
            'account_id' => $account->id,
            'organization_id' => 1,
            'first_name' => 'Tudor',
            'last_name' => 'Bumbu',
            'email' => 'tudor.bumbu@math.md',
            'owner' => true,
        ]);

        User::factory()->count(1)->create([
            'account_id' => $account->id,
        ]);

        $organizations = Organization::factory()->count(1)->create([
            'account_id' => $account->id
        ]);

		
    }
}
