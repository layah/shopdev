var fileList=[];
var reader = new FileReader();
$(function () {
    getTabList();
    $(".drodown").click(unlogin);
    $("#uploadSure").click(uploadFile);
    $("#chanpinzhutu").change(function () {
        var htmla=""
        preview($("#chanpinzhutu").get(0));
        for (var i=0;i<fileList.length;i++){
            htmla+='<img class="inline-top" width="80" height="80" src="' + fileList[i] + '" />';
        }
        $("#img-group").html(htmla)
    })
})
function initTab(list) {
    $("#table-list").bootstrapTable("destroy");
    $("#table-list").bootstrapTable({
        pagination:true,
        sortable:true,
        sortOrder:"desc",
        data:list,
        search: true,
        pageSize: 5,
        pageList:[5,10,15],
        columns: [
            {
                field:"product",
                title:"商品",
                align:"left",
                valign:'middle',
                sortable:true,
                formatter:function (value,row,index) {
                    return "<div class='text-left'> <img width='60' src='/images/"+value + "' alt='产品详图'></div>";
                }
            },
            {
                field:"name",
                title:"名称",
                align:"left",
                valign:'middle',
                sortable:true
            },
            {
                field:"describes",
                title:"描述",
                align:"left",
                valign:'middle',
                sortable:true,
                formatter:function (value,row,index) {
                    return "<div class='text-left textover'>" + value + "</div>";
                }
            },
            {
                field:"price",
                title:"价格",
                align:"left",
                valign:'middle',
                sortable:true,
                formatter:function (value,row,index) {
                    return "<div class='text-left'>" + value + "</div>";
                }
            },
            {
                field:"stock",
                title:"库存",
                align:"left",
                valign:'middle',
                sortable:true,
                formatter:function (value,row,index) {
                    return "<div class='text-left'>" + value + "</div>";
                }
            },
            {
                title:"操作",
                align:"center",
                valign:'middle',
                formatter:function (value,row,index) {
                    return "<div class='text-center'>"+
                       // '<a class="inline-middle" href="javascript:;" title="查看" target="_blank"><img src="images/icon_view.gif"></a>'+
                       //  '<a style="margin:0  20px;" class="inline-middle" href="javascript:;" title="编辑"><img src="images/icon_edit.gif"></a>'+
                        '<a class="inline-middle" onclick="deleteTabRow('+ row.id+')" title="删除" href="javascript:;"><img src="images/icon_drop.gif"></a>'+
                        "</div>";
                }
            },
        ]
    });
}
function getTabList() {
    $.get("/home/list",function (res) {
        if (res.success){
            initTab(res.data)
        }
    })
}
function unlogin() {
    window.sessionStorage.removeItem("check");
    window.location.href="/";
}
function uploadFile() {
    var $formdata=$("#addform").serializeArray();
    var formObj={};
    for (var i=0;i<$formdata.length;i++){
        formObj[$formdata[i].name]=$formdata[i].value;
        if (formObj[$formdata[i].name]==="" || formObj[$formdata[i].name]==undefined || formObj[$formdata[i].name]==null){

        }
    }
    $.post("/saveproduct",formObj,function (res) {
       if (res.success){
           $('#myModal').modal('hide');
           getTabList();
       }
       else{
           alert("*未必填项，请填写完整")
       }
    })
}
function preview(file){
    if (file.files && file.files[0])
    {
        reader.onload = function(evt){
            fileList.push(evt.target.result)
        }
        reader.readAsDataURL(file.files[0]);
    }
    return;
}
function deleteTabRow(row) {
    var rowId=row
    $.post("/deleteRow",{id:rowId},function (res) {
        if (res.success){
            getTabList()
        }
    })
}
function seeSelf(row) {
    
}