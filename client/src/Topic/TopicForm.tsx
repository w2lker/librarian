import { Controller, useForm } from "react-hook-form";
import { TopicDTO } from "./TopicDTO";
import { TagInput } from "./TagInput";

type TopicFormProps = {
  topic?: TopicDTO;
  bookId: number;
  onSubmit: (data: TopicDTO) => void;
  onCancel: VoidFunction;
};

export const TopicForm: React.FC<TopicFormProps> = ({topic, bookId, onSubmit}) => {
  const { register, control, handleSubmit } = useForm<TopicDTO>();
  const prepareData = (data: TopicDTO) => onSubmit({ ...(topic || {}), ...data, book_id: bookId });

  return (
    <form onSubmit={handleSubmit(prepareData)}>
      <div className="card w-100% bg-base-100 shadow-xl mb-8">
        <div className="card-body">
          <div className=" block md:flex justify-stretch gap-10">
            <Controller
              name="tag"
              control={control}
              render={({ field }) => (
                <TagInput defaultValue={topic?.tag || ''} {...field} />
              )}
            />
            <label className="form-control flex-1">
              <div className="label">
                <span className="label-text">Description</span>
              </div>
              <textarea defaultValue={topic?.description} className="textarea textarea-bordered h-64" placeholder="Description" {...register("description")} />
            </label>
          </div>
          <div className="card-actions justify-end">
            <button role="submit" className="btn btn-sm btn-outline btn-primary">{topic ? 'Update' : 'Create'}</button>
            <button role="button" className="btn btn-sm btn-outline btn-neutral">Cancel</button>
          </div>
        </div>
      </div>
    </form>
  )
}