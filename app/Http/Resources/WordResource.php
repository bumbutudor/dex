<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class WordResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'predefinition' => $this->predefinition,
            'definition' => $this->definition,
            'synonyms' => $this->synonyms,
            'antonyms' => $this->antonyms,
            'paronyms' => $this->paronyms,
            'other' => $this->other,
            'active' => $this->active,
            'deleted_at' => $this->deleted_at,
            'user_id' => $this->user_id,
            'dictionary_id' => $this->dictionary_id,

        ];
    }
}
