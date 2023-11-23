<?php

namespace App\Http\Controllers;

use Grpc\Call;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Mockery\Undefined;
use Psy\Readline\Hoa\StreamOut;
use function Ramsey\Uuid\Lazy\toString;
use function Symfony\Component\Mailer\Command\execute;

class ProcessController extends Controller
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

    public function getPlan(){
        $date1 = isset($_GET["date1"]) ? $_GET["date1"] : '';
        $date2 = isset($_GET["date2"]) ? $_GET["date2"] : '';
        $prd_cd = $_GET['prd_cd'];

        return DB::table('plan')
            ->where('created_at','>=',$date1)
            ->where('created_at', '<=',$date2)
            ->where('plan.prd_cd','like','%'.$prd_cd.'%')
            ->leftJoin('bom','plan.prd_cd','=','bom.prd_cd')
            ->leftJoin('stock','plan.prd_cd', '=', 'stock.prd_cd')
            ->select('plan.*', 'bom.*')
            ->orderBy('created_at')
            ->orderBy('plan.prd_cd')
            ->select('plan.*','bom.prd_name','bom.prd_unit','stock.stock')
            ->get();
    }
    public function savePlan(){
        //isset 사용 하지 말 것, 애당초 null이나 잘못된 값이 넘어와서 프로시저 들어가면 안 됨.
        $message = "test";
        $state = 0;
        $id = $_POST['id'];
        $end_at = $_POST['end_at'];
        $prd_cd = $_POST['prd_cd'];
        $count = $_POST["count"];

        DB::select("call proc_plan_CU(?,?,?,?,?,?)",
            array(
                $message,
                $state,
                $id,
                $end_at,
                $prd_cd,
                $count
            )
        );

        return $message;
    }
    public function deletePlan(){
        DB::table('plan')
            ->where('id','like', $_POST['id'])
            ->delete();
    }

}
