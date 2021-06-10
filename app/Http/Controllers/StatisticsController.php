<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Http;

class StatisticsController extends BaseController
{
    function quotes() {
        $mehQuotes = [
            'exchange' => 'XNAS',
            'open' => '57.2',
            'close' => '69.1'
        ];
        $quotes = Http::get('http://api.marketstack.com/v1/tickers', [
            'access_key' => env('QUOTES_KEY'),
            'exchange' => $mehQuotes['exchange'],
            'limit' => 10
            ]);

        if ($quotes->failed()) {
            abort(500);
        }
        $companiesData['meh'] = $mehQuotes;
        //if(!$request)->successful()) return null;
        if($quotes->failed()) {
            return null;
        }
        $companiesData['companies'] = $quotes['data'];
        $symbols = '';
        foreach ($quotes['data'] as $company) {
            $symbols .= $company['symbol'].',';
        }

        $request = Http::get('http://api.marketstack.com/v1/eod/latest', [
            'access_key' => env('QUOTES_KEY'),
            'limit' => 10,
            'symbols' => rtrim($symbols, ",")
            ]);
        if ($request->failed()) {
            abort(500);
        }

        $companiesData['quotes'] = $request['data']; 
        return $companiesData;
    }
}

?>