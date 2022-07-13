UROPA UI
============
[![Version](https://img.shields.io/github/package-json/v/progressive-identity/uropa-ui)](https://github.com/progressive-identity/uropa-ui) [![Licence](https://img.shields.io/github/license/progressive-identity/uropa-ui)](https://github.com/progressive-identity/uropa-ui/blob/main/LICENSE) [![Github issues](https://img.shields.io/github/issues/progressive-identity/uropa-ui)](https://github.com/progressive-identity/uropa-ui/issues)

https://uropa.alias.dev/

This website is an interface to helping you fill your ROPAs (Record Of Processing Activities). It uses
the [UROPA format](https://github.com/uropa-project/uropa) made by legal experts specialised in data protection law.

![TODO Preview1](https://github.com/progressive-identity/uropa-ui/blob/staging/public/preview-1.png)
![TODO Preview2](https://github.com/progressive-identity/uropa-ui/blob/staging/public/preview-2.png)
![TODO Preview3](https://github.com/progressive-identity/uropa-ui/blob/staging/public/preview-3.png)

---

## Features

- Generate a JSON file using the [UROPA format](https://github.com/uropa-project/uropa)
- The UROPA format has been made with legal experts specialised in data protection law
- By using this format you are making sure to have a complete and machine-readable ROPA (which mean it can be used by
  various software)
- Help you fill your ROPAs faster with automatic completion or predefined models
- Contains more than 10+ templates for you to start from (soon)
- Multi-languages : English, French (soon), Spanish (soon)
- We store absolutely NOTHING and there's no third party involves

---

## Feedback

If you have any suggestion you can send us a [mail](mailto:support@gdpr.dev?subject=[UropaUI]%20Feedback)
at `support@gdpr.dev`.

---

## Setup

We strongly suggest you to use the solution already hosted [here](https://uropa.alias.dev/).
By using it you are guarantees to always be on the latest version and benefit from the new features and fixes.
We store absolutely NOTHING and there's no third party involved.

Below are the steps to follow if you want to self host the product.

- Clone this repo and run `npm install` to install all the dependencies
- Create a `.env` file at the root of the project. The `.env.template` file contains the environment
  variables
  used
- After that you'll be able to start the application using the following command :

```shell
npm run dev
```

---

## Special Directories

### `public`

Contains your static files. Each file inside this directory is mapped to `/`.

Example: `/public/robots.txt` is mapped as `/robots.txt`.

### `components`

Contains the Vue.js components. More
details [here](https://vuejs.org/guide/essentials/component-basics.html).

### `composables`

Contains the Vue.js composables. More
details [here](https://vuejs.org/guide/reusability/composables.html#composables).

### `css`

Contains the css classes into their related files. Each file need to be individually imported
into `main.css`.

### `data`

The template subdirectory contains the JSON files that serves as a base when creating new elements. These JSON files
come from the [UROPA project](https://github.com/uropa-project/uropa).

There's also files that contains predefined data used to help the user by prefilling some fields (like the data
categories).

### `store`

Contains the file related to the store. More
details [here](https://pinia.vuejs.org/core-concepts/).


---

## License

> You can check out the full license [here](https://github.com/progressive-identity/uropa-ui/blob/main/LICENSE)

This project is licensed under the terms of the **MIT** license.
