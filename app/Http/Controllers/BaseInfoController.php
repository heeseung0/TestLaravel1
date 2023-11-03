<?php

namespace App\Http\Controllers;

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
}
