<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Word extends Model
{
    use SoftDeletes, HasFactory;

    public function dictionary()
    {
        return $this->belongsTo(Dictionary::class);
    }

    public function getNameAttribute()
    {
        return $this->name;
    }

    public function scopeOrderByName($query)
    {
        $query->orderBy('name');
    }
	
	public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where('name', 'like', '%'.$search.'%');
        })->when($filters['trashed'] ?? null, function ($query, $trashed) {
            if ($trashed === 'with') {
                $query->withTrashed();
            } elseif ($trashed === 'only') {
                $query->onlyTrashed();
            }
        });
    }
}
