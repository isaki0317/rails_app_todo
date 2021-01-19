class IssuesController < ApplicationController

  def index
    # @complete_issues = Issue.where(checked: false)
    # @incomplete_issues = Issue.where(checked: true)
    @issues = Issue.all
    render json: @issues
  end

  def create
    @issue = Issue.create(name: params[:name])
    render json: @issue
  end

  def update
    @issue = Issue.find(params[:id])
    @issue.update_attributes(checked: true)
    render json: @issue
  end

  def destroy
    @issue = Issue.find(params[:id])
    if @issue.destroy
      head :no_content, status: :ok
    else
      render json: @issue.errors, status: :unprocessable_entity
    end
  end

end
