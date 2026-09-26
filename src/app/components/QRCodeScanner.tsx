import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface QRCodeScannerProps {
  receiverName: string;
  foodItem: string;
  onVerify: (success: boolean) => void;
  onClose: () => void;
}

export default function QRCodeScanner({ receiverName, foodItem, onVerify, onClose }: QRCodeScannerProps) {
  const [manualCode, setManualCode] = React.useState('');
  const [scanning, setScanning] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleScan = () => {
    setScanning(true);
    setError('');
    
    // Simulate QR code scanning
    setTimeout(() => {
      setScanning(false);
      // Simulate successful scan
      onVerify(true);
    }, 2000);
  };

  const handleManualVerify = () => {
    if (manualCode.length !== 4) {
      setError('Please enter a 4-digit code');
      return;
    }
    
    // In a real app, verify the code against the server
    // For now, accept any 4-digit code
    onVerify(true);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white border-stone-200">
        <CardHeader>
          <CardTitle className="text-white text-center">Verify Receiver</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-stone-600 mb-2">Scan the receiver's QR code or enter verification code</p>
          </div>

          {/* Receiver Details */}
          <div className="bg-stone-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">Receiver:</span>
              <span className="text-white">{receiverName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">Food Item:</span>
              <span className="text-white">{foodItem}</span>
            </div>
          </div>

          {/* Scanner Area */}
          <div className="space-y-4">
            <div className="relative">
              <div className={`w-full h-64 bg-stone-50 rounded-lg border-2 ${scanning ? 'border-orange-500' : 'border-stone-300'} border-dashed flex items-center justify-center overflow-hidden`}>
                {scanning ? (
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-orange-400">Scanning...</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <svg className="w-20 h-20 text-stone-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M12 12h-.01M12 12v4m0 0h4m-4 0h-.01m0-8h4.01M12 8h-.01M8 12h-.01M12 8h-.01m0 4h-.01m4-4h.01m0 4h-.01M8 8h.01M8 8h-.01" />
                    </svg>
                    <p className="text-stone-500">Position QR code in frame</p>
                  </div>
                )}
                
                {/* Scan frame corners */}
                {!scanning && (
                  <>
                    <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-orange-500"></div>
                    <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-orange-500"></div>
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-orange-500"></div>
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-orange-500"></div>
                  </>
                )}
              </div>
              
              {!scanning && (
                <Button
                  onClick={handleScan}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-orange-600 hover:bg-orange-700 text-white"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Start Scanning
                </Button>
              )}
            </div>
          </div>

          {/* Manual Code Entry */}
          <div className="border-t border-stone-200 pt-4">
            <p className="text-stone-500 text-sm mb-3 text-center">Or enter code manually</p>
            <div className="space-y-3">
              <div>
                <Label className="text-stone-600">4-Digit Verification Code</Label>
                <Input
                  type="text"
                  maxLength={4}
                  placeholder="1234"
                  value={manualCode}
                  onChange={(e) => {
                    setError('');
                    setManualCode(e.target.value.replace(/\D/g, ''));
                  }}
                  className="bg-stone-50 border-stone-300 text-white text-center text-2xl tracking-widest font-mono"
                />
                {error && <p className="text-rose-500 text-sm mt-1">{error}</p>}
              </div>
              <Button
                onClick={handleManualVerify}
                disabled={manualCode.length !== 4}
                className="w-full bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
              >
                Verify Code
              </Button>
            </div>
          </div>

          <Button
            onClick={onClose}
            variant="outline"
            className="w-full border-stone-300 text-stone-600 hover:bg-stone-100"
          >
            Cancel
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
