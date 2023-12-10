import qrcode

ssid = input("SSID: ")
pw = input("Password: ")
security = input("Security type (default = WPA): ") or "WPA"

qrcode.make(f"Wi-Fi:S:{ssid};P:{pw};T:{security};;").save("code.png")

# print("Success.")