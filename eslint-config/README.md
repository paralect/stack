# ESLint config

ESLint configuration. Currently based on [eslint-config-airbnb](https://github.com/airbnb/javascript).

### Usage

Our default export contains all of our ESLint rules, including ECMAScript 6+ and React. It requires `eslint`.

1. Install the correct versions of each package, which are listed by the command:
```bash
npm info "eslint-config-airbnb@latest" peerDependencies
```

Linux/OSX users can run
```bash
(
  export PKG=eslint-config-airbnb;
  npm info "$PKG@latest" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install --save-dev "$PKG@latest"
)
```

Which produces and runs a command like:
```bash
npm install --save-dev @paralect/eslint-config eslint@^#.#.#
```

Windows users can either install all the peer dependencies manually, or use the [install-peerdeps](https://github.com/nathanhleung/install-peerdeps) cli tool.
```bash
npm install -g install-peerdeps
install-peerdeps --dev @paralect/eslint-config
```

The cli will produce and run a command like:
```bash
npm install --save-dev @paralect/eslint-config eslint@^#.#.#
```

2. Add `"extends": "airbnb"` to your .eslintrc
```javascript
module.exports = {
  "extends": "@paralect/eslint-config"
}
```

This configuration of the ESLint can be changed. See how to configure ESLint on the [official site](https://eslint.org/docs/user-guide/configuring).
