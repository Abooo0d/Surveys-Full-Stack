<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSurvayAnswerRequest;
use App\Http\Requests\StoreSurvayRequest;
use App\Http\Requests\UpdateSurvayRequest;
use App\Http\Resources\SurvayResource;
use App\Models\Image;
use App\Models\Survay;
use App\Models\SurvayAnswer;
use App\Models\SurvayQuestion;
use App\Models\SurvayQuestionAnswer;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\File;
// use Illuminate\Validation\Rules\File;
use Symfony\Component\HttpFoundation\Request;
use Illuminate\Support\Facades\Validator;
use App\Enums\QuestionTypeEnum;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Support\Facades\URL;

class SurvayController extends Controller
{
  /**
   * Display a listing of the resource.
   *
  //  * @return SurvayResource::collection
   */
  public function index(Request $request)
  {
    $user = $request->user();
    return SurvayResource::collection(Survay::where("user_id", $user->id)->orderBy("created_at", "desc")->paginate(6));
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \App\Http\Requests\StoreSurvayRequest $request
   */
  public function store(StoreSurvayRequest $request)
  {
    $data = $request->validated();
    // Check IF Image Was Given And Save On Local File System
    if (isset($data["image"])) {
      $relativePath = $this->saveImage($data["image"]);
      $data["image"] = $relativePath;
    }
    /** @var Survay $survay */
    $survay = Survay::create($data);
    foreach ($data["questions"] as $question) {
      $question['survay_id'] = $survay->id;
      $this->createQuestion($question);
    }
    return new SurvayResource($survay);
  }
  /**
   * Display the specified resource.
   *
   * @param  \App\Models\Survay  $survay
   * @return SurvayResource
   */
  public function show(Survay $survay, Request $request)
  {
    $user = $request->user();
    if ($user->id !== $survay->user_id) {
      return abort(403, "Unauthorized Action");
    }
    return new SurvayResource($survay);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \App\Http\Requests\UpdateSurvayRequest  $request
   * @param  \App\Models\Survay  $survay
   * @return SurvayResource
   */
  public function update(UpdateSurvayRequest $request, Survay $survay)
  {
    $data = $request->validated();
    if (isset($data["image"])) {
      $relativePath = $this->saveImage($data["image"]);
      $data["image"] = $relativePath;
      if ($survay->image) {
        $absolutePath = public_path($survay->image);
        File::delete($absolutePath);
      }
    }
    $survay->update($data);

    $existingIDs = $survay->questions()->pluck("id")->toArray();
    $newIDs = Arr::pluck($data["questions"], "id");
    $toDelete = array_diff($existingIDs, $newIDs);
    $toAdd = array_diff($newIDs, $existingIDs);
    SurvayQuestion::destroy(($toDelete));
    foreach ($data["questions"] as $question) {
      if (in_array($question["id"], $toAdd)) {
        $question["survay_id"] = $survay->id;
        $this->createQuestion($question);
      }
    }
    $questionMap = collect($data["questions"])->keyBy("id");
    foreach ($survay->questions as $question) {
      if (isset($questionMap[$question->id])) {
        $this->updateQuestion($question, $questionMap[$question->id]);
      }
    }
    return new SurvayResource($survay);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Survay  $survay
   * @return \Illuminate\Http\Response
   */
  public function destroy(Survay $survay, Request $request)
  {
    $user = $request->user();
    if ($user->id !== $survay->user_id) {
      return abort(403, "Unauthorized Action");
    }
    $survay->delete();
    if ($survay->image) {
      $absolutePath = public_path($survay->image);
      File::delete($absolutePath);
    }
    return response("", 204);
  }
  /**
   * Save Image In Local File System And Return Saved Image Path
   * @param $image
   * @throws \Exception
   * @author Abood <abdsadalden2001@gmail.com>
   */
  private function saveImage($image)
  {
    // Check If Image Is Valid base64 string
    if (preg_match("/^data:image\/(\w+);base64,/", $image, $type)) {
      // Take Out The Base64 encoded Text WithOut Mime type
      $image = substr($image, strpos($image, ",") + 1);
      // Get The File type
      $type = strtolower($type[1]);
      // Check If The Type Is In The Allowed Type Array
      if (!in_array($type, ["jpeg", "jpg", "gif", "png"])) {
        throw new \Exception("Invalid Image Type");
      }
      $image = str_replace(" ", "+", $image);
      $image = base64_decode($image);
      if ($image === false) {
        throw new \Exception("base64_decode Failed");
      }
    } else {
      throw new \Exception("Did Not Match Data URI With Image Data");
    }
    $dir = "images/";
    $file = Str::random() . "." . $type;
    $absolutePath = public_path($dir);
    $relativePath = $dir . $file;
    if (!File::exists(($absolutePath))) {
      File::makeDirectory($absolutePath, 0755, true);
    }
    file_put_contents($relativePath, $image);
    return $relativePath;
  }
  /**
   * Create A Question And Return
   * @param $data
   * @return mixed
   * @throws \Illuminate\Validation\ValidationException
   * @author Abood <abdsadalden2001@gmail.com>
   */
  private function createQuestion($data)
  {
    if (is_array($data['data'])) {
      $data['data'] = json_encode($data['data']);
    }
    $validator = Validator::make($data, [
      "question" => "required|string",
      "type" => ["required", new Enum(QuestionTypeEnum::class)],
      "description" => "nullable|string",
      "data" => "present",
      "survay_id" => "nullable|exists:survays,id"
    ]);
    return SurvayQuestion::create($validator->validated());
  }
  /**
   * Create A Question And Return
   * @param SurvayQuestion $question
   * @param  $data
   * @return bool
   * @throws \Illuminate\Validation\ValidationException
   * @author Abood <abdsadalden2001@gmail.com>
   */
  private function updateQuestion(SurvayQuestion $question, $data)
  {
    if (is_array($data["data"])) {
      $data["data"] = json_encode($data["data"]);
    }
    $validator = Validator::make($data, [
      "id" => "exists:survay_questions,id",
      "question" => "required|string",
      "type" => ["required", new Enum(QuestionTypeEnum::class)],
      "description" => "nullable|string",
      "data" => "present"
    ]);
    return $question->update(($validator->validated()));
  }
  public function getBySlug(Survay $survay)
  {
    if (!$survay->status) {
      return response("Not Active", 404);
    }
    $currenDate = new \DateTime();
    $expireDate = new \DateTime($survay->expire_date);
    if ($currenDate > $expireDate) {
      return response("Expired Date", 404);
    }
    return new SurvayResource($survay);
  }
  public function storeAnswer(StoreSurvayAnswerRequest $request, Survay $survay)
  {
    $validated = $request->validated();
    $survayAnswer = SurvayAnswer::create([
      "survay_id" => $survay->id,
      "start_date" => date("Y-m-d H:i:s"),
      "end_date" => date("Y-m-d H:i:s"),
    ]);
    foreach ($validated["answers"] as $questionId => $answer) {
      $question = SurvayQuestion::where(["id" => $questionId, "survay_id" => $survay->id])->get();
      if (!$question) {
        return response("Invalid Question ID:\"$questionId\"", 400);
      }
      $data = [
        "survay_question_id" => $questionId,
        "survay_answer_id" => $survayAnswer->id,
        "answer" => is_array($answer) ? json_encode($answer) : $answer,
      ];
      $questionAnswer = SurvayQuestionAnswer::create($data);
    }
    return response("Success", 201);
  }
}
