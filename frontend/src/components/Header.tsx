import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth";
import logoIcon from "@/assets/logo-icon.svg";
import { Button } from "./ui/button";
import { Lightbulb, LogOut, Users } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";

export function Header() {
  const { user, logout, isAuthenticated } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboardPage = location.pathname === "/";
  const isTransactionsPage = location.pathname === "/transactions";
  const isCategoriesPage = location.pathname === "/categories";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="w-full px-16 pt-6">
      {isAuthenticated && (
        <div className="flex justify-between w-full">
          <div className="min-w-48">
            <img src={logoIcon} />
          </div>
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button
                size="sm"
                className="gap-2"
                variant={isDashboardPage ? "default" : "ghost"}
              >
                Dashboard
              </Button>
            </Link>
            <Link to="/transactions">
              <Button
                size="sm"
                className="gap-2"
                variant={isTransactionsPage ? "default" : "ghost"}
              >
                Transações
              </Button>
            </Link>
            <Link to="/categories">
              <Button
                size="sm"
                className="gap-2"
                variant={isCategoriesPage ? "default" : "ghost"}
              >
                Categorias
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback className="bg-zinc-950 text-primary-foreground">
                  {user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user?.name}</span>
                <span className="text-xs text-muted-foreground">
                  {user?.email}
                </span>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
