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
                    <ul>
                        <li class="baseinfo_ul">기준정보
                            <ul class="baseinfo_li" hidden>
                                <li><a href="/baseinfo/user" target="main-iframe">사용자관리</a></li>
                                <li><a href="/baseinfo/commoncode" target="main-iframe">표준코드 설정</a></li>
                                <li><a href="/baseinfo/company" target="main-iframe">업체관리</a></li>
                                <li><a href="/baseinfo/warehouse" target="main-iframe">창고관리</a></li>
                                <!--    <li><a href="/viewtest4" target="main-iframe">품목관리</a></li>     -->
                                <li><a href="/baseinfo/bom" target="main-iframe">BOM 관리</a></li>
                                <li><a href="/baseinfo/errorcode" target="main-iframe">불량코드 정보</a></li>
                            </ul>
                        </li>
                        <li class="order_ul">수주관리
                            <ul class="order_li" hidden>
                                <li><a href="/orderManage/order" target="main-iframe">수주처리</a></li>
                                <!--    <li><a href="/viewtest4" target="main-iframe">출하지시</a></li> -->
                                <li><a href="/orderManage/shipout" target="main-iframe">제품출고</a></li>
                                <!--    <li><a href="/viewtest2" target="main-iframe">판매처리</a></li> -->
                            </ul>
                        </li>
                        <li class="process_ul">공정관리
                            <ul class="process_li" hidden>
                                <li><a href="/process/plan" target="main-iframe">생산계획</a></li>
                                <!--    <li><a href="/viewtest4" target="main-iframe">작업지시</a></li> -->
                                <li><a href="/process/process" target="main-iframe">작업일보</a></li>
                            </ul>
                        </li>
                        <li class="log_ul">물류관리
                            <ul class="log_li" hidden>
                                <li><a href="/viewtest2" target="main-iframe">자재 발주</a></li>
                                <li><a href="/viewtest3" target="main-iframe">자재 입고</a></li>
                                <li><a href="/viewtest4" target="main-iframe">자재 불출</a></li>
                                <li><a href="/logistic/stock" target="main-iframe">재고 조회</a></li>
                            </ul>
                        </li>
                    </ul>
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
