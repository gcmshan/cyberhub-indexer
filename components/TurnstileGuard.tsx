"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { useState } from "react";

interface Props {
  onVerify: () => void;
}

export default function TurnstileGuard({ onVerify }: Props) {
  const [verified, setVerified] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-900/80 border border-slate-800 rounded-xl my-4 text-center">
      {!verified ? (
        <>
          <p className="text-sm text-slate-300 mb-3 font-medium">
            Please complete security check to enable search
          </p>
          <Turnstile
            siteKey="0x4AAAAAAAcBKb2K3NbxdgF1m"
            onSuccess={() => {
              setVerified(true);
              onVerify();
            }}
          />
        </>
      ) : (
        <div className="text-emerald-400 text-sm font-semibold flex items-center gap-2">
          <span>✓</span> Human Verified
        </div>
      )}
    </div>
  );
}