<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <link rel="stylesheet" href="/css/main.css">
        <script type="text/javascript" src="/js/main.js"></script>
    </head>
    <body>
        <div class="container">
            <div class="container-nav">
                <nav>
                    <img class="nav-logo" src="/images/MES_Logo.png">
                    <button id="system-btn" class="nav-btn" onclick="system_func()">시스템관리</button>
                    <button id="baseinfo-btn" class="nav-btn" onclick="baseinfo_func()">기준정보</button>
                    <button id="wks-btn" class="nav-btn" onclick="wks_func()">생산관리</button>
                    <button id="product-btn" class="nav-btn" onclick="product_func()">제품관리</button>
                </nav>
            </div>
            <div class="container-main">
                <iframe
                        id="main-iframe"
                        width="100%"
                        height="100%"
                        name="main-iframe"
                ></iframe>
            </div>
        </div>
    </body>
</html>
