
import { FileText, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyPostsProps {
  onCreatePost?: () => void;
  title?: string;
  description?: string;
}

const EmptyPosts = ({ 
  onCreatePost,
  title = "Nenhum post encontrado",
  description = "Ainda não há posts para exibir. Que tal criar o primeiro?"
}: EmptyPostsProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-8 text-center">
      <div className="mb-6">
        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <FileText className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          {description}
        </p>
      </div>
      
      {onCreatePost && (
        <Button 
          onClick={onCreatePost}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Criar Primeiro Post
        </Button>
      )}
    </div>
  );
};

export default EmptyPosts;