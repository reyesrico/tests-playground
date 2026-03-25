import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MyPromise.scss';

interface LogEntry {
  id: number;
  message: string;
  type: 'info' | 'code' | 'result';
}

// Custom Promise implementation
class PromiseT<T> {
  private value: T | undefined;

  constructor(f: (resolve: (value: T) => void, reject: (value: T) => void) => void) {
    const res = (resolveValue: T) => {
      this.value = resolveValue;
    };

    const rej = (rejectValue: T) => {
      this.value = rejectValue;
    };

    f(res, rej);
  }

  then<U>(tFunc: (value: T) => U): PromiseT<U> {
    return new PromiseT<U>((res) => {
      res(tFunc(this.value as T));
    });
  }

  catch(cFunc: (value: T) => void): void {
    cFunc(this.value as T);
  }
}

const MyPromise: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    const newLogs: LogEntry[] = [];
    let logId = 0;

    const addLog = (message: string, type: 'info' | 'code' | 'result' = 'info') => {
      newLogs.push({ id: logId++, message, type });
    };

    addLog('=== Custom Promise Implementation ===', 'info');
    addLog('', 'info');
    
    addLog('// Creating a simple Promise-like class', 'code');
    addLog('class PromiseT<T> {', 'code');
    addLog('  constructor(f: (resolve, reject) => void) { ... }', 'code');
    addLog('  then(tFunc) { return new PromiseT(...) }', 'code');
    addLog('  catch(cFunc) { ... }', 'code');
    addLog('}', 'code');
    addLog('', 'info');

    addLog('// Test 1: Basic resolve', 'code');
    addLog("let p = new PromiseT((res, rej) => res('hello'));", 'code');
    
    let result1 = '';
    const p1 = new PromiseT<string>((res) => res('hello'));
    p1.then(res => { result1 = res; return res; });
    addLog(`Result: "${result1}"`, 'result');
    addLog('', 'info');

    addLog('// Test 2: Chaining', 'code');
    addLog("new PromiseT(res => res(5)).then(x => x * 2)", 'code');
    
    let result2 = 0;
    const p2 = new PromiseT<number>((res) => res(5));
    p2.then(x => { result2 = x * 2; return result2; });
    addLog(`Result: ${result2}`, 'result');
    addLog('', 'info');

    addLog('// Note: This is a simplified implementation', 'info');
    addLog('// Real Promises are asynchronous and more complex', 'info');

    setLogs(newLogs);
  }, []);

  return (
    <div className="mypromise">
      <Link to="/">← Back to Home</Link>
      <h1>Custom Promise Implementation</h1>
      <p className="subtitle">Learning how Promises work under the hood</p>

      <div className="mypromise__console">
        {logs.map((log) => (
          <div key={log.id} className={`log-entry ${log.type}`}>
            {log.message || <br />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPromise;
