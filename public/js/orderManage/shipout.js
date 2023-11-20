let searchResultColNames = [
    '관리','id','LOT','수주번호','출하수량','출하일시'
];
let searchResultColModel = [
    {name:'empty', index: 'empty', align: "center", formatter:formatOpt, sortable: false, width:110},
    {name: 'id',   index:'id',         align:'center', width: '100', hidden:true},
    {name: 'lot',               index:'lot',                align:'center', width:'150', editable:false,},
    {name: 'ordernum',          index:'ordernum',         align:'center', width:'150', editable:true,
        edittype: 'select', formatter: 'select', editoptions: {value: initOrder()}},
    {name: 'count',             index:'order_addr_name',    align:'center', width:'50', editable:true,},
    {name: 'date',              index:'order_pdt',          align:'center', width:'100', editable:false},
]

function initOrder(){
    let value = {};
    $.ajax({
        type: 'get',
        url: '/orderManage/order/gets',
        data: {
            date1: '2020-01-01',
            date2: '2030-01-01'
        },success: (res) => {
            res.forEach ((arr) => {
                let key = arr['num'];
                value[key] = arr['num'];
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
    $(document).on("keypress", "input[id='input_num']", (e) => {
        if(e.keyCode == 13){
            $("button[name='search']").click();
        }
    })
    let today = new Date().toISOString().split('T')[0];

    $('#input_date1').val(today.split('-')[0] + '-' + today.split('-')[1] + '-' + '01');
    $('#input_date2').val(today);

    $(document).on("click", "button[name='search']", function () {
        $.ajax({
            type: "get",
            url: "/orderManage/shipout/gets",
            data: {
                date1: $('#input_date1').val(),
                date2: $('#input_date2').val(),
                ordernum: $('#input_num').val()
            },
            success: (res) => {
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
        let rowId = $("#Grid01").getGridParam("reccount");

        $("#Grid01").jqGrid("addRowData", rowId+1, 'first');
        edit(rowId+1);
    });
});

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

    $.ajax({
        type: 'post',
        url: '/orderManage/shipout/save',
        data: {
            id: id,
            ordernum: row.ordernum,
            count: row.count
        },success: (res) => {
            console.log(res);
            $("#Grid01").editRow(id, false);
        },error: (err) => {
            console.log(err);
        }
    });
}
function cancel(id){
    $("#Grid01").restoreRow(id);
}
function del(id){
    let row = $("#Grid01").jqGrid('getRowData', id);
    $.ajax({
        type: "post",
        url: "/orderManage/shipout/del",
        data: {id: row.id},
        success: (res) => {
            alert('성공적으로 삭제되었습니다.');
            $("#Grid01").delRowData(id);
        },error: (err) => {
            console.log(err);
        }
    });

}
