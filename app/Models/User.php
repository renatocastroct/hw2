<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    public function direct() {
        return $this -> belongsTo("app\Models\Department");
    }
}

?>