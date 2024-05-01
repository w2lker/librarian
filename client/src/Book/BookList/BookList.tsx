import { useInView } from "react-intersection-observer";

import { BookListItem } from "./BookListItem";
import { BookRepo } from "../BookRepo";
import { Fragment, useEffect } from "react";

type BookListProps = {
  onSelect: (bookId: number) => void;
};

export const BookList: React.FC<BookListProps> = ({onSelect}) => {
  const { data, fetchNextPage, hasNextPage } = BookRepo.useList();
  const { ref, inView } = useInView();


  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

  if (!data) return <span className="loading loading-spinner loading-lg"></span>;

  return (
    <Fragment>
      <div className="max-w-screen-lg mx-auto p-4 flex flex-wrap gap-4 justify-center">
        {data.pages.map((page, index) => (
          <Fragment key={index}>
            {page.data.map((book) => (
              <BookListItem key={book.id} book={book} onSelect={() => onSelect(book.id)} />
            ))}
          </Fragment>
        ))}
      </div>
      {hasNextPage && <span ref={ref} className="loading loading-spinner loading-lg m-auto" />}
    </Fragment>
  );
};