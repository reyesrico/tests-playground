import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Test3.scss';

interface TestResult {
  description: string;
  passed: boolean;
}

class Node {
  private _name: string;
  private _nodes: Node[];
  private _parent: Node | undefined;

  static from(...names: string[]) {
    return [...names].map(name => ({ name }));
  }

  constructor({ name, nodes, parent }: { name: string; nodes?: { name: string; nodes?: any[] }[]; parent?: Node }) {
    this._name = name;
    this._nodes = [];
    this._parent = parent;
    if (nodes) {
      this.nodes(nodes);
    }
  }

  nodes(nodes?: { name: string; nodes?: any[] }[]): Node[] {
    if (nodes != null) {
      this._nodes = nodes.map(
        ({ name, nodes }) => new Node({ name, nodes, parent: this })
      );
    }
    return this._nodes || [];
  }

  parent(): Node | undefined {
    return this._parent;
  }

  find(query: string): Node[] {
    const nodesFound: Node[] = [];
    const queryNodes = query.split('>').map(s => s.trim()).reverse();
    const nameToBeFound = queryNodes.shift()!;

    this.findTemp(nameToBeFound, nodesFound);

    const nodesFound2 = nodesFound.filter(found => {
      let node: Node | undefined = found;
      return queryNodes.reverse().every(name => {
        const tmp = node;
        node = node?.parent();
        return tmp?.name() === name;
      });
    });

    return nodesFound2;
  }

  findTemp(nameToBeFound: string, nodesFound: Node[]): void {
    this.nodes().forEach(node => {
      if (node.name() === nameToBeFound) {
        nodesFound.push(node);
      }

      if (node.nodes().length > 0) {
        node.findTemp(nameToBeFound, nodesFound);
      }
    });
  }

  name(): string {
    return this._name;
  }
}

const Test3: React.FC = () => {
  const [results, setResults] = useState<TestResult[]>([]);
  const [running, setRunning] = useState(false);

  const runTests = () => {
    setRunning(true);
    const testResults: TestResult[] = [];

    // Tree definition
    const root = new Node({ name: 'root' });
    const [a1, , , a4] = root.nodes(Node.from('a', 'a', 'a', 'a'));
    const [b1] = a1.nodes(Node.from('b'));
    b1.nodes(Node.from('c'));
    const [b2] = a4.nodes(Node.from('b'));
    const [c2, c3] = b2.nodes(Node.from('c', 'c'));
    const [d1] = c2.nodes(Node.from('d'));
    d1.nodes(Node.from('e', 'f', 'a'));
    c3.nodes(Node.from('d'));

    const test = (node: Node, selector: string, length: number, description: string) => {
      const found = node.find(selector);
      testResults.push({
        description,
        passed: found.length === length
      });
    };

    // Part 2 - Test cases
    test(root, 'c > d', 2, 'root find c > d');
    test(root, 'a > b > c > d > e', 1, 'root find a > b > c > d > e');
    test(root, 'b > c > d > e', 1, 'root find b > c > d > e');
    test(root, 'b > c', 3, 'root find b > c');
    test(root, 'a > c > d', 0, 'root find a > c > d');
    test(root, '  b  >  c  ', 3, 'root find   b  >  c  ');

    setResults(testResults);
    setRunning(false);
  };

  useEffect(() => {
    runTests();
  }, []);

  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;

  return (
    <div className="test3">
      <Link to="/">← Back to Home</Link>
      <h1>Algorithm Tests - Tree Node Selector</h1>
      
      <div className="test3__summary">
        <span className="passed">Passed: {passed}</span>
        <span className="failed">Failed: {failed}</span>
        <button onClick={runTests} disabled={running}>
          {running ? 'Running...' : 'Re-run Tests'}
        </button>
      </div>

      <div className="test3__results">
        {results.map((result, index) => (
          <div 
            key={index} 
            className={`test3__result ${result.passed ? 'passed' : 'failed'}`}
          >
            <span className="icon">{result.passed ? '✓' : '✗'}</span>
            <span className="description">{result.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Test3;
