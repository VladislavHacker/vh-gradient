(function(){
  function hexToRGBA(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        a:255
    } : null;
  }
  function gradientMagic(text,gradient){
    var n = gradient.length-1;
    var piece = Math.round(text.length/n);

    var ci = 0;
    var output = '';
    for (let i = 0; i < n; i++){
      output+=makeSpans(text.slice(ci,ci+piece),[
         {color:gradient[i].color},
         {color:gradient[i+1].color}
       ])
      ci+=piece;
    }
    return output;
  }
  function makeSpans(text,gradient){
     var output = '';
     var from = hexToRGBA(gradient[0].color);
     var to = hexToRGBA(gradient[1].color);
     var dr = Math.round((to.r - from.r)/text.length);
     var db = Math.round((to.b - from.b)/text.length);
     var dg = Math.round((to.g - from.g)/text.length);
     var cr = from.r;
     var cb = from.b;
     var cg = from.g;
     for (let i = 0; i < text.length; i++){
       output+='<span style="color:rgb('+cr+','+cg+','+cb+')">';
       output+=text[i];
       output+='</span>';
       cr += dr;
       cb += db;
       cg += dg;
     }
     return output;
  }

  var containers = document.getElementsByClassName('vh-gradient'); // containers Array
  for (let i = 0; i < containers.length; i++){
    containers[i].innerHTML =  gradientMagic(containers[i].innerHTML,JSON.parse(containers[i].getAttribute('data-vh-gradient')));
  }
})()
