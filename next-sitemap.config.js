/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://rgcabsperth.com.au', // ✅ Your live domain (no trailing slash)
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  sitemapSize: 5000,
  changefreq: 'monthly',
  priority: 0.7,
}
