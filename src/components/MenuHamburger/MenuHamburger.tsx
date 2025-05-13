import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "../ui/dropdown-menu";


const CustomButton = ({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) => {
    return (
        <Button variant="ghost" className="w-full text-md justify-start pr-12" onClick={onClick}>
            {children}
        </Button>
    );
};


export default function MenuHamburger() {
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="text-2xl mr-2 cursor:pointer">
                ☰
                <DropdownMenuContent className="text-lg flex flex-col mx-3 my-6">
                    <DropdownMenuItem>
                        <CustomButton onClick={() => window.location.href = "/perfil"}>
                            Perfil
                        </CustomButton>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <CustomButton onClick={() => window.location.href = "/mensagens"}>
                            Conversas
                        </CustomButton>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <CustomButton onClick={() => window.location.href = "#"}>
                            Configurações
                        </CustomButton>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <CustomButton onClick={() => window.location.href = "/login"}>
                            Sair
                        </CustomButton>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenuTrigger>
        </DropdownMenu>
    );
}

//add carousel Fade com efeito do Autoplay