let searchResultColNames = [
    '관리','번호','코드','이름','주소', '비고'
];
let searchResultColModel = [
    {name:'empty', index: 'empty', align: "center", formatter:formatOpt, sortable: false, width:150},
    {name: 'id',        index:'id',         align:'center', width: '50', hidden:true},
    {name: 'code',      index:'code',    align:'center', width:'50', editable:true,},
    {name: 'name',      index:'name',       align:'center', width:'100', editable:true,},
    {name: 'address',   index:'address',    align:'center', width:'300', editable:true,},
    {name: 'etc',       index:'etc',    align:'center', width:'300', editable:true,},
]

$(document).ready(function () {
    $("#test0").hide();
    $(document).on("keypress", "input[id='input_name'],input[id='input_code'],input[id='input_addr']", (e) => {
        if(e.keyCode == 13){
            $("button[name='search']").click();
        }
    })

    $(document).on("click", "button[name='search']", function () {
        $.ajax({
            type: "get",
            url: "/baseinfo/warehouse/gets",
            data: {
                name: $('#input_name').val(),
                code: $('#input_code').val(),
                addr: $('#input_addr').val(),
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
    $("#Grid01").editRow(id, true);
}
function save(id){
    let row = $("#Grid01").jqGrid('getRowData', id);
    console.log(row);

    $("#Grid01").editRow(id, false);
    $("#Grid01").jqGrid('saveRow', id, {
        "url": "/baseinfo/warehouse/save",
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
        url: "/baseinfo/warehouse/del",
        data: {id: row.id},
        success: (res) => {
            alert('성공적으로 삭제되었습니다.');
            $("#Grid01").delRowData(id);
        },error: (err) => {
            console.log(err);
        }
    });

}
