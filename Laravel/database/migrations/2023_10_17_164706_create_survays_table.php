<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSurvaysTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('survays', function (Blueprint $table) {
      $table->id();
      $table->foreignIdFor(User::class, "user_id");
      $table->string("image", 255)->nullable();
      $table->string("title", 1000);
      $table->string("slug", 1000);
      $table->tinyInteger("status");
      $table->text("description")->nullable();
      $table->timestamps();
      $table->timestamp("expire_date")->nullable();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('survays');
  }
}