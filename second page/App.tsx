import React from 'react';
import InteractiveScrollingCards, { CardData } from './components/InteractiveScrollingCards';

// The data for the cards. You can customize this array to change the content.
// Note: The bgColor and textColor properties should correspond to classes
// defined in your tailwind.config.js or the script in your index.html.
const CARDS_DATA: CardData[] = [
  {
    id: 1,
    headerTitle: 'ABOUT HACK THE RIDGE.',
    bgColor: 'bg-card-green',
    textColor: 'text-white',
  },
  {
    id: 2,
    headerTitle: 'HISTORY',
    bgColor: 'bg-card-brown',
    textColor: 'text-white',
  },
  {
    id: 3,
    headerTitle: 'LAST YEAR',
    bgColor: 'bg-card-gray',
    textColor: 'text-gray-800',
  },
  {
    id: 4,
    headerTitle: '2025',
    title: '2025',
    content: 'Lorem ipsum dolor sit amet.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop',
    bgColor: 'bg-card-orange',
    textColor: 'text-white',
  },
];

const App: React.FC = () => {
  return (
    <main className="bg-app-bg text-white min-h-screen font-sans">
      {/* 
        To use the component, simply import it and pass your card data.
        The component is self-contained and handles all the scrolling logic.
      */}
      <InteractiveScrollingCards cards={CARDS_DATA} />
    </main>
  );
};

export default App;