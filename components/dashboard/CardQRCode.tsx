"use client";

import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

export function CardQRCode({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null);

  function download() {
    const canvas = ref.current?.querySelector("canvas");
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "tap4reviews-qr.png";
    a.click();
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div ref={ref} className="rounded-2xl bg-white p-4">
        <QRCodeCanvas value={value} size={192} includeMargin={false} />
      </div>
      <button onClick={download} className="btn-secondary text-xs">
        Download PNG
      </button>
    </div>
  );
}
