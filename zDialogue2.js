var domElement = function(selector, n) {
 if (n === undefined) n = 0;
 this.el = document.querySelectorAll(selector)[n];
 this.style = this.el.style;
 
 this.remove = (function(){this.el.remove();});
 this.Queue = {
 entries : [],
 inprocess : null,
 enqueue : function(entry){
  this.entries.push(entry);
 },
 flush : function(){
  if(this.inprocess) return;
  while (this.entries.length){
   var entry = this.entries.shift();
   if(entry.toString().indexOf('delay:') !== -1){
    var ms = Number(entry.split(':')[1]);
    this.inprocess = setTimeout(function(self){
       self.inprocess = null;
       self.flush();}, ms, this);
    return;
   }
   entry();
  }
 }
};
};

// domElement = Object.assign(domElement, HTMLElement);   // does not work.....

domElement.prototype.show = function(ms){ // adjusted for delay()
  this.Queue.enqueue('delay:' + ms);
  var el = this.el;
  this.Queue.enqueue(function(){
    el.style.display="initial";
  });
  this.Queue.flush();
  return this;
};

domElement.prototype.hide = function(ms){ // adjusted for delay()
  this.Queue.enqueue('delay:' + ms);
  var el = this.el;
  this.Queue.enqueue(function(){
    el.style.display="none";
  });
  this.Queue.flush();
  return this;
};

domElement.prototype.delay = function(ms){
  this.Queue.enqueue('delay:' + ms);
  return this;
}; 


domElement.prototype.addClass = function(cls) {
  if (!this.el.className.match(RegExp('(^| )'+cls+'($| )','g'))) 
    this.el.className=(this.el.className+(" " + cls)).trim();
};
domElement.prototype.removeClass = function(cls) {
  this.el.className = this.el.className.replace(RegExp('(^| )'+cls+'($| )','g'),' ').trim();
};
domElement.prototype.toggleClass = function(cls) {
  this.el.className.match(RegExp('(^| )'+cls+'($| )','g')) ? 
  this.el.className = this.el.className.replace(RegExp('(^| )'+cls+'($| )','g'),' ').trim() : 
  this.el.className=(this.el.className+(" " + cls)).trim();
  return this;
};

domElement.prototype.css = function(css){ // adjusted for delay()
  var el = this.el;
  this.Queue.enqueue(function(){
   for (var prop in css) el.style[prop]=css[prop];
  });
  this.Queue.flush();
  return this;
};
 

domElement.prototype.on = function(event, callback) {
 var evt = this.eventHandler.bindEvent(event, callback, this.el, this);
};

domElement.prototype.off = function(event) {
 var evt = this.eventHandler.unbindEvent(event, this.el);
};

domElement.prototype.val = function(newVal) {
 return (newVal !== undefined ? this.el.value = newVal : this.el.value);
};

domElement.prototype.append = function(html) {
 this.el.innerHTML = this.el.innerHTML + html;
};

domElement.prototype.prepend = function(html) {
 this.el.innerHTML = html + this.el.innerHTML;
};

domElement.prototype.html = function(html) {
 return (html !== undefined ? this.el.innerHTML = html : this.el.innerHTML);
};

domElement.prototype.eventHandler = {
  events: [],
  
  bindEvent: function(event, callback, targetElement, self) {
    this.unbindEvent(event, targetElement);
    targetElement.addEventListener(event, callback.bind(self), false);
    this.events.push({
       type: event,
       event: callback,
       target: targetElement
    });
  },
  
  findEvent: function(event) {
    return this.events.filter(function(evt) {
      return (evt.type === event);
    }, event)[0];
  },
  
  unbindEvent: function(event, targetElement) {
    var foundEvent = this.findEvent(event);
    if (foundEvent !== undefined) {
      targetElement.removeEventListener(event, foundEvent.event, false);
    }
    this.events = this.events.filter(function(evt) {
      return (evt.type !== event);
    }, event);
  }
  
};

z = function(selector, n) {
 var el = new domElement(selector, n);
 return el;
};

