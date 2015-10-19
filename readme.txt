The command line needs to include two parameters for the starting URL and the number of pages to crawl.
It should look something like this:

casperjs wcagtest.js http://overdrive.com/ 10

To view results in your browser:
1. git clone https://github.com/williamgates/wcag5.git
2. cd into wcag5
3. run npm install
4. run node index.js 
5. This should serve the page at http://localhost:3000

Tests we've written:
* Pages with no language defined
* Images without an ALT attribute
* Images whose ALT attribute only contains white space
* I'mages whose ALT text is unusually long (check only)
* Links with no text (including alt text)
* Form elements with no ID
* Form elements with no label
* Elements with class of "heading" or "header" which might be headings (check only)
* Headings that are unusually long (check only)
* Visual lists with bullet images (check only)
* Focusable elements whose outline is set to "none" (check only)