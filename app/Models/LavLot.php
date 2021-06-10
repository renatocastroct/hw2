<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LavLot extends Model
{
    protected $primaryKey = ["serie", "step"];
    protected $autoIncrement = "false";
    protected $keyType = "string";
    protected $timestamps = false;

    public function lot() {
        return $this -> belongsTo("app\Models\Lot", "serie");
    }
    
    public function machine() {
        return $this -> belongsTo("app\Models\Machine");
    }
}

?>