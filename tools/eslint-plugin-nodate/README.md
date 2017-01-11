# eslint-plugin-nodate

Disallow usage of new Date()

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm install eslint --save-dev
```

Next, refer `eslint-plugin-nodate` in the package.json (devDependencies):

```
"eslint-plugin-nodate": "file:tools/eslint-plugin-nodate"
```

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
        "nodate/nodate": 2
    }
}
```

## Supported Rules

* nodate
