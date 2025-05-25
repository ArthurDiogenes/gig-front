import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface PostsErrorProps {
  onRetry?: () => void;
  message?: string;
}

const PostsError = ({ 
  onRetry, 
  message = "Não foi possível carregar os posts" 
}: PostsErrorProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <Alert variant="destructive" className="border-red-200 bg-red-50">
        <AlertTriangle className="h-5 w-5" />
        <AlertTitle className="text-red-800 font-semibold">
          Erro ao carregar posts
        </AlertTitle>
        <AlertDescription className="text-red-700 mt-2">
          {message}. Verifique sua conexão com a internet e tente novamente.
        </AlertDescription>
      </Alert>
      
      <div className="flex justify-center mt-6">
        {onRetry && (
          <Button 
            onClick={onRetry}
            variant="outline"
            className="group hover:bg-red-50 border-red-200 text-red-700 hover:text-red-800 transition-all duration-200"
          >
            <RefreshCw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
            Tentar Novamente
          </Button>
        )}
      </div>
      
      <div className="text-center mt-4">
        <p className="text-sm text-gray-500">
          Se o problema persistir, entre em contato com o suporte.
        </p>
      </div>
    </div>
  );
};
export default PostsError;