document.addEventListener("DOMContentLoaded", function() { 

function __zdSetup() {

var h = document.querySelector("head");
var l = document.createElement("link");

l.rel="stylesheet";
l.type="text/css";
l.href="zDialogue.css";

h.appendChild(l);

  
  zDboxInputDTXT = "";
  zDboxInputDPlaceHolder = "";
  
  var div = document.createElement('div');
  div.id = "zDialogueDIV";
  document.querySelector("body").appendChild(div);
  
  z("#zDialogueDIV").hide();
  
  z("#zDialogueDIV").html(
     '<div id="zDshield"></div>'+
     '<div id="zDbox">'+
     '   <div id="zDboxText"></div>'+
     '   <div id="zDboxResp">'+
     '      <input id="zDboxInput" type="text">'+
     '   </div>'+
     '   <div id="zDboxCont">'+
     '      <button id="zDboxOK">OK</button>'+
     '      <button id="zDboxYes">Yes</button>'+  
     '      <button id="zDboxNo">No</button>'+
     '      <button id="zDboxSubmit">Submit</button>'+
     '      <button id="zDboxCancel">Cancel</button>'+
     '   </div>'+
     '</div>' );
  
  
         z("#zDialogueDIV").hide();
         z("#zDboxText").html("");
         z("#zDboxResp").hide();
         
         z("#zDboxOK").hide();
         z("#zDboxYes").hide();
         z("#zDboxNo").hide();
         z("#zDboxCancel").hide();
         z("#zDboxSubmit").hide();
  
}  

__zdSetup();

});


function _zDialogueReset() {
         
    z("#zDialogueDIV").hide();
    z("#zDboxText").html("");
    z("#zDboxResp").hide();
    
    z("#zDboxOK").hide();
    z("#zDboxYes").hide();
    z("#zDboxNo").hide();
    z("#zDboxCancel").hide();
    z("#zDboxSubmit").hide();
 } 

