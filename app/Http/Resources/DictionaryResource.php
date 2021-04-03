<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DictionaryResource extends JsonResource
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
            'description' => $this->description,
            'deleted_at' => $this->deleted_at,
            'organization_id' => $this->organization_id,
            'words' => $this->words()->orderByName()->get()->map->only('id', 'name', 'predefinition', 'definition', 'user_id'),
        ];
    }
}
