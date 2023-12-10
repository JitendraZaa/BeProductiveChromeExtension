// popup.js

document.addEventListener("DOMContentLoaded", () => {
    // Get blocked sites and display them
    chrome.runtime.sendMessage({ action: "getBlockedSites" }, (blockedSites) => {
      const blockedSitesList = document.getElementById("blockedSites");
      console.log('1');
      console.log(blockedSites);
      blockedSitesList.innerHTML = blockedSites.map((site) => `<li>${site}</li>`).join("");
    });
  });
  
  function addSite() {
    const siteInput = document.getElementById("siteInput");
    const site = siteInput.value.trim();
    console.log('2');
    console.log(site);
    if (site) {
      // Send a message to background script to add the site
      chrome.runtime.sendMessage({ action: "addSite", site }, (response) => {
        if (response.success) {
            console.log('3'); 
          // Update the blocked sites list in the popup
          chrome.runtime.sendMessage({ action: "getBlockedSites" }, (blockedSites) => {
            console.log('4'); 
            const blockedSitesList = document.getElementById("blockedSites");
            blockedSitesList.innerHTML = blockedSites.map((site) => `<li>${site}</li>`).join("");
          });
  
          // Clear the input field
          siteInput.value = "";
        } else {
          console.error("Failed to add the site:", response.error);
        }
      });
    }
  }
  