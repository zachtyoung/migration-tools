import React, { useState, useEffect } from 'react';
import './App.css';
import { Select } from 'antd';
import { Steps, Button, message } from 'antd';

const { Step } = Steps;
const { Option } = Select;
const steps = [
  {
    title: 'Select a site',
    content: <Select
    className='select'
      style={{ width: 300 }}
      placeholder="Select a site"
      onChange={onChange}
    >
      <Option value="servocity">ServoCity</Option>
      <Option value="gobilda">goBILDA</Option>
    </Select>,
  },
  {
    title: 'Excluded words',
    content: <div className='excluded'>Excluded Words</div>,
  },
  {
    title: 'Targeted words',
    content: <div className='included'>Included Words</div> ,
  },
];

function onChange(value) {
  console.log(value);
}




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
  const [current, setCurrent] = React.useState(0);
const data = useEventSource('http://localhost:5000/');
if (!data) {
  return <div />;
}
const next = () => {
  setCurrent(current + 1);
};

const prev = () => {
  setCurrent(current - 1);
};
return <div className="page-container">
  <div className='steps-wrapper'>
  <div className="steps-content">{steps[current].content}</div>
      <Steps className='steps' current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
    
      <div className="steps-action">
      {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Searching... this will take some time')}>
            Run
          </Button>
        )}
     
      </div>
      </div>
  <div className="links-container">
    <div><h2>Results</h2></div>
    <div className='links'>
  {data&&data.map(el => <h1>{el}</h1>)}
  </div>
  </div>
  
  </div>;
}


export default App;
