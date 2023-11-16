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
        $date1 = $_GET["date1"];
        $date2 = $_GET["date2"];
        $num = $_GET["num"];
        $pdt_code = $_GET["pdt_code"];
        $pdt_name = $_GET["pdt_name"];
        $comp_code = $_GET["comp_code"];
        $comp_name = $_GET["comp_name"];
        $process = $_GET["process"];

        return DB::table('order')
            ->where('order_date','>=',$date1)
            ->where('order_date', '<=',$date2)
            ->where('num','like','%'.$num.'%')
            ->where('order_pdt','like','%'.$pdt_code.'%')
            ->where('order_addr','like','%'.$comp_code.'%')
            ->where('process','like','%'.$process.'%')
            ->leftJoin('company','order.order_addr', '=', 'company.code')
            ->leftJoin('bom','order.order_pdt', '=', 'bom.prd_cd')
            ->select('order.*', 'company.name AS order_addr_name', 'bom.prd_name AS pdt_name', 'bom.prd_unit AS pdt_unit')
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
                    'count2'        =>  $_POST['count2'],
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
                    'count2'        =>  $_POST['count2'],
                    'etc'           =>  $_POST['etc']
                ));
        }
    }
    public function deleteOrder(){
        DB::table('order')
            ->where('id','like', $_POST['id'])
            ->delete();
    }
}
