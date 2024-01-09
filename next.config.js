/** @type {import('next').NextConfig} */

const i18nConfigFile = './src/config/i18n.ts';
// eslint-disable-next-line import/no-extraneous-dependencies,import/no-import-module-exports
const withNextIntl = require('next-intl/plugin')(i18nConfigFile);

const nextConfig = {};

module.exports = withNextIntl(nextConfig);
