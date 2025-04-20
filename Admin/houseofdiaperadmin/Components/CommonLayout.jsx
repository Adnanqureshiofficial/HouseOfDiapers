import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { LogOut, LayoutDashboard, Plus , Package, ClipboardList } from "lucide-react";


const AdminLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) navigate("/");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const navItems = [
    
    { to: "/addproducts", label: "Add Products", icon: <Package size={18} /> },
    
    { to: "/productlist", label: "View Products", icon: <Plus size={18} /> },

    { to: "/ordermanagement", label: "Orders", icon: <ClipboardList size={18} /> },
  ];

  return (
   
    
      
      <aside className="w-65 min-h-screen bg-white/70 backdrop-blur-md shadow-xl p-5 flex flex-col justify-between rounded-tr-3xl rounded-br-3xl border-r border-gray-200">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Panel</h2>
          <nav className="flex flex-col space-y-3">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "hover:bg-blue-100 text-gray-700"
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 font-medium bg-red-50 hover:bg-red-100 rounded-xl transition-all duration-200"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>
 
  );
};

export default AdminLayout;
