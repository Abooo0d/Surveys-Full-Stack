<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SurvayQuestionsResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
   */
  public function toArray($request)
  {
    return [
      "id" => $this->id,
      'survey_id' => $this->survay_id,
      'question' => $this->question,
      'type' => $this->type,
      "description" => $this->description,
      'is_required' => (boolean)$this->is_required,
      "data" => json_decode($this->data),
      'created_at' => date('Y-m-d H:i', strtotime($this->created_at)),
      'updated_at' => date('Y-m-d H:i', strtotime($this->updated_at))
      ];
  }
}
