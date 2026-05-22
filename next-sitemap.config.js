/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://pellisoft.es',
  generateRobotsTxt: false, // We manage robots.txt manually
  changefreq: 'monthly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/api/*', '/studio/*'],
}
