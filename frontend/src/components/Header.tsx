import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth";
import logo from "@/assets/logo.svg";
import icon from "@/assets/icon.svg";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useState, useEffect } from "react";

const navBars = [
  { name: "Dashboard", url: "/" },
  { name: "Transações", url: "/transactions" },
  { name: "Categorias", url: "/categories" },
] as const;

export function Header() {
  const { user, logout, isAuthenticated } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [screenWidth, setScreenWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 w-full px-4 bg-white border-b border-gray-200 flex items-center justify-between md:px-12 py-4 z-10">
      {isAuthenticated ? (
        <>
          <div>
            <img src={screenWidth > 768 ? logo : icon} alt="Financy" className="h-8 md:h-8" />
          </div>
          <div className="flex-1 flex items-center justify-center px-4">
            <nav className="flex items-center justify-center gap-5">
              {navBars.map((nav) => (
                <Link
                  key={nav.url}
                  to={nav.url}
                  data-active={location.pathname === nav.url}
                  className="text-gray-600 text-xs md:text-sm data-[active=true]:text-[#1F6F43] hover:text-[#1F6F43] no-underline"
                >
                  {nav.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/profile" className="rounded-full">
              <Avatar className="h-9 w-9 hover:opacity-90 cursor-pointer">
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  {user?.name?.charAt(0)?.toUpperCase() ?? "?"}
                </AvatarFallback>
              </Avatar>
            </Link>
            <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Sair">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </>
      ) : null}
    </header>
  );
}
