let searchResultColNames = [
    '관리','번호','공장코드','코드','코드2','값','값2','수정가능여부'
];
let searchResultColModel = [
    {name:'empty', index: 'empty', align: "center", formatter:formatOpt, sortable: false, width:150},
    {name: 'id',        index:'id',         align:'center', width: '100', hidden:true},
    {name: 'factory',      index:'factory',       align:'center', width:'100', editable:true,},
    {name: 'code',   index:'code',    align:'center', width:'100', editable:true,},
    {name: 'code2',   index:'code2',    align:'center', width:'100', editable:true,},
    {name: 'value',   index:'value',    align:'center', width:'150', editable:true,},
    {name: 'value2',   index:'value2',    align:'center', width:'150', editable:true,},
    {name: 'fixed',   index:'fixed',    align:'center', width:'150', hidden:true},
]

let nullFormatter = function(cellvalue, options, rowObject) {
    if(cellvalue === undefined || isNull(cellvalue) || cellvalue === 'NULL') {
        cellvalue = '';
    }

    return cellvalue;
}

$(document).ready(function () {
    $("#test0").hide();
    $(document).on("keypress", "input[id='input_factory'],input[id='input_code']", (e) => {
        if(e.keyCode == 13){
            $("button[name='search']").click();
        }
    })

    $(document).on("click", "button[name='search']", function () {
        $.ajax({
            type: "get",
            url: "/baseinfo/common/gets",
            data: {
                factory: $('#input_factory').val(),
                code: $('#input_code').val(),
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
        let init_data = {
            factory:'F001',
            fixed:true
        };
        let rowId = $("#testGrid").getGridParam("reccount");

        $("#testGrid").jqGrid("addRowData", rowId+1, init_data, 'first');
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
    str += "</div>";

    return str;
}
function edit(id){
    let row = $("#testGrid").jqGrid('getRowData', id);
    //row 데이터로 수정 가능 여부에 따라 if문으로 alert처리
    $("#testGrid").editRow(id, true);
}
function save(id){
    let row = $("#testGrid").jqGrid('getRowData', id);
    console.log(row);

    $("#testGrid").editRow(id, false);
    $("#testGrid").jqGrid('saveRow', id, {
        "url": "/baseinfo/common/save",
        "mtype": "POST"
    });
}
function cancel(id){
    $("#testGrid").restoreRow(id);
}
