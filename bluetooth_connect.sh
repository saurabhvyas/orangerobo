#!/bin/bash
# My first script

  amixer cset numid=1 60%
  pulseaudio --start
 echo   "connect 30:21:BC:8D:48:6B \nquit" | bluetoothctl
 sleep 9 ; pacmd "set-default-sink bluez_sink.30_21_BC_8D_48_6B" && sox /home/pi/saurabh/robot/uploads/audio.wav -b 16 /home/pi/saurabh/robot/uploads/audio_new.wav  channels 1 rate 16k  && aplay /home/pi/saurabh/robot/uploads/audio_new.wav
 


 
