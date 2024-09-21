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

  # Optional: Brief pause before closing the blackout
  Start-Sleep -Seconds 8
  $blackoutForm.Close()

  # Simulate a mouse click at the current cursor position
  $mousePos = [System.Windows.Forms.Cursor]::Position
  $x = $mousePos.X
  $y = $mousePos.Y

  Start-Sleep -Seconds 2
  # Create a new mouse event for the left button click
  [System.Windows.Forms.Mouse]::Click(0, $x, $y)  # 0 is the mouse button for left-click
}
