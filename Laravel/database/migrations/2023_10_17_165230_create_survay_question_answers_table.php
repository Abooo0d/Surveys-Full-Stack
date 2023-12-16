<?php

use App\Models\Survay;
use App\Models\SurvayAnswer;
use App\Models\SurvayQuestion;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSurvayQuestionAnswersTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('survay_question_answers', function (Blueprint $table) {
      $table->id();
      $table->foreignIdFor(SurvayQuestion::class, "survay_question_id");
      $table->foreignIdFor(SurvayAnswer::class, "survay_answer_id");
      $table->text("answer");
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('survay_question_answers');
  }
}
