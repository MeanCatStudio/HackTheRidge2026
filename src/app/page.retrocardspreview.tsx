"use client";

import React from 'react';
import InteractiveScrollingCards, { CardData } from './components/InteractiveScrollingCards';

// Enhanced card data with structured sentences for better layout
const CARDS_DATA: CardData[] = [
  {
    id: 1,
    headerTitle: 'ABOUT HACK THE RIDGE.',
    title: 'Where Innovation Meets Community',
    sentences: [
      'Join 200+ students, developers, and creators for an epic 24-hour journey.',
      'Build, learn, and connect with like-minded innovators from across the region.',
      'Transform your wildest ideas into reality with cutting-edge tools and mentorship.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
    bgColor: 'bg-card-green',
    textColor: 'text-white',
  },
  {
    id: 2,
    headerTitle: 'HISTORY',
    title: '500+ Past Participants',
    sentences: [
      'Since 2019, we\'ve grown from 50 to 200+ hackers annually.',
      'Our community has built over 150 projects spanning AI, web, mobile, and IoT.',
      'Five years of fostering innovation and creating lasting connections in tech.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop',
    bgColor: 'bg-card-brown',
    textColor: 'text-white',
  },
  {
    id: 3,
    headerTitle: 'LAST YEAR',
    title: '48 Projects Built',
    sentences: [
      'From AI-powered solutions to innovative mobile apps, 2024 was our biggest year yet.',
      'Teams competed across six categories with $10K+ in prizes and sponsor opportunities.',
      'The energy was electric, the projects were groundbreaking, and the community stronger than ever.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop',
    bgColor: 'bg-card-gray',
    textColor: 'text-white',
  },
  {
    id: 4,
    headerTitle: '2025',
    title: 'Ready to Build?',
    sentences: [
      'Join us for our biggest event yet with more prizes, sponsors, and opportunities.',
      'Registration opens soon - be the first to secure your spot in this epic hackathon.',
      'Get ready to push boundaries, make connections, and create something extraordinary.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop',
    bgColor: 'bg-card-orange',
    textColor: 'text-white',
  },
];

export default function RetroCardsPreview() {
  return (
    <div className="bg-app-bg min-h-screen">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-white text-center" style={{ fontFamily: 'Sacco, Arial, sans-serif' }}>
            RETRO CARD LAYOUTS PREVIEW
          </h1>
          <p className="text-center text-white/70 text-sm mt-1">
            Fresh, retro-styled card designs with space-aware layouts
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20">
        <InteractiveScrollingCards cards={CARDS_DATA} />
      </div>

      {/* Footer Info */}
      <div className="bg-black/90 text-white p-8 text-center">
        <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'Sacco, Arial, sans-serif' }}>
          NEW CARD FEATURES
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="font-bold mb-2">Card 1 - Full Hero</h3>
            <p className="text-sm text-white/80">Full screen layout with retro grid background, interactive feature cards, and dramatic typography</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="font-bold mb-2">Card 2 - Timeline</h3>
            <p className="text-sm text-white/80">History timeline with polaroid-style image, animated metrics, and circuit pattern background</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="font-bold mb-2">Card 3 - Showcase</h3>
            <p className="text-sm text-white/80">Retro TV monitor frame, compact metrics grid, and project category pills</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="font-bold mb-2">Card 4 - Call to Action</h3>
            <p className="text-sm text-white/80">Computer monitor styling, countdown display, and prominent CTA with social proof</p>
          </div>
        </div>
      </div>
    </div>
  );
}