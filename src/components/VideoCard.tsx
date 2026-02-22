import { Link } from 'react-router-dom';
import { Video } from '../types';
import { formatTimeAgo, formatViews } from '../lib/utils';

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <Link to={`/watch/${video.id}`} className="group flex flex-col gap-2">
      <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-200">
        <img 
          src={video.thumbnail || `https://picsum.photos/seed/${video.id}/640/360`} 
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex gap-3 items-start">
        <div className="flex-shrink-0">
          <img 
            src={video.user_avatar} 
            alt={video.user_name} 
            className="w-9 h-9 rounded-full bg-gray-200"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold text-gray-900 line-clamp-2 leading-tight group-hover:text-emerald-700">
            {video.title}
          </h3>
          <div className="text-sm text-gray-600 mt-1">
            <p>{video.user_name}</p>
            <p>
              {formatViews(video.views)} views • {formatTimeAgo(video.created_at)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
