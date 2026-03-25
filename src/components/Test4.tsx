import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from './shared/Loading';
import './Test4.scss';

interface Movie {
  id: number;
  title: string;
}

const allMovies: Movie[] = [
  { id: 1, title: "one" },
  { id: 2, title: "two" },
  { id: 3, title: "two" },
  { id: 4, title: "four" },
];

const Test4: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>(allMovies);
  const [loading, setLoading] = useState<boolean>(false);

  const getMoviesFiltered = async (text: string): Promise<Movie[]> => {
    return new Promise<Movie[]>((resolve) => {
      setTimeout(() => {
        const filteredMovies = allMovies.filter((m: Movie) => {
          return m.title.includes(text);
        });
        resolve(filteredMovies);
      }, 500);
    });
  };

  const setFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    if (text) {
      setLoading(true);
      getMoviesFiltered(text)
        .then(res => setMovies(res))
        .finally(() => setLoading(false));
    } else {
      setMovies(allMovies);
      setLoading(false);
    }
  };

  return (
    <div className="test4">
      <Link to="/">← Back to Home</Link>
      <h1>Movie Filter Demo</h1>
      <p className="subtitle">Microsoft Tech Screen Exercise</p>
      <hr />
      
      <div className="test4__search">
        <input 
          type="text" 
          onChange={setFilter} 
          placeholder="Type to filter movies..."
        />
      </div>

      {loading && <Loading size="md" message="Loading..." />}
      
      {!loading && (
        <ul className="test4__list">
          {movies.map((m: Movie) => (
            <li key={m.id}>{m.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Test4;
