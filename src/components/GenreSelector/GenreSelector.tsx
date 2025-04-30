import { Button } from '@/components/ui/button.tsx';

const genres = ['Rock', 'Sertanejo', 'Forró', 'Pop', 'Jazz', 'Eletrônico'];

export default function GenreSelector({ onGenreSelect }: { onGenreSelect: (genre: string) => void }) {
    return (
        <div className="flex flex-wrap gap-2">
            {genres.map((genre, index) => (
                <Button key={index} variant="outline" size="sm" className="text-xs cursor-pointer" onClick={() => onGenreSelect(genre)}>{genre}</Button>
            ))}
        </div>
        
    );
}

        

{/* <div className="p-4 bg-card border rounded-lg shadow">
{[
    'Ação',
    'Drama',
    'Comédia',
    'Ficção',
    'Terror',
    'Romance',
    'Animação',
].map((cat) => (
    <Button
        key={cat}
        variant="outline"
        size="sm"
        className="text-xs"
    >
        {cat}
    </Button>
))}
</div> */}