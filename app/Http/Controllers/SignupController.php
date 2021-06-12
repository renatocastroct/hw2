<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use App\Models\User;

class SignupController extends BaseController
{

    // -- signup_validation.php --

    //registrazione dove cognome e nome possono essere scritti lato client con maiuscole o minuscole
    //tanto comunque lato server si riporta tutto in minuscolo

    public function signupValidation() {
        if (request("username") !== null) {

            if(!preg_match("/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&:;,.?~_|]).{8,15}$/", request("password"))) {
                return json_encode("Password non valida (Upper, Lower, *.!@$%^&:;,.?~_|)");
            }
            if (strcmp(request("password"), request("passwordConfirm")) !== 0) {
                return json_encode("Le password non coincidono");
            }
        
            $password = addslashes(request("password"));
            $password = password_hash($password, PASSWORD_BCRYPT);
            $newUser = new User;
            $newUser->nome = strtolower(request("firstName"));
            $newUser->cognome = strtolower(request("lastName"));
            $newUser->livello = '4';
            $newUser->direzione = request("department");
            $newUser->username = request("username");
            $newUser->password = $password;
            $newUser->gender = request("gender");
            $newUser->save();

            if ($newUser) {
                session(["username" => $newUser->username]);
                session(["name" => $newUser->nome]);
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