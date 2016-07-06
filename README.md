# Pagar.me CLI

A simple CLI to make transactions and store it in sqlite

## Usage

Before using , make sure that the environment variables are ok

```
PAGARME_ENCRYPTION_KEY='ek_test_23sE62YiawX1y6EFJgMxlk16MT1cdA'
PAGARME_POSTBACK_URL='http://requestb.in/1kqehev1'
PAGARME_API_KEY='ek_test_Ec8KhxISQ1tug1b8bCGxC2nXfxqRmk'
PAGARME_DB_PATH='path/to/sqlite/database' # Default: ./src/models/database.sqlite
```

Install dependencies

```
npm install
```

Run:

```
npm start -- <option>
```

Options:

    -h, --help         output usage information
    -V, --version      output the version number
    -t, --transaction  Make a transaction
    -r, --report       See all transactions

Tests

```
npm test
```
