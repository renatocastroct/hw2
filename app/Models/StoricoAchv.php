<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StoricoAchv extends Model
{
    public $timestamps = false;

    public function department() {
        return $this -> belongsTo("app\Models\Department");
    }
}

?>