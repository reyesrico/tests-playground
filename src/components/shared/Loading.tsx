import React from 'react';
import './Loading.scss';

interface LoadingProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Loading: React.FC<LoadingProps> = ({ message, size = 'md' }) => {
  return (
    <div className={`loading loading--${size}`}>
      <div className="loading-spinner" />
      {message && <span>{message}</span>}
    </div>
  );
};

export default Loading;
