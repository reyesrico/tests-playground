import React from 'react';
import { Link } from 'react-router-dom';

interface TestLink {
  path: string;
  name: string;
  description: string;
}

const tests: TestLink[] = [
  { path: '/test', name: 'Test', description: 'Async Promise Demo' },
  { path: '/test2', name: 'Test2', description: 'Cipher Encoder (Class Component)' },
  { path: '/test3', name: 'Test3', description: 'Algorithm Tests & Data Structures' },
  { path: '/test4', name: 'Test4', description: 'Movie Filter with Loading State' },
  { path: '/practice', name: 'Practice', description: 'JavaScript Practice Code' },
  { path: '/mypromise', name: 'MyPromise', description: 'Custom Promise Implementation' },
];

const Home: React.FC = () => {
  return (
    <div className="home">
      <h2>Welcome to Tests Playground</h2>
      <p>A collection of React test components and JavaScript experiments.</p>
      
      <div className="test-list">
        <h3>Available Tests</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tests.map((test) => (
            <li key={test.path} style={{ 
              marginBottom: '15px', 
              padding: '15px', 
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <Link to={test.path} style={{ 
                fontSize: '1.2rem', 
                fontWeight: 'bold',
                color: '#282c34',
                textDecoration: 'none'
              }}>
                {test.name}
              </Link>
              <p style={{ margin: '5px 0 0 0', color: '#666' }}>
                {test.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
