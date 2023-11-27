<?php

namespace App\Http\Controllers;

use Grpc\Call;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Mockery\Undefined;
use Psy\Readline\Hoa\StreamOut;
use function Ramsey\Uuid\Lazy\toString;
use function Symfony\Component\Mailer\Command\execute;

class OrderManageController extends Controller
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

    public function getOrder(){
        $date1 = isset($_GET["date1"]) ? $_GET["date1"] : '';
        $date2 = isset($_GET["date2"]) ? $_GET["date2"] : '';
        $num = isset($_GET["num"]) ? $_GET["num"] : '';
        $pdt_code = isset($_GET["pdt_code"]) ? $_GET["pdt_code"] : '';
        $pdt_name = isset($_GET["pdt_name"]) ? $_GET["pdt_name"] : '';
        $comp_code = isset($_GET["comp_code"]) ? $_GET["comp_code"] : '';
        $comp_name = isset($_GET["comp_name"]) ? $_GET["comp_name"] : '';
        $process = isset($_GET["process"]) ? $_GET["process"] : '';

        return DB::table('order')
            ->where('order_date','>=',$date1)
            ->where('order_date', '<=',$date2)
            ->where('num','like','%'.$num.'%')
            ->where('order_pdt','like','%'.$pdt_code.'%')
            ->where('order_addr','like','%'.$comp_code.'%')
            ->where('process','like','%'.$process.'%')
            ->groupBy('order.num')
            ->leftJoin('company','order.order_addr', '=', 'company.code')
            ->leftJoin('bom','order.order_pdt', '=', 'bom.prd_cd')
            ->leftJoin('shipout', 'order.num', '=', 'shipout.ordernum')
            ->select(
                'order.*',
                'company.name AS order_addr_name',
                'bom.prd_name AS pdt_name', 'bom.prd_unit AS pdt_unit',
                DB::raw('SUM(shipout.`count`) AS count2')
            )
            ->get();
    }
    public function saveOrder(){
        if(DB::table('order')
                ->where('id', 'like', $_POST['id'])
                ->count() == 0) {
            DB::table('order')
                ->insert(array(
                    'id'            =>  0,
                    'order_date'    =>  $_POST['order_date'],
                    'num'           =>  $_POST['num'],
                    'process'       =>  $_POST['process'],
                    'order_addr'    =>  $_POST['order_addr'],
                    'order_pdt'     =>  $_POST['order_pdt'],
                    'order_dead'    =>  $_POST['order_dead'],
                    'count1'        =>  $_POST['count1'],
                    'etc'           =>  $_POST['etc']
                ));
        }else{
            DB::table('order')
                ->where('id','like', $_POST['id'])
                ->update(array(
                    'order_date'    =>  $_POST['order_date'],
                    'num'           =>  $_POST['num'],
                    'process'       =>  $_POST['process'],
                    'order_addr'    =>  $_POST['order_addr'],
                    'order_pdt'     =>  $_POST['order_pdt'],
                    'order_dead'    =>  $_POST['order_dead'],
                    'count1'        =>  $_POST['count1'],
                    'etc'           =>  $_POST['etc']
                ));
        }
    }
    public function deleteOrder(){
        DB::table('order')
            ->where('id','like', $_POST['id'])
            ->delete();
    }

    public function getShipout(){
        $date1 = isset($_GET["date1"]) ? $_GET["date1"] : '';
        $date2 = isset($_GET["date2"]) ? $_GET["date2"] : '';
        $ordernum = isset($_GET["ordernum"]) ? $_GET["ordernum"] : '';

        return DB::table('shipout')
            ->where('date','>=',$date1)
            ->where('date', '<=',$date2)
            ->where('ordernum','like','%'.$ordernum.'%')
            ->orderBy('orderNum')
            ->get();
    }
    public function saveShipout(){
        //isset 사용 하지 말 것, 애당초 null이나 잘못된 값이 넘어와서 프로시저 들어가면 안 됨.
        $message = "test";
        $state = 0;
        $id = $_POST['id'];
        $ordernum = $_POST["ordernum"];
        $count = $_POST["count"];

        $message = DB::select("call proc_shipout_CU(?,?,?,?,?)",
            array(
                $message,
                $state,
                $id,
                $ordernum,
                $count
            )
        );

        return $message[0];
    }
    public function deleteShipout(){
        DB::table('shipout')
            ->where('id','like', $_POST['id'])
            ->delete();
    }

}
