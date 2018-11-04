var img = new Image();
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var fileName = "";
var canvas2 = document.getElementById("canvas2");
var ct = canvas2.getContext("2d");
function wrapText(ct, text, x, y, maxWidth, lineHeight, fnt, clr) {
        ct.fillStyle = clr;
        ct.font = fnt;
        var words = text.split(' ');
        var line = '';

        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = ct.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            ct.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
          }
          else {
            line = testLine;
          }
        }
        ct.fillText(line, x, y);
      }

function newfn(){
      ct.clearRect(0,0,canvas2.width,canvas2.height)
      var inp = document.getElementById("inp").value;
      var x=document.getElementById("x").value;
      var y=document.getElementById("y").value;
      var z = document.getElementById("z").value;
      var clr = document.getElementById("clr").value;
      var fstyle = document.getElementById("fstyle").value;
      var fnt = z+"px "+fstyle;
      wrapText(ct, inp, x, y, img.width,img.height,fnt,clr);
};

$(document).ready(function() {
  $('#merge').on("click",function(e){
      var inp = document.getElementById("inp").value;
      var x=document.getElementById("x").value;
      var y=document.getElementById("y").value;
      var z = document.getElementById("z").value;
      var clr = document.getElementById("clr");
      var fstyle = document.getElementById("fstyle").value;
      ctx.fillStyle = clr.value;
      ctx.font = z+"px "+fstyle;
      ctx.fillText(inp,x,y);

  });
  $("#download-btn").on("click", function(e) {
    var fileExtension = fileName.slice(-4);
    if (fileExtension == ".jpg" || fileExtension == ".png") {
      var actualName = fileName.substring(0, fileName.length - 4);
    }
    download(canvas, actualName + "-edited.jpg");
  });
  $("#reset").on("click",function(e){
    ctx.drawImage(img,0,0,img.width,img.height);
    document.getElementById("inp").value = "";
    ct.clearRect(0,0,canvas2.width,canvas2.height);
  });
  $("#upload-file").on("change", function() {
    var file = document.querySelector("#upload-file").files[0];
    var reader = new FileReader();

    if (file) {
      fileName = file.name;
      reader.readAsDataURL(file);
    }


    reader.addEventListener(
      "load",
      function() {
        img = new Image();
        img.src = reader.result;
        img.onload = function() {
          canvas.width = img.width;
          canvas.height = img.height;
          canvas2.width = img.width;
          canvas2.height = img.height;
          $('#x').attr('max', img.width);

          $('#y').attr('max', img.height);
          ctx.drawImage(img, 0, 0, img.width, img.height);
          $("#canvas").removeAttr("data-caman-id");
        };
      },
      false
    );

  });
});

function download(canvas, filename) {
  var e;
  var lnk = document.createElement("a");

  lnk.download = filename;

  lnk.href = canvas.toDataURL("image/jpeg", 0.8);

  if (document.createEvent) {
    e = document.createEvent("MouseEvents");
    e.initMouseEvent(
      "click",
      true,
      true,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );
    lnk.dispatchEvent(e);
  } else if (lnk.fireEvent) {
    lnk.fireEvent("onclick");
  }
}
