<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Machine extends Model
{
    protected $autoIncrement = "false";
    protected $keyType = "string";

    public function processingMachine() {
        return $this -> hasMany("app\Models\LavLot", "id_macchinario");
    }
}

?>