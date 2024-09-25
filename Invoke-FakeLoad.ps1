function Invoke-FakeLoad {
  # Close all instances of Chrome before proceeding
  Stop-Process -Name chrome -Force

  # Delay
  Start-Sleep -Seconds 10

  # Open the browser in kiosk mode with the specified URL
  Start-Process "chrome.exe" "--kiosk https://fakeupdate.net/win10ue/"
}
