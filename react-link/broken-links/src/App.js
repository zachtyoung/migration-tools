import React, { useState, useEffect } from 'react';
import './App.css';
import { Input, Select } from 'antd';
const { Option } = Select;
const selectBefore = (
  <Select defaultValue="http://" className="select-before">
    <Option value="http://">http://</Option>
    <Option value="https://">https://</Option>
  </Select>
);
const selectAfter = (
  <Select defaultValue=".com" className="select-after">
    <Option value=".com">.com</Option>
    <Option value=".jp">.jp</Option>
    <Option value=".cn">.cn</Option>
    <Option value=".org">.org</Option>
  </Select>
);


const useEventSource = (url) => {
  const [data, updateData] = useState([]);

  useEffect(() => {
      const source = new EventSource(url);

      source.onmessage = function logEvents(event) {     
        console.log(event.data) 
          updateData(prev => [...prev, JSON.parse(event.data)]);     
      }
  }, [])

  return data;
}

function App() {
const data = useEventSource('http://localhost:5000/');
if (!data) {
  return <div />;
}

return <div className="container">{data&&data.map(el => <p>{el}</p>)}</div>;
}


export default App;
