let searchResultColNames = [
    '관리','id','수주일자','수주번호','진행상태','거래처코드','거래처',
    '품목코드','품목명','단위','납품예정일','수주수량',
    '출하수량','비고'
];
let searchResultColModel = [
    {name:'empty', index: 'empty', align: "center", formatter:formatOpt, sortable: false, width:110},
    {name: 'id',   index:'id',         align:'center', width: '100', hidden:true},
    {name: 'order_date',        index:'order_date',         align:'center', width:'50', editable:true,
        // select date
        formatter: "date", formatoptions: {newformat: "Y-m-d"}, editoptions: { dataInit: function (elem) { $(elem).datepicker({
                dateFormat: 'yy-mm-dd',
                showMonthAfterYear: true,
                changeYear: true,
                changeMonth: true,
                monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
                dayNamesMin: ['일','월','화','수','목','금','토'],
            }); }}  },
    {name: 'num',               index:'num',                align:'center', width:'50', editable:true,},
    {name: 'process',           index:'process',            align:'center', width:'40', editable:true,
        // select value
        edittype: 'select', formatter: 'select', editoptions: {value: {"진행중":"진행중", "완료":"완료"}} },
    {name: 'order_addr',        index:'order_addr',         align:'center', width:'50', editable:true,
        edittype: 'select', formatter: 'select', editoptions: {value: initCompany()}},
    {name: 'order_addr_name',   index:'order_addr_name',    align:'center', width:'100', editable:false,},
    {name: 'order_pdt',         index:'order_pdt',          align:'center', width:'50', editable:true,
        edittype: 'select', formatter: 'select', editoptions: {value: initBom()}},
    {name: 'pdt_name',          index:'pdt_name',           align:'center', width:'50', editable:false,},
    {name: 'pdt_unit',          index:'pdt_unit',           align:'center', width:'25', editable:false,},
    {name: 'order_dead',        index:'order_dead',         align:'center', width:'50', editable:true,
        formatter: "date", formatoptions: {newformat: "Y-m-d"}, editoptions: { dataInit: function (elem) { $(elem).datepicker({
                dateFormat: 'yy-mm-dd',
                showMonthAfterYear: true,
                changeYear: true,
                changeMonth: true,
                monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
                dayNamesMin: ['일','월','화','수','목','금','토'],
            }); }}  },
    {name: 'count1',            index:'count1',             align:'center', width:'50', editable:true,},
    {name: 'count2',            index:'count2',             align:'center', width:'50', editable:true,},
    {name: 'etc',               index:'etc',                align:'center', width:'90', editable:true,},
]

function initCompany(){
    let value = {};
    $.ajax({
        type: 'get',
        url: '/baseinfo/company/gets',
        data: {
            name: '',
            code: '',
            addr: ''
        },success: (res) => {
            res.forEach ((arr) => {
                let key = arr['code'];
                value[key] = arr['code'];
                //value[key] = arr['name'];
            });
        },error: (err) => {
            console.log(err);
        }
    });
    return value;
}

function initBom(){
    let value = {};
    $.ajax({
        type: 'get',
        url: '/baseinfo/bom/gets',
        data: {
            up_cd: 'all'
        },success: (res) => {
            res.forEach ((arr) => {
                let key = arr['prd_cd'];
                value[key] = arr['prd_cd'];
                //value[key] = arr['prd_name'];
            });
        },error: (err) => {
            console.log(err);
        }
    });
    return value;
}

let where = '';

