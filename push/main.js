var outputh = 'rtmp://funx.work:1935/live/livestream'
var ffmpegPath = "C:/ffmpeg/bin/ffmpeg.exe";
import ffmpeg from 'fluent-ffmpeg';
// const ffmpeg = require('fluent-ffmpeg');
// const ffmpegPath = "C:/ffmpeg/bin/ffmpeg.exe";
const outputPath = 'rtmp://funx.work:1935/live/livestream';

(function getAudioStream() {
    navigator.mediaDevices.getUserMedia({audio: true, video: false})
        .then(function (stream) {
            audioStream = stream;
            pushStream();
            stream.onended = () => {
                console.log('Micro audio ended.')
            }
        })
        .catch(function (error) {
            console.log('getUserMedia() failed.')
        });
})()
var command;
(function pushStream() {
    command = ffmpeg("1:0")
        .setFfmpegPath(ffmpegPath)
        .inputOptions('-f avfoundation')
        .inputOptions('-framerate 30')
        .inputOptions('-video_size 640x480')
        .on('start', function (commandLine) {
            console.log('[' + new Date() + '] Vedio is Pushing !');
            console.log('commandLine: ' + commandLine);
        })
        .on('error', function (err, stdout, stderr) {
            console.log('error: ' + err.message);
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
        })
        .on('end', function () {
            console.log('[' + new Date() + '] Vedio Pushing is Finished !');
        })
        .addOptions([
            '-vcodec libx264',
            '-preset ultrafast',
            '-acodec libmp3lame'
        ])
        .format('flv');
    command
        .output(outputPath, {
            end: true
        })
        .run();
})()