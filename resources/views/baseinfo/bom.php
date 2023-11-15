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
    <link rel="stylesheet" href="/css/baseinfo/bom.css">
    <link rel="stylesheet" href="/jqGrid-master/css/ui.jqgrid.css">
    <script type="text/javascript" src="/js/baseinfo/bom.js"></script>

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
                <label class="option-label" style="display:inline-block">품번</label><input id="input_code" type="text" class="option-col-2">
            </div>
            <div class="option">
                <label class="option-label" style="display:inline-block">품명</label><input id="input_name" type="text" class="option-col-2">
            </div>
        </div>
    </div>
    <div class="middle">
        <div id="test0">

        </div>

        <div id="jqxWidget01">
            <table id="Grid01"></table>
        </div>

        <div id="jqxWidget02">
            <table id="Grid02"></table>
        </div>
    </div>
</div>
</body>
</html>
