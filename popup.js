class NAMNH_CONSOLE {

    constructor(tag) {
      this.tag = tag;
      this.isEnable = false;
    }
  
    al(str) {
        if(this.isEnable){alert(this.tag + str);}
    }

    log(str) {
        if(this.isEnable){console.log("%c%s: %s", 'color: #070707', this.tag, str);}
    }

    v(str) {
        if(this.isEnable){console.log("%c%s: %s", 'background: #f9f9f9; color: #070707', this.tag, str);}
    }

    d(str) {
        if(this.isEnable){console.log("%c%s: %s", 'background: #f8ffed; color: #aaf442', this.tag, str);}
    }

    e(str) {
        if(this.isEnable){console.log("%c%s: %s", 'background: #ffe3e0; color: #f45f41', this.tag, str);}
    }

    i(str) {
        if(this.isEnable){console.log("%c%s: %s", 'background: #e2efff; color: #4197f4', this.tag, str);}
    }

    w(str) {
        if(this.isEnable){console.log("%c%s: %s", 'background: #fff6ed; color: #f4a041', this.tag, str);}
    }

    c(str, color) {
        if(this.isEnable){console.log("%c%s: %s", 'color: #'+color, this.tag, str);}
    }
  
  }
  
  let namnhlog = new NAMNH_CONSOLE("POPUP");

  var WORD_LIST_MAX = 5;//15;

  function showPopup(word)
  {
    

    var cambridgeUrl = "https://ejje.weblio.jp/content/" + word;
    namnhlog.e("Link: " + cambridgeUrl);
    var popupInfo = {
        "url": cambridgeUrl,
        //"type": "normal", // for debug
        "type": "popup",
        "top": 5,
        "left": 0,///Math.round(screen.availWidth - (screen.availWidth/3)),
        "width": Math.round(screen.availWidth/3),
        "height": Math.round(screen.availHeight/2),
        "focused": true
    };

    chrome.windows.create(popupInfo, function(newPopup){
        last_popup_tabId = newPopup.id;
        namnhlog.w("Create last_popup_tabId: " + last_popup_tabId);
    });

  }

  function deleteWord(index)
  {
    namnhlog.e("deleteWord: " + index);
    if (index > -1) {

        var storage_listWord_key = "storage_listWord";
        chrome.storage.sync.get([storage_listWord_key], function(result) {
            var array = result[storage_listWord_key]?result[storage_listWord_key]:[];

            array.splice(index, 1);
    
            var jsonObj = {};
            jsonObj[storage_listWord_key] = array;
            chrome.storage.sync.set(jsonObj, function() {
                namnhlog.e("Delete and Saved a new array item: " + array.toString());
                location.reload();
            });
        });
    }
  }

function myFunction() {

    // add listener for search button
    document.getElementById("btn_cambridge_search").addEventListener("click", function(){

        var txt_cambridge_searchfield = document.getElementById("txt_cambridge_searchfield").value.trim();
        namnhlog.e("txt_cambridge_searchfield: " + txt_cambridge_searchfield);
        if(txt_cambridge_searchfield)
        {
            // append and save word list
            var storage_listWord_key = "storage_listWord";
            chrome.storage.sync.get([storage_listWord_key], function(result) {
                var array = result[storage_listWord_key]?result[storage_listWord_key]:[];

                while(array.length >= WORD_LIST_MAX)
                {
                    array.pop();
                }
        
                array.unshift(txt_cambridge_searchfield);
        
                var jsonObj = {};
                jsonObj[storage_listWord_key] = array;
                chrome.storage.sync.set(jsonObj, function() {
                    namnhlog.e("Saved a new array item: " + array.toString());
                });
            });

            showPopup(txt_cambridge_searchfield);
            window.parent.document.body.style.zoom=0.70
        }
    });

    // onkey enter
    var txt_cambridge_searchfield = document.getElementById("txt_cambridge_searchfield");
    txt_cambridge_searchfield.addEventListener("keyup", function(event) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
          // Trigger the button element with a click
          document.getElementById("btn_cambridge_search").click();
        }
      });
    
    var storage_listWord_key = "storage_listWord";
    chrome.storage.sync.get([storage_listWord_key], function(result) {
        var listWord = result[storage_listWord_key]?result[storage_listWord_key]:[];
        var table = document.getElementById("wordTable");

        // generate table
        var count = 0;
        listWord.forEach(function(word){
            var index = count;
            var row = table.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            
            cell1.innerHTML = "<a href='#' id='clickOnLink_"+ word +"'>"+ word +"</a>";
            cell2.innerHTML = "<a href='#' id='deleteBtn_"+ word +"'><img src='./image/mdl-cross.svg' height='15px'></a>";

            //JS
            document.getElementById("clickOnLink_" + word).addEventListener("click", function(){
                showPopup(word);
            });

            document.getElementById("deleteBtn_" + word).addEventListener("click", function(){
                deleteWord(index);
            });

            count++;
            
        });
        
    });


    
}


myFunction();