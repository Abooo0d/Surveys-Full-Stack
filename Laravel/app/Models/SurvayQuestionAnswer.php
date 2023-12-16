<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurvayQuestionAnswer extends Model
{
    use HasFactory;
    protected $fillable = ["survay_question_id","survay_answer_id","answer"];
}
