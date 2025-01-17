function changeURL(newUrl, title = '') {
    // Replace the current URL and history entry without adding a value
    history.replaceState(null, title, newUrl);

    // Optionally update the page title
    if (title) {
        document.title = title;
    }

    console.log(`URL replaced with: ${newUrl}`);
}

console.log("DEFACER SUCCESS");
changeURL('/ucc/students/', 'Student Access Module');
