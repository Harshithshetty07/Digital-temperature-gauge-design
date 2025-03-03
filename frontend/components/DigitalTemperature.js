'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Thermometer, Droplets, Gauge, Snowflake, Sun, ArrowUp, Crown } from 'lucide-react';
// import AnalogMainPage from '../AnalogGauge/AnalogMainPage';

function DigitalTemperature() {
  const [temp1, setTemp1] = useState(25);
  const [temp2, setTemp2] = useState(40);
  const [temp3, setTemp3] = useState(65);
  const [temp4, setTemp4] = useState(30);
  const [temp5, setTemp5] = useState(50);
  const [temp6, setTemp6] = useState(75);
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update all temperatures simultaneously
      setTemp1(Math.floor(Math.random() * 100));
      setTemp2(Math.floor(Math.random() * 100));
      setTemp3(Math.floor(Math.random() * 100));
      setTemp4(Math.floor(Math.random() * 100));
      setTemp5(Math.floor(Math.random() * 100));
      setTemp6(Math.floor(Math.random() * 100));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Handle scroll event to update scrollbar position
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollPosition(scrollPercentage);
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to get appropriate color based on temperature
  const getTempColor = (temp) => {
    if (temp < 30) return 'text-blue-400';
    if (temp < 60) return 'text-yellow-400';
    return 'text-red-500';
  };

  return (
    <div className="relative h-screen w-full">
      {/* Custom scrollbar container */}
      <div className="absolute right-2 top-4 bottom-4 w-0 bg-gray-200 rounded-full z-10 opacity-70 hover:opacity-100 transition-opacity">
        <div 
          className="w-0 bg-blue-500 rounded-full transition-all duration-200 ease-out"
          style={{ 
            height: `${scrollPosition}%`,
            minHeight: '20px',
            maxHeight: '100%',
            background: 'linear-gradient(to bottom, #3b82f6, #60a5fa)',
            boxShadow: '0 0 8px rgba(59, 130, 246, 0.6)'
          }}
        >
          <div className="w-0 h-0 rounded-full bg-white absolute -top-2 left-0 border-2 border-blue-600"></div>
        </div>
      </div>

      {/* Main content with scrollable area */}
      <div 
        ref={containerRef}
        className="text-black px-4 h-screen w-full overflow-y-auto scrollbar-hide"
        style={{
          scrollbarWidth: 'none', /* Firefox */
          msOverflowStyle: 'none', /* IE and Edge */
        }}
      >
        <div className="bg-blue-500 text-black h-20 w-24 text-xl rounded-2xl flex justify-center items-center font-bold">
          <Crown size={50} className='text-gray-950'/>
        </div>
        
        <div className="grid grid-cols-3 grid-rows-5 gap-4 my-6">
          {/* Circular gauge with liquid fill animation */}
          <div className="col-span-2 row-span-5 bg-blue-600 p-4 rounded-2xl mt-4 h-80 flex flex-col justify-center items-center">
            <div className="w-64 h-64 rounded-full bg-blue-800 relative overflow-hidden flex justify-center items-center">
              <div 
                className="absolute bottom-0 left-0 right-0 bg-blue-300 transition-all duration-1000 ease-in-out"
                style={{ 
                  height: `${temp1}%`, 
                  background: `linear-gradient(to top, #60a5fa, #3b82f6)`,
                  boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
                }}
              ></div>
              <div className="z-10 text-white font-bold text-xl flex items-center gap-2">
                <Droplets className={`${getTempColor(temp1)}`} size={24} />
                {temp1}°C
              </div>
            </div>
            <div className="mt-4 text-xl text-white font-semibold flex items-center gap-2">
              <Thermometer size={30} className="text-white" />
              Temperature One
            </div>
          </div>
          
          {/* Vertical bar gauge */}
          <div className="row-span-4 col-start-3 bg-rose-600 rounded-3xl flex flex-col justify-between items-center p-6">
           

           {/* Analog Guage for pressure 
            {/* <div className=''>
            <AnalogMainPage />
            </div> *
            */}

            <div className="h-48 w-12 bg-rose-800 rounded-full relative overflow-hidden flex flex-col-reverse">
              <div 
                className="bg-rose-300 transition-all duration-1000 ease-in-out w-full rounded-b-full"
                style={{ 
                  height: `${temp2}%`,
                  background: 'linear-gradient(to top, #fb7185, #e11d48)'
                }}
              ></div>
            </div>
            <p className="mt-2 text-white font-semibold text-xl">Pressure One</p>
          </div>
          
          {/* Radial gauge */}
          <div className="col-start-3 row-start-5 bg-orange-600 rounded-xl flex flex-col justify-center items-center p-2">
          <div className="text-white font-bold mb-2 flex items-center gap-2 text-xl">
              <Sun className={getTempColor(temp2)} size={20} />
              {temp2} Pa
            </div>

          </div>
        </div>
        
        <div className="bg-blue-500 text-black h-20 w-24 text-xl rounded-2xl flex justify-center items-center font-bold">
          <Crown size={50} className='text-gray-950'/>
        </div>
        
        <div className="grid grid-cols-3 grid-rows-5 gap-4 my-6">
          {/* Speedometer-style gauge */}
          <div className="col-span-2 row-span-5 bg-blue-600 p-4 rounded-2xl h-80 flex flex-col justify-center items-center">
            <div className="w-64 h-64 rounded-full bg-blue-800 relative overflow-hidden flex justify-center items-center">
              <div 
                className="absolute bottom-0 left-0 right-0 bg-blue-300 transition-all duration-1000 ease-in-out"
                style={{ 
                  height: `${temp1}%`, 
                  background: `linear-gradient(to top, #60a5fa, #3b82f6)`,
                  boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
                }}
              ></div>
              <div className="z-10 text-white font-bold text-xl flex items-center gap-2">
                <Droplets className={`${getTempColor(temp1)}`} size={24} />
                {temp1}°C
              </div>
            </div>
            <p className="mt-4 text-white text-xl font-semibold flex items-center gap-2">
              <Thermometer size={20} className="text-white" />
              Temperature Two
            </p>
          </div>
          
          {/* Digital gauge with segments */}
          <div className="row-span-4 col-start-3 bg-rose-600 rounded-3xl flex flex-col justify-between items-center p-4">
            <p className="text-white font-semibold flex items-center gap-1">
              <Snowflake size={18} className={getTempColor(temp5)} />
              {temp5} Pa
            </p>
            <div className="flex flex-col items-center justify-center h-full">
              {[5, 4, 3, 2, 1].map((segment) => (
                <div 
                  key={segment}
                  className="w-16 h-6 my-1 rounded-md transition-all duration-1000 ease-in-out"
                  style={{ 
                    backgroundColor: temp5 >= segment * 20 ? '#ef4444' : '#fecdd3',
                    opacity: temp5 >= segment * 20 ? 1 : 0.3
                  }}
                ></div>
              ))}
            </div>
            <div className="text-white font-bold text-xl">Pressure Two</div>
          </div>

          
          
          {/* Minimal dot gauge */}
          <div className="col-start-3 row-start-5 bg-orange-600 rounded-xl flex justify-center items-center p-2">
            <div className="flex items-center w-full justify-between">
              <div 
                className="h-3 w-3 rounded-full transition-all duration-300 ease-in-out"
                style={{ backgroundColor: temp6 > 20 ? '#fef3c7' : '#d1d5db' }}
              ></div>
              <div 
                className="h-4 w-4 rounded-full transition-all duration-300 ease-in-out"
                style={{ backgroundColor: temp6 > 40 ? '#fde68a' : '#d1d5db' }}
              ></div>
              <div 
                className="h-5 w-5 rounded-full transition-all duration-300 ease-in-out"
                style={{ backgroundColor: temp6 > 60 ? '#fcd34d' : '#d1d5db' }}
              ></div>
              <div 
                className="h-6 w-6 rounded-full transition-all duration-300 ease-in-out flex justify-center items-center relative"
                style={{ backgroundColor: temp6 > 80 ? '#f59e0b' : '#d1d5db' }}
              >
                <span className="text-xs text-white font-bold">{temp6}°</span>
                <Thermometer size={12} className="absolute -top-3 -right-2 text-white" />
              </div>
            </div>
          </div>
        </div>
        
       
      </div>
    </div>
  );
}

export default DigitalTemperature;