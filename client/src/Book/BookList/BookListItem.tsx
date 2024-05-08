import { BookDTO } from '../BookDTO';

type BookListItemProps = {
  book: BookDTO;
  onSelect: VoidFunction;
};

export const BookListItem: React.FC<BookListItemProps> = ({ book, onSelect }) => {
  return (
    <div className="card bg-base-100 shadow-xl w-full md:w-2/5 cursor-pointer" onClick={onSelect}>
      <figure className="px-10 pt-10">
        {book.coverURL && <img src={book.coverURL} alt="Book cover" className="rounded-xl" />}
        {!book.coverURL && <div className="placeholder  w-full h-36 rounded-xl bg-slate-200"></div>}
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{book.name}</h2>
        <div>
          {book.skills.map((skill) => (
            <div key={skill} className="badge badge-ghost">
              {skill}
            </div>
          ))}
        </div>
        <p>{[book.author, book.year, book.publisher].filter((str) => !!str).join(', ')}</p>
        <div className="p-2" />
        <div className="card-actions">
          <button className="btn btn-outline btn-primary" onClick={onSelect}>
            Details
          </button>
        </div>
      </div>
    </div>
  );
};
