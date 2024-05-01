import { BookDTO } from "../BookDTO";
import { BookDelete } from "./BookDelete";

type BookDataProps = {
  book: BookDTO;
  onEdit: VoidFunction;
  onDelete: VoidFunction;
};

export const BookData: React.FC<BookDataProps> = ({book, onEdit, onDelete}) => {
  return (
    <div className="max-w-screen-lg mx-auto p-4 flex flex-wrap">
      <div className="flex-1 w-1/2 md:w-1/2 sm:w-full">
        {book.coverURL && (
          <img
            src={book.coverURL}
            className="w-full h-auto shadow-md rounded-lg"
            alt="book cover"
          />
        )}
        {!book.coverURL && (
          <div className="placeholder  w-full h-72 rounded-xl bg-slate-200"></div>
        )}
      </div>

      <div className="flex-auto w-2/3 md:w-1/2 sm:w-full p-4">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <tbody>
              <tr>
                <td>ISBN</td>
                <td>{book.ISBN}</td>
              </tr>
              <tr>
                <td>Name</td>
                <td>{book.name}</td>
              </tr>
              <tr>
                <td>Author</td>
                <td>{book.author}</td>
              </tr>
              <tr>
                <td>Year</td>
                <td>{book.year}</td>
              </tr>
              <tr>
                <td>Publisher</td>
                <td>{book.publisher}</td>
              </tr>
              <tr>
                <td>Skills</td>
                <td>
                  {book.skills.map((skill) => (
                    <div key={skill} className="badge badge-neutral mr-3">{skill}</div>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
          <button className="btn btn-primary btn-outline mt-4 float-left" onClick={onEdit}>Edit book</button>
          <BookDelete bookId={book.id} onDelete={onDelete} />
        </div>
      </div>
    </div>
  )
};
