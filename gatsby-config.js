const path = require('path')

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})


module.exports = {
  siteMetadata: {
    title: `Great Place to Shop`,
    description: `Together lets discover beauty within each other`,
    author: `@asadnisar98`,
  },
  plugins: [


  {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries: [
          {
            query: `
                {
              allShopifyProduct {
                nodes {
                  handle
                  title
                  objectID: id
                  description
                  variants {
                    price
                    image {
                    localFile {
                    childImageSharp {
                      fluid {
                        src
           }
         }
       }
                  }
                }
              }
            }
          }
          `,
            transformer: ({
              data: {
                allShopifyProduct: { nodes }
              }
            }) =>
              nodes.map(
                ({ title, id, handle, description, variants, ...rest }) => ({

                  title,
                  objectID: id,
                  handle,
                  description,
                  variants,
                  ...rest,

                })
              ),
            indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME
          }
        ]
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-transition-link`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },

    {
        resolve: "gatsby-plugin-web-font-loader",
        options: {
          custom: {
            families: ["JostRomanSemiBold, JostRomanMedium, LoraRegular, JostRomanRegular, JostLight"],
            urls: ["fonts/fonts.css"],
          },
        },
      },
      {
   resolve: `gatsby-transformer-remark`,
   options: {
     plugins: [`gatsby-remark-responsive-iframe`],
   },
 },

    {
    resolve: `gatsby-plugin-nprogress`,
    options: {
      // Setting a color is optional.
      color: `tomato`,
      // Disable the loading spinner.
      showSpinner: false,
    },
  },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-layout`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-shopify`,
      options: {
        // The domain name of your Shopify shop. This is required.
        // Example: 'gatsby-source-shopify-test-shop' if your Shopify address is
        // 'gatsby-source-shopify-test-shop.myshopify.com'.
        shopName: process.env.SHOP_NAME,

        // An API access token to your Shopify shop. This is required.
        // You can generate an access token in the "Manage private apps" section
        // of your shop's Apps settings. In the Storefront API section, be sure
        // to select "Allow this app to access your storefront data using the
        // Storefront API".
        // See: https://help.shopify.com/api/custom-storefronts/storefront-api/getting-started#authentication
        accessToken: process.env.SHOPIFY_ACCESS_TOKEN,

        // Set verbose to true to display a verbose output on `npm run develop`
        // or `npm run build`. This prints which nodes are being fetched and how
        // much time was required to fetch and process the data.
        // Defaults to true.
        verbose: true,
      },
    },
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        '~': path.join(__dirname, 'src/'),
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-134421805-1",
        anonymize: true,
        respectDNT: true,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
