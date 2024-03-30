import { conventionalCommitTypes } from 'commitlint-config-conventional'
import { types } from './.versionrc.json'

module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                ...conventionalCommitTypes.map(({ type }) => type),
                ...types.map(({ type }) => type),
            ],
        ],
    },
}
