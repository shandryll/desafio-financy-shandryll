import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Profile() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="w-full px-4 flex justify-center items-center py-8">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800">
            Meu perfil
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
              {user?.name?.charAt(0)?.toUpperCase() ?? "?"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1 text-center">
            <strong className="text-lg text-gray-800">{user?.name}</strong>
            <span className="text-sm text-gray-500">{user?.email}</span>
          </div>
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Sair da conta
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
