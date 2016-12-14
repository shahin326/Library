module Api
  class BooksController < ApplicationController
    respond_to :json
    before_action :set_book, only: [:update, :destroy]

    def index
      respond_with Book.all
    end

    def create
        book = Book.new(book_params)
        if book.save
          respond_with :api, book, status: :ok, location: api_books_url
        else
          render json: { errors: book.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
      @book.destroy
      head :ok
    end

    def search
      query = params[:query]
      books = Book.where('title LIKE ? OR author LIKE ? OR description LIKE ?',
                           "%#{query}%", "%#{query}%", "%#{query}%")

      respond_with books
    end

    def update
        if @book.update(book_params)
          respond_with :api, @book, status: :ok, location: api_book_url(@book)
        else
          render json: { errors: @book.errors.full_messages }, status: :unprocessable_entity
        end
    end



   def book_params
        params.require(:book).permit(:title, :author, :description, :reserved)
   end



    def set_book
      @book = Book.find(params[:id])
    end

  end
end
