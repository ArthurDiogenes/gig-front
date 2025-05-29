import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send } from 'lucide-react';
import { toast } from 'react-toastify';

interface CommentFormProps {
  onSubmit: (content: string) => void;
  isSubmitting?: boolean;
  currentUser?: {
    name: string;
    avatar?: string;
  };
}

const CommentForm = ({ 
  onSubmit, 
  isSubmitting = false,
  currentUser = { name: 'Usuário Anônimo' }
}: CommentFormProps) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!comment.trim()) {
      toast.error('O comentário não pode estar vazio.');
      return;
    }

    if (comment.length > 500) {
      toast.error('O comentário não pode ter mais de 500 caracteres.');
      return;
    }

    onSubmit(comment.trim());
    setComment('');
    
    toast.success('Comentário enviado com sucesso!');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-200 pt-4">
      <div className="flex gap-3">
        <Avatar className="w-8 h-8 mt-1">
          <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
          <AvatarFallback className="text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            {getInitials(currentUser.name)}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 space-y-3">
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Escreva seu comentário..."
            className="min-h-[80px] resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            maxLength={500}
          />
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {comment.length}/500 caracteres
            </span>
            
            <Button
              type="submit"
              disabled={isSubmitting || !comment.trim()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isSubmitting ? (
                "Enviando..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Comentar
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;