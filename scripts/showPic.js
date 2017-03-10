/**
 * Created by 吴晨 on 2017/3/10.
 */
/**
  如果页面加载成功后有好几个函数，有两种方案：
  方案一：
  window.onload = function() {
    fisrtFunction();
    secondFunction();
  }
  方案二：
  使用addLoadEvent函数
  addLoadEvent(firstFunction);
  addLoadEvent(secondFunction);
 */

// window.onload = prepareGallery;
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'funciton') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}
addLoadEvent(prepareGallery);
function prepareGallery() {
  /*  step1:检查点  */
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;
  if (!document.getElementById("imageGallery")) return false;
  // 上一行代码为预防性措施 - 即使网页上删掉了图片库，这个代码也不会突然出错。
  /*  step2:创建变量名  */
  var gallery = document.getElementById("imageGallery");
  var links = gallery.getElementsByTagName("a");
  /*  step3:遍历  */
  for(var i = 0; i < links.length; i++) {
    /*  step4:改变行为  */
    links[i].onclick = function () {
      return showPic(this)? false : true;
    }
    // links[i].onkeypress = links[i].onclick;
  }
}
function showPic(whichpic) {
  // 判断id为placeholder的元素是否存在
  if (!document.getElementById("placeholder")) return false;
  var source = whichpic.getAttribute("href");
  var placeholder = document.getElementById("placeholder");
  // 判断存在的placeholder元素是否是一张图片
  if (placeholder.nodeName != "IMG") return false;
  placeholder.setAttribute("src", source);
  // 判断id为description的元素是否存在
  if (document.getElementById("description")) {
    var text = whichpic.getAttribute("title")? whichpic.getAttribute("title") : "";
    var description = document.getElementById("description");
    // 判断description元素的第一个子元素是都是一个文本节点
    if (description.firstChild.nodeType == 3) {
      description.firstChild.nodeValue = text;
    }
  }
  return true;
}
