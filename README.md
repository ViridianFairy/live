## 1. 利用FFmpeg推流
准备工作：
* 安装ffmpeg并添加全局变量
* ```ffmpeg -list_devices true -f dshow -i dummy```命令查看当前外接设备
* 记录下设备名供后续使用，例如```HD WebCam```、```麦克风 (Realtek High Definition Audio)```

### 推流本地视频
```
ffmpeg -re -stream_loop -1 -i ./push/shot.mp4 -f flv -vcodec libx264 rtmp://funx.work:1935/live/livestream
```
```-re```用于实时输出
```-i```指定输入
```-f```指定输出格式，似乎只能是flv，格式会反应在拉流地址的后缀上
```-stream_loop```是循环次数，-1为无限循环
```-vcodec```指定编码器，因为obs也用的这个

### 推流摄像头
仅推流摄像头
```
ffmpeg -f dshow -i video="HD WebCam" -framerate 25 -bufsize 1000000k -vcodec libx264 -preset:v ultrafast -tune:v zerolatency -acodec libfaac -f flv rtmp://funx.work:1935/live/livestream
```


## 2.服务器部署
部署略，跟PDF一致
### Docker启动
首先```docker stats```记录下容器名称，
启动容器```docker run -itd -p 1935:1935 -p 1985:1985 -p 8080:8080  -v /resource/junk/Demo/live:/video ossrs/srs:3```，-it后跟容器名称
进入容器目录```docker exec -it f8003731137a  /bin/bash```，-it后跟容器名称
[配置链接](https://www.jianshu.com/p/4b628b3badae)

### 录制功能
修改srs.conf，添加一个dvr字段即可，srs.conf 在conf文件夹下
```
dvr {
        enabled         on;
        dvr_apply       all;
        dvr_plan        session;
        dvr_path        ../video/[stream].[timestamp].flv;
        dvr_duration    30;
        dvr_wait_keyframe       on;
        time_jitter             full;
    }
```
在容器内部```./objs/srs -c http-api.conf```启动服务器

## 3.拉流观看
前端在```./push/ustc-live```下，用 react hooks + flv.js + antd 编写
启动：cd到前端根目录，```npm install``，然后```npm start```即可，打包编译```npm build```

前端已经部署到[http://pass.funx.work/](http://pass.funx.work/)，点击即可观看


## 4. 附录
麦克风 摄像头全部推流
```
ffmpeg -framerate 30 -f dshow -i video="HD WebCam" -framerate 25 -bufsize 1000000k -f dshow -i audio="麦克风 (Realtek High Definition Audio)" -vcodec libx264 -preset:v ultrafast -tune:v zerolatency -f flv rtmp://funx.work:1935/live/livestream
```