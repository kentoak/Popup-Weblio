chrome.commands.onCommand.addListener(function (command) {
    if (command === '_execute_page_action') {
      alert("test1 command exec")
    }
  });