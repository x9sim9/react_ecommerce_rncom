# FRONTEND

### Features

- Full Ecommerce site including Products, Categories, Shopping Cart, Checkout and Customer Account Area
- All storefront pages are created and cached during build for fast performance
- Automatic redirect to the correct urls when product or category names change

### Technical Features

- **React** 18+ including server components
- **NextJS** 14+
- **Typescript** 5+ with full coverage
- **i18n** full language support with next-intl
- **Tailwind** 3+ with React Styled Components
- **Apollo GraphQL**
- **Redux Toolkit** 2.0+ for shared state management
- **Suspense** animations and loading animations

### Developer Features

- Full **Typescript** coverage with clean concise typing
- Full in depth linting with **ESLint**
	- The focus being concise, clear and easy to read code that is consistent and well organised
	- It is recommended to use eslint -fix on save so that code is automatically organised as you work, rather than waiting til the end.
	- The linting rules have a huge amount of autofix, tidy and align coding rules similar to the capabilities of prettier with a slightly different focus. While prettier focuses on readability above all else, this projects attempts to prioritise productivity and reliability while balancing readability.
- Full **JSDoc** documentation
- **Styled components with Tailwind** (see UI Library Below)
- Simple **Redux** state management paired with GraphQL
- **Solid test coverage using Cypress** (with \<... data-testid="unique.id"> tags and Page Object Models)

### UI Library

A full library of styled components designed to keep the code lean and concise and make developing new pages quick and simple.

`/frontend/src/components/ui`

| Name                      | Description                                                                                                                                                                                                                                          |  
|---------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|  
| **Buttons**               | Bootstrap style buttons                                                                                                                                                                                                                              |  
| **Flash**                 | A simple library for sending flash messages to users                                                                                                                                                                                                 |  
| **Form**                  | A full styled form library with simple yet powerful validation. This includes Checkbox, Checkbox Group, Date, File, Phone Number, Radio Group, Select, Text, Textarea, Boolean, Button, Label, Number, Password, Submit Buttons, and form validation |  
| **Navbar**                | A bootstrap style navbar for menus and navigation                                                                                                                                                                                                    |  
| **Panel**                 | Bootstrap style panels                                                                                                                                                                                                                               |  
| **Table**                 | Styled, responsive tables                                                                                                                                                                                                                            |  
| **With**                  | A tool to help pass special commands to components that can be used on both the server and client side                                                                                                                                               |  
| **Currency**              | A simple currency component that formats currency based on `locale` with `next-intl`                                                                                                                                                                 |  
| **Date**                  | A simple date component that formats dates based on `locale` with `next-intl`                                                                                                                                                                        |  
| **Grid** and **Gridspan** | Everything you need to control the layout of items                                                                                                                                                                                                   |  
| **Heading**               | Simple styled headings                                                                                                                                                                                                                               |  
| **Id**                    | Formatted Ids                                                                                                                                                                                                                                        |  
| **Image**                 | A `next/image` wrapper that adds some extra functions                                                                                                                                                                                                |  
| **Link**                  | For link navigation with `locale` support from `next-intl `                                                                                                                                                                                          |  
| **Loading**               | Simple react style loading animations                                                                                                                                                                                                                |  
| **Page**                  | A simple page wrapper                                                                                                                                                                                                                                |  
| **Paragraph**             | Styled paragraphs                                                                                                                                                                                                                                    |  
| **Slug**                  | SEO friendly product and category urls                                                                                                                                                                                                               |  
| **Suspense**              | Suspense combines with loading to make some nice loading animations                                                                                                                                                                                  |  
| **Tooltip**               | For styled tooltips                                                                                                                                                                                                                                  |

examples of ui elements available in the developer section i.e. `/--/ui`