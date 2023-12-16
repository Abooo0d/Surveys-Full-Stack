<?php

namespace App\Http\Controllers;

use App\Http\Resources\SurvayAnswerResource;
use App\Http\Resources\SurvayDashboardResource;
use App\Models\Survay;
use App\Models\SurvayAnswer;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
  public function index(Request $request)
  {
    $user = $request->user();
    // return response(["data" => "true", "user" => $user]);
    // Total Numbers Of Survays
    $total = Survay::query()->where("user_id", $user->id)->count();
    // Latest Survay
    $latest = Survay::query()->where("user_id", $user->id)->latest("created_at")->first();
    // return response(["Latest_Survays" => $total]);
    // Total Numbers Of Answers
    $totalAnswers = SurvayAnswer::query()
      ->join("survays", "survay_answers.survay_id", "=", "survays.id")
      ->where("survays.user_id", $user->id)->count();
    // Latest 5 Answers
    $latestAnswers = SurvayAnswer::query()
      ->join("survays", "survay_answers.survay_id", "=", "survays.id")
      ->where("survays.user_id", $user->id)
      ->orderBy("end_date", "DESC")
      ->limit(5)->getModels("survay_answers.*");
    return [
      "totalSurvays" => $total,
      "latestSurvay" => $latest ? new SurvayDashboardResource($latest) : null,
      "totalAnswers" => $totalAnswers,
      "latestAnswers" => SurvayAnswerResource::collection($latestAnswers),
      "user" => $user
    ];
  }
}