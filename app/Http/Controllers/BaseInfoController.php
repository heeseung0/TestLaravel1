<?php

namespace App\Http\Controllers;

use Grpc\Call;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Psy\Readline\Hoa\StreamOut;

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
}
