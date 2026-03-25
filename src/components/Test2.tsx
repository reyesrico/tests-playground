import React from 'react';
import { Link } from 'react-router-dom';
import './Test2.scss';

interface Test2State {
  keywordInput: string;
  values: number[];
  dictionary: Record<string, string>;
  dictionaryIndex: Record<string, number>;
  textToCypher: string;
  charSelected: string;
}

class Test2 extends React.Component<object, Test2State> {
  constructor(props: object) {
    super(props);
    this.state = {
      keywordInput: '',
      values: [],
      dictionary: {},
      dictionaryIndex: {},
      textToCypher: '',
      charSelected: ''
    };
  }

  componentDidUpdate(prevProps: object, prevState: Test2State) {
    if (prevState.keywordInput !== this.state.keywordInput) {
      this.renderSourceText();
    }
  }

  renderKeywordInput() {
    let keywordInput = '';
    return (
      <div className="app__keyword">
        <h2 className="app__title">Keyword</h2>
        <input
          className="app__input"
          type="text"
          onChange={event => event && (keywordInput = event.target.value)}
        />
        <button onClick={event => event && this.setState({ keywordInput: keywordInput.toUpperCase() })}>
          Update
        </button>
      </div>
    );
  }

  renderTable() {
    const { keywordInput, charSelected, dictionaryIndex, values } = this.state;
    const isEmpty = Object.keys(dictionaryIndex).length === 0;

    return (
      <table className="app__table">
        <thead>
          <tr>
            {keywordInput.split('').map((c, i) => {
              const index = !isEmpty ? dictionaryIndex[charSelected] : -1;
              const className = index === i ? "app__table-head-selected" : "app__table-head";
              return <td className={className} key={i}>{c}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            {values.map((v, i) => {
              const index = !isEmpty ? dictionaryIndex[charSelected] : -1;
              const className = index === i ? "app__table-body-selected" : "app__table-body";
              return <td className={className} key={i}>{v}</td>;
            })}
          </tr>
        </tbody>
      </table>
    );
  }

  renderSourceText() {
    const { keywordInput } = this.state;

    const size = keywordInput.length;
    let token = 0;
    let dictionary: Record<string, string> = {};
    let dictionaryIndex: Record<string, number> = {};
    const init = 'A'.charCodeAt(0);
    const end = 'Z'.charCodeAt(0);
    const range = end - init;
    const values = keywordInput.split('').map(c => c.charCodeAt(0) - 'A'.charCodeAt(0));

    for (let i = 0; i <= range; i++) {
      let offset = values[token] + i;
      offset = offset <= range ? offset : offset - range - 1;

      dictionary = {
        ...dictionary,
        [String.fromCharCode(i + init)]: String.fromCharCode(offset + init)
      };

      dictionaryIndex = {
        ...dictionaryIndex,
        [String.fromCharCode(i + init)]: token
      };

      token = token < size - 1 ? token + 1 : 0;
    }

    this.setState({ dictionary, dictionaryIndex, values, charSelected: '' });
  }

  renderSourceTable() {
    const { dictionary } = this.state;

    return (
      <table className="app__table">
        <thead>
          <tr>
            {Object.keys(dictionary).map((c, i) => (
              <td className="app__table-head" key={i}>
                <button onClick={event => event && this.setState({ charSelected: c })}>{c}</button>
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.values(dictionary).map((v, i) => (
              <td className="app__table-body" key={i}>{v}</td>
            ))}
          </tr>
        </tbody>
      </table>
    );
  }

  renderSourceDisplay() {
    return (
      <div className="app__display">
        <input
          className="app__input"
          type="text"
          onChange={event => event && this.setState({ textToCypher: event.target.value.toUpperCase() })}
          value={this.state.textToCypher}
        />
        <button onClick={event => event && this.setState({ textToCypher: '' })}>Clear</button>
      </div>
    );
  }

  renderCypherText() {
    const { textToCypher, dictionary } = this.state;
    const cypherText = textToCypher.split('').map(c => dictionary[c]).join('');

    return (
      <div className="app__cypher">
        <h2 className="app__title">Cypher Text</h2>
        <input disabled={true} type="text" value={cypherText} />
      </div>
    );
  }

  render() {
    const { keywordInput, dictionary, textToCypher } = this.state;
    const keys = Object.keys(dictionary);

    return (
      <div className="test2">
        <Link to="/">← Back to Home</Link>
        <h1>Cipher Encoder</h1>
        <div className="app">
          {this.renderKeywordInput()}
          {keywordInput && this.renderTable()}
          {keys.length > 0 && this.renderSourceDisplay()}
          {keys.length > 0 && this.renderSourceTable()}
          {textToCypher && this.renderCypherText()}
        </div>
      </div>
    );
  }
}

export default Test2;
