<p align="center"><img src="https://user-images.githubusercontent.com/46904553/63501036-bd5faa00-c4ec-11e9-9ffc-3d5dcfb08762.jpg"></p>

# MantiCore Xenovia

MantiCore is a group of polished and time-tested templates for CRM-like projects. Xenovia build is a training field for next packs of MantiCore.

## Structure

<ul>
  <li>Laravel</li>
  <li>Swagger</li>
  <li>LaraStan</li>
  <li>VueJS</li>
  <li>ESLint</li>
  <li>Bootstrap</li>
  <li>Authorization\User management</li>
</ul>

## Installation

*Configurate your .env*

composer install

php artisan key:generate

php artisan migrate

php artisan passport:install

copy token to blade meta named "client secret"

php artisan storage:link

npm install

php artisan serve
