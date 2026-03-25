import React from 'react';
import { Link } from 'react-router-dom';
import Button from './shared/Button';

const Test: React.FC = () => {
  const [result, setResult] = React.useState('');

  const sendInfo2 = async () => {
    const p: Promise<string> = new Promise((resolve) => 
      setTimeout(() => resolve('done'), 1000)
    );
    const a = await p;
    setResult(a);
  };

  return (
    <div>
      <Link to="/" className="back-link">← Back to Home</Link>
      <h2>Test - Async Promise Demo</h2>
      <p>Click the button to trigger an async operation.</p>
      <hr />
      <div style={{ marginBottom: '20px' }}>
        <strong>Result: </strong>
        <span>{result || '(click button)'}</span>
      </div>
      <Button text="Click me" onClick={sendInfo2} />
    </div>
  );
};

export default Test;
