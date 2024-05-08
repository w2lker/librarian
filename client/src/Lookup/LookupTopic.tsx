import { TopicWithBookDTO } from "../Topic/TopicDTO";
import { LookupHighlight } from "./LookupHighlight";
import { LookupQueryDTO } from "./LookupQueryDTO";

type LookupTopicProps = {
  topic: TopicWithBookDTO;
  searchQuery: LookupQueryDTO;
};

export const LookupTopic: React.FC<LookupTopicProps> = ({
  topic,
  searchQuery,
}) => {
  const { book } = topic;
  return (
    <div className="max-w-screen-lg mx-auto p-4 flex flex-wrap mb-10">
      <div className="w-full md:w-1/2 lg:w-1/5">
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
      <div className="w-full md:w-1/2 lg:w-4/5 p-4">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <tbody>
              <tr>
                <td>Tag</td>
                <td>
                  <LookupHighlight
                    text={topic.tag}
                    highlight={searchQuery.tag}
                  />
                </td>
              </tr>

              <tr>
                <td>Description</td>
                <td>
                  <LookupHighlight
                    text={topic.description}
                    highlight={searchQuery.description}
                  />
                </td>
              </tr>

              <tr>
                <td>Book</td>
                <td>
                  <LookupHighlight
                    text={book.name}
                    highlight={searchQuery.book_name}
                  />
                </td>
              </tr>

              <tr>
                <td>Author</td>
                <td>
                  <LookupHighlight
                    text={book.author || ""}
                    highlight={searchQuery.author}
                  />
                </td>
              </tr>

              <tr>
                <td>ISBN</td>
                <td>
                  <LookupHighlight
                    text={book.ISBN || ""}
                    highlight={searchQuery.ISBN}
                  />
                </td>
              </tr>

              <tr>
                <td>Publisher</td>
                <td>
                  <LookupHighlight
                    text={book.publisher || ""}
                    highlight={searchQuery.publisher}
                  />
                </td>
              </tr>

              <tr>
                <td>Year</td>
                <td>{book.year}</td>
              </tr>

              <tr>
                <td>Skill</td>
                <td>
                  <LookupHighlight
                    text={book.skills.join(", ") || ""}
                    highlight={searchQuery.skill}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
