let searchResultColNames01 = [
    '관리','번호','품번/코드','품명','품목유형','단위','공정','up_cd'
];
let searchResultColNames02 = [
    '관리','번호','품번/코드','품명','품목유형','필요량','단위','공정','모품번'
];

let searchResultColModel01 = [
    {name:'empty', index: 'empty', align: "center", formatter:formatOpt, sortable: false, width:150},
    {name: 'id',            index:'id',          align:'center', width: '50', hidden:true},
    {name: 'prd_cd',        index:'prd_cd',      align:'center', width:'100', editable:true,},
    {name: 'prd_name',      index:'prd_name',    align:'center', width:'200', editable:true,},
    {name: 'prd_type',      index:'prd_type',    align:'center', width:'100', editable:true,},
    {name: 'prd_unit',      index:'prd_unit',    align:'center', width:'50', editable:true,},
    {name: 'manufacture',   index:'manufacture', align:'center', width:'100', editable:true,},
    {name: 'up_cd',         index:'up_cd',       align:'center', width:'100', editable:false, hidden: true},
]

let searchResultColModel02 = [
    {name:'empty', index: 'empty', align: "center", formatter:formatOpt, sortable: false, width:150},
    {name: 'id',            index:'id',          align:'center', width: '50', hidden:true},
    {name: 'prd_cd',        index:'prd_cd',      align:'center', width:'100', editable:true,},
    {name: 'prd_name',      index:'prd_name',    align:'center', width:'200', editable:true,},
    {name: 'prd_type',      index:'prd_type',    align:'center', width:'100', editable:true,},
    {name: 'need_count',    index:'need_count',  align:'center', width:'50', editable:true,},
    {name: 'prd_unit',      index:'prd_unit',    align:'center', width:'50', editable:true,},
    {name: 'manufacture',   index:'manufacture', align:'center', width:'100', editable:true,},
    {name: 'up_cd',         index:'up_cd',       align:'center', width:'100', editable:true,},
]

let focused = '#Grid01';
let autoFill_upcd = '';

$(document).ready(function () {
    $("#test0").hide();
    $(document).on("keypress", "input[id='input_code'],input[id='input_name']", (e) => {
        if(e.keyCode == 13){
            $("button[name='search']").click();
        }
    })

    $(document).on("click", "button[name='search']", function () {
        $.ajax({
            type: "get",
            url: "/baseinfo/bom/gets",
            data: {
                code: $('#input_code').val(),
                name: $('#input_name').val(),
                up_cd: 'nope',
            },
            success: (res) => {
                if (res != null) {
                    $('#Grid01').jqGrid('clearGridData')
                    $('#Grid01').jqGrid('setGridParam', {data: res, page: 1})
                    $('#Grid01').trigger('reloadGrid');
                }

                let jqGridConfig01 = {
                    datatype: "local",
                    data: res,
                    colNames: searchResultColNames01,
                    colModel: searchResultColModel01,
                    autowidth: true,
                    onCellSelect: function(id){
                        focused = '#Grid01';
                        let row = $(focused).jqGrid('getRowData', id);
                        autoFill_upcd = row.prd_cd;


                        $.ajax({
                            type: "get",
                            url: "/baseinfo/bom/gets",
                            data: {
                                up_cd: autoFill_upcd
                            },success: (res2) => {
                                if (res2 != null) {
                                    $('#Grid02').jqGrid('clearGridData')
                                    $('#Grid02').jqGrid('setGridParam', {data: res2, page: 1})
                                    $('#Grid02').trigger('reloadGrid');
                                }

                                let jqGridConfig02 = {
                                    datatype: "local",
                                    data: res2,
                                    colNames: searchResultColNames02,
                                    colModel: searchResultColModel02,
                                    autowidth: true,
                                    onCellSelect: function(id){
                                        focused = '#Grid02';
                                    }
                                }


                                $("#Grid02").jqGrid(jqGridConfig02);

                                if(res2 == ''){
                                    focused = '#Grid02';
                                    $("button[name='add']").click();
                                }else{
                                }

                            },error: (err) => {
                                console.log(err);
                            }
                        });
                    }
                }

                $("#Grid01").jqGrid(jqGridConfig01);
            },error: (err) => {
                console.log(err);
            }
        })
    });

    $(document).on("click", "button[name='add']", function () {
        let rowId = 0;
        let autoFill = {
            up_cd: autoFill_upcd,
        }

        if($(focused).getGridParam("reccount") == null){
            rowId = 0;
        }else {
            rowId = $(focused).getGridParam("reccount");
        }

        $(focused).jqGrid("addRowData", rowId+1, autoFill, 'last');
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
    $(focused).editRow(id, true);
}
function save(id){
    $(focused).editRow(id, false);
    $(focused).jqGrid('saveRow', id, {
        "url": "/baseinfo/bom/save",
        "mtype": "POST",
        "extraparam": Array(focused)
    });
}
function cancel(id){
    $(focused).restoreRow(id);
}
function del(id){
    let row = $(focused).jqGrid('getRowData', id);
    $.ajax({
        type: "post",
        url: "/baseinfo/bom/del",
        data: {prd_cd: row.prd_cd},
        success: (res) => {
            alert('성공적으로 삭제되었습니다.');
            $(focused).delRowData(id);
        },error: (err) => {
            console.log(err);
        }
    });

}
