import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        ignores: [
            'dist/**',
            'public/**',
            '*.config.{js,ts}',
            'vite.config.ts',
            '.react-router/**',
            'build/**',
            'api/_src/emails/*.js', // Compiled emails
        ],
    },
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: ['./tsconfig.json', './api/tsconfig.json'],
                tsconfigRootDir: import.meta.dirname,
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            react: reactPlugin,
            'react-hooks': reactHooksPlugin,
        },
        rules: {
            // Base JS hygiene and consistency
            'no-console': 'error',
            'no-var': 'error',
            'prefer-const': 'error',

            // React correctness
            'react/no-unknown-property': 'error',
            'react-hooks/exhaustive-deps': 'error',

            // Unused code handling
            // Turn off the base rule and use the TS-aware version.
            // Ignore unused args/vars prefixed with underscore.
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
            ],

            // Type safety
            // Keep types consistent and prevent "any".
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
            // Forces `import type` for type-only imports and avoids side-effect imports with `type`.
            '@typescript-eslint/consistent-type-imports': [
                'error',
                { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
            ],
            '@typescript-eslint/no-import-type-side-effects': 'error',

            // Keeps unions clean and avoids redundant or duplicated constituents.
            '@typescript-eslint/no-redundant-type-constituents': 'warn',
            '@typescript-eslint/no-duplicate-type-constituents': 'warn',

            // Avoids papering over real null/undefined issues and pointless assertions.
            '@typescript-eslint/no-non-null-assertion': 'error',
            '@typescript-eslint/no-unnecessary-type-assertion': 'warn',

            // Stops unsafe operations when any sneaks in from libraries or untyped code
            '@typescript-eslint/no-unsafe-assignment': 'error',
            '@typescript-eslint/no-unsafe-member-access': 'error',
            '@typescript-eslint/no-unsafe-call': 'error',
            '@typescript-eslint/no-unsafe-return': 'error',
            '@typescript-eslint/no-unsafe-argument': 'error',

            // Promises and async correctness
            // Catches unhandled promises, bad async callbacks, and invalid awaits.
            '@typescript-eslint/await-thenable': 'error',
            '@typescript-eslint/promise-function-async': 'warn',

            // Nullish and readonly preferences
            // Encourages better intent and fewer edge cases.
            '@typescript-eslint/prefer-nullish-coalescing': 'warn',
            '@typescript-eslint/prefer-readonly': 'warn',

            // Template string safety
            // Prevents accidental `[object Object]` and unsafe interpolation.
            '@typescript-eslint/restrict-template-expressions': [
                'error',
                {
                    allowNumber: true,
                    allowBoolean: true,
                    allowNullish: false,
                    allowAny: false,
                },
            ],
            '@typescript-eslint/no-base-to-string': 'warn',

            // Exhaustive checks
            // Forces you to handle all union members in switches.
            '@typescript-eslint/switch-exhaustiveness-check': 'error',
        },
    },
];
