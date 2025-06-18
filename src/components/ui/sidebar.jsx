import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  CalendarDays,
  BedDouble, 
  Image as GalleryIcon,
  LogOut
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      href: "/pages/dashboard",
      icon: <Home size={20} />,
    },
    {
      name: "Bookings",
      href: "/pages/admin/adminBookings",
      icon: <CalendarDays size={20} />,
    },
        {
      name: "Category",
      href: "/pages/admin/adminCategory",
      icon: <GalleryIcon size={20} />,
    },
    {
      name: "Rooms",
      href: "/pages/admin/adminRooms",
      icon: <BedDouble size={20} />,
    },

    
  ];

  return (
    <div className="h-screen w-64 bg-blue-500 text-white flex flex-col">
      {/* Logo/Brand */}
      <div className="p-4 border-b border-blue-600">
        <h2 className="text-2xl font-bold">Vinrich Resort</h2>
        <p className="text-xs text-blue-200">Admin Dashboard</p>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-blue-600/80 text-blue-100'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Footer/Logout */}
      {/*<div className="p-4 border-t border-blue-600">
        <Link
          href="/pages/home"
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600/80 text-blue-100"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </Link>
      </div>*/}
    </div>
  );
};

export default Sidebar;