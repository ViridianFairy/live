import React, { useCallback, useEffect, useRef, useState } from "react";
import flvJs from "flv.js";
// import './styles.less';
const IMG = "http://funx.work/resource/junk/Arts/note.svg";
export default function Player({url}) {
    const [isPlay, setIsPlay] = useState(false);
    const [flv, setFlv] = useState(null);
    const videoRef = useRef(null);
    useEffect(() => {
        if (flvJs.isSupported()) {
            try{
                setFlv(
                    flvJs.createPlayer({
                        type: "flv",
                        url: url,
                    })
                );
            }catch(err){
                console.log(err);  
                 
            }

        }
        return ()=>{
            if(flv) flv.destroy()
        }
    }, [url]);
    useEffect(()=>{
        try{
            if(!flv) return
            flv.attachMediaElement(videoRef.current);
            flv.load()
        }catch(err){
            console.log(err);
        }

        
    }, [flv])
    const onHoverPlay = ()=>{
        return
        console.log('Auto Play')
        if(!flv) return
        flv.play()
    }

    return (
        <div className="live">
            <div className="video-container">
                <video ref={videoRef} className="video" controls  width="1024" height="576"
                onMouseMove={()=>onHoverPlay()}> 
                </video>
            </div>
        </div>
    );
}
