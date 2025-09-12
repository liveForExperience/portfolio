import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { VideoGallery } from '../components';
import { fetchVideos } from '../services';
import { fadeUp, stagger } from '../lib/utils';
import type { Video } from '../types';

const Interests = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const videosData = await fetchVideos();
        setVideos(videosData);
      } catch (error) {
        console.error('Failed to load videos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  const readingList = [
    {
      title: "The Design of Everyday Things",
      author: "Don Norman",
      category: "Design",
      status: "completed"
    },
    {
      title: "Clean Code",
      author: "Robert C. Martin",
      category: "Programming",
      status: "reading"
    },
    {
      title: "Atomic Design",
      author: "Brad Frost",
      category: "Design Systems",
      status: "completed"
    },
    {
      title: "You Don't Know JS",
      author: "Kyle Simpson",
      category: "JavaScript",
      status: "completed"
    },
    {
      title: "Refactoring UI",
      author: "Adam Wathan & Steve Schoger",
      category: "Design",
      status: "reading"
    }
  ];

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="text-center mb-16"
          >
            <motion.h1 variants={fadeUp} className="text-h1 font-bold mb-6">
              Interests & Passions
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-muted max-w-2xl mx-auto">
              Beyond coding, I'm passionate about continuous learning and the beautiful game of football.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Reading Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-h2 font-bold text-center mb-12"
          >
            Reading List
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-muted mb-12 max-w-2xl mx-auto"
          >
            Books that have shaped my understanding of design, development, and technology.
            This list is synced with my Notion database and updated regularly.
          </motion.p>
          
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {readingList.map((book, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="p-6 bg-background rounded-lg border border-surface hover:border-accent transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    book.status === 'completed' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {book.status === 'completed' ? 'Completed' : 'Reading'}
                  </span>
                  <span className="text-xs text-muted">{book.category}</span>
                </div>
                
                <h3 className="font-semibold mb-2">{book.title}</h3>
                <p className="text-muted text-sm">by {book.author}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-muted mb-4">
              This reading list is automatically synced from my Notion database
            </p>
            <button className="text-accent hover:underline">
              View Full Reading List →
            </button>
          </motion.div>
        </div>
      </section>

      {/* Football Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-h2 font-bold text-center mb-12"
          >
            Football Passion
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-muted mb-12 max-w-2xl mx-auto"
          >
            The beautiful game has always been a source of inspiration. Here are some of my 
            favorite moments, highlights, and tactical analyses.
          </motion.p>
          
          {loading ? (
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted">Loading videos...</p>
            </div>
          ) : (
            <VideoGallery videos={videos} />
          )}
        </div>
      </section>
    </div>
  );
};

export default Interests;
