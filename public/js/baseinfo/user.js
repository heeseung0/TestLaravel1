let searchResultColNames = ['번호','이름','아이디','등급','이메일','생성날자'];
let searchResultColModel = [
    {name: 'id',        index:'id',         align:'center', width: '50', hidden:false},
    {name: 'name',      index:'name',       align:'center', width:'100'},
    {name: 'user_id',   index:'user_id',    align:'center', width:'200'},
    {name: 'user_level',index:'user_level', align:'center', width:'100'},
    {name: 'email',     index:'email',      align:'left', width:'300'},
    {name: 'created_at',index:'created_at', align:'left', width:'300'},
]

$(document).ready(function () {
    $(document).on("click", "button[name='test']", function () {
        $("#test0").hide();


        $.ajax({
            type: "get",
            url: "/baseinfo/user/getUser",
            success: (data) => {
                console.log(data);

                let jqGridConfig = {
                    datatype: "local",
                    data: data,
                    colNames: searchResultColNames,
                    colModel: searchResultColModel,
                }

                $("#testGrid").jqGrid(jqGridConfig);
            },error: (data) => {
                console.log(data);
            }
        })






    });
});
