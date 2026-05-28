import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Text, Dimensions } from 'react-native';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker'; // À installer

const VideoPlayer = forwardRef(({ videoUrl, onProgressUpdate }, ref) => {
  const [loading, setLoading] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [paused, setPaused] = useState(true);
  const [muted, setMuted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  const videoRef = useRef(null);

  const toggleFullScreen = () => {
    if (isFullScreen) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }
    setIsFullScreen(!isFullScreen);
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${mins}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useImperativeHandle(ref, () => ({
    seekTo: (time) => videoRef.current?.seek(time),
    togglePlay: () => setPaused((prev) => !prev)
  }));

  return (
    <View style={isFullScreen ? styles.fullScreenContainer : styles.container}>
      <Video
        ref={videoRef}
        source={{ uri: videoUrl }}
        style={styles.video}
        paused={paused}
        muted={muted}
        onLoad={(data) => { setDuration(data.duration); setLoading(false); }}
        onProgress={(data) => {
          setCurrentTime(data.currentTime);
          if (onProgressUpdate) onProgressUpdate(data.currentTime);
        }}
        resizeMode={isFullScreen ? "cover" : "contain"}
      />

      {loading && <ActivityIndicator style={styles.loader} size="large" color="#FFF" />}

      <View style={styles.controls}>
        <TouchableOpacity onPress={() => setPaused(!paused)} style={styles.btn}><Text style={styles.btnText}>{paused ? '▶' : '⏸'}</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setMuted(!muted)} style={styles.btn}><Text style={styles.btnText}>{muted ? '🔇' : '🔊'}</Text></TouchableOpacity>
        <Text style={styles.timeText}>{formatTime(currentTime)} / {formatTime(duration)}</Text>
        
        <Slider style={styles.slider} minimumValue={0} maximumValue={duration} value={currentTime} onSlidingComplete={(val) => videoRef.current?.seek(val)} />
        
        {/* Bouton Plein Écran */}
        <TouchableOpacity onPress={toggleFullScreen} style={styles.btn}>
            <Text style={styles.btnText}>{isFullScreen ? '↙️' : '↗️'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: { width: '100%', height: 300, backgroundColor: '#000' },
  fullScreenContainer: { ...StyleSheet.absoluteFillObject, backgroundColor: '#000', zIndex: 1000 },
  video: { flex: 1 },
  loader: { ...StyleSheet.absoluteFillObject },
  controls: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: 'rgba(0,0,0,0.5)' },
  btn: { marginRight: 15 },
  btnText: { color: 'white', fontSize: 18 },
  timeText: { color: 'white', fontSize: 12, marginRight: 10 },
  slider: { flex: 1 }
});

export default React.memo(VideoPlayer);