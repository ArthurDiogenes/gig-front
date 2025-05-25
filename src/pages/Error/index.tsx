import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ErrorPage = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        {/* Error Icon with Animation */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-75"></div>
          <div className="relative bg-red-500 rounded-full p-6 inline-block">
            <AlertTriangle className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Oops! Algo deu errado
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Parece que encontramos um problema inesperado.
          </p>
          <p className="text-sm text-gray-500">
            Não se preocupe, nossa equipe foi notificada e está trabalhando para resolver isso.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={handleRefresh}
            variant="outline"
            className="group hover:bg-gray-50 transition-all duration-200"
          >
            <RefreshCw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
            Tentar Novamente
          </Button>
          
          <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Voltar ao Início
            </Link>
          </Button>
        </div>

        {/* Additional Help */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            Se o problema persistir, entre em contato conosco:
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <a 
              href="mailto:suporte@exemplo.com" 
              className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              suporte@exemplo.com
            </a>
            <span className="text-gray-300">|</span>
            <a 
              href="tel:+5511999999999" 
              className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              (11) 99999-9999
            </a>
          </div>
        </div>

        {/* Error Code (Optional) */}
        <div className="mt-8">
          <p className="text-xs text-gray-400 font-mono">
            Código do Erro: ERR_500_INTERNAL
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;