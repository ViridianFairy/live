
import React, { useState } from 'react';
import { Table, Radio, Divider } from 'antd';
function PlayList({columns,data,setUrl}) {
    console.log(columns)
    console.log(data)
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          let key = selectedRowKeys[0]
          let url = ''
          if(key == 0){
            url = "http://funx.work:8080/live/livestream.flv"
          }else{
            url = "http://funx.work/resource/junk/Demo/live/" + selectedRows[0].name
            
          }
          setUrl(url)
          console.log(url)
          // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name,
        }),
      };
    const [selectionType, setSelectionType] = useState('radio');
    return (
        <div class="table-wrapper">
        {/* <Radio.Group
          onChange={({ target: { value } }) => {
            setSelectionType(value);
          }}
          value={selectionType}
        >
          <Radio value="checkbox">Checkbox</Radio>
          <Radio value="radio">radio</Radio>
        </Radio.Group> */}
  
        <Table
        
          rowSelection={{
            type: 'radio',
            defaultSelectedRowKeys:['0'],
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
        />
      </div>
    );
} 
function makeUrl(name){
    return "http://funx.work/resource/junk/Demo/live/" + name
}
export default PlayList;
