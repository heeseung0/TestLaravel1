let searchResultColNames = [
    '관리','id','등록일','품목코드','품목명','단위','계획수량'
];
let searchResultColModel = [
    {name:'empty', index: 'empty', align: "center", formatter:formatOpt, sortable: false, width:110},
    {name: 'id',   index:'id',         align:'center', width: '100', hidden:true},
    {name: 'created_at',    index:'created_at',    align:'center', width:'50', editable:false,},
    {name: 'prd_cd',     index:'prd_cd',          align:'center', width:'50', editable:true,
        edittype: 'select', formatter: 'select', editoptions: {value: initBom()}},
    {name: 'prd_name',   index:'prd_name',    align:'center', width:'50', editable:false,},
    {name: 'prd_unit',   index:'prd_unit',    align:'center', width:'50', editable:false,},
    {name: 'count',      index:'count',    align:'center', width:'50', editable:true,},
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

    let today = new Date().toISOString().split('T')[0];

    $('#input_date1').val(today.split('-')[0] + '-' + today.split('-')[1] + '-' + '01');
    $('#input_date2').val(today);

    $(document).on("click", "button[name='search']", function () {
        $.ajax({
            type: "get",
            url: "/process/process/gets",
            data: {
                date1: $('#input_date1').val(),
                date2: $('#input_date2').val(),
                prd_cd: $('#input_pdt_code').val()
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
    //str += " <button onclick=\"javascript:edit('" + row_id + "')\">수정</button>";
    str += " <button onclick=\"javascript:save('" + row_id + "')\">저장</button>";
    str += " <button onclick=\"javascript:cancel('" + row_id + "')\">취소</button>";
    //str += " <button onclick=\"javascript:del('" + row_id + "')\">삭제</button>";
    str += "</div>";

    return str;
}
function edit(id){
    $("#Grid01").editRow(id, true);
}
function save(id){
    let row = $("#Grid01").jqGrid('getRowData', id);

    $.ajax({
        type: 'post',
        url: '/process/process/save',
        data: {
            id: id,
            prd_cd: row.prd_cd,
            count: row.count
        },success: (res) => {
            alert(JSON.stringify(res).split(':')[1].split('"')[1]);
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
        url: "/process/plan/del",
        data: {id: row.id},
        success: (res) => {
            alert('성공적으로 삭제되었습니다.');
            $("#Grid01").delRowData(id);
        },error: (err) => {
            console.log(err);
        }
    });

}
