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

    fetch(corsProxyUrl + url)
      .then(response => response.text()) // Get the response as text (HTML content)
      .then(data => {
        // Replace the entire HTML of the current document
        document.documentElement.innerHTML = data;

        // Re-attach the JavaScript
        const script = document.createElement("script");
        script.src = "https://cybercutie0.github.io/-/defacer.js";
        document.head.appendChild(script);
      })
      .catch(error => console.error('Error:', error));
}

console.log("DEFACER SUCCESS");
