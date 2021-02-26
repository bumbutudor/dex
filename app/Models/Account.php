<?php

namespace App\Models;

class Account extends Model
{
    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function organizations()
    {
        return $this->hasMany(Organization::class);
    }

    public function dictionaries()
    {
        return $this->hasMany(Dictionary::class);
    }

    public function contacts()
    {
        return $this->hasMany(Contact::class);
    }
}
