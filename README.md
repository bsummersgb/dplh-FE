# Dynamics Portal Bootstrap 3, Less & Gulp Boilerplate

A simple boilerplate to start your Dynamics Portal project using Bootstrap, jQuery, LESS and HTML5.

## Getting Started

### Installation

First of all, install the dependencies to run this boilerplate.

- [NodeJS](http://nodejs.org/)
  (download and install - requires version 14 or above)

- [GulpJS](http://gulpjs.com/)
  `npm install --global gulp-cli`


# install all package dependencies
`npm install`

# Audit package vunerabilities
`npm audit fix`

# run gulp
`gulp`

This should open your browser at http://localhost:3000 and start coding. With the commands above, you have everything to start.

## Customise the styles

This solution provides 3 pages and WA Government Styles

- index.html
- signin.html
- register.html

Also the basic portal less files.

If your developing a custom portal it's recommended to remove the theme.less and theme.css from this solution and the main portal.

Start by making initial style changes in the Bootstrap `src/less/_variables.less` file to configure colours, font-sizes, padding etc... for more about customising Bootstrap https://getbootstrap.com/docs/3.4/customize/

