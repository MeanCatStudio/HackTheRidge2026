import Image from "next/image";
import Link from "next/link";
import InteractiveScrollingCards, { CardData } from "./components/InteractiveScrollingCards";
import SponsorsTitle from "./components/SponsorsTitle";
import SponsorsGrid from "./components/SponsorsGrid";
import AnimatedNavbar from "./components/AnimatedNavbar";
import Footer from "./components/Footer";

// Card data for the second page
const CARDS_DATA: CardData[] = [
  {
    id: 1,
    headerTitle: 'ABOUT HACK THE RIDGE.',
    title: 'Where Innovation Meets Community',
    content: 'Join 200+ students, developers, and creators for an epic 24-hour journey of building, learning, and connecting. Transform your ideas into reality.',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
    bgColor: 'bg-card-green',
    textColor: 'text-white',
  },
  {
    id: 2,
    headerTitle: 'HISTORY',
    title: '500+ Past Participants',
    content: 'Since 2019, we\'ve grown from 50 to 200+ hackers annually, creating lasting impact.',
    imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop',
    bgColor: 'bg-card-brown',
    textColor: 'text-white',
  },
  {
    id: 3,
    headerTitle: 'LAST YEAR',
    title: '48 Projects Built',
    content: 'From AI solutions to mobile apps, our 2024 hackers delivered incredible innovations.',
    imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop',
    bgColor: 'bg-card-gray',
    textColor: 'text-white',
  },
  {
    id: 4,
    headerTitle: '2025',
    title: 'Ready to Build?',
    content: 'Join us for our biggest event yet. Registration opens soon.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop',
    bgColor: 'bg-card-orange',
    textColor: 'text-white',
  },
];

export default function Home() {
  return (
    <div className="bg-app-bg">
      {/* Animated Navbar - Fixed Position */}
      <AnimatedNavbar />
      
      {/* First Page - Landing Section */}
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#2e2e2e' }}>
        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center relative overflow-hidden">
          <div className="text-center relative z-10">
            {/* Main Title */}
            <h1
              className="text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] xl:text-[13rem] font-bold text-white leading-none whitespace-nowrap"
              style={{
                fontFamily: 'Sacco, Arial, sans-serif',
                letterSpacing: '0.1em'
              }}
            >
              HACK THE RIDGE
            </h1>
          </div>
          
          {/* Wolf Logo positioned at bottom with 1/4 cut off - fully opaque */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/4 z-20">
            <Image
              src="/logo.png"
              alt="Wolf Logo"
              width={450}
              height={450}
              className="opacity-100"
              priority
            />
          </div>

          {/* Animated Corner Images - Flying from bottom center to fixed corner positions */}
          
          {/* Top Left Corner */}
          <div
            className="absolute top-16 left-16 z-30"
            style={{
              transform: 'translate(-50vw, 100vh)',
              animation: 'flyToTopLeft 2s ease-out forwards',
              animationDelay: '0.5s'
            }}
          >
            <Image
              src="https://picsum.photos/120/120?random=1"
              alt="Top left decoration"
              width={120}
              height={120}
              className="shadow-lg"
            />
          </div>

          {/* Top Right Corner */}
          <div
            className="absolute top-20 right-20 z-30"
            style={{
              transform: 'translate(50vw, 100vh)',
              animation: 'flyToTopRight 2.2s ease-out forwards',
              animationDelay: '0.8s'
            }}
          >
            <Image
              src="https://picsum.photos/100/100?random=2"
              alt="Top right decoration"
              width={100}
              height={100}
              className="shadow-lg"
            />
          </div>

          {/* Bottom Left Corner */}
          <div
            className="absolute bottom-24 left-12 z-30"
            style={{
              transform: 'translate(-50vw, 100vh)',
              animation: 'flyToBottomLeft 1.8s ease-out forwards',
              animationDelay: '1.1s'
            }}
          >
            <Image
              src="https://picsum.photos/140/140?random=3"
              alt="Bottom left decoration"
              width={140}
              height={140}
              className="shadow-lg"
            />
          </div>

          {/* Bottom Right Corner */}
          <div
            className="absolute bottom-16 right-16 z-30"
            style={{
              transform: 'translate(50vw, 100vh)',
              animation: 'flyToBottomRight 2.1s ease-out forwards',
              animationDelay: '1.4s'
            }}
          >
            <Image
              src="https://picsum.photos/110/110?random=4"
              alt="Bottom right decoration"
              width={110}
              height={110}
              className="shadow-lg"
            />
          </div>
        </main>
      </div>

      {/* Second Page - Interactive Scrolling Cards */}
      <div id="about">
        <InteractiveScrollingCards cards={CARDS_DATA} />
      </div>

      {/* Third Page - Sponsors Section */}
      <div id="sponsors" className="min-h-screen" style={{ backgroundColor: '#2e2e2e' }}>
        <SponsorsTitle />
        <SponsorsGrid />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
