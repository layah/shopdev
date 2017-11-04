$(function () {
    var check=window.sessionStorage.getItem("check");
    var isIndex=window.location.pathname;
    if (!check && isIndex!=="/"){
        window.location.href="/";
        return false;
    }
    else{
        var hostname=window.location.pathname;
        $(".menu>li>span").click(function () {
            $(this).parent().children(".child-list").toggle('1500')
        });
        $(".child-list>li>a").each(function (index,item) {
            var SRC= $(item).attr("href");
            if (SRC==hostname){
                $(item).parent("li").addClass("active")
            }
        });
    }
})