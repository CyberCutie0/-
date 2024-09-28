function Invoke-FakeLoad {
    # Delay
    # Start-Sleep -Seconds 10

    # Close all instances of Chrome before proceeding
    Stop-Process -Name chrome -Force

    # Open the browser in kiosk mode with a new user data directory to avoid user accounts
    Start-Process "chrome.exe" "--kiosk --incognito --user-data-dir=C:\TempChrome https://fakeupdate.net/win10ue/"
}
