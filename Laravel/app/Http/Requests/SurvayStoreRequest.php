<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SurvayStoreRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   *
   * @return bool
   */
  public function authorize()
  {
    $survay = $this->route("survay");
    if($this->user()->id !== $survay->user_id){
      return false;
    }
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array
   */
  public function rules()
  {
    return [
      "title"=>"required|string|max:1000",
      "image"=>"string",
      "user_id"=> "exists:user,id",
      "status"=> "required|boolean",
      "description"=> "nullable|string",
      "expire_date"=> "nullable|date|after,today",
      "question"=> "array"
    ];
  }
}
