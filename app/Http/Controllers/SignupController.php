<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use App\Models\User;

class SignupController extends BaseController
{

    // -- signup_validation.php --

    public function signupValidation() {
        if (request("username") !== null) {

            if(!preg_match("/^[a-zA-Z0-9_]{8,15}$/", request("password"))) {
                return json_encode("Password non valida");
            }
            if (strcmp(request("password"), request("passwordConfirm")) !== 0) {
                return json_encode("Le password non coincidono");
            }
        
            $password = addslashes(request("password"));
            $password = password_hash($password, PASSWORD_BCRYPT);
            $newUser = new User;
            $newUser->nome = request("firstName");
            $newUser->cognome = request("lastName");
            $newUser->livello = '4';
            $newUser->direzione = request("department");
            $newUser->username = request("username");
            $newUser->password = $password;
            $newUser->gender = request("gender");
            $newUser->save();

            if ($newUser) {
                session(["username" => request("username")]);
                session(["name" => request("firstName")]);
                return array("Registrazione effettuata");
            }
        
        } else {
            return json_encode("Errore compilazione");
        }

    }

    // -- check_username.php --

    //controllo username lato client come da specifica ma con poco senso,
    //dato che lo username viene creato dal server
    public function checkUsername($firstName, $lastName, $department) {
        if (!empty($firstName) && !empty($lastName) && !empty($department)) {
            if (!preg_match("/^[A-Za-z]+$/", $firstName)) {
                return json_encode("Nome non valido");
            }
            if (!preg_match("/^[A-Za-z]+$/", $lastName)) {
                return json_encode("Cognome non valido");
            }
        } else {
            $username = request("username");
        }

        $username = strtolower($firstName).$department.strtolower($lastName);
        $data[] = $username;
        $checkUser = User::where("username", $username) -> exists();

        if ($checkUser) {
            return json_encode("Utente già registrato");
        }
        $data[] = "Ok user";
        return $data;
    }

}

?>