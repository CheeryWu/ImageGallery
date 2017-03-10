/**
 * Created by 吴晨 on 2017/3/10.
 */
function showPic(whichpic) {
  var source = whichpic.getAttribute("href");
  var placeholder = document.getElementById("placeholder");
  placeholder.setAttribute("src", source);

  var text = whichpic.getAttribute("title");
  var des = document.getElementById("description");
  description.firstChild.nodeValue = text;

}

function countBodyChildren() {
  var body_element = document.getElementsByTagName("body")[0];

  alert(body_element.childNodes.length);
  alert(body_element.nodeType);
}
window.onload = countBodyChildren;