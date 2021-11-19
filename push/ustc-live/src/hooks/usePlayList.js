import { useState, useEffect } from "react"
import axios from 'axios'
export function usePlayList(){
    const [playList, setPlayList] = useState([])
    useEffect(() => {
        axios.post('http://1.117.59.223:3001/api/disk/getPublic', {pos:'/Demo/live'})
        .then(function (data) {
            let res = data.data.data
            res = res.filter((value)=>{
                let format = value.name.split('.').slice(-1)
                if(format == 'flv') return true
                return false
            })
            let arr = [{
                name:'直播流',
                key:'0',
                time:'直播',
                size:'--'
            }]
            res.forEach((value,index)=>{
                let format = value.name.split('.').slice(-1)
                if(format != 'flv') return;
                arr.push({
                    name:value.name,
                    key:index+1,
                    time:value.changeTime,
                    size:value.size,
                })
            })
            console.log(arr)
            setPlayList(arr)
        })
    }, [])
    return {playList}
}