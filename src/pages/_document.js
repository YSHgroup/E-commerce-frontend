import Document, { Html, Head, Main, NextScript } from "next/document";
// import basicAuthMiddleware from "nextjs-basic-auth-middleware";
import { metaTag } from "../lib/seo";

export default class MyDocument extends Document {
  static async getInitialProps(context) {
    let pageProps = null;
    let res = context.res;
    const originalRenderPage = context.renderPage;
    context.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => {
          pageProps = props.pageProps;
          return <App {...props} />;
        },
        enhanceComponent: (Component) => Component,
      });

    const initialProps = await Document.getInitialProps(context);

    return { ...initialProps, pageProps, res };
  }

  render() {
    const { pageProps, res } = this.props;

    if (pageProps && pageProps.renderedHtml) {
      console.log("doc print rendered data");
      res.setHeader("Content-Type", "text/html");
      res.write(pageProps.renderedHtml);
      res.end();
      return null;
    }
    if (!pageProps) {
      console.log("pageProps is null, total props:");
      console.log(this.props);
    }
    console.log("doc no rendered data");
    return (
      <Html lang="en">
        <Head>
          <title>3D Infinite</title>
          {metaTag("application-name", "3dinfinite")}
          {metaTag("application-url", `${process.env.PUBLIC_BASE_URL}`)}
          {metaTag("image", `${process.env.PUBLIC_BASE_URL}/assets/images/3d-infinite-logo.png`)}
          <link rel="icon" href={process.env.PUBLIC_BASE_URL + "/favicon.ico"} />
          <link rel="canonical" href={`${process.env.PUBLIC_BASE_URL}/contact`} />
          <link
            rel="shortcut icon"
            href={`${process.env.PUBLIC_BASE_URL}/assets/images/3d-infinite-logo.png`}
            type="image/x-icon"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
            rel="stylesheet"
          ></link>
          <link rel="preconnect" href="https://fonts.gstatic.com"></link>
          <link
            href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
            rel="stylesheet"
          ></link>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}', {
                  send_page_view: false,
                });
              `,
            }}
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
