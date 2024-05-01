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

    private

    def topic_params
      params.require(:topic).permit(:tag, :description, :skill)
    end
  end
end
