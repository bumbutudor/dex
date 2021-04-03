# DEX

## Installation

Clone the repo locally:

```sh
git clone https://github.com/...
cd dex
```

Install PHP dependencies:

```sh
composer install
```

Install NPM dependencies:

```sh
npm install
```

Live build assets:

```sh
npm run watch
```

Build assets:

```sh
npm run dev
```

Production build assets:
```sh
npm run prod
```

Setup configuration:

```sh
cp .env.example .env
```

Generate application key:

```sh
php artisan key:generate
```

Configure MySQL DB (/.env)

```sh
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD= 
```

Run database migrations:

```sh
php artisan migrate
```

Initialize the database with some data

```sh
php artisan db:seed
```

Run artisan server:

```sh
php artisan serve
```

You're ready to go! [DEX](http://127.0.0.1:8000/) in your browser, and login with:

- **Username:** tudor.bumbu@math.md
- **Password:** secret


## Credits
- Tudor Bumbu

### Credits for core crud app

- Original work by Jonathan Reinink (@reinink) and contributors
- Port to React by Lado Lomidze (@landish)
