"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { IconSpeakerphone } from '@tabler/icons-react';
import { db } from '../app/firebaseConfig'; // Import your firebase configuration
import { collection, getDocs } from 'firebase/firestore';
import RevealOnScroll from './Revelonscroll';

// Video item interface
interface VideoItem {
  id: string;
  videoUrl: string;
}

// Testimonial and Client Video Combined Component
const ClientVideoSection: React.FC = () => {
  const [videoItems, setVideoItems] = useState<VideoItem[]>([]);
  const [unmutedIndex, setUnmutedIndex] = useState<number | null>(null); // State to track unmuted video index

  // Fetch video URLs from Firebase
  useEffect(() => {
    const fetchVideos = async () => {
      const videoCollection = collection(db, 'video_testimonials'); // Ensure this matches your Firestore collection
      const videoSnapshot = await getDocs(videoCollection);
      const videoList = videoSnapshot.docs.map((doc) => ({
        id: doc.id,
        videoUrl: doc.data().videoUrl, // Ensure this matches the field name in your Firestore
      }));
      setVideoItems(videoList);
    };

    fetchVideos();
  }, []);

  return (
    <div className="flex flex-col space-y-16 w-full max-w-7xl p-4">
      {/* Main Heading */}
      <RevealOnScroll><h2 className="text-6xl md:text-8xl font-bold text-center bg-clip-text text-transparent text-white from-neutral-50 to-neutral-400 bg-opacity-50 md:mt-0">
        What Our Clients Say
      </h2></RevealOnScroll>

      {/* First Section: Testimonial on the left, Video on the right */}
      <RevealOnScroll><div className="flex flex-col md:flex-row items-center justify-between w-full space-y-8 md:space-y-0 md:space-x-8">
      <TestimonialCard
          name="Abhinav Mahajan"
          followers="3M Followers"
          text="Luminary lines significantly boosted my online presence, achieving impressive growth across all platforms. Highly recommend!"
          stats={["300 million views generated", "2.19 million YouTube subscribers", "100+ Videos edited"]}
          avatar="/abij.png" // Updated unique avatar for Abhinav Mahajan Life
        />
        {videoItems.length > 0 && (
          <VideoCard 
            item={videoItems[0]} 
            index={0} 
            unmutedIndex={unmutedIndex} 
            setUnmutedIndex={setUnmutedIndex} 
          />
        )}
      </div></RevealOnScroll>

      {/* Second Section: Video on the left, Testimonial on the right */}
      <div className="flex flex-col md:flex-row-reverse items-center justify-between w-full space-y-8 md:space-y-0 md:space-x-8">
      <RevealOnScroll><TestimonialCard
          name="Nipun Fitness"
          followers="400k Followers"
          text="Working with this team has transformed my content strategy and engagement. Highly recommend their services!"
          stats={["100 million+ views generated", "100+ videos edited"]}
          avatar="/nipun.png" // Updated unique avatar for Nipun Fitness
        /></RevealOnScroll>
        {videoItems.length > 1 && (
          <RevealOnScroll><VideoCard 
            item={videoItems[1]} 
            index={1} 
            unmutedIndex={unmutedIndex} 
            setUnmutedIndex={setUnmutedIndex} 
          /></RevealOnScroll>
        )}
      </div>
    </div>
  );
};

// Video Card Component
const VideoCard: React.FC<{ item: VideoItem; index: number; unmutedIndex: number | null; setUnmutedIndex: React.Dispatch<React.SetStateAction<number | null>> }> = ({ item, index, unmutedIndex, setUnmutedIndex }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    // Set unmutedIndex to this video’s index
    if (unmutedIndex === index) {
      setUnmutedIndex(null); // If the current video is already unmuted, mute it
    } else {
      setUnmutedIndex(index); // Set the current index as unmuted
    }
  };

  return (
    
    <div className="flex-1 flex justify-center mt-6 md:mt-0">
      
      <motion.div
        className="relative p-0 rounded-lg shadow-lg cursor-pointer h-96 flex flex-col justify-center items-center transition-transform duration-300 hover:shadow-xl"
        initial={{ y: 0, rotate: 0 }}
        whileHover={{
          y: -10,
          rotate: 5,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
        }}
      >
        <video
          ref={videoRef}
          className="w-56 h-80 rounded-xl object-cover"
          src={item.videoUrl}
          autoPlay
          playsInline // Ensures the video plays inline
          muted={unmutedIndex !== index} // Mute if this index is not the unmutedIndex
          loop
         
        />
        <button
          onClick={toggleMute}
          className="absolute top-4 right-4 p-2 text-white rounded focus:outline-none hover:bg-gray-700"
        >
          {unmutedIndex === index ? <IconSpeakerphone /> : 'Mute'}
        </button>
      </motion.div>
    </div>
  );
};

// Testimonial Card Component
interface TestimonialCardProps {
  name: string;
  followers: string;
  text: string;
  stats: string[];
  avatar: string; // Added avatar prop
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  followers,
  text,
  stats,
  avatar, // Avatar prop for different images
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 w-full max-w-xl p-6 rounded-lg shadow-lg text-white hover:bg-gray-800 transition duration-300">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <img
          src={avatar} // Dynamically passed avatar prop
          alt={name}
          className="w-20 h-20 rounded-full object-cover" // Increased size of the avatar
        />
      </div>

      {/* Text Area */}
      <div className="flex flex-col space-y-2 text-center md:text-left">
        {/* Name and Followers */}
        <div>
          <h3 className="text-3xl font-bold">{name}</h3> {/* Increased from text-2xl to text-3xl */}
          <p className="text-2xl text-gray-400">{followers}</p> {/* Increased from text-xl to text-2xl */}
        </div>

        {/* Testimonial Text */}
        <p className="text-xl text-gray-300">"{text}"</p> {/* Increased from text-lg to text-xl */}

        {/* Stats */}
        <div className="flex flex-col space-y-1 md:space-y-0 md:space-x-4 md:flex-row text-xl text-gray-400">
          {stats.map((stat, index) => (
            <p key={index}>{stat}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientVideoSection;
