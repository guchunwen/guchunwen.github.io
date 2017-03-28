/**
 * Created by guchunwen on 2017/3/28  0028.
 */
function clear() {
    Source=document.body.firstChild.data;
    document.open();
    document.close();
    document.body.innerHTML=Source;
}
$(document).ready(function () {
    
});