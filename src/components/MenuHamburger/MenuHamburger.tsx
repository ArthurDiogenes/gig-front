import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "../ui/dropdown-menu";


const CustomButton = ({children}: { children: React.ReactNode}) => {
    return (
        <Button variant='ghost' className="w-full text-md justify-start pr-12">
            {children}
        </Button>
    );
}

export default function MenuHamburger() {
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="text-2xl mr-2 cursor:pointer">
                ☰
                <DropdownMenuContent className="text-lg flex flex-col mx-3 my-6">
                    <DropdownMenuItem>
                        <CustomButton >
                            Perfil
                        </CustomButton>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <CustomButton>
                            Conversas
                        </CustomButton>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <CustomButton>
                            Configurações
                        </CustomButton>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem>
                        <CustomButton>
                            Sair
                        </CustomButton>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenuTrigger>
        </DropdownMenu>
    );
}

//add carousel Fade com efeito do Autoplay