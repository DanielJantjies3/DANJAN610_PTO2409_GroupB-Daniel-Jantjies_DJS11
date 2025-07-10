import React, { useContext, useEffect, useState } from "react";

import { usePodcastContext } from "../contexts/PodcastContext";

import { PlayIcon, PauseIcon } from "@heroicons/react/24/solid";

function Player() {
  const {
    seekBar,
    seekBg,
    playStatus,
    play,
    pause,
    track,
    setTrack,
    audioRef,
  } = usePodcastContext();
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    function updateProgress() {
      setProgress(audio.currentTime);
    }
    function updateDuration() {
      setDuration(audio.duration || 0);
    }
    function handlePlay() {
      if (!playStatus) play();
    }
    function handlePause() {
      if (playStatus) pause();
    }
    function handleEnded() {
      pause();
    }

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("durationchange", updateDuration);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    audio.pause();
    pause();

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("durationchange", updateDuration);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioRef, track]);

  const [isDragging, setIsDragging] = useState(false);

  function getSeekPercent(e) {
    const bar = seekBg.current;
    if (!bar) return 0;
    const rect = bar.getBoundingClientRect();
    let clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    return x / rect.width;
  }

  function handleSeek(e, shouldPlay = false) {
    const percent = getSeekPercent(e);
    const newTime = percent * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setProgress(newTime);

      if (shouldPlay) {
        audioRef.current.play();
      }
    }
  }

  function handleDragStart(e) {
    setIsDragging(true);
    handleSeek(e);
    window.addEventListener("mousemove", handleDragMove);
    window.addEventListener("mouseup", handleDragEnd);
    window.addEventListener("touchmove", handleDragMove);
    window.addEventListener("touchend", handleDragEnd);
  }

  function handleDragMove(e) {
    if (!isDragging) return;
    handleSeek(e);
  }

  function handleDragEnd(e) {
    setIsDragging(false);
    handleSeek(e, true);
    window.removeEventListener("mousemove", handleDragMove);
    window.removeEventListener("mouseup", handleDragEnd);
    window.removeEventListener("touchmove", handleDragMove);
    window.removeEventListener("touchend", handleDragEnd);
  }

  function formatTime(sec) {
    if (!sec || isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  return (
    <div className="w-full flex items-center justify-between px-4 py-2 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-t border-gray-800 shadow-2xl min-h-[72px]">
      <div className="flex items-center gap-4 min-w-0 w-1/3">
        <img
          className="w-14 h-14 object-cover rounded shadow-md"
          src={track.image}
          alt=""
        />
        <div className="truncate">
          <p className="text-base font-semibold truncate text-white">
            {track.title}
          </p>
          <p className="text-xs text-gray-400 truncate">{`Season ${track.season} Ep ${track.episode}`}</p>
        </div>
      </div>

      {/* Center: Controls & Seekbar */}
      <div className="flex flex-col items-center gap-1 w-1/3 min-w-[200px] max-w-[500px] mx-auto">
        <div className="flex gap-6 items-center mb-1">
          {playStatus ? (
            <button
              onClick={pause}
              className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition"
            >
              <PauseIcon className="w-8 h-8 text-green-500" />
            </button>
          ) : (
            <button
              onClick={play}
              className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition"
            >
              <PlayIcon className="w-8 h-8 text-green-500" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 w-full">
          <span className="text-xs text-gray-400 w-10 text-right">
            {formatTime(progress)}
          </span>
          <div
            ref={seekBg}
            className="flex-1 h-1 bg-gray-700 rounded-full cursor-pointer relative mx-2"
            onClick={(e) => handleSeek(e, true)}
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
          >
            <div
              ref={seekBar}
              className="h-full bg-green-500 rounded-full"
              style={{
                width: duration ? `${(progress / duration) * 100}%` : "0%",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                left: duration
                  ? `calc(${(progress / duration) * 100}% - 8px)`
                  : "-8px",
                top: -4,
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "#22c55e",
                border: "2px solid #fff",
                boxShadow: "0 0 2px #0003",
                cursor: "pointer",
                zIndex: 2,
                transition: isDragging ? "none" : "left 0.1s",
              }}
              onMouseDown={handleDragStart}
              onTouchStart={handleDragStart}
            ></div>
          </div>
          <span className="text-xs text-gray-400 w-10 text-left">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      <div className="w-1/3 flex items-center justify-end pr-2"></div>
    </div>
  );
}

export default Player;
