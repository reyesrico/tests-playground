import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Practice.scss';

interface LogEntry {
  id: number;
  message: string;
  type: 'info' | 'result';
}

const Practice: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    const newLogs: LogEntry[] = [];
    let logId = 0;

    const addLog = (message: string, type: 'info' | 'result' = 'info') => {
      newLogs.push({ id: logId++, message, type });
    };

    // Practice JS - Call vs Apply
    const person1 = { name: 'Marvin', age: 42, size: '2xM' };
    const person2 = { name: 'Zaphod', age: 42000000000, size: '1xS' };

    const update = function (this: typeof person1, name: string, age: number, size: string) {
      this.name = name;
      this.age = age;
      this.size = size;
    };

    addLog('=== Call vs Apply Demo ===', 'info');
    
    update.call(person1, 'Merol', 3, '15');
    addLog(`After call(): person1 = ${JSON.stringify(person1)}`, 'result');

    const say = function (this: { name: string }, greeting: string) {
      return `${greeting}, ${this.name}`;
    };

    const dispatch = function (person: object, method: Function, args: any[]) {
      return method.apply(person, args);
    };

    const result1 = dispatch(person1, say, ['Hello']);
    addLog(`dispatch(person1, say, ['Hello']) = "${result1}"`, 'result');

    dispatch(person2, update, ['Slarty', 200, '1xM']);
    addLog(`After dispatch(): person2 = ${JSON.stringify(person2)}`, 'result');

    // Prototype chain demo
    addLog('', 'info');
    addLog('=== Prototype Chain Demo ===', 'info');

    interface Animal {
      name: string;
      execute: () => string;
    }

    interface Cat extends Animal {
      sleeps?: () => string;
    }

    const animal: Animal = {
      name: 'animal',
      execute: function () { return 'eats'; }
    };

    const dog: Animal = Object.create(animal, {
      name: { value: 'dog', writable: true, enumerable: true, configurable: true }
    });

    const cat: Animal = Object.create(animal, {
      name: { value: 'animal', writable: true, enumerable: true, configurable: true },
      execute: { value: function () { return 'nothing'; }, writable: true, enumerable: true, configurable: true }
    });

    const mimoso: Cat = Object.create(cat, {
      sleeps: { value: function () { return 'sleeping'; }, writable: true, enumerable: true, configurable: true }
    });

    addLog(`dog.name = "${dog.name}"`, 'result');
    addLog(`dog.execute() = "${dog.execute()}"`, 'result');
    addLog(`cat.name = "${cat.name}"`, 'result');
    addLog(`cat.execute() = "${cat.execute()}"`, 'result');
    addLog(`mimoso.name = "${mimoso.name}"`, 'result');
    addLog(`mimoso.execute() = "${mimoso.execute()}"`, 'result');
    addLog(`mimoso.sleeps?.() = "${mimoso.sleeps?.()}"`, 'result');

    // Bind demo
    addLog('', 'info');
    addLog('=== Bind Demo ===', 'info');

    class Hero {
      heroName: string;
      constructor(heroName: string) {
        this.heroName = heroName;
      }
      dialogue() {
        return `I am ${this.heroName}`;
      }
    }

    const batman = new Hero("Batman");
    const robin = batman.dialogue.bind(batman);
    addLog(`robin() = "${robin()}"`, 'result');

    setLogs(newLogs);
  }, []);

  return (
    <div className="practice">
      <Link to="/">← Back to Home</Link>
      <h1>JavaScript Practice</h1>
      <p className="subtitle">Call, Apply, Bind & Prototype Chain</p>

      <div className="practice__console">
        {logs.map((log) => (
          <div key={log.id} className={`log-entry ${log.type}`}>
            {log.message || <br />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Practice;
