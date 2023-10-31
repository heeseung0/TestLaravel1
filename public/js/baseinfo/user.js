let searchResultColNames = [
    '번호','이름','아이디','등급','이메일','생성날자'
];
let searchResultColModel = [
    {name: 'id',        index:'id',         align:'center', width: '50', hidden:false},
    {name: 'name',      index:'name',       align:'center', width:'100'},
    {name: 'user_id',   index:'user_id',    align:'center', width:'200'},
    {name: 'user_level',index:'user_level', align:'center', width:'100'},
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
    $('#input_date1').val(new Date().toISOString().split('T')[0]);
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
