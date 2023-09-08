// App.tsx
import React from 'react';
import Feed from './components/Feed';

const App: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Feed />
    </div>
  );
}

export default App;
