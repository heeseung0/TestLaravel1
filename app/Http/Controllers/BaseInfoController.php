<?php

namespace App\Http\Controllers;

use Grpc\Call;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Mockery\Undefined;
use Psy\Readline\Hoa\StreamOut;
use function Ramsey\Uuid\Lazy\toString;

class BaseInfoController extends Controller
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

    public function getUser(){
        $name = $_GET["name"];
        $date1 = $_GET["date1"];
        $date2 = $_GET["date2"];

        $users = DB::table('users')
            ->where('name','like','%'.$name.'%')
            ->where('created_at','>=',$date1)
            ->where('created_at', '<=',$date2)
            #->where('created_at','>=',Carbon::createFromDate(1975, 5, 21))
            #->where('created_at', '<=',Carbon::createFromDate(2015, 5, 21))
            ->get();
        return $users;
    }

    public function saveUser(){
        // 쿼리 빌더를 사용 하지 않은 이유 : 현재 날짜 시간 가져 오는 함수가 안 먹혀서
        DB::statement(
            "UPDATE users SET "
            ." user_level = " .$_POST['user_level']
            .",updated_at = " ."FROM_UNIXTIME(UNIX_TIMESTAMP(), '%Y-%m-%d %h:%i:%s')"
            ." WHERE id = " .$_POST['id']
        );
    }

    public function getCommon(){
        $factory = $_GET["factory"];
        $code = $_GET["code"];

        $common = DB::table('common')
            ->where('factory','like','%'.$factory.'%')
            ->where('code','like','%'.$code.'%')
            ->orderBy('factory','ASC')
            ->orderBy('code','ASC')
            ->orderBy('code2','ASC')
            ->get();
        return $common;
    }

    public function saveCommon(){
        // 나중에 프로시저로 오류 내용 리턴 해줘야 함.
        $message = " ";
        $state = 0;
        DB::select("call proc_common_CU(?,?,?,?,?,?,?,?,?)",
            array(
                $message,
                $state,
                $_POST['id'],
                $_POST['factory'],
                $_POST['code'],
                $_POST['code2'],
                $_POST['value'],
                $_POST['value2'],
                'false'
            )
        );

        return $message;
        /*
         * 폐기 : 프로시저로 변경
        if($_POST['oper'] == "edit") {
            DB::table('common')
                ->where('id', 'like', $_POST['id'])
                ->update([
                    'code2' => $_POST['code2'],
                    'value' => $_POST['value'],
                    'value2' => $_POST['value2']
                ]);
        }else{
            return;
        }
        */
    }

    public function deleteCommon(){
        DB::table('common')
            ->where('id','like',$_POST['id'])
            ->delete();
    }

    public function getCompany(){
        return DB::table('company')
            ->where('name','like','%'.$_GET['name'].'%')
            ->where('code','like','%'.$_GET['code'].'%')
            ->where('address','like','%'.$_GET['addr'].'%')
            ->orderBy('id','ASC')
            ->get();
    }

    public function saveCompany(){
        $message = " ";
        $state = 0;
        DB::select("call proc_company_CU(?,?,?,?,?,?)",
            array(
                $message,
                $state,
                $_POST['id'],
                $_POST['name'],
                $_POST['code'],
                $_POST["address"]
            )
        );
        return $message;
    }

    public function deleteCompany(){
        DB::table('company')
            ->where('id','like',$_POST['id'])
            ->delete();
    }

    public function getBOM(){
        if($_GET['up_cd']=='nope'){
            return DB::table('bom')
                ->where('prd_cd','like','%'.$_GET['code'].'%')
                ->where('prd_name','like','%'.$_GET['name'].'%')
                ->where('up_cd','like','')
                ->orderBy('prd_cd','ASC')
                ->get();
        }else{
            return DB::table('bom')
                ->where('up_cd','like','%'.$_GET['up_cd'].'%')
                ->orderBy('prd_cd','ASC')
                ->get();
        }
    }

    public function saveBOM(){  // 그냥 다음부턴 프로시저 쓰는게 낫다. 제대로 동작 안함... (cd값만 수정하면 증식함)
        $cd = $_POST['prd_cd'];

        if( DB::table('bom')
            ->where('prd_cd', 'like', $cd)
            ->count() == 0) {
            DB::table('bom')
                ->insert(array(
                    'id'        =>  0,
                    'prd_cd'    =>  $cd,
                    'prd_name'  =>  $_POST['prd_name'],
                    'prd_type'  =>  $_POST['prd_type'],
                    'prd_unit'  =>  $_POST['prd_unit'],
                    'up_cd'     =>  isset($_POST['up_cd']) ? $_POST['up_cd'] : '',
                    'need_count'=>  isset($_POST['need_count']) ? $_POST['need_count'] : '0',
                    'manufacture'=> $_POST['manufacture']
                    ));
        }else{
            DB::table('bom')
                ->where('id','like',$_POST['id'])
                ->update(array(
                    'prd_name'  =>  $_POST['prd_name'],
                    'prd_type'  =>  $_POST['prd_type'],
                    'prd_unit'  =>  $_POST['prd_unit'],
                    'up_cd'     =>  isset($_POST['up_cd']) ? $_POST['up_cd'] : '',
                    'need_count'=>  isset($_POST['need_count']) ? $_POST['need_count'] : '0',
                    'manufacture'=> $_POST['manufacture']
                ));
        }
    }

    public function deleteBOM(){
        DB::table('bom')
            ->where('prd_cd','like',$_POST['prd_cd'])
            ->delete();
    }

    public function getError(){
        return DB::table('error')
            ->where('errorcode','like','%'.$_GET['code'].'%')
            ->get();
    }

    public function saveError(){
        if(DB::table('error')
                ->where('id', 'like', $_POST['id'])
                ->count() == 0) {
            DB::table('error')
                ->insert(array(
                    'id'        =>  0,
                    'errorcode'    =>  $_POST['errorcode'],
                    'explanation'  =>  $_POST['explanation'],
                ));
        }else{
            DB::table('error')
                ->where('id','like',$_POST['id'])
                ->update(array(
                    'id'            =>  $_POST['id'],
                    'errorcode'     =>  $_POST['errorcode'],
                    'explanation'   =>  $_POST['explanation']
                ));
        }
    }

    public function deleteError(){
        DB::table('error')
            ->where('id','like',$_POST['id'])
            ->delete();
    }
}
