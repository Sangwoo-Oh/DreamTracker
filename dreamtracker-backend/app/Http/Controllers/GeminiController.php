<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Gemini\Laravel\Facades\Gemini;

class GeminiController extends Controller
{
    function test_hello_gemini()
    {
        $numberOfItems = 10;
        $language = "Japanese";
        $attributes = ["Male", "27 years old", "office worker", "married"];
        $preferences = ["Outdoors", "socializing", "overseas travel"];
        $prompt = 'Propose items to add to a Bucket list, based on the parameters (number, preferences) provided. Return only a JSON object in the response with no new lines. Make the Bucket list items as specific as possible, with high-resolution goals.'
            . "The JSON should have the following structure:"
            . '[{ "suggest_id" : <suggest_id>, "title": <title> }, { "suggest_id" : <suggest_id>, "title": <title> },... ]'
            . "\nParameters:"
            . "\nNumber of items: " . $numberOfItems
            . "\nOutput language: " . $language 
            . "\nAttributes: " . implode(", ", $attributes) 
            . "\nPreferences: " . implode(", ", $preferences);

        // dump($prompt);

        $result = Gemini::geminiPro()->generateContent($prompt);
        $content = str_replace('```', '', $result->text());
        $content = str_replace('`', '', $content);
        $content = str_replace('json', '', $content);
        $content = json_decode($content);
        return response()->json($content);
    }
}
