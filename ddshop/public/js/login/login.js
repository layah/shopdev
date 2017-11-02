$(function () {
    bubbly({
        colorStart: "#fff4e6",
        colorStop: "#ffe9e4",
        blur: 1,
        compose: "source-over",
        bubbleFunc: () => `hsla(${Math.random() * 50}, 100%, 50%, .3)`
});
    $("#login").submit(function (e) {
        e.preventDefault();
        var erro=$(".erro-tip");
        var formData= $(this).serializeArray();
        var formDataObj=toObjectForm(formData)
        if (formDataObj.username==""){
            $("#login").find("input[name=username]").siblings().fadeIn(2000,function () {
                var that=$(this);
                setTimeout(function () {
                    that.fadeOut()
                })
            }).text("用户名不能为空")
        }
        else if (formDataObj.password==""){
            $("#login").find("input[name=password]").siblings().fadeIn(2000,function () {
                var that=$(this);
                setTimeout(function () {
                    that.fadeOut()
                })
            }).text("密码不能为空")
        }
        else{
            $.post("/login",formDataObj,function (res) {
                if (res.success){
                    window.location.href="/home"
                }
                else{
                    $("#erro-false").text(res.message).fadeIn(2000,function () {
                        var that=$(this);
                        setTimeout(function () {
                            that.empty().fadeOut()
                        },3000)
                    })
                }
            })
        }
    })
})
function toObjectForm(formdata) {
    var data={};
    for (var i=0;i<formdata.length;i++) {
        for (var key in formdata[i]){
            data[formdata[i].name]=formdata[i].value
        }
    }
    return data;
}