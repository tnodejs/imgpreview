/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 12-6-28
 * Time: 上午11:39
 * To change this template use File | Settings | File Templates.
 */
function preview(img, selection){
    var scaleX = 100 / (selection.width || 1);
    var scaleY = 100 / (selection.height || 1);

    //动态小头像 获取当前选中框的宽度，高度，左边框，右边框
    $('#view').css({                          //view是预览图像的id
        width: Math.round(scaleX * 300) + 'px',
        height: Math.round(scaleY * 220) + 'px',
        marginLeft: '-' + Math.round(scaleX * selection.x1) + 'px',
        marginTop: '-' + Math.round(scaleY * selection.y1) + 'px'
    });
}

//加载小头像
$(document).ready(function () {
    $('<div><img id="view" src="#" style="position: relative;" /></div>').css({
            float: 'left',
            position: 'relative',
            overflow: 'hidden',
            width: '100px',
            height: '100px'
        }).insertAfter('#biuuu'); //把新建元素放到 #biuuu 之后
    //.insertAfter($('#biuuu')); //把新建元素放到 #biuuu 之后
    $("input[type='file']").change(function(){
        document.form1.path.value=this.value;
        previewImage(this);
        //$("#image_area").find("img").attr({"src":this.value});
    });
    $("#upload_area").find("a").click(function(){
        document.form1.picpath.click();
    });

    $("#submit_button").find("a").click(function(){
        $("form:first").submit();
    });
    if(!+[1,]){
        $("#upload_area").find("a").hide();
        $("#upload_area").find("input[type='text']").hide();
        $("#picpath").css({
            width: "240px",
            height: "20px",
            filter:"alpha(opacity=100)"
        });
    }
});

//初始化加载
$(window).load(function () {
    $('#biuuu').imgAreaSelect({
        aspectRatio: '1:1',  //截取比例
        show:true,
        resizable:true, //是否可调整大小
        autoHide: false,//选择框选择完毕是否自己取消
        handles:true,
        key:true, //是否启用键盘，默认为false
        //x1: 75, y1: 30, x2: 225, y2: 180, //需要处理的区域，原始的
        //x1:左上角x轴坐标 y1:左上角y轴坐标 x2:右下角x轴坐标 y2:右下角y轴坐标
        keys: { arrows: 1, ctrl: 5, shift: 'resize' }, //调整像素大小

        //onInit: function(img, selection) { ias.setSelection(100, 50, 250, 150, true); ias.update(); }, //设置初始函数 画出选择框
        onSelectChange: preview //选框移动时触发的事件
        //onSelectEnd: function(img, select){alert(select.width)}  //选框结束时触发的事件

    });
});

function previewImage(file)
{
    var porImg  = $('#biuuu'),
        viewImg  = $('#view');
    if (file["files"] && file["files"][0])
    {
        var reader = new FileReader();
        reader.onload = function(evt){
            porImg.attr({src : evt.target.result});
            viewImg.attr({src : evt.target.result});
        }
        reader.readAsDataURL(file.files[0]);
    }
    else
    {
        /*var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
        file.select();
        var src = document.selection.createRange().text,
            mysrc = sFilter+src;
        porImg.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
       // porImg.attr({mysrc:"",class:"aaa"});
       */
        var ieImageDom = document.createElement("div");
        var proIeImageDom = document.createElement("div");
        $(ieImageDom).css({
            float: 'left',
            position: 'relative',
            overflow: 'hidden',
            width: '100px',
            height: '100px'
        }).attr({"id":"view"});
        $(proIeImageDom).attr({"id":"biuuu"});
        porImg.parent().prepend(proIeImageDom);
        porImg.remove();
        viewImg.parent().append(ieImageDom);
        viewImg.remove();
        file.select();
        path = document.selection.createRange().text;
        $(ieImageDom).css({"filter": "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='scale',src=\"" + path + "\")"});
        $(proIeImageDom).css({"filter": "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='scale',src=\"" + path + "\")"});
   // .style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='scale',src=\"" + path + "\")";//使用滤镜效果
        /*var imagePath = file.value;
        porImg.attr({
            src : "file://" + imagePath
        });*/
    }
}