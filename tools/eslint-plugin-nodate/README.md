# eslint-plugin-nodate

Disallow usage of new Date()

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-nodate`:

```
$ npm install eslint-plugin-nodate --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-nodate` globally.

## Usage

Add `nodate` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "nodate"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "nodate/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





