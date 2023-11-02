let searchResultColNames = [
    '관리','번호','이름','아이디','등급','이메일','생성날자'
];
let searchResultColModel = [
    {name:'empty', index: 'empty', align: "center", formatter:formatOpt, sortable: false, width:150},
    {name: 'id',        index:'id',         align:'center', width: '50', hidden:false},
    {name: 'name',      index:'name',       align:'center', width:'100'},
    {name: 'user_id',   index:'user_id',    align:'center', width:'200'},
    {name: 'user_level',index:'user_level', align:'center', width:'100', editable:true, edittype:"select", editoptions:{value:{1:'1', 2:'2', 3:'3', 4:'4', 5:'5', 6:'1024'}}},
    {name: 'email',     index:'email',      align:'left', width:'300'},
    {name: 'created_at',index:'created_at', align:'left', width:'300'},
]

let nullFormatter = function(cellvalue, options, rowObject) {
    if(cellvalue === undefined || isNull(cellvalue) || cellvalue === 'NULL') {
        cellvalue = '';
    }

    return cellvalue;
}

$(document).ready(function () {
    $("#test0").hide();
    $('#input_date1').val('2023-01-01');
    // $('#input_date1').val(new Date().toISOString().split('T')[0]);
    $('#input_date2').val(new Date().toISOString().split('T')[0]);

    $(document).on("click", "button[name='test']", function () {
        $.ajax({
            type: "get",
            url: "/baseinfo/user/getUser",
            data: {
                name: $('#input_name').val(),
                date1: $('#input_date1').val(),
                date2: $('#input_date2').val()
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
    $("#testGrid").editRow(id, true);
}
function save(id){
    var row = $("#testGrid").jqGrid('getRowData', id);
    console.log("여기 만들어야 함");

    // $("#list").jqGrid('saveRow',id, {
    //     "url": "/baseinfo/user/saveUser?idx="+row.idx,
    //     "mtype": "POST",
    //     "succesfunc": function(response) {
    //
    //         return true;
    //     }
    // });
}
function cancel(id){
    $("#testGrid").restoreRow(id);
}