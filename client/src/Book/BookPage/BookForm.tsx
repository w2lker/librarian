import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { BookDTO } from "../BookDTO";
import { SkillSelector } from "../../SkillSelector";

type BookFormProps = {
  book?: BookDTO;
  onSubmit: (book: BookDTO) => void;
  onCancel: VoidFunction;
};

export const BookForm: React.FC<BookFormProps> = (props) => {
  const [cover, setCover] = React.useState<string>(props.book?.coverURL || "");
  const { register, setValue, getValues, control, handleSubmit } = useForm<BookDTO>();

  const isbnRegister = register("ISBN");

  const handleISBNBlur = async (e: React.ChangeEvent<HTMLInputElement>) => {
    isbnRegister.onBlur(e);
    const isbn = e.target.value.replace(/\D+/g, "");
    const request = await fetch(`https://openlibrary.org/isbn/${isbn}.json`);
    const data = await request.json();
    setValue("name", data.title);
    // setValue("author", data.author_name?.[0]);
    const year = data.publish_date?.match(/\d{4}/)?.[0];
    if (year) setValue("year", parseInt(year));
    const publisher = data.publishers.join(", ");
    setValue("publisher", publisher);
    if (data.covers?.[0]) setCover(`https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg`);
    setValue('author', '');
    for (const author of (data.authors || [])) {
      const request = await fetch(`https://openlibrary.org${author.key}.json`);
      const data = await request.json();
      const names = getValues('author');
      if (names) {
        setValue('author', names + ', ' + data.name);
      } else {
        setValue('author', data.name);
      }
    }
  }

  const processData = (data: BookDTO) => {
    const nextData = {
      ...(props.book || {}),
      ...data,
      skills: data.skills || [],
      coverURL: cover
    };
    props.onSubmit(nextData);
  };

  useEffect(() => {
    if (props.book?.skills) setValue("skills", props.book.skills);
  }, [props.book, setValue]);


  return (
    <form onSubmit={handleSubmit(processData)}>
      <div className="max-w-screen-lg mx-auto p-4 flex flex-wrap">
        <div className="flex-1 w-1/2 md:w-1/2 sm:w-full">
          {cover && (
            <img
              src={cover}
              className="w-full h-auto shadow-md rounded-lg"
              alt="book cover"
            />
          )}
          {!cover && (
            <div className="placeholder  w-full h-72 rounded-xl bg-slate-200"></div>
          )}
        </div>

        <div className="flex-auto w-2/3 md:w-1/2 sm:w-full p-4">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <tbody>
                <tr>
                  <td>ISBN</td>
                  <td>
                    <label className="input input-bordered flex items-center gap-2">
                      <input
                        defaultValue={props.book?.ISBN}
                        type="text"
                        className="grow"
                        placeholder="Search"
                        {...isbnRegister}
                        onBlur={handleISBNBlur}
                      />
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>
                    <input
                      defaultValue={props.book?.name}
                      type="text"
                      className="input input-bordered"
                      placeholder="Book Name"
                      {...register("name")}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Author</td>
                  <td>
                    <input
                      defaultValue={props.book?.author}
                      type="text"
                      className="input input-bordered"
                      placeholder="Author"
                      {...register("author")}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Year</td>
                  <td>
                    <input
                      defaultValue={props.book?.year}
                      type="number"
                      className="input input-bordered"
                      placeholder="Year"
                      {...register("year")}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Publisher</td>
                  <td>
                    <input
                      defaultValue={props.book?.publisher}
                      type="text"
                      className="input input-bordered"
                      placeholder="Publisher"
                      {...register("publisher")}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Skills</td>
                  <td>
                    <Controller
                      name="skills"
                      control={control}
                      render={({ field }) => (
                        <SkillSelector defaultValue={[]} {...field} />
                      )}
                    />
                  </td>
                </tr>
                <tr>
                  <td/>
                  <td>
                    <button type="submit" className="btn btn-primary mr-2">Save</button>
                    <button type="button" className="btn" onClick={props.onCancel}>Cancel</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </form>
  );
};