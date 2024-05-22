# typed: strict
# frozen_string_literal: true

Rails.application.routes.draw do
	if Rails.env.development?
		mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql'
	end

	match '/graphql', to: 'graphql#execute', via: %i[get post]
	# Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

	# Defines the root path route ("/")
	# root "articles#index"
end
