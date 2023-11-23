<?php

namespace App\Http\Controllers;

use Grpc\Call;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Mockery\Undefined;
use Psy\Readline\Hoa\StreamOut;
use function Ramsey\Uuid\Lazy\toString;
use function Symfony\Component\Mailer\Command\execute;

class LogisticController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getStock(){
        $prd_cd = $_GET['prd_cd'];
        $ware_cd = $_GET['ware_cd'];

        return DB::table('stock')
            ->where('stock.prd_cd','like','%'.$prd_cd.'%')
            ->where('stock.ware_cd','like','%'.$ware_cd.'%')
            ->groupBy('stock.prd_cd')
            ->leftJoin('bom', 'stock.prd_cd', '=', 'bom.prd_cd')
            ->leftJoin('warehouse', 'stock.ware_cd', '=', 'warehouse.code')
            ->select(
                'stock.*',
                'bom.prd_name', 'bom.prd_unit',
                'warehouse.name AS ware_name'
                )
            ->get();
    }
    public function saveStock(){
        $message = "";
        $state = 0;
        $id = $_POST['id'];
        $prd_cd = $_POST['prd_cd'];
        $ware_cd = $_POST['ware_cd'];
        $stock = $_POST["stock"];
        $etc = $_POST["etc"];

        DB::select("call proc_stock_CU(?,?,?,?,?,?,?)",
            array(
                $message,
                $state,
                $id,
                $prd_cd,
                $ware_cd,
                $stock,
                $etc
            )
        );

        return $message;
    }
    public function deleteStock(){
        DB::table('stock')
            ->where('id','like', $_POST['id'])
            ->delete();
    }

}
