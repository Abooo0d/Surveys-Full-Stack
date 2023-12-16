<?php

use App\Models\Survay;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSurvayQuestionsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('survay_questions', function (Blueprint $table) {
      $table->id();
      $table->string("type", 45);
      $table->string("question", 2000);
      $table->longText("description")->nullable();
      $table->longText("data")->nullable();
      $table->foreignIdFor(Survay::class, "survay_id");
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
    Schema::dropIfExists('survay_questions');
  }
}
