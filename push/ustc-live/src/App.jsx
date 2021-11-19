import "./App.css";
import { useEffect,useState } from "react";
import Player from './Player'
import PlayList from "./PlayList";
import { usePlayList } from "./hooks/usePlayList";
var columns = [
    {title:'推流历史',dataIndex:'name',render:(text)=><a>{text}</a>},
    {title:'推流时间',dataIndex:'time'},
    {title:'文件大小',dataIndex:'size'}
]
function App() {
    const {playList} = usePlayList([])
    const [url, setUrl] = useState("")
    
    return (
        <div className="App">
          <Player url={url}></Player>
          <div>
              <PlayList columns={columns} data={playList} setUrl={setUrl}></PlayList>
          </div>
            {}
        </div>
    );
} 
// function makeUrl(name){
//     return "http://funx.work/resource/junk/Demo/live/" + name
// }
export default App;
