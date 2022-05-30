module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@babel/eslint-parser',
        ecmaVersion: 2020,
        sourceType: 'module',
        requireConfigFile: false
    },
    extends: ['prettier'],
    plugins: [],
    // add your custom rules here
    rules: {
        semi: [2, 'never'],
        'comma-dangle': ['error', 'never'],
        "quotes": [2, "single", {"avoidEscape": true}]
    }
}
