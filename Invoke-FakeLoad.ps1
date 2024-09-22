function Invoke-FakeLoad {
  # Close all instances of Chrome before proceeding
  Stop-Process -Name chrome -Force

  # Create a blackout window
  Add-Type -AssemblyName System.Windows.Forms
  $blackoutForm = New-Object System.Windows.Forms.Form
  $blackoutForm.WindowState = 'Maximized'
  $blackoutForm.FormBorderStyle = 'None'
  $blackoutForm.BackColor = [System.Drawing.Color]::Black
  $blackoutForm.TopMost = $true  # Keep it on top
  $blackoutForm.Show()

  # Open the browser in kiosk mode with the specified URL
  Start-Process "chrome.exe" "--kiosk https://fakeupdate.net/win10ue/"

  $blackoutForm.Close()
}
