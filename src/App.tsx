import React from 'react';
import { Breadcrumbs } from './components/Breadcrumbs';

function App() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Level1', href: '/level1' },
    { label: 'Level2', href: '/level1/level2' },
    { label: 'Level3', href: '/level1/level2/level3' },
    { label: 'Level4', href: '/level1/level2/level3/level4' },
    { label: 'Level5', href: '/level1/level2/level3/level4/level5' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <Breadcrumbs 
            items={breadcrumbItems} 
            itemsBefore={1}  // Show 2 items before dots
            itemsAfter={2}   // Show 1 item after dots
          />
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            React Tools
          </h1>
          <p className="text-gray-600">
            Example content to demonstrate the breadcrumbs navigation above.
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
