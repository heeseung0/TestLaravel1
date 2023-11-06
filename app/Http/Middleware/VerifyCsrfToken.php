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
        'http://laravel1.localhost/baseinfo/common/save'
    ];
}
