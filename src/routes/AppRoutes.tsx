import { Route, Routes } from "react-router";
import TelaLogin from "../pages/TelaLogin/TelaLogin";
import TelaCadastro from "../pages/TelaCadastro/TelaCadastro";
import RedefinirSenha from "../pages/RedefinirSenha/RedefinirSenha";
import RecuperarSenha from "../pages/RecuperarSenha/RecuperarSenha";
import Mensagens from "../pages/Mensagens/Mensagens";

export default function AppRoutes() {
  return (
    <Routes>
      <Route index element={<h1>Home</h1>}/>
      <Route path="/login" element={<TelaLogin />} />
      <Route path="/cadastro" element={<TelaCadastro/>}/>
      <Route path="/redefinirSenha" element={<RedefinirSenha/>}/>
      <Route path="/recuperarSenha" element={<RecuperarSenha/>}/>
      <Route path="/mensagens" element={<Mensagens/>}/>
    </Routes>
  );
}
