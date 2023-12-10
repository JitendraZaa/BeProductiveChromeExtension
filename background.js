// background.js

// Function to open the IndexedDB database
function openDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("BlockedSitesDB", 1);
  
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        db.createObjectStore("blockedSites", { keyPath: "site" });
      };
  
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  
  // Function to add a blocked site to IndexedDB
  function addBlockedSite(site) {
    return openDB().then((db) => {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction("blockedSites", "readwrite");
        const store = transaction.objectStore("blockedSites");
  
        const request = store.add({ site });
  
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    });
  }
  
  // Function to get all blocked sites from IndexedDB
  function getBlockedSites() {
    return openDB().then((db) => {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction("blockedSites", "readonly");
        const store = transaction.objectStore("blockedSites");
  
        const request = store.getAll();
  
        request.onsuccess = () => resolve(request.result.map(item => item.site));
        request.onerror = () => reject(request.error);
      });
    });
  }
  
  // Initialize blocked sites from IndexedDB
  chrome.runtime.onInstalled.addListener(() => {
    getBlockedSites().then((blockedSites) => {
      // Update the rules
      updateBlockingRules(blockedSites);
    });
  });
   

  // Function to update blocking rules
    function updateBlockingRules(blockedSites) {
        // Get all existing rules
        chrome.declarativeNetRequest.getRules(null, (rules) => {
        // Remove all existing rules
        chrome.declarativeNetRequest.removeRules(rules.map(rule => rule.id), () => {
            // Add new rules based on blocked sites
            const newRules = blockedSites.map(site => ({ action: { type: "block" }, condition: { urlFilter: site } }));
            chrome.declarativeNetRequest.updateSessionRules({
            addRules: newRules
            });
        });
        });
    }
  
  
  // Message listener to handle adding a site
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "addSite") {
      addBlockedSite(request.site).then(() => {
        // Update the blocking rules after adding a site
        getBlockedSites().then((blockedSites) => {
          updateBlockingRules(blockedSites);
          sendResponse({ success: true });
        });
      }).catch(() => {
        sendResponse({ success: false, error: "Failed to add the site." });
      });
    } else if (request.action === "getBlockedSites") {
      getBlockedSites().then((blockedSites) => {
        sendResponse(blockedSites);
      });
    }
  
    return true; // Indicates that the response will be sent asynchronously
  });
  
  // Event listener to update blocking rules when the extension is updated
  chrome.runtime.onUpdateAvailable.addListener((details) => {
    chrome.runtime.reload();
  });
  