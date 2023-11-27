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
    <link rel="stylesheet" href="/css/process/process.css">
    <link rel="stylesheet" href="/jqGrid-master/css/ui.jqgrid.css">
    <script type="text/javascript" src="/js/process/process.js"></script>

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
                <label class="option-label" style="display:inline-block">등록일</label><input id="input_date1" type="date" class="option-col-3">~<input id="input_date2" type="date" class="option-col-3">
            </div>
            <br>
            <div class="option">
                <label class="option-label" style="display:inline-block">품목</label><input id="input_pdt_code" type="text" class="option-sector" placeholder="CODE" readonly><input id="input_pdt_name" type="text" class="option-col-2" placeholder="NAME" readonly>
                <button class="option-button" name="pdt"><img src="/images/button_search.jpg"></button>
            </div>
        </div>
    </div>
    <div class="middle">
        <div id="test0">
            <pre>
                제품출고 -> stock에서 깎아야함
                작업일보 -> stock에서 필요한 재료들 수량 깎아야함
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
