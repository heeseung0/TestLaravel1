<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    //CSRF 검증에서 제외해야 하는 URI
    protected $except = [
        'http://laravel1.localhost/baseinfo/user/saveUser',
        'http://laravel1.localhost/baseinfo/common/save',
        'http://laravel1.localhost/baseinfo/common/del',
        'http://laravel1.localhost/baseinfo/company/save',
        'http://laravel1.localhost/baseinfo/company/del',
        'http://laravel1.localhost/baseinfo/warehouse/save',
        'http://laravel1.localhost/baseinfo/warehouse/del',
        'http://laravel1.localhost/baseinfo/bom/save',
        'http://laravel1.localhost/baseinfo/bom/del',
        'http://laravel1.localhost/baseinfo/error/save',
        'http://laravel1.localhost/baseinfo/error/del',

        'http://laravel1.localhost/orderManage/order/save',
        'http://laravel1.localhost/orderManage/order/del',
        'http://laravel1.localhost/orderManage/shipout/save',
        'http://laravel1.localhost/orderManage/shipout/del',

        'http://laravel1.localhost/process/plan/save',
        'http://laravel1.localhost/process/plan/del',

        'http://laravel1.localhost/logistic/stock/save',
        'http://laravel1.localhost/logistic/stock/del',
    ];
}
