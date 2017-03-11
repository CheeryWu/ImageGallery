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
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}
function insertAfter(newElement, targetElement) {
  // 把目标元素的parentNode属性值保存在parent中
  var parent = targetElement.parentNode;
  // 检查目标元素是不是parent的最后一个子元素
  if (parent.lastChild == targetElement) {
    // 如果是，就用appendChild方法将新元素追加到parent元素上
    parent.appendChild(newElement);
  } else {
    // 如果不是，就把新元素添加到目标元素与下一个兄弟元素之间
    parent.insertBefore(newElement, targetElement.nextSibling);
  }
}
function preparePlaceholder() {
  // 测试浏览器是否支持函数中的DOM方法
  if (!document.createElement) return false;
  if (!document.createTextNode) return false;
  if (!document.getElementById) return false;
  if (!document.getElementById("imageGallery")) return false;

  var placeholder = document.createElement("img");
  placeholder.setAttribute("id", "placeholder");
  placeholder.setAttribute("src","images/v1.jpg");
  placeholder.setAttribute("alt","My image gallery");

  var description = document.createElement("p");
  description.setAttribute("id", "description");
  var desctext = document.createTextNode("Choose an image");
  description.appendChild(desctext);

  // document.getElementsByTagName("body")[0].appendChild(placeholder);
  // document.getElementsByTagName("body")[0].appendChild(description);
  var gallery = document.getElementById("imageGallery");
  // gallery.parentNode.insertBefore(placeholder, gallery);
  // gallery.parentNode.insertBefore(description, gallery);
  insertAfter(placeholder, gallery);
  insertAfter(description, placeholder);
}
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
    links[i].onkeypress = links[i].onclick;
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
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);