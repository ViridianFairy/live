ffmpeg -f dshow -i video="USB2.0 PC CAMERA":audio="麦克风 (2- USB2.0 MIC)" -vcodec libx264  -r 25  -preset:v ultrafast -tune:v zerolatency -f flv rtmp://127.0.0.1:1935/live/123
