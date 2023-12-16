<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSurvayRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   *
   * @return bool
   */
  public function authorize()
  {
    return true;
  }
  protected function prepareForValidation()
  {
    $this->merge([
      'user_id' => $this->user()->id
    ]);
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array
   */
  public function rules()
  {
    return [
      "title" => "required|string|max:1000",
      "image" => "nullable",
      "user_id" => "exists:users,id|nullable",
      "status" => "required|boolean",
      "description" => "nullable|string",
      "expire_date" => "nullable|date|after:today",
      "questions" => "nullable|array",
      "from" => "nullable|string"
    ];
  }
}