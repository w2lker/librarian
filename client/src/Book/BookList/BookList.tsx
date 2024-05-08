import { Fragment, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { ListHeader } from '../../Header/ListHeader';
import { BookRepo } from '../BookRepo';
import { BookListItem } from './BookListItem';

export const BookList: React.FC = () => {
  const navigate = useNavigate();
  const { data, fetchNextPage, hasNextPage } = BookRepo.useList();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (!data) return <span className="loading loading-spinner loading-lg"></span>;

  return (
    <Fragment>
      <ListHeader />
      <div className="max-w-screen-lg mx-auto p-4 block md:flex flex-wrap gap-4 justify-center">
        {data.pages.map((page, index) => (
          <Fragment key={index}>
            {page.data.map((book) => (
              <BookListItem key={book.id} book={book} onSelect={() => navigate(`book/${book.id}`)} />
            ))}
          </Fragment>
        ))}
      </div>
      {hasNextPage && <span ref={ref} className="loading loading-spinner loading-lg m-auto" />}
    </Fragment>
  );
};
