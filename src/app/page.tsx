import Image from "next/image";
import Link from "next/link";
import InteractiveScrollingCards, { CardData } from "./components/InteractiveScrollingCards";
import SponsorsTitle from "./components/SponsorsTitle";
import SponsorsGrid from "./components/SponsorsGrid";
import GradientSection from "./components/GradientSection";
import TeamSection from "./components/TeamSection";
import AnimatedNavbar from "./components/AnimatedNavbar";
import Footer from "./components/Footer";

// Card data for the second page
const CARDS_DATA: CardData[] = [
  {
    id: 1,
    headerTitle: 'ABOUT HTR.',
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
    title: 'Healthcare Revolution',
    content: '2024 marked our most impactful year as 300+ innovators pushed healthcare boundaries with cutting-edge AI solutions.',
    imageUrl: 'https://images.unsplash.com/photo-1576671081837-49000212a370?q=80&w=2070&auto=format&fit=crop',
    bgColor: 'bg-card-gray',
    textColor: 'text-white',
  },
  {
    id: 4,
    headerTitle: '2025',
    title: 'Ready to Build?',
    content: 'Join us for our biggest event yet. Registration opens soon.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop',
    bgColor: 'bg-app-bg',
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
          <div className="text-center relative z-10 px-4">
            {/* Main Title */}
            <h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[11rem] 2xl:text-[13rem] font-bold text-white leading-none"
              style={{
                fontFamily: 'Sacco, Arial, sans-serif',
                letterSpacing: '0.05em'
              }}
            >
              <span className="block sm:inline">HACK THE</span>
              <span className="block sm:inline sm:ml-4">RIDGE</span>
            </h1>
          </div>
          
          {/* Wolf Logo positioned at bottom with 1/4 cut off - maintaining aspect ratio */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/4 z-20">
            <Image
              src="/logo.png"
              alt="Wolf Logo"
              width={400}
              height={400}
              className="opacity-100 object-contain sm:w-[450px] sm:h-[450px] md:w-[500px] md:h-[500px] lg:w-[550px] lg:h-[550px] xl:w-[600px] xl:h-[600px]"
              priority
            />
          </div>

          {/* Animated Corner Images - Flying from bottom center to fixed corner positions */}
          
          {/* Top Left - Moved closer to center vertically */}
          <div
            className="absolute top-24 left-36 z-30 hidden sm:block"
            style={{
              transform: 'translate(-50vw, 100vh)',
              animation: 'flyToTopLeft 2s ease-out forwards',
              animationDelay: '0.5s'
            }}
          >
            <Image
              src="https://picsum.photos/120/120?random=1"
              alt="Top left decoration"
              width={80}
              height={80}
              className="shadow-lg sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px]"
            />
          </div>

          {/* Top Right - Moved closer to center vertically */}
          <div
            className="absolute top-32 right-36 z-30 hidden sm:block"
            style={{
              transform: 'translate(50vw, 100vh)',
              animation: 'flyToTopRight 2.2s ease-out forwards',
              animationDelay: '0.8s'
            }}
          >
            <Image
              src="https://picsum.photos/100/100?random=2"
              alt="Top right decoration"
              width={70}
              height={70}
              className="shadow-lg sm:w-[80px] sm:h-[80px] md:w-[100px] md:h-[100px]"
            />
          </div>

          {/* Bottom Left - Moved closer to center vertically */}
          <div
            className="absolute bottom-36 left-36 z-30 hidden sm:block"
            style={{
              transform: 'translate(-50vw, 100vh)',
              animation: 'flyToBottomLeft 1.8s ease-out forwards',
              animationDelay: '1.1s'
            }}
          >
            <Image
              src="https://picsum.photos/140/140?random=3"
              alt="Bottom left decoration"
              width={100}
              height={100}
              className="shadow-lg sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px]"
            />
          </div>

          {/* Bottom Right - Moved closer to center vertically */}
          <div
            className="absolute bottom-32 right-36 z-30 hidden sm:block"
            style={{
              transform: 'translate(50vw, 100vh)',
              animation: 'flyToBottomRight 2.1s ease-out forwards',
              animationDelay: '1.4s'
            }}
          >
            <Image
              src="https://picsum.photos/110/110?random=4"
              alt="Bottom right decoration"
              width={80}
              height={80}
              className="shadow-lg sm:w-[90px] sm:h-[90px] md:w-[110px] md:h-[110px]"
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

      {/* Gradient Section */}
      <GradientSection />
      
      {/* Team Section */}
      <TeamSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
