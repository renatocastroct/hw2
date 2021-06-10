<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    protected $autoIncrement = "false";

    public function directors() {
        return $this -> hasMany("app\Models\User", "direzione");
    }
    
    public function historical() {
        return $this -> hasMany("app\Models\StoricoAchv", "id_reparto");
    }
}



?>