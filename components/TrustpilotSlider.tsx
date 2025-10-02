'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const TrustpilotSlider = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoverSide, setHoverSide] = useState<'left' | 'right' | null>(null);
  const [isHomePage, setIsHomePage] = useState(false);

  useEffect(() => {
    // Check if we're on the home page
    const checkHomePage = () => {
      setIsHomePage(window.location.pathname === '/');
    };
    
    checkHomePage();
    window.addEventListener('popstate', checkHomePage);
    
    return () => window.removeEventListener('popstate', checkHomePage);
  }, []);

  useEffect(() => {
    if (!isHomePage) return;

    const handleMouseMove = (e: MouseEvent) => {
      const windowWidth = window.innerWidth;
      const hoverThreshold = 80; // 80px from the edge for better UX
      
      // Check if mouse is near left edge
      if (e.clientX <= hoverThreshold) {
        setHoverSide('left');
        setIsVisible(true);
      }
      // Check if mouse is near right edge
      else if (e.clientX >= windowWidth - hoverThreshold) {
        setHoverSide('right');
        setIsVisible(true);
      }
      // Mouse is not near edges
      else {
        setIsVisible(false);
        setHoverSide(null);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setHoverSide(null);
    };

    // Add event listeners with throttling for better performance
    let timeoutId: NodeJS.Timeout;
    const throttledMouseMove = (e: MouseEvent) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => handleMouseMove(e), 16); // ~60fps
    };

    document.addEventListener('mousemove', throttledMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', throttledMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timeoutId);
    };
  }, [isHomePage]);

  const handleTrustpilotClick = () => {
    window.open('https://www.trustpilot.com/review/mtumrah.com', '_blank', 'noopener,noreferrer');
  };

  // Don't render if not on home page
  if (!isHomePage) return null;

  return (
    <>
      {/* Left Side Slider */}
      {hoverSide === 'left' && (
        <div
          className={`fixed left-0 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-300 ease-in-out ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
          }`}
          style={{
            transitionDelay: isVisible ? '0ms' : '100ms'
          }}
        >
          <button
            onClick={handleTrustpilotClick}
            className="bg-white hover:bg-gray-50 shadow-lg rounded-r-lg p-3 flex items-center space-x-2 transition-all duration-200 hover:shadow-xl group border border-gray-200"
            aria-label="View our reviews on Trustpilot"
          >
            <Image
              src="/images/trustpilot_star.png"
              alt="Trustpilot rating"
              width={32}
              height={32}
              className="transition-transform duration-200 group-hover:scale-110"
            />
            <div className="flex flex-col items-start">
              <span className="text-xs font-semibold text-gray-800">Trustpilot</span>
              <span className="text-xs text-gray-600">Reviews</span>
            </div>
            <div className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>
      )}

      {/* Right Side Slider */}
      {hoverSide === 'right' && (
        <div
          className={`fixed right-0 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-300 ease-in-out ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}
          style={{
            transitionDelay: isVisible ? '0ms' : '100ms'
          }}
        >
          <button
            onClick={handleTrustpilotClick}
            className="bg-white hover:bg-gray-50 shadow-lg rounded-l-lg p-3 flex items-center space-x-2 transition-all duration-200 hover:shadow-xl group border border-gray-200"
            aria-label="View our reviews on Trustpilot"
          >
            <div className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs font-semibold text-gray-800">Trustpilot</span>
              <span className="text-xs text-gray-600">Reviews</span>
            </div>
            <Image
              src="/images/trustpilot_star.png"
              alt="Trustpilot rating"
              width={32}
              height={32}
              className="transition-transform duration-200 group-hover:scale-110"
            />
          </button>
        </div>
      )}
    </>
  );
};

export default TrustpilotSlider;
