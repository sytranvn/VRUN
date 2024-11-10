'use client';

import {
  useMemo, useState, useCallback, useRef,
} from 'react';
import { useWavesurfer } from '@wavesurfer/react';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.esm.js';
import { Button, Flex } from 'antd';
import { AudioOutlined, PlayCircleOutlined } from '@ant-design/icons';

const VoiceRecorder = ({
  disabled, onStart, onStop, replay = true,
}) => {
  const containerRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');

  const { wavesurfer, isPlaying } = useWavesurfer({
    container: containerRef,
    height: 50,
    waveColor: '#d9d9d9',
    progressColor: '#1677ff',
    barWidth: 4,
    barRadius: 0,
    url: audioUrl,
    plugins: useMemo(() => [], []),
  });

  const record = wavesurfer?.registerPlugin(
    RecordPlugin.create({
      scrollingWaveform: false,
      renderRecordedAudio: false,
    }),
  );
  record?.on('record-end', (blob) => {
    const recordedUrl = URL.createObjectURL(blob);
    setAudioUrl(recordedUrl);
    if (blob.size > 0) {
      onStop && onStop(recordedUrl);
    }
  });
  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause();
  }, [wavesurfer]);

  const startRecord = async () => {
    if (record.isRecording() || record.isPaused()) {
      record.stopRecording();
      setIsRecording(false);
      return;
    }

    setIsRecording(true);
    const devices = await RecordPlugin.getAvailableAudioDevices();

    record.startRecording({ deviceId: devices[0].deviceId }).then(() => {
      if (isRecording) {
        record.stopRecording();
        setIsRecording(false);
      } else {
        onStart && onStart();
      }
    });
  };

  return (
    <Flex vertical gap="middle">
      <div ref={containerRef} />
      <Flex gap="middle" justify="center">
        <Button
          icon={<AudioOutlined />}
          type="primary"
          size="large"
          onClick={startRecord}
          disabled={disabled}
        >
          {isRecording ? 'Dừng' : 'Thu âm'}
        </Button>
        { replay && (
          <Button
            icon={<PlayCircleOutlined />}
            type="default"
            size="large"
            onClick={onPlayPause}
            disabled={isRecording}
          >
            {isPlaying ? 'Dừng' : 'Nghe lại'}
          </Button>
        ) }
      </Flex>
    </Flex>
  );
};

export default VoiceRecorder;
