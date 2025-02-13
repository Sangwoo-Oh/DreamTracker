<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Gemini\Laravel\Facades\Gemini;

class GeminiController extends Controller
{
    function getSuggestedItems(Request $request)
    {
        $numberOfItems = $request->input('numberOfItems');
        $language = $request->input('language');
        $attributes = $request->input('attributes');
        $preferences = $request->input('preferences');

        if ($numberOfItems == null || $numberOfItems == 0) {
            return response()->json(['error' => 'numberOfItems is required']);
        }
        if ($language == null) {
            return response()->json(['error' => 'language is required']);
        }
        if ($attributes == null) {
            return response()->json(['error' => 'attributes is required']);
        }
        if ($preferences == null) {
            return response()->json(['error' => 'preferences is required']);
        }

        $prompt = 'Propose items to add to a Bucket list, based on the parameters (number, preferences) provided. Return only a JSON object in the response with no new lines. Make the Bucket list items as specific as possible, with high-resolution goals.'
            . "The JSON should have the following structure:"
            . '[{ "suggest_id" : <suggest_id>, "title": <title> }, { "suggest_id" : <suggest_id>, "title": <title> },... ]'
            . "\nParameters:"
            . "\nNumber of items: " . $numberOfItems
            . "\nOutput language: " . $language 
            . "\nAttributes: " . $attributes
            . "\nPreferences: " . $preferences;

        $result = Gemini::geminiPro()->generateContent($prompt);
        $content = str_replace('```', '', $result->text());
        $content = str_replace('`', '', $content);
        $content = str_replace('json', '', $content);
        $content = json_decode($content);
        return response()->json($content);
    }
}
