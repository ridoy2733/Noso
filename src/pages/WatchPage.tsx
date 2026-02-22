import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Video } from '../types';
import { formatTimeAgo, formatViews } from '../lib/utils';
import { ThumbsUp, ThumbsDown, Share2, MoreHorizontal, UserPlus } from 'lucide-react';

export function WatchPage() {
  const { id } = useParams();
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/videos/${id}`)
      .then(res => res.json())
      .then(data => {
        setVideo(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading video...</div>;
  if (!video) return <div className="p-8 text-center">Video not found</div>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Player = ReactPlayer as any;

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-6 max-w-[1800px] mx-auto">
      {/* Main Content */}
      <div className="flex-1">
        <div className="aspect-video w-full bg-black rounded-xl overflow-hidden shadow-lg">
          <Player 
            url={video.url} 
            width="100%" 
            height="100%" 
            controls 
            playing 
          />
        </div>
        
        <div className="mt-4">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">{video.title}</h1>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between mt-3 gap-4">
            <div className="flex items-center gap-3">
              <img 
                src={video.user_avatar} 
                alt={video.user_name} 
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{video.user_name}</h3>
                <p className="text-xs text-gray-500">{video.user_handle} • 125K subscribers</p>
              </div>
              <button className="ml-4 px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                Subscribe
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center bg-gray-100 rounded-full">
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 rounded-l-full border-r border-gray-300">
                  <ThumbsUp className="w-5 h-5" />
                  <span className="text-sm font-medium">1.2K</span>
                </button>
                <button className="px-4 py-2 hover:bg-gray-200 rounded-r-full">
                  <ThumbsDown className="w-5 h-5" />
                </button>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full">
                <Share2 className="w-5 h-5" />
                <span className="text-sm font-medium">Share</span>
              </button>
              <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mt-4 bg-gray-100 rounded-xl p-3 text-sm">
            <div className="font-semibold mb-1">
              {formatViews(video.views)} views • {formatTimeAgo(video.created_at)}
            </div>
            <p className="whitespace-pre-wrap text-gray-800">{video.description}</p>
          </div>

          {/* Comments Section Mockup */}
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4">Comments</h3>
            <div className="flex gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">
                Y
              </div>
              <div className="flex-1">
                <input 
                  type="text" 
                  placeholder="Add a comment..." 
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent"
                />
              </div>
            </div>
            {/* Mock Comments */}
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex-shrink-0" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">Ahmed Ali</span>
                    <span className="text-xs text-gray-500">2 days ago</span>
                  </div>
                  <p className="text-sm mt-1">MashaAllah, beautiful recitation. Very soothing.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500 flex-shrink-0" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">Sarah Khan</span>
                    <span className="text-xs text-gray-500">5 hours ago</span>
                  </div>
                  <p className="text-sm mt-1">Thank you for sharing this beneficial knowledge.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Recommendations */}
      <div className="lg:w-[350px] flex-shrink-0">
        <h3 className="font-bold text-lg mb-3">Up Next</h3>
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex gap-2 group cursor-pointer">
              <div className="relative w-40 aspect-video bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                 <img 
                  src={`https://picsum.photos/seed/${i + 100}/320/180`} 
                  className="w-full h-full object-cover"
                  alt="Thumbnail"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-sm font-semibold line-clamp-2 leading-tight group-hover:text-emerald-700">
                  Understanding the basics of Islam - Part {i}
                </h4>
                <p className="text-xs text-gray-500">Islamic Guidance</p>
                <p className="text-xs text-gray-500">10K views • 1 week ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
