import { Home, Compass, Clock, ThumbsUp, PlaySquare, History, Flame, Music2, Gamepad2, Trophy } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

const mainLinks = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Compass, label: 'Explore', path: '/explore' },
  { icon: PlaySquare, label: 'Subscriptions', path: '/subscriptions' },
];

const libraryLinks = [
  { icon: History, label: 'History', path: '/history' },
  { icon: Clock, label: 'Watch later', path: '/playlist?list=WL' },
  { icon: ThumbsUp, label: 'Liked videos', path: '/playlist?list=LL' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  const NavItem = ({ icon: Icon, label, path }: { icon: any, label: string, path: string }) => (
    <Link
      to={path}
      onClick={() => onClose()} // Close on mobile navigation
      className={cn(
        "flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors",
        location.pathname === path ? "bg-gray-100 font-medium" : "text-gray-700"
      )}
    >
      <Icon className={cn("w-5 h-5", location.pathname === path ? "fill-current" : "")} />
      <span className="text-sm truncate">{label}</span>
    </Link>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-16 bottom-0 w-60 bg-white z-40 overflow-y-auto px-3 py-4 transition-transform duration-300 ease-in-out border-r border-gray-200 md:border-none",
        "md:translate-x-0", // Always visible on desktop
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0" // Toggle on mobile
      )}>
        <div className="space-y-1 pb-4 border-b border-gray-200">
          {mainLinks.map((link) => (
            <NavItem key={link.label} {...link} />
          ))}
        </div>
        <div className="space-y-1 py-4 border-b border-gray-200">
          <h3 className="px-3 py-2 text-base font-semibold text-gray-900">You</h3>
          {libraryLinks.map((link) => (
            <NavItem key={link.label} {...link} />
          ))}
        </div>
        <div className="space-y-1 py-4">
          <h3 className="px-3 py-2 text-base font-semibold text-gray-900">Explore</h3>
          <NavItem icon={Flame} label="Trending" path="/trending" />
          <NavItem icon={Music2} label="Nasheed" path="/nasheed" />
          <NavItem icon={Trophy} label="Sports" path="/sports" />
        </div>
        
        <div className="px-3 py-4 text-xs text-gray-500 font-medium">
          <p>© 2024 NoorStream LLC</p>
        </div>
      </aside>
    </>
  );
}
