import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface CommentProps {
  id: number;
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  createdAt: Date;
}

const Comment = ({ author, content, createdAt }: CommentProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex gap-3 p-4 border-b border-gray-100 last:border-b-0">
      <Avatar className="w-8 h-8">
        <AvatarImage src={author.avatar} alt={author.name} />
        <AvatarFallback className="text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          {getInitials(author.name)}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="text-sm font-semibold text-gray-900">{author.name}</h4>
          <span className="text-xs text-gray-500">
            {formatDistanceToNow(createdAt, { 
              addSuffix: true, 
              locale: ptBR 
            })}
          </span>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">{content}</p>
      </div>
    </div>
  );
};

export default Comment;
