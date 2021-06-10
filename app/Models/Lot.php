<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lot extends Model
{
    protected $primaryKey = "serie";
    protected $autoIncrement = "false";
    protected $keyType = "string";

    public function processingLot() {
        return $this -> hasOne("app\Models\LavLot", "serie");
    }
}

?>