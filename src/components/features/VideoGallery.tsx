import { useState } from 'react';
import { motion } from 'framer-motion';
import type { VideoGalleryProps } from '../../types';
import { fadeUp, stagger, formatDuration } from '../../lib/utils';

const VideoGallery = ({ videos }: VideoGalleryProps) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const getEmbedUrl = (video: any) => {
    if (video.source === 'youtube') {
      const videoId = video.url.split('v=')[1]?.split('&')[0] || video.url.split('/').pop();
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (video.source === 'vimeo') {
      const videoId = video.url.split('/').pop();
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return video.url;
  };

  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted">No videos available at the moment.</p>
        <p className="text-muted text-sm mt-2">
          Videos will be automatically synced from the Notion database.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Video Modal */}
      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="bg-surface rounded-lg overflow-hidden max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video">
              <iframe
                src={selectedVideo}
                title="Video Player"
                className="w-full h-full"
                allowFullScreen
              />
            </div>
            <div className="p-4 flex justify-end">
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-muted hover:text-text"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Video Grid */}
      <motion.div
        variants={stagger}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {videos.map((video) => (
          <motion.div
            key={video.id}
            variants={fadeUp}
            className="bg-surface rounded-lg overflow-hidden border border-surface hover:border-accent transition-colors cursor-pointer group"
            onClick={() => setSelectedVideo(getEmbedUrl(video))}
          >
            <div className="aspect-video bg-background relative overflow-hidden">
              {video.thumbnail ? (
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-muted">Video Thumbnail</span>
                </div>
              )}
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-background ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              
              {/* Duration Badge */}
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                {formatDuration(video.duration)}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold mb-2 group-hover:text-accent transition-colors line-clamp-2">
                {video.title}
              </h3>
              
              <div className="flex items-center justify-between text-sm text-muted">
                <span className="capitalize">{video.source}</span>
                <span>{formatDuration(video.duration)}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default VideoGallery;
