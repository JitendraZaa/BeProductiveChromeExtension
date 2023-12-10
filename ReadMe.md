# Chrome Extension to improve productivity

## What it does
1. Blocks websites that you want to avoid
1. Shows a motivational quote every time you open a new tab


## How to use it
1. Download this code in a folder
1. Open Chrome and go to `chrome://extensions/`
1. Enable `Developer mode`
1. Click on `Load unpacked`
1. Select the folder where you downloaded the code 

## Adding or Removing website to blocker list
1. Open `background.js` file
1. Add or remove the website from the `runExtension` method
1. go to `chrome://extensions/` and click on `Update` button

## Known Issue / Work In Progress
1. Able to use IndexDB to store the list of websites to block in extension popup however unable to access it in background.js