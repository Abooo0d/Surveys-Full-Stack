<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurvayAnswer extends Model
{
  use HasFactory;
  const UPDATED_AT = null;
  const CREATED_AT = null;
  protected $fillable = ["survay_id", "start_date", "end_date"];
  public function survay()
  {
    return $this->belongsTo(Survay::class);
  }
}