<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <script type="text/javascript" src="https://code.jquery.com/jquery-latest.min.js"></script>
    <script type="text/javascript" src="/jqGrid-master/js/i18n/grid.locale-kr.js"></script>
    <script type="text/javascript" src="/jqGrid-master/js/jquery.jqGrid.min.js"></script>
    <script type="text/javascript" src="/jqGrid-master/js/jquery.jqGrid.src.js"></script>


    <link rel="stylesheet" href="/css/common.css">
    <link rel="stylesheet" href="/css/baseinfo/company.css">
    <link rel="stylesheet" href="/jqGrid-master/css/ui.jqgrid.css">
    <script type="text/javascript" src="/js/baseinfo/company.js"></script>

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
                <label class="option-label" style="display:inline-block">회사명</label><input id="input_name" type="text" class="option-col-2">
            </div>
            <div class="option">
                <label class="option-label" style="display:inline-block">코드</label><input id="input_code" type="text" class="option-col-3">
            </div>
            <br>
            <div class="option">
                <label class="option-label" style="display:inline-block">주소</label><input id="input_addr" type="text" class="option-col-2">
            </div>
        </div>
    </div>
    <div class="middle">
        <div id="test0">

        </div>

        <div id="jqxWidget">
            <table id="testGrid"></table>
        </div>


    </div>
</div>
</body>
</html>
