function Invoke-FakeLoad {
  # Close all instances of Chrome before proceeding
  Get-Process chrome -ErrorAction SilentlyContinue | Stop-Process -Force

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
  Start-Sleep -Seconds 10
  $blackoutForm.Close()

  # Calculate the center position of the form
  $centerX = $blackoutForm.Left + ($blackoutForm.Width / 2)
  $centerY = $blackoutForm.Top + ($blackoutForm.Height / 2)

  # Set the cursor position to the center of the form
  [System.Windows.Forms.Cursor]::Position = New-Object System.Drawing.Point($centerX, $centerY)

  # Simulate a mouse click
  [System.Windows.Forms.Mouse]::Click(0, $centerX, $centerY) # 0 is the mouse button for left-click
}
