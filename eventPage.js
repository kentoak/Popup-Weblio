
// NOTE
// QUERRY
//https://www.cambridgelearnersdictionaries.com/autocomplete/american_english/?q=test&contentType=application%2Fjson%3B%20charset%3Dutf-8

// LOG CLASS


chrome.browserAction.onClicked.addListener(doActionButton);

function doActionButton(tab){
    console.log('Action Button clicked. Tab:',tab);
}

chrome.commands.onCommand.addListener(function(command) {
    //Polyfill the Browser Action button
    if(command === '_execute_browser_action') {
        chrome.tabs.query({active:true,currentWindow:true},function(tabs){
            //Get the popup for the current tab
            chrome.browserAction.getPopup({tabId:tabs[0].id},function(popupFile){
                if(popupFile){
                    openPopup(tabs[0],popupFile);
                } else {
                    //There is no popup defined, so we do what is supposed to be done for
                    //  the browserAction button.
                    doActionButton(tabs[0]);
                }
            });
        });
        return;
    } //else
});

class NAMNH_LOG {

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
  
  let namnhlog = new NAMNH_LOG("NAMNH");


// 0. init

namnhlog.d("0. Init value");

var menuItem = {
    "id": "menu_cambridge",
    "title": 'Lookup "%s"',
    "contexts": ["selection"]
};

var last_popup_tabId = false;

var urlCambridge_English = "https://ejje.weblio.jp/content/"//"https://dictionary.cambridge.org/search/english/direct/?q=";
var urlCambridge_American_English = "https://ejje.weblio.jp/content/" //"https://dictionary.cambridge.org/search/english/direct/?q=";
var WORD_LIST_MAX = 5;

// function to create new popup
function createPopup(popup_info){
    chrome.windows.create(popup_info, function(newPopup){
        last_popup_tabId = newPopup.id;
        namnhlog.w("Create last_popup_tabId: " + last_popup_tabId);
    });
}


// 1. Create context menu.
chrome.contextMenus.removeAll();
chrome.contextMenus.create(menuItem);

function fixedEncodeURI(str){
    return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}

// 2. Context Menu Events
chrome.contextMenus.onClicked.addListener(function(clickData){
    if(clickData.menuItemId == "menu_cambridge" && clickData.selectionText){
        
        namnhlog.i("2.1 selectionText = " +  clickData.selectionText)

        var queryKey = fixedEncodeURI(clickData.selectionText).toLowerCase().trim();
        //TODO: check english/american english
        

        var cambridgeUrl = "https://ejje.weblio.jp/content/" + queryKey;

        namnhlog.log("2.2 cambridgeUrl = " +  cambridgeUrl)
        
        // append and save word list
        var storage_listWord_key = "storage_listWord";
        chrome.storage.sync.get([storage_listWord_key], function(result) {
            var array = result[storage_listWord_key]?result[storage_listWord_key]:[];

            while(array.length >= WORD_LIST_MAX)
            {
                array.pop();
            }
    
            array.unshift(queryKey);
    
            var jsonObj = {};
            jsonObj[storage_listWord_key] = array;
            chrome.storage.sync.set(jsonObj, function() {
                namnhlog.e("Saved a new array item: " + array.toString());
            });
        });

        // save last word
        // chrome.storage.sync.set({'storage_lastword':queryKey}, function()
        // {
        //     namnhlog.log("2.3 lastWord: " + queryKey);
        // });


// 3. Open new popup    
        
        var popupInfo = {
            "url": cambridgeUrl,
            //"type": "normal", // for debug
            "type": "popup",
            "top": 5,
            "left": 0,//Math.round(screen.availWidth - (screen.availWidth/3)),
            "width": Math.round(screen.availWidth/3),
            "height": Math.round(screen.availHeight/2),
            "focused": true
        };


        // 3.1 Check last popup
        if(last_popup_tabId == false)
        {
            createPopup(popupInfo);
        }
        else
        {
            // 3.2 Get all windows
             chrome.windows.getAll({"windowTypes": ["popup"]}, function(windows){
                
                // 3.2.1 Check if last_popup_tabId still alive.
                var last_popup_tabId_isAlive = false;
                windows.forEach(function(window){
                    namnhlog.log("3.2 getAll id: " + window.id);
                    if(last_popup_tabId == window.id)
                    {
                        namnhlog.d("3.2 getAll id: " + last_popup_tabId + " still alive!");
                        last_popup_tabId_isAlive = true;
                    }
                });

                // 3.3 remove and create new popup
                if(last_popup_tabId_isAlive)
                {
                    chrome.windows.remove(last_popup_tabId, function(){
                            namnhlog.w("3.3 Close last_popup_tabId: " + last_popup_tabId);
                            createPopup(popupInfo);
                    });
                }
                else
                {
                    namnhlog.e("3.4 getAll id: " + last_popup_tabId + " NOT FOUND!!!!");
                    createPopup(popupInfo);
                }
            });
            
        }

    }
});
