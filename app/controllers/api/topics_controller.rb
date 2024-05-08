module Api
  class TopicsController < ApplicationController
    def index
      @topics = Topic.where(book_id: params[:book_id])
      render json: @topics
    end

    def create
      @topic = Topic.new(topic_params)
      if @topic.save
        render json: @topic, status: :created
      else
        render json: @topic.errors, status: :unprocessable_entity
      end
    end

    def update
      @topic = Topic.find(params[:id])
      if @topic.update(topic_params)
        render json: @topic
      else
        render json: @topic.errors, status: :unprocessable_entity
      end
    end

    def destroy
      @topic = Topic.find(params[:id])
      @topic.destroy
      head :no_content
    end

    def unique_tags
      tags = Topic.where.not(tag: [nil, ""]).select(:tag).distinct.pluck(:tag)
      render json: tags
    end

    def search
      topics = Topic.joins(:book).where(nil)

      # Topic based attributes
      topics = topics.where('LOWER(topics.tag) LIKE LOWER(?)', "%#{params[:tag]}%") if params[:tag].present?
      topics = topics.where('LOWER(topics.description) LIKE LOWER(?)', "%#{params[:description]}%") if params[:description].present?

      # Book based attributes
      topics = topics.where('LOWER(books.name) LIKE LOWER(?)', "%#{params[:book_name]}%") if params[:book_name].present?
      topics = topics.where('LOWER(books.author) LIKE LOWER(?)', "%#{params[:author]}%") if params[:author].present?
      topics = topics.where('LOWER(books.publisher) LIKE LOWER(?)', "%#{params[:publisher]}%") if params[:publisher].present?
      topics = topics.where('books.year = ?', params[:year]) if params[:year].present?
      topics = topics.where('books.ISBN = ?', params[:ISBN]) if params[:ISBN].present?
      # TODO
      # topics = topics.where('books.skills @> ARRAY[?]::varchar[]', params[:skill]) if params[:skills].present?


      topics = topics.limit(50)

      render json: topics, each_serializer: TopicWithBookSerializer
    end

    private

    def topic_params
      params.require(:topic).permit(:tag, :description, :book_id)
    end
  end
end
