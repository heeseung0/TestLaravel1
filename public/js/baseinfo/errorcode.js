let searchResultColNames = [
    '관리','번호','에러코드','설명'
];
let searchResultColModel = [
    {name:'empty',          index: 'empty',         align: "center", formatter:formatOpt, sortable: false, width:150},
    {name: 'id',            index:'id',             align:'center', width: '100', hidden:true},
    {name: 'errorcode',     index:'errorcode',           align:'center', width:'100', editable:true,},
    {name: 'explanation',   index:'explanation',    align:'center', width:'400', editable:true,},
]

$(document).ready(function () {
    $("#test0").hide();
    $(document).on("keypress", "input[id='input_code']", (e) => {
        if(e.keyCode == 13){
            $("button[name='search']").click();
        }
    })

    $(document).on("click", "button[name='search']", function () {
        $.ajax({
            type: "get",
            url: "/baseinfo/error/gets",
            data: {
                code: $('#input_code').val(),
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
    console.log(row);
    $("#Grid01").editRow(id, false);
    $("#Grid01").jqGrid('saveRow', id, {
        "url": "/baseinfo/error/save",
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
        url: "/baseinfo/error/del",
        data: {id: row.id},
        success: (res) => {
            alert('성공적으로 삭제되었습니다.');
            $("#Grid01").delRowData(id);
        },error: (err) => {
            console.log(err);
        }
    });

}
