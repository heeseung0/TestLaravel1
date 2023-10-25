window.onload = function(){
    let arr_ul = [];
    let arr_li = [];

    arr_ul.push(document.getElementsByClassName("baseinfo_ul")[0]);
    arr_ul.push(document.getElementsByClassName("order_ul")[0]);
    arr_ul.push(document.getElementsByClassName("process_ul")[0]);
    arr_ul.push(document.getElementsByClassName("log_ul")[0]);
    arr_li.push(document.getElementsByClassName("baseinfo_li")[0]);
    arr_li.push(document.getElementsByClassName("order_li")[0]);
    arr_li.push(document.getElementsByClassName("process_li")[0]);
    arr_li.push(document.getElementsByClassName("log_li")[0]);

    arr_ul.forEach((a,indexA) => {
        a.addEventListener("click", () => {
            arr_li.forEach((b, indexB ) => {
                b.hidden = (indexA == indexB ? false : true);
            })
        })
    })
}
