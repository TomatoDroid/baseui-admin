import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center gap-2">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button className="btn" onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      <button className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3">Submit</button>
    </div>
  );
}
