import { useEffect, useRef, useState, useCallback } from "react";
import { Camera, MapPin, RefreshCw, X, Check, AlertCircle, FlipHorizontal } from "lucide-react";
import { checkIn, checkOut } from "../../services/attendenceServices";
import toast from "react-hot-toast";

const SelfAttendanceModal = ({
  isOpen,
  onClose,
  mode = "checkIn", // 'checkIn' or 'checkOut'
  onSuccess,
}) => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [isMirrored, setIsMirrored] = useState(true); // Default to mirror mode (like a selfie / mirror)
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState("");
  const [cameraError, setCameraError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [detectingGps, setDetectingGps] = useState(true);

  // Stop camera helper
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, []);

  // Start camera
  const startCamera = useCallback(async () => {
    setCameraError("");
    setCapturedPhoto(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Webcam is not supported on this browser/device.");
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: "user" },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setCameraError(
        err.name === "NotAllowedError"
          ? "Camera permission denied. Please allow camera access in your browser."
          : err.message || "Failed to access webcam."
      );
    }
  }, []);

  // Acquire Geo-location
  const fetchLocation = useCallback(() => {
    setDetectingGps(true);
    setLocationError("");
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      setDetectingGps(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          latitude: Number(pos.coords.latitude.toFixed(6)),
          longitude: Number(pos.coords.longitude.toFixed(6)),
          accuracy: Math.round(pos.coords.accuracy),
        });
        setDetectingGps(false);
      },
      (err) => {
        console.warn("Geolocation error:", err);
        setLocationError(
          err.code === 1
            ? "Location permission denied. Please allow location access."
            : "Unable to retrieve GPS coordinates."
        );
        setDetectingGps(false);
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
    );
  }, []);

  useEffect(() => {
    if (isOpen) {
      startCamera();
      fetchLocation();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen, startCamera, fetchLocation, stopCamera]);

  // Capture photo from video to canvas
  const handleCapture = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");

    if (isMirrored) {
      // Mirror image horizontally to match what the user sees in mirror view
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      // Reset transform matrix so text and watermark read normally left-to-right
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    } else {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    }

    // Add timestamp watermark
    const timeStr = new Date().toLocaleString();
    ctx.font = "14px monospace";
    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    ctx.fillRect(10, canvas.height - 35, 320, 25);
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`Noteswift • ${timeStr}`, 18, canvas.height - 18);

    const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
    setCapturedPhoto(dataUrl);
    stopCamera();
  };

  const handleRetake = () => {
    setCapturedPhoto(null);
    startCamera();
  };

  const handleSubmit = async () => {
    if (!capturedPhoto) {
      toast.error("Please capture your photo before submitting.");
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        photo: capturedPhoto,
        location: location || {
          latitude: null,
          longitude: null,
          accuracy: null,
          address: "Location unavailable",
        },
      };

      let res;
      if (mode === "checkIn") {
        res = await checkIn(payload);
        toast.success(res.message || "Attendance checked in successfully!");
      } else {
        res = await checkOut(payload);
        toast.success(res.message || "Attendance checked out successfully!");
      }

      stopCamera();
      if (onSuccess) {
        onSuccess(res.attendance);
      }
      onClose();
    } catch (err) {
      toast.error(
        err.response?.data?.message || err.message || "Attendance action failed."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden flex flex-col border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Camera className="text-blue-600" size={20} />
              {mode === "checkIn" ? "Self Check-In" : "Self Check-Out"}
            </h2>
            <p className="text-xs text-gray-500">
              Webcam photo & GPS geo-tag verification
            </p>
          </div>

          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Camera Viewport */}
          <div className="relative w-full aspect-4/3 bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center shadow-inner">
            {cameraError ? (
              <div className="p-6 text-center text-white space-y-2">
                <AlertCircle className="mx-auto text-red-400" size={36} />
                <p className="text-sm font-medium">{cameraError}</p>
                <button
                  type="button"
                  onClick={startCamera}
                  className="mt-2 text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition"
                >
                  Retry Camera
                </button>
              </div>
            ) : capturedPhoto ? (
              <img
                src={capturedPhoto}
                alt="Captured Snapshot"
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{ transform: isMirrored ? "scaleX(-1)" : "none" }}
                className="w-full h-full object-cover transition-transform duration-200"
              />
            )}

            {/* Live Indicator */}
            {!capturedPhoto && !cameraError && (
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] text-white font-medium">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                Live Camera
              </div>
            )}

            {/* Mirror Toggle Button */}
            {!capturedPhoto && !cameraError && (
              <button
                type="button"
                onClick={() => setIsMirrored((prev) => !prev)}
                title={isMirrored ? "Mirror view active. Click to flip." : "Standard view active. Click to mirror."}
                className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 hover:bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] text-white font-medium transition cursor-pointer"
              >
                <FlipHorizontal size={13} />
                <span>{isMirrored ? "Mirror: On" : "Mirror: Off"}</span>
              </button>
            )}
          </div>

          {/* Geo-tag status banner */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-start gap-3 text-xs">
            <MapPin
              className={`shrink-0 mt-0.5 ${
                location ? "text-green-600" : "text-amber-500"
              }`}
              size={18}
            />

            <div className="flex-1">
              <span className="font-semibold text-slate-800 block">
                Geo-Location Tag
              </span>
              {detectingGps ? (
                <span className="text-slate-500 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-blue-500 animate-ping" />
                  Acquiring current GPS location...
                </span>
              ) : location ? (
                <span className="text-slate-600 font-mono">
                  Lat: {location.latitude}, Lng: {location.longitude} (±{location.accuracy}m)
                </span>
              ) : (
                <span className="text-amber-600">
                  {locationError || "Location unavailable (will record without coordinates)"}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={fetchLocation}
              title="Refresh GPS"
              className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-200 rounded-md transition"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-3">
          {!capturedPhoto ? (
            <button
              type="button"
              onClick={handleCapture}
              disabled={!!cameraError}
              className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition shadow-md disabled:opacity-50 cursor-pointer"
            >
              <Camera size={18} />
              Take Attendance Snapshot
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={handleRetake}
                disabled={submitting}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-xl text-sm font-medium transition cursor-pointer"
              >
                <RefreshCw size={16} />
                Retake
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold text-sm transition shadow-md disabled:opacity-50 cursor-pointer"
              >
                <Check size={18} />
                {submitting
                  ? "Submitting..."
                  : mode === "checkIn"
                  ? "Confirm & Check In"
                  : "Confirm & Check Out"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelfAttendanceModal;
