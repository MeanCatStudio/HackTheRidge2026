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
    <div className="bg-app-bg w-full min-w-full">
      {/* Animated Navbar - Fixed Position */}
      <AnimatedNavbar />
      
      {/* First Page - Landing Section */}
      <div className="min-h-screen flex flex-col w-full" style={{ backgroundColor: '#2e2e2e' }}>
        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center relative overflow-hidden px-4 sm:px-6 md:px-8">
          <div className="text-center relative z-10">
            {/* Main Title */}
            <h1
              className="text-8xl sm:text-7xl md:text-9xl lg:text-[11rem] xl:text-[12rem] 2xl:text-[13rem] font-bold text-white leading-none px-2 sm:px-4"
              style={{
                fontFamily: 'Sacco, Arial, sans-serif',
                letterSpacing: '0.05em'
              }}
            >
              <span className="block sm:inline">HACK THE</span>
              <span className="block sm:inline sm:ml-2 md:ml-4">RIDGE</span>
            </h1>
          </div>
          
          {/* Wolf Logo positioned at bottom with 1/4 cut off - maintaining aspect ratio */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[35%] sm:translate-y-1/4 z-20">
            <Image
              src="/logo.png"
              alt="Wolf Logo"
              width={400}
              height={400}
              className="w-[500px] h-[500px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] xl:w-[550px] xl:h-[550px] 2xl:w-[600px] 2xl:h-[600px] opacity-100 object-contain"
              priority
            />
          </div>

          {/* Animated Corner Images - Flying from bottom center to fixed corner positions */}
          
          {/* Top Left - Moved closer to center vertically */}
          <div
            className="absolute top-16 sm:top-20 md:top-24 left-8 sm:left-20 md:left-36 z-30 hidden sm:block"
            style={{
              transform: 'translate(-50vw, 100vh)',
              animation: 'flyToTopLeft 2s ease-out forwards',
              animationDelay: '0.5s'
            }}
          >
            <Image
              src="/homepage/bubble.svg"
              alt="Top left decoration"
              width={100}
              height={100}
              className="w-[80px] h-[80px] sm:w-[90px] sm:h-[90px] md:w-[120px] md:h-[120px] lg:w-[150px] lg:h-[150px] bg-transparent"
            />
          </div>

          {/* Top Right - Moved closer to center vertically */}
          <div
            className="absolute top-20 sm:top-24 md:top-32 right-8 sm:right-20 md:right-36 z-30 hidden sm:block"
            style={{
              transform: 'translate(50vw, 100vh)',
              animation: 'flyToTopRight 2.2s ease-out forwards',
              animationDelay: '0.8s'
            }}
          >
            <Image
              src="/homepage/cloud.svg"
              alt="Top right decoration"
              width={90}
              height={90}
              className="w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] md:w-[110px] md:h-[110px] lg:w-[130px] lg:h-[130px] bg-transparent"
            />
          </div>

          {/* Bottom Left - Moved slightly closer to the bottom-left corner */}
          <div
            className="absolute bottom-20 sm:bottom-24 md:bottom-25 left-4 sm:left-16 md:left-32 z-30 hidden sm:block"
            style={{
              transform: 'translate(-50vw, 100vh)',
              animation: 'flyToBottomLeft 1.8s ease-out forwards',
              animationDelay: '1.1s'
            }}
          >
            <Image
              src="/homepage/headphones.svg"
              alt="Bottom left decoration"
              width={140}
              height={140}
              className="w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] md:w-[150px] md:h-[150px] lg:w-[180px] lg:h-[180px] bg-transparent -rotate-45"
            />
          </div>

          {/* Bottom Right - Moved closer to center vertically */}
          <div
            className="absolute bottom-16 sm:bottom-24 md:bottom-32 right-8 sm:right-20 md:right-36 z-30 hidden sm:block"
            style={{
              transform: 'translate(50vw, 100vh)',
              animation: 'flyToBottomRight 2.1s ease-out forwards',
              animationDelay: '1.4s'
            }}
          >
            <Image
              src="/homepage/usb.svg"
              alt="Bottom right decoration"
              width={100}
              height={100}
              className="w-[80px] h-[80px] sm:w-[90px] sm:h-[90px] md:w-[120px] md:h-[120px] lg:w-[150px] lg:h-[150px] bg-transparent rotate-20"
            />
          </div>
        </main>
      </div>

      {/* Second Page - Interactive Scrolling Cards */}
      <div id="about" className="w-full">
        <InteractiveScrollingCards cards={CARDS_DATA} />
      </div>

      {/* Third Page - Sponsors Section */}
      <div id="sponsors" className="min-h-screen w-full" style={{ backgroundColor: '#2e2e2e' }}>
        <SponsorsTitle />
        <SponsorsGrid />
      </div>

      {/* Soft shadow transition between Sponsors and Team */}
      <div aria-hidden className="relative w-full h-10 sm:h-14 overflow-visible">
        <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-black/25 via-black/10 to-transparent blur-sm opacity-80" />
      </div>

      {/* Team Section */}
      <div className="w-full">
        <TeamSection />
      </div>

      {/* Gradient Section */}
      <div className="w-full">
        <GradientSection />
      </div>
      

      {/* Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}
