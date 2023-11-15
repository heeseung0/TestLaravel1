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
    <link rel="stylesheet" href="/css/orderManage/order.css">
    <link rel="stylesheet" href="/jqGrid-master/css/ui.jqgrid.css">
    <script type="text/javascript" src="/js/orderManage/order.js"></script>

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
                <label class="option-label" style="display:inline-block">수주번호</label><input id="input_factory" type="text" class="option-col-2">
            </div>
            <br>
            <div class="option">
                <label class="option-label" style="display:inline-block">품목</label><input id="input_pdt_code" type="text" class="option-sector" placeholder="CODE"><input id="input_pdt_name" type="text" class="option-sector" placeholder="NAME">
                <button class="option-button"><img src="/images/button_search.jpg"></button>
            </div>
            <div class="option">
                <label class="option-label" style="display:inline-block">거래처</label><input id="input_comp_code" type="text" class="option-sector" placeholder="CODE"><input id="input_comp_name" type="text" class="option-sector" placeholder="NAME">
                <button class="option-button"><img src="/images/button_search.jpg"></button>
            </div>
            <div class="option">
                <label class="option-label" style="display:inline-block">진행상태</label><select name="process">
                    <option value="진행중">진행중</option>
                    <option value="완료">완료</option>
                </select>
            </div>
        </div>
    </div>
    <div class="middle">
        <!--
        <iframe
            id="search"
            name="search"
            class="iframe-search"
            hidden="true"
        ></iframe>
        -->
        <div id="test0">
            <pre>
            수주일자	:	order_date	(추가시 select로 date)
            수주번호	:	num
            진행상태	:	process		(추가시 select로 진행중,완료)
            거래처	:	order_addr	(추가시 select로 company에서 가져오기)
            품목코드	:	order_pdt	(추가시 select로 bom에서 가져오기)
            품목명	:	bom에서 조인
            기준단위	:	bom에서 조인
            납품예정일  :	order_dead	(추가시 select로 date)
            수주수량	:	count1
            출하수량	:	conut2
            비고	:	etc
            </pre>
        </div>

        <div id="jqxWidget">
            <table id="Grid01"></table>
        </div>
    </div>
</div>
</body>
</html>