$(document).ready(function () {
    $("#test0").hide();
/*
    $(document).on("keypress", "input[id='input_factory'],input[id='input_code']", (e) => {
        if(e.keyCode == 13){
            $("button[name='search']").click();
        }
    })
*/
    let today = new Date().toISOString().split('T')[0];

    $('#input_date1').val(today.split('-')[0] + '-' + today.split('-')[1] + '-' + '01');
    $('#input_date2').val(today);

    $(document).on("click", "button[name='search']", function () {
        $.ajax({
            type: "get",
            url: "/orderManage/order/gets",
            data: {
                date1: $('#input_date1').val(),
                date2: $('#input_date2').val(),
                num: $('#input_num').val(),
                pdt_code: $('#input_pdt_code').val(),
                pdt_name: $('#input_pdt_name').val(),
                comp_code: $('#input_comp_code').val(),
                comp_name: $('#input_comp_name').val(),
                process: $('select[name=process]').val()
            },
            success: (res) => {
                console.log(res);

                if (res != null) {
                    $('#Grid01').jqGrid('clearGridData')
                    $('#Grid01').jqGrid('setGridParam', {data: res, page: 1})
                    $('#Grid01').trigger('reloadGrid');
                }

                let jqGridConfig = {
                    datatype: "local",
                    data: res,
                    colNames: searchResultColNames,
                    colModel: searchResultColModel,
                    autowidth: true,
                }

                $("#Grid01").jqGrid(jqGridConfig);
            },error: (err) => {
                console.log(err);
            }
        })
    });

    $(document).on("click", "button[name='add']", function () {
        let init_data = {
            order_date: today,
            process: '진행중',
            order_dead: today
        };
        let rowId = $("#Grid01").getGridParam("reccount");

        $("#Grid01").jqGrid("addRowData", rowId+1, init_data, 'first');
        edit(rowId+1);
    });





    // 팝업
    $(document).on("click", "button[name=pdt]", function() {
        $("#pop").css("display","block");
        $.ajax({
            type: "get",
            url: "/baseinfo/bom/gets",
            data: {
                up_cd: 'all'
            },success: (res) => {
                where='bom';
                if (res != null) {
                    $('#Grid02').GridUnload('#Grid02');
                    $('#Grid02').jqGrid('clearGridData')
                    $('#Grid02').jqGrid('setGridParam', {data: res, page: 1})
                    $('#Grid02').trigger('reloadGrid');
                }

                let jqGridConfig = {
                    datatype: "local",
                    data: res,
                    colNames: [
                        '선택','번호','품번/코드','품명','품목유형','필요량','단위','공정','모품번'
                    ],
                    colModel: [
                        {name:'empty',      index: 'empty', align: "center", formatter:formatSel, sortable: false, width:50},
                        {name: 'id',            index:'id',          align:'center', width: '50', hidden:true},
                        {name: 'prd_cd',        index:'prd_cd',      align:'center', width:'100', editable:true,},
                        {name: 'prd_name',      index:'prd_name',    align:'center', width:'200', editable:true,},
                        {name: 'prd_type',      index:'prd_type',    align:'center', width:'100', editable:true,},
                        {name: 'need_count',    index:'need_count',  align:'center', width:'50', editable:true,},
                        {name: 'prd_unit',      index:'prd_unit',    align:'center', width:'50', editable:true,},
                        {name: 'manufacture',   index:'manufacture', align:'center', width:'100', editable:true,},
                        {name: 'up_cd',         index:'up_cd',       align:'center', width:'100', editable:true,},
                    ],
                    autowidth: true,
                }

                $("#Grid02").jqGrid(jqGridConfig);
            }, error: (err) => {
                console.log(err);
            }
        });
    });
    $(document).on("click", "button[name=comp]", function() {
        $("#pop").css("display","block");
        $.ajax({
            type: "get",
            url: "/baseinfo/company/gets",
            data: {
                name: '',
                code: '',
                addr: ''
            },success: (res) => {
                where='comp';
                if (res != null) {
                    $('#Grid02').GridUnload('#Grid02');
                    $('#Grid02').jqGrid('clearGridData')
                    $('#Grid02').jqGrid('setGridParam', {data: res, page: 1})
                    $('#Grid02').trigger('reloadGrid');
                }

                let jqGridConfig = {
                    datatype: "local",
                    data: res,
                    colNames: [
                        '선택','번호','회사명','코드','주소'
                    ],
                    colModel: [
                        {name:'empty',      index: 'empty', align: "center", formatter:formatSel, sortable: false, width:50},
                        {name: 'id',        index:'id',         align:'center', width: '50', hidden:true},
                        {name: 'name',      index:'name',       align:'center', width:'100', editable:true,},
                        {name: 'code',      index:'code',       align:'center', width:'50', editable:true,},
                        {name: 'address',   index:'address',    align:'center', width:'300', editable:true,}
                    ],
                    autowidth: true,
                }

                $("#Grid02").jqGrid(jqGridConfig);
            }, error: (err) => {
                console.log(err);
            }
        });
    });


    $(document).on("click", "button[name=close]", function() {
        $("#pop").css("display","none");
    });
});


function formatSel(cellvalue, options, rowObject){
    let str = "";
    let row_id = options.rowId;

    str += "<div class=\"btn-group\">";
    str += " <button onclick=\"javascript:select('" + row_id + "')\">선택</button>";
    str += "</div>";

    return str;
}
function select(id){
    let row = $("#Grid02").jqGrid('getRowData', id);

    if(where == 'bom'){
        $("#input_pdt_code").val(row['prd_cd']);
        $("#input_pdt_name").val(row['prd_name']);
    }else if(where == 'comp') {
        $("#input_comp_code").val(row['code']);
        $("#input_comp_name").val(row['name']);
    }

    $("button[name='close']").click();
}

function formatOpt(cellvalue, options, rowObject){
    let str = "";
    let row_id = options.rowId;
    str += "<div class=\"btn-group\">";
    str += " <button onclick=\"javascript:edit('" + row_id + "')\">수정</button>";
    str += " <button onclick=\"javascript:save('" + row_id + "')\">저장</button>";
    str += " <button onclick=\"javascript:cancel('" + row_id + "')\">취소</button>";
    str += " <button onclick=\"javascript:del('" + row_id + "')\">삭제</button>";
    str += "</div>";

    return str;
}
function edit(id){
    let row = $("#Grid01").jqGrid('getRowData', id);
    //row 데이터로 수정 가능 여부에 따라 if문으로 alert처리
    $("#Grid01").editRow(id, true);
}
function save(id){
    let row = $("#Grid01").jqGrid('getRowData', id);
    console.log(row);

    $("#Grid01").editRow(id, false);
    $("#Grid01").jqGrid('saveRow', id, {
        "url": "/orderManage/order/save",
        "mtype": "POST"
    });
}
function cancel(id){
    $("#Grid01").restoreRow(id);
}
function del(id){
    let row = $("#Grid01").jqGrid('getRowData', id);
    $.ajax({
        type: "post",
        url: "/orderManage/order/del",
        data: {id: row.id},
        success: (res) => {
            alert('성공적으로 삭제되었습니다.');
            $("#Grid01").delRowData(id);
        },error: (err) => {
            console.log(err);
        }
    });

}
