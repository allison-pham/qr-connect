"use client"
import { useState } from "react"
import { QRCodeCanvas } from "qrcode.react"

function buildWifiString(ssid: string, password: string, security: string): string {
  if (security === "nopass") return `WIFI:S:${ssid};T:nopass;;`
  return `WIFI:S:${ssid};T:${security};P:${password};;`
}

export default function Page() {
  const [ssid, setSsid] = useState("")
  const [password, setPassword] = useState("")
  const [security, setSecurity] = useState("WPA")

  function downloadQR() {
    const canvas = document.querySelector("#qr-canvas canvas") as HTMLCanvasElement
    if (!canvas) return
    const link = document.createElement("a")
    link.download = `wifi-${ssid}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <main className="min-h-screen bg-pink-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl border border-pink-100 p-8 w-full max-w-md">

        <div className="text-center mb-8">
          <div className="text-4xl mb-2 text-pink-300">✧˖°</div>
          <h1 className="text-2xl font-semibold text-pink-400">QR Connect</h1>
          <p className="text-sm text-pink-300 mt-1">Save wifi logins → save time (through QR codes)</p>
          <p className="text-sm text-pink-300 mt-1">QR code to share wifi without saying the password out loud</p>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-pink-400 tracking-wide">Network name</label>
            <input
              type="text"
              placeholder="My Cozy Network"
              value={ssid}
              onChange={(e) => setSsid(e.target.value)}
              className="mt-1 w-full rounded-xl border border-pink-100 bg-pink-50 px-4 py-2.5 text-sm text-gray-700 placeholder-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-200"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-pink-400 tracking-wide">Password</label>
            <input
              type="password"
              placeholder="Super secret ✨"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-pink-100 bg-pink-50 px-4 py-2.5 text-sm text-gray-700 placeholder-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-200"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-pink-400 tracking-wide">Security</label>
            <select
              value={security}
              onChange={(e) => setSecurity(e.target.value)}
              className="mt-1 w-full rounded-xl border border-pink-100 bg-pink-50 px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-200"
            >
              <option value="WPA">WPA / WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">None (open)</option>
            </select>
          </div>
        </div>

        <div id="qr-canvas" className={`mt-8 flex flex-col items-center gap-4 ${ssid ? "visible" : "invisible"}`}>
          <div className="p-4 bg-pink-50 rounded-2xl border border-pink-100">
            <QRCodeCanvas
              value={ssid ? buildWifiString(ssid, password, security) : " "}
              size={180}
              level="M"
              fgColor="#f9a8d4"
            />
          </div>
          <p className="text-sm text-pink-300 truncate w-full text-center">
            Point your camera here to connect to <span className="font-medium text-pink-400">{ssid}</span>
          </p>
          <button
            onClick={downloadQR}
            className="w-full rounded-xl bg-pink-200 hover:bg-pink-300 transition-colors text-pink-700 text-sm font-medium py-2.5"
          >
            Download QR code image
          </button>
        </div>

      </div>
    </main>
  )
}