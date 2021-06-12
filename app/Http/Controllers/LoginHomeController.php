<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use App\Models\User;
use App\Models\Department;
use App\Models\Machine;
use App\Models\StoricoAchv;

class LoginHomeController extends BaseController
{

    // --- home_user.php --

    public function homeUser() {
        if (session("username") !== null) {
            $username = strtolower(session("username"));
        } else {
            $username = addslashes(request("username"));
            $password = addslashes(request("password"));
            }
        
        $user = User::join('departments as d', 'users.direzione', '=', 'd.id')
            ->where('username', $username)
            ->first(['d.nome as direzione', 'users.nome', 'users.cognome', 'users.livello', 'users.username', 'users.password']);
        if($user) {
            if (session("username") == null) {
                if (password_verify($password, $user->password)) {
                    session(["username" => $user->username]);
                    session(["name" => $user->nome]);
                } else {
                    return json_encode("Password errata");
                }
            } 
        } else {
            return json_encode("Utente non trovato");
            }

        return $user;
    }

    // -- home_notlog.php --

    public function homeNotLog() {
        //definire meglio questo array, in altro file o nel db
        $news = [
            [
            'day' => 'Lunedì 29',
            'descrizione' => 'New Apple Contract'
                ],
            [
            'day' => 'Mercoledì 31',
            'descrizione' => 'Avvio campagna vaccinale'
            ],
            [
            'day' => 'Venerdì 2',
            'descrizione' => 'Sintesi incontro aziendale'
            ]
        ];
        $data[] = $news;

        //nel db dovremmo avere sempre l'elenco dei target di ogni reparto per ogni turno (M-P-N)
        //quindi $yesterday avrà sempre risultati per la data di ieri
        $yesterday = date("Y-m-d", mktime(0, 0, 0, date("m"), date("d")-1, date("Y")));
        //questa però per semplicità viene sostituita con una data che contiene già molti risultati
        $yesterday = "2020-06-24";

        $query = StoricoAchv::join('departments as d', 'storico_achvs.id_reparto', '=', 'd.id')
            ->where('storico_achvs.data', $yesterday)
            ->get(['d.nome', 'storico_achvs.target']);
        /*"SELECT r. nome, s.target from reparto r join storico_ach s on s.id_reparto = r.id
             where s.data = '$yesterday'";*/

        if(isset($query)) {
            $data[] = $query;
            return $data;
            } else {
                return json_encode("Errore server");
            }
    }

    // -- home_department.php --

    public function homeDepartment() {
        if(session("username") !== null) {
            $query = Machine::join("departments", "departments.nome", "=", "machines.collocazione")
                ->join("users", "departments.id", "=", "users.direzione")
                ->leftJoin("lav_lots", "machines.id", "=", "lav_lots.id_macchinario")
                ->where("username", session("username"))
                ->get(["machines.*", "lav_lots.serie as serie", "lav_lots.step as step"]);
            foreach ($query as $machine) {
                if ($machine->serie == null) {
                    $machine->serie = "-";
                }
                if ($machine->step == null) {
                    $machine->step = "-";
                }
            }

            if(isset($query)) {
                return $query;
            } else {
                return json_encode("Errore server");
            }
        } else {
            return json_encode("Eseguire l'accesso per visualizzare il contenuto");
        }

    }

    // -- logout.php --

    public function logout($send) {
        session()->flush();
        return redirect($send);
    }
}