module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        "eslint:recommended",
        "plugin:vue/vue3-essential",
        "plugin:@typescript-eslint/recommended"
    ],
    parserOptions: {
        parser: "@typescript-eslint/parser",
        ecmaVersion: "latest",
        sourceType: "module"
    },
    rules: {
        "vue/multi-word-component-names": "off", // Allows single-word component names
        "@typescript-eslint/no-explicit-any": "off", // Allows 'any' type
        "@typescript-eslint/no-unused-vars": "warn", // Warns on unused variables
        "@typescript-eslint/no-var": "true", // let and const only
        "@typescript-eslint/max-depth": 5,
        "@typescript-eslint/default-case": true,
        "@typescript-eslint/default-case-last": true,
        "@typescript-eslint/curly": true,
        "@typescript-eslint/no-use-before-define": true,
        "@typescript-eslint/use-isnan": true,
        "@typescript-eslint/valid-typeof": true,
    }
};