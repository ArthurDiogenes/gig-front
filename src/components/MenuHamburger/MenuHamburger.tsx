import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { getUser } from "@/services/users";

const CustomButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <Button
      variant="ghost"
      className="w-full text-md justify-start pr-12"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default function MenuHamburger() {
  const navigate = useNavigate();
  const user = getUser();

  const handleProfile = () => {
    if (!user) return;
    if (user.role === "band") {
      navigate(`/bandas/${user.id}`);
    } else {
      navigate("/perfil-estabelecimento");
    }
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="text-2xl mr-2 cursor:pointer">
        ☰
        <DropdownMenuContent className="text-lg flex flex-col mx-3 my-6">
          <DropdownMenuItem>
            <CustomButton onClick={handleProfile}>Perfil</CustomButton>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CustomButton
              onClick={() => (window.location.href = "/meu-perfil")}
            >
              Painel Administrador
            </CustomButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <CustomButton
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
              }}
            >
              Sair
            </CustomButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}

//add carousel Fade com efeito do Autoplay
