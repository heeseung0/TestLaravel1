let searchResultColNames = [
    '관리','번호','회사명','코드','주소'
];
let searchResultColModel = [
    {name:'empty', index: 'empty', align: "center", formatter:formatOpt, sortable: false, width:150},
    {name: 'id',        index:'id',         align:'center', width: '50', hidden:true},
    {name: 'name',      index:'name',       align:'center', width:'100', editable:true,},
    {name: 'code',   index:'code',    align:'center', width:'50', editable:true,},
    {name: 'address',   index:'address',    align:'center', width:'300', editable:true,},
]

let nullFormatter = function(cellvalue, options, rowObject) {
    if(cellvalue === undefined || isNull(cellvalue) || cellvalue === 'NULL') {
        cellvalue = '';
    }

    return cellvalue;
}

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
            url: "/baseinfo/company/gets",
            data: {
                name: $('#input_name').val(),
                code: $('#input_code').val(),
                addr: $('#input_addr').val(),
            },
            success: (res) => {
                console.log(res);

                if (res != null) {
                    $('#testGrid').jqGrid('clearGridData')
                    $('#testGrid').jqGrid('setGridParam', {data: res, page: 1})
                    $('#testGrid').trigger('reloadGrid');
                }

                let jqGridConfig = {
                    datatype: "local",
                    data: res,
                    colNames: searchResultColNames,
                    colModel: searchResultColModel,
                    autowidth: true,
                }

                $("#testGrid").jqGrid(jqGridConfig);
            },error: (err) => {
                console.log(err);
            }
        })
    });

    $(document).on("click", "button[name='add']", function () {
        let rowId = $("#testGrid").getGridParam("reccount");

        $("#testGrid").jqGrid("addRowData", rowId+1, 'first');
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
    let row = $("#testGrid").jqGrid('getRowData', id);
    $("#testGrid").editRow(id, true);
}
function save(id){
    let row = $("#testGrid").jqGrid('getRowData', id);
    console.log(row);

    $("#testGrid").editRow(id, false);
    $("#testGrid").jqGrid('saveRow', id, {
        "url": "/baseinfo/company/save",
        "mtype": "POST"
    });
}
function cancel(id){
    $("#testGrid").restoreRow(id);
}
function del(id){
    let row = $("#testGrid").jqGrid('getRowData', id);
    $.ajax({
        type: "post",
        url: "/baseinfo/company/del",
        data: {id: row.id},
        success: (res) => {
            alert('성공적으로 삭제되었습니다.');
            $("#testGrid").delRowData(id);
        },error: (err) => {
            console.log(err);
        }
    });

}
