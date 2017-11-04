$(function () {
    getTabList();
})
function initTab(list) {
    $("#table-list").bootstrapTable("destroy");
    $("#table-list").bootstrapTable({
        pagination:true,
        sortable:true,
        sortOrder:"desc",
        data:list,
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
                field:"describe",
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
                       '<a class="inline-middle" href="javascript:;" title="查看" target="_blank"><img src="images/icon_view.gif"></a>'+
                        '<a style="margin:0  20px;" class="inline-middle" href="javascript:;" title="编辑"><img src="images/icon_edit.gif"></a>'+
                        '<a class="inline-middle" title="删除" href="javascript:;"><img src="images/icon_drop.gif"></a>'+
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