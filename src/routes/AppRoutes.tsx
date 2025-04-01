import { Route, Routes } from "react-router";
import TelaLogin from "../pages/TelaLogin/TelaLogin";
import TelaCadastro from "../pages/TelaCadastro/TelaCadastro";
import RedefinirSenha from "../pages/RedefinirSenha/RedefinirSenha";
import RecuperarSenha from "../pages/RecuperarSenha/RecuperarSenha";
import Home from "../pages/Home/Home";
import Mensagens from "../pages/Mensagens/Mensagens";
import ProtectedRoute from "./ProtectedRoute";
import TelaGenero from "../pages/TelaGenero/TelaGenero";
import BandProfile from "../pages/BandProfile/BandProfile";
import PerfilEstabelecimento from "../pages/PerfilEstabelecimento/PerfilEstabelecimento";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<TelaLogin />} />
      <Route path="/cadastro" element={<TelaCadastro/>}/>
      <Route path="/redefinirSenha" element={<RedefinirSenha/>}/>
      <Route path="/recuperarSenha" element={<RecuperarSenha/>}/>
      <Route path="/genero/:genero" element={<TelaGenero/>}/>
      <Route path="/perfil" element={<BandProfile/>}/>
      <Route path="/perfil-estabelecimento" element={<PerfilEstabelecimento/>}/>
      <Route element={<ProtectedRoute/>}>
        <Route path="/mensagens" element={<Mensagens/>}/>
      </Route>
    </Routes>
  );
}
