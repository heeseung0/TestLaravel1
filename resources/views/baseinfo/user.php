<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <script type="text/javascript" src="https://code.jquery.com/jquery-latest.min.js"></script>
    <script type="text/javascript" src="/jquery.jqGrid-4.4.3/js/jquery-1.7.2.min.js"></script>
    <script type="text/javascript" src="/jquery.jqGrid-4.4.3/js/i18n/grid.locale-kr.js"></script>
    <script type="text/javascript" src="/jquery.jqGrid-4.4.3/js/jquery.jqGrid.min.js"></script>
    <script type="text/javascript" src="/jquery.jqGrid-4.4.3/js/jquery.jqGrid.src.js"></script>

    <link rel="stylesheet" href="/css/common.css">
    <link rel="stylesheet" href="/css/baseinfo/user.css">
    <script type="text/javascript" src="/js/baseinfo/user.js"></script>

</head>
<body>
    <div class="container">
        <div class="top">
            <div class="buttons">
                <button name="test">테스트용</button>
            </div>
            <div class="options">

            </div>
        </div>
        <div class="middle">
            <div id="test0">
                <h1>jqxGrid(대체 가능)로 users 테이블에서 options조건에 따라 출력</h1>
                <h2>user_level로 권한, 보직 결정</h2>
                <h3>level1 : 평사원(근로자)</h3>
                <h3>level2 : 관리자(현장)</h3>
                <h3>level3 : 관리자(해당 분야 All '생산,공정,물류 etc')</h3>
                <h3>level1024 : 사장</h3>
            </div>

            <div id="jqxWidget">
                <table id="testGrid"></table>
                <div id="pager"></div>
            </div>
        </div>
    </div>
</body>
</html>
