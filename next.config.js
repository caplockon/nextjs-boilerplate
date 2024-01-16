/** @type {import('next').NextConfig} */
const path = require('path')

const i18nConfigFile = './src/providers/i18n.ts'
// eslint-disable-next-line import/no-extraneous-dependencies,import/no-import-module-exports
const withNextIntl = require('next-intl/plugin')(i18nConfigFile)

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, '/src/styles')],
  },
}

module.exports = withNextIntl(nextConfig)
