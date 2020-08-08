chrome.runtime.onInstalled.addListener(function () {
  console.log('running background.js')
  chrome.storage.sync.set({ color: '#3aa757' }, function () {
    console.log("The color is green.");
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'developer.chrome.com' },
      })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });

  const freshdeskDomain = '.freshdesk.com'

  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    console.log(tabId, changeInfo, tab)
    if (tab.url.includes(freshdeskDomain) && changeInfo.status === "loading" && !tab.url.includes('dev=true')) {
      chrome.tabs.update(tab.id, { url: tab.url + (tab.url.includes('?') ? '&' : '?' + 'dev=true') });
    }
  });
});
