<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use App\Models\Lot;

class ManageLotsController extends BaseController
{
    
    public function manageLots($initCall = 1, $lot = "null", $product = "null", $flag = "null") {
        if(session("username") == null) {
            return json_encode("Eseguire l'accesso per visualizzare il contenuto");
        }

        if ($initCall == 1) {
            return $noTable = [];
        }

        if ($lot == "null" && $product == "null" && $flag == "null") {
            $lotsList = Lot::all();
        } else {
            if ($product !== "null") {
                $query = Lot::where("prodotto", $product);
            }
            if ($flag !== "null") {
                $query = Lot::where("flag", $flag);
            }
            if ($lot !== "null") {
                $query = Lot::where("serie", "like", '%'.$lot.'%');
            }
            $lotsList = $query->get();
        }

        if ($lotsList) {
            return $lotsList;
        } else {
            return json_encode("Errore server");
        }
    }

    public function dropLot($lot) {
        $query = Lot::destroy($lot);
        if ($query) {
            return json_encode("Lotto eliminato correttamente");
        } else {
            return json_encode("Errore server");
        }
    }

    public function createLot($lot, $product, $nWfs) {
        $checkLot = Lot::where('serie', $lot)->first('serie');
        if ($checkLot) {
            return json_encode("Lotto già presente");
        }

        $newLot = new Lot;
        $newLot->serie = $lot;
        $newLot->prodotto = $product;
        $newLot->n_wfs = $nWfs;
        $newLot->flag = null;
        $newLot->save();

        if ($newLot) {
            return json_encode("Lotto inserito correttamente");
        } else {
            return json_encode("Errore server");
        }
    }
    
}
?>

