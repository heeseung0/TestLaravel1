let searchResultColNames = [
    '관리','id','품목코드','품명','단위','창고코드','창고이름','재고','비고'
];
let searchResultColModel = [
    {name:'empty', index: 'empty', align: "center", formatter:formatOpt, sortable: false, width:110},
    {name: 'id',   index:'id',         align:'center', width: '100', hidden:true},
    {name: 'prd_cd',         index:'prd_cd',          align:'center', width:'50', editable:true,
        edittype: 'select', formatter: 'select', editoptions: {value: initBom()}},
    {name: 'prd_name', index:'prd_name', align:'center', width:'150', editable:false,},
    {name: 'prd_unit', index:'prd_unit', align:'center', width:'50', editable:false,},
    {name: 'ware_cd',         index:'ware_cd',          align:'center', width:'50', editable:true,
        edittype: 'select', formatter: 'select', editoptions: {value: initWare()}},
    {name: 'ware_name', index:'ware_name', align:'center', width:'150', editable:false,},
    {name: 'stock', index:'stock', align:'center', width:'50', editable:true,},
    {name: 'etc', index:'etc', align:'center', width:'100', editable:true,},
]

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
            });
        },error: (err) => {
            console.log(err);
        }
    });
    return value;
}

function initWare(){
    let value = {};
    $.ajax({
        type: 'get',
        url: '/baseinfo/warehouse/gets',
        data: {
            all: 'all'
        },success: (res) => {
            res.forEach ((arr) => {
                let key = arr['code'];
                value[key] = arr['code'];
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
    $(document).on("click", "button[name='search']", function () {
        $.ajax({
            type: "get",
            url: "/logistic/stock/gets",
            data: {
                prd_cd: $('#input_pdt_code').val(),
                ware_cd: $('#input_ware_code').val()
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
    $(document).on("click", "button[name=ware]", function() {
        $("#pop").css("display","block");
        $.ajax({
            type: "get",
            url: "/baseinfo/warehouse/gets",
            data: {
                all: 'all'
            },success: (res) => {
                where='ware';
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
                        '선택','번호','창고코드','창고이름','창고위치','비고'
                    ],
                    colModel: [
                        {name:'empty',      index: 'empty', align: "center", formatter:formatSel, sortable: false, width:50},
                        {name: 'id',        index:'id',         align:'center', width: '50', hidden:true},
                        {name: 'code',      index:'code',       align:'center', width:'50', editable:true,},
                        {name: 'name',      index:'name',       align:'center', width:'100', editable:true,},
                        {name: 'address',   index:'address',    align:'center', width:'300', editable:true,},
                        {name: 'etc',       index:'etc',    align:'center', width:'200', editable:true,}
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
    }else if(where == 'ware') {
        $("#input_ware_code").val(row['code']);
        $("#input_ware_name").val(row['name']);
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

    $("#Grid01").jqGrid('saveRow', id, {
        "url": "/logistic/stock/save",
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
        url: "/logistic/stock/del",
        data: {id: row.id},
        success: (res) => {
            alert('성공적으로 삭제되었습니다.');
            $("#Grid01").delRowData(id);
        },error: (err) => {
            console.log(err);
        }
    });

}