var __zDialogue = function(txt, sty, thefun, valfun) {
 
      // this.op = {
       
      _OK = (function(){
        _zDialogueReset();
        z("#zDboxOK").el.removeEventListener("click", _OK, true);
        if (typeof thefun === "function") {
          thefun("OK");
        }
        
      });
      
      
      _YES = (function(){
        _zDialogueReset();
        z("#zDboxYes").el.removeEventListener("click", _YES, true);
        z("#zDboxNo").el.removeEventListener("click", _NO, true);
        z("#zDboxCancel").el.removeEventListener("click", _CANCEL, true);
        if (typeof thefun === "function") {
          thefun("YES");
        }
      });
      
      
      _CANCEL = (function(){
        _zDialogueReset();
        z("#zDboxYes").el.removeEventListener("click", _YES, true);
        z("#zDboxNo").el.removeEventListener("click", _NO, true);
        z("#zDboxCancel").el.removeEventListener("click", _CANCEL, true);
        if (typeof thefun === "function") {
          thefun("CANCEL");
        }
      });
      
      _NO = (function() {
        _zDialogueReset();
        z("#zDboxYes").el.removeEventListener("click", _YES, true);
        z("#zDboxNo").el.removeEventListener("click", _NO, true);
        z("#zDboxCancel").el.removeEventListener("click", _CANCEL, true);
        if (typeof thefun === "function") {
          thefun("NO");
        }
      });
      
      _SUB = (function(){
        if (typeof valfun === "function" && !valfun(z("#zDboxInput").val())) { return false; }
        let data = z("#zDboxInput").val();
        _zDialogueReset();
        z("#zDboxSubmit").el.removeEventListener("click", _SUB, true);
        z("#zDboxCancel").el.removeEventListener("click", _CANCELSUB, true);
        z("#zDboxInput").el.removeEventListener("keypress", _KEY, true);
        if (typeof thefun === "function") {
          thefun(data); 
        }
      });
      
      _CANCELSUB = (function(){
       _zDialogueReset();
        z("#zDboxSubmit").el.removeEventListener("click", _SUB, true);
        z("#zDboxCancel").el.removeEventListener("click", _CANCELSUB, true);
        z("#zDboxInput").el.removeEventListener("keypress", _KEY, true);
        if (typeof thefun === "function") {
          thefun("CANCEL");
        }
      });
      
       _KEY = (function(e) {
         var key = e.which;
         if(key == 13)  // the enter key code
          {
            if (typeof valfun === "function" && !valfun(z("#zDboxInput").val())) { return false; }
            let data = z("#zDboxInput").val();
            _zDialogueReset();
            z("#zDboxSubmit").el.removeEventListener("click", _SUB, true);
            z("#zDboxCancel").el.removeEventListener("click", _CANCELSUB, true);
            z("#zDboxInput").el.removeEventListener("keypress", _KEY, true);
            if (typeof thefun === "function") {
              thefun(data);
            }
          }
      });
      
      _KEYChoose = (function(e) {
         var c = parseInt(String.fromCharCode(e.which));
         if(c > 0 && c < txt.length)  // the enter key code
          {
            _zDialogueReset();
            z("#zDboxCancel").el.removeEventListener("click", _CANCEL, true);
            z("body").el.removeEventListener("keypress", _KEYChoose, true);
            if (typeof thefun === "function") {
              thefun(c);
            }
          }
      });
      
      _CLICKChoose = (function(e) {
       let data = e.target.innerHTML;
       _zDialogueReset();
       z("#zDboxCancel").el.removeEventListener("click", _CANCEL, true);
       z("body").el.removeEventListener("keypress", _KEYChoose, true);
       if (typeof thefun === "function") {
         thefun(data);
       }
       
       
      });
      
    // };
    
    z("#zDboxInput").val("");
    
    if (sty == "RESPO") {
      
      z("#zDboxInput").el.type = 'password';
      
      sty = "RESP";
    } else {
      
      z("#zDboxInput").el.type = "text";

    }

    if (sty == "OK") {
      z("#zDboxOK").show();  //el.innerHTML = "<button id='zDboxOK'>OK</button>";
      setTimeout(function(){ z("#zDboxOK").el.focus(); }, 20);
      z("#zDboxOK").el.addEventListener("click", _OK, true);
      z("#zDboxText").html(txt);

        
      
      
    } else if (sty == "YESNO") {
      z("#zDboxYes").show();
      z("#zDboxNo").show();
      z("#zDboxCancel").show();
      setTimeout(function(){ z("#zDboxCancel").el.focus(); }, 20);
      z("#zDboxYes").el.addEventListener("click", _YES, true);
      
      z("#zDboxCancel").el.addEventListener("click", _CANCEL, true);
      
      z("#zDboxNo").el.addEventListener("click", _NO, true);
      z("#zDboxText").html(txt);
      
      
    } else if (sty == "RESP") {
     z("#zDboxSubmit").show();
      z("#zDboxCancel").show();
      
      z("#zDboxResp").show();
      z("#zDboxInput").val(zDboxInputDTXT);
      z("#zDboxInput").el.placeholder = zDboxInputDPlaceHolder;
      
      z("#zDboxSubmit").el.addEventListener("click", _SUB, true);
     
      z("#zDboxCancel").el.addEventListener("click", _CANCELSUB, true);
      
      z("#zDboxInput").el.addEventListener("keypress", _KEY, true);
      z("#zDboxText").html(txt);
      setTimeout(function(){ z("#zDboxInput").el.focus(); }, 20);
      
      
    } else if (sty == "CHOOSE") {
       var choices = "<div class='zCrap'>"+
                   `<strong>${txt[0]}</strong><br><ol id="zChoises7">`;
       for (var l = 1; l < txt.length; l++) { choices += `<li>${txt[l]}</li>`; }
       choices+="</ol></div>";
       z("#zDboxText").html(choices);
        
        z("#zChoises7").el.addEventListener("click", _CLICKChoose, true); 
       
       z("#zDboxCancel").show();
       setTimeout(function(){ z("body").el.focus(); }, 20);
       z("body").el.addEventListener("keypress", _KEYChoose, true);
       z("#zDboxCancel").el.addEventListener("click", _CANCEL, true);
     
    }
    
    z("#zDialogueDIV").show();

    
  }



zDialogue = function(a, b, c, d) {
  return new __zDialogue(a, b, c, d);
}
  







// the end