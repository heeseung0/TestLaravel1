<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <script type="text/javascript" src="https://code.jquery.com/jquery-latest.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script type="text/javascript" src="/jqGrid-master/js/i18n/grid.locale-kr.js"></script>
    <script type="text/javascript" src="/jqGrid-master/js/jquery.jqGrid.min.js"></script>
    <script type="text/javascript" src="/jqGrid-master/js/jquery.jqGrid.src.js"></script>


    <link rel="stylesheet" href="/css/common.css">
    <link rel="stylesheet" href="/css/orderManage/shipout.css">
    <link rel="stylesheet" href="/jqGrid-master/css/ui.jqgrid.css">
    <script type="text/javascript" src="/js/orderManage/shipout.js"></script>

</head>
<body>
<div class="container">
    <div class="top">
        <div class="buttons">
            <button name="search">조회</button>
            <button name="add">행 추가</button>
        </div>
        <div class="options">
            <div class="option">
                <label class="option-label" style="display:inline-block">수주일</label><input id="input_date1" type="date" class="option-col-3">~<input id="input_date2" type="date" class="option-col-3">
            </div>
            <div class="option">
                <label class="option-label" style="display:inline-block">수주번호</label><input id="input_num" type="text" class="option-col-2">
            </div>
        </div>
    </div>
    <div class="middle">
        <div id="test0">
            <pre>
                제품출고
                    option
                        수주일, 수주번호
                    추가할때 :
                        수주수량 > 출하수량 인 수주에 관해서만 select
                        출하수량이 over 하면 에러 띄워줌 (아직 프로시저 값 반환 하는법을 찾지 못 함)

                    수주번호, 출하 수량 기입, 날짜는 현재시간 자동 넣기
            </pre>
        </div>

        <div id="jqxWidget">
            <table id="Grid01"></table>
        </div>
    </div>
</div>
<div id="pop" style="display: none;">
    <div id="pop_container">
        <div class="top">
            <button class="option-button" name="close"><img src="/images/button_search.jpg"></button>
        </div>
        <div id="jqxWidget">
            <table id="Grid02"></table>
        </div>
    </div>
</div>
</body>
</html>
