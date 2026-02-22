import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Video } from '../types';
import { VideoCard } from '../components/VideoCard';
import { Settings, Share2 } from 'lucide-react';

export function ProfilePage() {
  const { user } = useAuth();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetch(`/api/users/${user.id}/videos`)
        .then(res => res.json())
        .then(data => {
          setVideos(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  if (!user) return <div className="p-8 text-center">Please sign in to view your profile.</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 border-b border-gray-200 pb-8">
        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg">
          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
          <p className="text-gray-500 font-medium">{user.handle}</p>
          <div className="flex items-center justify-center md:justify-start gap-4 mt-2 text-sm text-gray-600">
            <span>{videos.length} videos</span>
            <span>•</span>
            <span>1.2K subscribers</span>
          </div>
          
          <div className="flex items-center justify-center md:justify-start gap-3 mt-4">
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-medium transition-colors">
              Customize channel
            </button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-medium transition-colors">
              Manage videos
            </button>
            <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full">
              <Share2 className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Videos Tab */}
      <div>
        <h2 className="text-xl font-bold mb-4">Videos</h2>
        {loading ? (
          <div className="text-center py-8">Loading videos...</div>
        ) : videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500">No videos uploaded yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
