# Getting Started - Backend

Once installed checkout the [Developer](DEVELOPER.md) page for features and useful developer tools.

### Requirements

- Ruby (check the .ruby-version file for the current version)
- PostgresSQL or MySQL (with the devel library so Ruby can build the native extension)
- Redis
- Node JS (check the .nvmrc file for the current version)

### Installation

- copy `database.example.yml` to `database.yml`
	- add your database connection details
- copy `.env.example` to `.env.development`
	- check the file in case you want to make any changes
- run `bundle install` to get all the required Ruby libraries
- run `npm install` to get all the required Node JS libraries
	- note: `postinstall` will automatically setup the database (create, migrate and seed)
	- seeding can take a long time as its generating all the category and product images you can skip this by adding `skip_images=true` to the end of the `rails db:seed` command

### Server

- start the server with `npm run dev`
- you can access the backend by http://127.0.0.1:3022

### Any Problems

If you have any problems you should easily be able to find help on the internet as this is a standard Ruby on Rails project and the documentation is very good for Rails in general.

Please don't raise issues for standard rails problems in the github repo instead use [stackoverflow](https://stackoverflow.com/) and [google](google.com) which are an excellent source of information for common rails problems. Please only raise an [issue](https://github.com/x9sim9/react_ecommerce_rncom/issues) on github as a last resort.

### More Information

If you are new to rails and would like to know more about how it works check out some of the great tutorials online

- https://www.tutorialspoint.com/ruby-on-rails/index.htm

and the reddit community is a great place to ask questions if you get stuck

- https://www.reddit.com/r/rails