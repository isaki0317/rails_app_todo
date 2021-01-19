class IssuesController < ApplicationController

  def index
    @incomplete_issues = Issue.where(checked: false)
    @complete_issues = Issue.where(checked: true)
    render json: {incompleteTodos: @incomplete_issues, completeTodos: @complete_issues}
  end

  def create
    @issue = Issue.create(name: params[:name])
    render json: @issue
  end

  def update
    @issue = Issue.find(params[:id])
    if @issue.checked == false
      @issue.update_attributes(checked: true)
    else
      @issue.update_attributes(checked: false)
    end
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
