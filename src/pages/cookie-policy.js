import Head from "next/head";
import { Container, Row, Col } from "react-bootstrap";

import { LayoutOne } from "../components/Layout";
// import { prerender } from "../lib/prerendering";
import { metaTag, ogData, jsonldFullData } from "../lib/seo";

// import bannedIPs from "../data/bannedIPs";

const CookiePolicy = () => {
  return (
    <LayoutOne>
      {/* Page Title */}
      <Head>
        <title>Cookie Policy | 3d Infinite</title>
        {metaTag("description", "We use cookies on the website http://3dinfinite.com (“3dinfinite”). This cookie policy explains in detail what cookies we use and the purposes for which they are used. If you do not agree with our use of cookies, please disable your cookies as described in the section 5 “Disabling cookies”. If you decline non-essential cookies, the full functionality of 3dinfinite may not be available and you may not be able to enjoy the enhanced user experience.")}
        {metaTag("keywords", "3dinfinite, cookie, policy, quesions")}
        {ogData({
          title: `Cookie Policy | 3d Infinite`,
          description: "We use cookies on the website http://3dinfinite.com (“3dinfinite”). This cookie policy explains in detail what cookies we use and the purposes for which they are used. If you do not agree with our use of cookies, please disable your cookies as described in the section 5 “Disabling cookies”. If you decline non-essential cookies, the full functionality of 3dinfinite may not be available and you may not be able to enjoy the enhanced user experience.",
          url: `${process.env.PUBLIC_BASE_URL}/cookie-policy`,
          images: `${process.env.PUBLIC_BASE_URL}/assets/images/3d-infinite-logo.png`,
        })}
        {jsonldFullData({
          type: "article",
          breadcrumbs: [
            {
              id: process.env.PUBLIC_BASE_URL,
              name: "Home",
            },
            {
              id: `${process.env.PUBLIC_BASE_URL}/cookie-policy`,
              name: "Cookie Policy",
            },
          ],
          url: `${process.env.PUBLIC_BASE_URL}/cookie-policy`,
          title: "Cookie Policy | 3d Infinite",
          description: "We use cookies on the website http://3dinfinite.com (“3dinfinite”). This cookie policy explains in detail what cookies we use and the purposes for which they are used. If you do not agree with our use of cookies, please disable your cookies as described in the section 5 “Disabling cookies”. If you decline non-essential cookies, the full functionality of 3dinfinite may not be available and you may not be able to enjoy the enhanced user experience.",
          image: [
            `${process.env.PUBLIC_BASE_URL}/assets/images/3d-infinite-logo.png`,
          ],
        })}
      </Head>

      {/* about content */}
      <div className="cookie-policy space-mb--r130">
        <div className="section-title-container space-mb--40">
          <Container>
            <Row>
              <Col lg={12} className="ml-auto mr-auto">
                <div className="c49">
                  <div>
                    <p className="c7 c53">
                      <span className="c12"></span>
                    </p>
                  </div>
                  <p className="c7 c59">
                    <span className="c64"></span>
                  </p>
                  <p className="c21">
                    <span className="c22">3dinfinite Cookie Policy</span>
                  </p>
                  <p className="c21">
                    <span className="c8">Effective date: </span>
                    <span className="c12">30 September 2020</span>
                  </p>
                  <p className="c21 my-3">
                    <span className="c12 font-italic">
                      By accessing or using 3dinfinite, you agree to be legally
                      bound by this cookie policy. Please read this document
                      carefully. If you do not agree with one or more provisions
                      of this document, you should not use 3dinfinite.{" "}
                    </span>
                  </p>
                  <p className="c6">
                    <span className="c12">We use cookies on the </span>
                    <span className="c3">website </span>
                    <span className="c26">
                      <a
                        className="c37"
                        href={`https://www.google.com/url?q=${process.env.PUBLIC_BASE_URL}/&amp;sa=D&amp;source=editors&amp;ust=1623006286258000&amp;usg=AOvVaw0-TrjjRLaN85v1gnnCU8d5`}
                      >
                        3dinfinite.com
                      </a>
                    </span>
                    <span className="c3">&nbsp;(“</span>
                    <span className="c8">3dinfinite</span>
                    <span className="c3">”)</span>
                    <span className="c12">
                      . This cookie policy explains in detail what cookies we
                      use and the purposes for which they are used. If you do
                      not agree with our use of cookies, please disable your
                      cookies as described in the section 5 “Disabling cookies”.
                      If you decline non-essential cookies, the full
                      functionality of 3dinfinite may not be available and you
                      may not be able to enjoy the enhanced user experience.{" "}
                    </span>
                  </p>
                  <p className="c27 c7">
                    <span className="c12"></span>
                  </p>
                  <p className="c27 c9">
                    <span className="c4">
                      1. Responsible entity (data controller){" "}
                    </span>
                  </p>
                  <p className="c6">
                    <span className="c12">
                      The data controller that is responsible for the processing
                      of personal data through 3dinfinite is 3D Universe s.r.o.
                      having a registered business address at Sumperk, Pod
                      Senovou 2245/40, 78701, the Czech Republic and the company
                      ID 09040269 (“
                    </span>
                    <span className="c8">we</span>
                    <span className="c12">”, “</span>
                    <span className="c8">us</span>
                    <span className="c12">”, or “</span>
                    <span className="c8">our</span>
                    <span className="c12">”). </span>
                  </p>
                  <p className="c27 c7">
                    <span className="c12 c60"></span>
                  </p>
                  <p className="c6 c9">
                    <span className="c4">
                      2. General information about cookies{" "}
                    </span>
                  </p>
                  <p className="c6">
                    <span className="c12">
                      A cookie is a small piece of data typically consisting of
                      letters and numbers. When you visit a website, the website
                      may send a cookie to your browser. Subsequently, the
                      browser may store the cookie on your computer or mobile
                      device for certain period of time. Cookies are designed to
                      allow the recognition of your device and collection of
                      certain information about your use of a website. Thus,
                      over time, cookies allow websites to “remember” your
                      actions and preferences. There are several types of
                      cookies, namely, (i) persistent cookies, which remain
                      valid until deleted by you, (ii) cookies that remain valid
                      until their expiration date, and (iii) session cookies
                      that are stored on a web browser and remain valid until
                      the moment the browser is closed. Cookies may also be (i)
                      first-party cookies (set by the website itself) and (ii)
                      third-party cookies (placed by third-party websites).
                    </span>
                  </p>
                  <p className="c6 c7">
                    <span className="c12"></span>
                  </p>
                  <p className="c6 c9">
                    <span className="c4">3. A list of our cookies</span>
                  </p>
                  <p className="c6">
                    <span className="c12">
                      We may different types of cookies on 3dinfinite,
                      including:{" "}
                    </span>
                  </p>
                  <ul className="c30 lst-kix_list_2-0 start">
                    <li className="c6 c23 li-bullet-0">
                      <span className="c8">
                        Essential technical (strictly necessary) cookies{" "}
                      </span>
                      <span className="c12">
                        that are essential to ensure the correct functioning of
                        3dinfinite, and to provide the services requested by
                        you;{" "}
                      </span>
                    </li>
                    <li className="c6 c23 li-bullet-0">
                      <span className="c8">Preference cookies </span>
                      <span className="c12">
                        that record information about the choices that you make
                        on 3dinfinite;{" "}
                      </span>
                    </li>
                    <li className="c6 c23 li-bullet-0">
                      <span className="c8">Marketing cookies</span>
                      <span className="c12">
                        &nbsp;that allow us to create, implement, and examine
                        our marketing campaigns. Such cookies allow us to reach
                        the right customers, analyse the productivity of our
                        marketing campaigns, and offer you personalised
                        advertisement; and
                      </span>
                    </li>
                    <li className="c6 c23 li-bullet-0">
                      <span className="c8">Statistics cookies</span>
                      <span className="c12">
                        &nbsp;that allow us to generate statistical reports
                        about how you use 3dinfinite.
                        <br />
                      </span>
                    </li>
                  </ul>
                  <p className="c6">
                    <span className="c12">
                      Below, you can find a list of cookies that we use on
                      3dinfinite, including their purpose and expiration time:
                    </span>
                  </p>
                  <p className="c6 c7">
                    <span className="c4">
                      <br />
                    </span>
                  </p>
                  <a id="t.a819551cfcd1930eb4127089dcdb84009511d493"></a>
                  <a id="t.0"></a>
                  <table className="c50">
                    <tbody>
                      <tr className="c51">
                        <td className="c43" colspan="5" rowspan="1">
                          <p className="c0 c32">
                            <span className="c1">
                              Essential technical cookies
                            </span>
                          </p>
                        </td>
                      </tr>
                      <tr className="c11">
                        <td className="c20 c34" colspan="1" rowspan="1">
                          <p className="c0">
                            <span className="c1">Name</span>
                          </p>
                        </td>
                        <td className="c28" colspan="1" rowspan="1">
                          <p className="c0">
                            <span className="c1">Type</span>
                          </p>
                        </td>
                        <td className="c14 c34" colspan="1" rowspan="1">
                          <p className="c0">
                            <span className="c1">Provider</span>
                          </p>
                          <p className="c0">
                            <span className="c1">(location)</span>
                          </p>
                        </td>
                        <td className="c35 c34" colspan="1" rowspan="1">
                          <p className="c0">
                            <span className="c1">Expiration</span>
                          </p>
                        </td>
                        <td className="c10" colspan="1" rowspan="1">
                          <p className="c0 c32">
                            <span className="c1">Purpose</span>
                          </p>
                        </td>
                      </tr>
                      <tr className="c57">
                        <td className="c20" colspan="1" rowspan="1">
                          <p className="c2">
                            <span className="c12"></span>
                          </p>
                        </td>
                        <td className="c33" colspan="1" rowspan="1">
                          <p className="c2">
                            <span className="c12"></span>
                          </p>
                        </td>
                        <td className="c14" colspan="1" rowspan="1">
                          <p className="c2">
                            <span className="c12"></span>
                          </p>
                        </td>
                        <td className="c35" colspan="1" rowspan="1">
                          <p className="c2">
                            <span className="c12"></span>
                          </p>
                        </td>
                        <td className="c40" colspan="1" rowspan="1">
                          <p className="c2">
                            <span className="c12"></span>
                          </p>
                        </td>
                      </tr>
                      <tr className="c52">
                        <td className="c43" colspan="5" rowspan="1">
                          <p className="c0 c32">
                            <span className="c1">Preference cookies</span>
                          </p>
                        </td>
                      </tr>
                      <tr className="c44">
                        <td className="c20 c34" colspan="1" rowspan="1">
                          <p className="c0">
                            <span className="c1">Name</span>
                          </p>
                        </td>
                        <td className="c28" colspan="1" rowspan="1">
                          <p className="c0">
                            <span className="c1">Type</span>
                          </p>
                        </td>
                        <td className="c14 c34" colspan="1" rowspan="1">
                          <p className="c0">
                            <span className="c1">Provider</span>
                          </p>
                          <p className="c0">
                            <span className="c1">(location)</span>
                          </p>
                        </td>
                        <td className="c35 c34" colspan="1" rowspan="1">
                          <p className="c0">
                            <span className="c1">Expiration</span>
                          </p>
                        </td>
                        <td className="c10" colspan="1" rowspan="1">
                          <p className="c0 c32">
                            <span className="c1">Purpose</span>
                          </p>
                        </td>
                      </tr>
                      <tr className="c29">
                        <td className="c20" colspan="1" rowspan="1">
                          <p className="c2">
                            <span className="c12"></span>
                          </p>
                        </td>
                        <td className="c33" colspan="1" rowspan="1">
                          <p className="c2">
                            <span className="c12"></span>
                          </p>
                        </td>
                        <td className="c14" colspan="1" rowspan="1">
                          <p className="c2">
                            <span className="c12"></span>
                          </p>
                        </td>
                        <td className="c35" colspan="1" rowspan="1">
                          <p className="c2">
                            <span className="c12"></span>
                          </p>
                        </td>
                        <td className="c40" colspan="1" rowspan="1">
                          <p className="c2">
                            <span className="c12"></span>
                          </p>
                        </td>
                      </tr>
                      <tr className="c52">
                        <td className="c43" colspan="5" rowspan="1">
                          <p className="c0 c32">
                            <span className="c1">Marketing cookies</span>
                          </p>
                        </td>
                      </tr>
                      <tr className="c44">
                        <td className="c20 c34" colspan="1" rowspan="1">
                          <p className="c0">
                            <span className="c1">Name</span>
                          </p>
                        </td>
                        <td className="c28" colspan="1" rowspan="1">
                          <p className="c0">
                            <span className="c1">Type</span>
                          </p>
                        </td>
                        <td className="c14 c34" colspan="1" rowspan="1">
                          <p className="c0">
                            <span className="c1">Provider</span>
                          </p>
                          <p className="c0">
                            <span className="c1">(location)</span>
                          </p>
                        </td>
                        <td className="c35 c34" colspan="1" rowspan="1">
                          <p className="c0">
                            <span className="c1">Expiration</span>
                          </p>
                        </td>
                        <td className="c10" colspan="1" rowspan="1">
                          <p className="c0 c32">
                            <span className="c1">Purpose</span>
                          </p>
                        </td>
                      </tr>
                      <tr className="c29">
                        <td className="c20" colspan="1" rowspan="1">
                          <p className="c2">
                            <span className="c12"></span>
                          </p>
                        </td>
                        <td className="c33" colspan="1" rowspan="1">
                          <p className="c2">
                            <span className="c12"></span>
                          </p>
                        </td>
                        <td className="c14" colspan="1" rowspan="1">
                          <p className="c2">
                            <span className="c12"></span>
                          </p>
                        </td>
                        <td className="c35" colspan="1" rowspan="1">
                          <p className="c2">
                            <span className="c12"></span>
                          </p>
                        </td>
                        <td className="c40" colspan="1" rowspan="1">
                          <p className="c2">
                            <span className="c12"></span>
                          </p>
                        </td>
                      </tr>
                      <tr className="c48">
                        <td className="c43" colspan="5" rowspan="1">
                          <p className="c0 c32">
                            <span className="c1">Statistics cookies</span>
                          </p>
                        </td>
                      </tr>
                      <tr className="c11">
                        <td className="c20 c34" colspan="1" rowspan="1">
                          <p className="c0">
                            <span className="c66">Name</span>
                          </p>
                        </td>
                        <td className="c28" colspan="1" rowspan="1">
                          <p className="c0">
                            <span className="c1">Type</span>
                          </p>
                        </td>
                        <td className="c14 c34" colspan="1" rowspan="1">
                          <p className="c0">
                            <span className="c1">Provider</span>
                          </p>
                        </td>
                        <td className="c35 c34" colspan="1" rowspan="1">
                          <p className="c0">
                            <span className="c1">Expiration</span>
                          </p>
                        </td>
                        <td className="c40 c34" colspan="1" rowspan="1">
                          <p className="c0">
                            <span className="c1">Purpose</span>
                          </p>
                        </td>
                      </tr>
                      <tr className="c15">
                        <td className="c20" colspan="1" rowspan="1">
                          <p className="c31">
                            <span className="c46">_ga </span>
                          </p>
                        </td>
                        <td className="c33" colspan="1" rowspan="1">
                          <p className="c31">
                            <span className="c24">First-party HTTP cookie</span>
                          </p>
                        </td>
                        <td className="c14" colspan="1" rowspan="1">
                          <p className="c6">
                            <span className="c13">
                              <a
                                className="c37"
                                href={`https://www.google.com/url?q=${process.env.PUBLIC_BASE_URL}/&amp;sa=D&amp;source=editors&amp;ust=1623006286276000&amp;usg=AOvVaw2nwNL2KRxFwVY3s2SC9-sr`}
                              >
                                3dinfinite.com
                              </a>
                            </span>
                          </p>
                          <p className="c31">
                            <span className="c18">(Czech Republic)</span>
                          </p>
                        </td>
                        <td className="c35" colspan="1" rowspan="1">
                          <p className="c31">
                            <span className="c18">2 years</span>
                          </p>
                        </td>
                        <td className="c40" colspan="1" rowspan="1">
                          <p className="c31">
                            <span className="c25">
                              The cookie is used to set a unique ID that is used
                              to generate statistical data on how you use
                              3dinfinite.
                            </span>
                          </p>
                        </td>
                      </tr>
                      <tr className="c42">
                        <td className="c20" colspan="1" rowspan="1">
                          <p className="c31">
                            <span className="c45">_gat </span>
                          </p>
                        </td>
                        <td className="c33" colspan="1" rowspan="1">
                          <p className="c31">
                            <span className="c24">First-party HTTP cookie</span>
                          </p>
                        </td>
                        <td className="c14" colspan="1" rowspan="1">
                          <p className="c6">
                            <span className="c13">
                              <a
                                className="c37"
                                href={`https://www.google.com/url?q=${process.env.PUBLIC_BASE_URL}/&amp;sa=D&amp;source=editors&amp;ust=1623006286277000&amp;usg=AOvVaw1rKG_OBupXQppRVcRz-QQ2`}
                              >
                                3dinfinite.com
                              </a>
                            </span>
                          </p>
                          <p className="c31">
                            <span className="c18">(Czech Republic)</span>
                          </p>
                        </td>
                        <td className="c35" colspan="1" rowspan="1">
                          <p className="c31">
                            <span className="c18">1 day</span>
                          </p>
                        </td>
                        <td className="c40" colspan="1" rowspan="1">
                          <p className="c31">
                            <span className="c36">
                              The cookie is used by Google Analytics to throttle
                              request rate.
                            </span>
                          </p>
                        </td>
                      </tr>
                      <tr className="c65">
                        <td className="c20" colspan="1" rowspan="1">
                          <p className="c31">
                            <span className="c45">_gid </span>
                          </p>
                        </td>
                        <td className="c33" colspan="1" rowspan="1">
                          <p className="c31">
                            <span className="c24">First-party HTTP cookie</span>
                          </p>
                        </td>
                        <td className="c14" colspan="1" rowspan="1">
                          <p className="c6">
                            <span className="c13">
                              <a
                                className="c37"
                                href={`https://www.google.com/url?q=${process.env.PUBLIC_BASE_URL}/&amp;sa=D&amp;source=editors&amp;ust=1623006286279000&amp;usg=AOvVaw2YlzCVQoRG3T1SggnZ_KUW`}
                              >
                                3dinfinite.com
                              </a>
                            </span>
                          </p>
                          <p className="c31">
                            <span className="c18">(Czech Republic)</span>
                          </p>
                          <p className="c31">
                            <span className="c18">(United States)</span>
                          </p>
                        </td>
                        <td className="c35" colspan="1" rowspan="1">
                          <p className="c31">
                            <span className="c18">1 day</span>
                          </p>
                        </td>
                        <td className="c40" colspan="1" rowspan="1">
                          <p className="c31">
                            <span className="c25">
                              The cookie is used to set a unique ID that is used
                              to generate statistical data on how you use
                              3dinfinite.
                            </span>
                          </p>
                        </td>
                      </tr>
                      <tr className="c42">
                        <td className="c20" colspan="1" rowspan="1">
                          <p className="c2">
                            <span className="c12"></span>
                          </p>
                        </td>
                        <td className="c33" colspan="1" rowspan="1">
                          <p className="c2">
                            <span className="c12"></span>
                          </p>
                        </td>
                        <td className="c14" colspan="1" rowspan="1">
                          <p className="c2">
                            <span className="c12"></span>
                          </p>
                        </td>
                        <td className="c35" colspan="1" rowspan="1">
                          <p className="c2">
                            <span className="c12"></span>
                          </p>
                        </td>
                        <td className="c40" colspan="1" rowspan="1">
                          <p className="c2">
                            <span className="c12"></span>
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="c7 c56">
                    <span className="c4"></span>
                  </p>
                  <p className="c55">
                    <span className="c12">
                      <br />
                    </span>
                    <span className="c4">4. Cookie consent</span>
                  </p>
                  <p className="c6">
                    <span className="c12">
                      When you visit 3dinfinite for the first time, we will ask
                      you to provide us with your consent to our use of cookies
                      via a cookie consent banner. If you do not provide your
                      consent, we will not serve you our non-essential cookies.
                      Please note that we may not be able to provide you with
                      the best possible user experience if not all cookies are
                      enabled.
                    </span>
                  </p>
                  <p className="c7 c62">
                    <span className="c12"></span>
                  </p>
                  <p className="c27 c9">
                    <span className="c4">5. Disabling cookies</span>
                  </p>
                  <p className="c6">
                    <span className="c12">
                      When we ask you to provide your consent to our use of
                      non-essential cookies, you have the freedom not to provide
                      such consent. If you would like to refuse our use of
                      non-essential cookies, you can do it at any time by
                      declining cookies in your browser or device. For more
                      information, you can consult the cookie management
                      instructions of your browser:
                    </span>
                  </p>
                  <ul className="c30 lst-kix_list_4-0 start">
                    <li className="c6 c47 li-bullet-1">
                      <span className="c8">Apple Safari:</span>
                      <span className="c12">&nbsp;</span>
                      <span className="c26">
                        <a
                          className="c37"
                          href="https://www.google.com/url?q=https://support.apple.com/en-gb/guide/safari/manage-cookies-and-website-data-sfri11471/mac&amp;sa=D&amp;source=editors&amp;ust=1623006286283000&amp;usg=AOvVaw3DYkGBXrHDsdrsj963QxlV"
                        >
                          https://support.apple.com/en-gb/guide/safari/manage-cookies-and-website-data-sfri11471/mac
                        </a>
                      </span>
                    </li>
                    <li className="c6 c47 li-bullet-1">
                      <span className="c8">Google Chrome: </span>
                      <span className="c26">
                        <a
                          className="c37"
                          href="https://www.google.com/url?q=https://support.google.com/chrome/answer/95647&amp;sa=D&amp;source=editors&amp;ust=1623006286283000&amp;usg=AOvVaw1xkti64s0OL0QUUU_1j83g"
                        >
                          https://support.google.com/chrome/answer/95647
                        </a>
                      </span>
                      <span className="c12">&nbsp;</span>
                    </li>
                    <li className="c6 c47 li-bullet-1">
                      <span className="c8">Firefox:</span>
                      <span className="c12">&nbsp;</span>
                      <span className="c26">
                        <a
                          className="c37"
                          href="https://www.google.com/url?q=https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences&amp;sa=D&amp;source=editors&amp;ust=1623006286284000&amp;usg=AOvVaw2p4G-awVpNfqfdnfuKwXCy"
                        >
                          https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences
                        </a>
                      </span>
                      <span className="c12">&nbsp;</span>
                    </li>
                    <li className="c6 c47 li-bullet-1">
                      <span className="c8">Internet Explorer:</span>
                      <span className="c12">&nbsp;</span>
                      <span className="c26">
                        <a
                          className="c37"
                          href="https://www.google.com/url?q=https://support.microsoft.com/en-gb/help/17442/windows-internet-explorer-delete-manage-cookies&amp;sa=D&amp;source=editors&amp;ust=1623006286284000&amp;usg=AOvVaw3xa9RIa4DPTMfqqp2F0l0y"
                        >
                          https://support.microsoft.com/en-gb/help/17442/windows-internet-explorer-delete-manage-cookies
                        </a>
                      </span>
                      <span className="c12">&nbsp;</span>
                    </li>
                    <li className="c6 c47 li-bullet-2">
                      <span className="c8">Microsoft Edge:</span>
                      <span className="c12">&nbsp;</span>
                      <span className="c26">
                        <a
                          className="c37"
                          href="https://www.google.com/url?q=https://support.microsoft.com/en-us/help/4468242/microsoft-edge-browsing-data-and-privacy-microsoft-privacy&amp;sa=D&amp;source=editors&amp;ust=1623006286285000&amp;usg=AOvVaw1XiIEZh7aIhrQT6CuKB-bQ"
                        >
                          https://support.microsoft.com/en-us/help/4468242/microsoft-edge-browsing-data-and-privacy-microsoft-privacy
                        </a>
                      </span>
                      <span className="c12">&nbsp;</span>
                    </li>
                  </ul>
                  <p className="c9 c7 c27">
                    <span className="c4"></span>
                  </p>
                  <p className="c27 c9">
                    <span className="c4">6. Google Analytics</span>
                  </p>
                  <p className="c6">
                    <span className="c12">
                      To analyse your use of 3dinfinite, we use Google
                      Analytics, the business analytics service provided by
                      Google LLC located in the United States (“
                    </span>
                    <span className="c8">Google</span>
                    <span className="c12">
                      ”). Google generates statistical information by means of
                      cookies and creates reports about your use of 3dinfinite.
                      The cookies served by Google Analytics are anonymous
                      first-party cookies (please refer to section 3 for more
                      information) that do not allow us to identify you in any
                      manner. The information generated by cookies will be
                      transmitted to and stored by Google on servers in the
                      United States. To ensure your privacy, your IP address
                      will be anonymised and Google will not combine your IP
                      address with other information Google holds about you.
                      Thus, Google will not be able to identify you. In certain
                      cases (e.g., when required by law or when third parties
                      conduct services on behalf of Google), Google may transfer
                      the information to third parties. For more information
                      about Google Analytics’ privacy practices, please visit{" "}
                    </span>
                    <span className="c26">
                      <a
                        className="c37"
                        href="https://www.google.com/url?q=https://support.google.com/analytics/answer/6004245&amp;sa=D&amp;source=editors&amp;ust=1623006286285000&amp;usg=AOvVaw0SnUJDXh6dHpk3zhN4O6dw"
                      >
                        https://support.google.com/analytics/answer/6004245
                      </a>
                    </span>
                    <span className="c12">. </span>
                  </p>
                  <p className="c6">
                    <span className="c12">
                      If you would like to opt out from Google Analytics, you
                      can do so by installing a Google Analytics opt-out browser
                      add-on available at{" "}
                    </span>
                    <span className="c26">
                      <a
                        className="c37"
                        href="https://www.google.com/url?q=https://tools.google.com/dlpage/gaoptout?hl%3Den&amp;sa=D&amp;source=editors&amp;ust=1623006286285000&amp;usg=AOvVaw0qtjAnYBQh8OmJZmPqv3vE"
                      >
                        https://tools.google.com/dlpage/gaoptout?hl=en
                      </a>
                    </span>
                    <span className="c12">. </span>
                  </p>
                  <p className="c6 c7">
                    <span className="c12"></span>
                  </p>
                  <p className="c27 c9">
                    <span className="c4">7. Contact</span>
                  </p>
                  <p className="c27">
                    <span className="c12">
                      If you have any questions about this cookie policy, please
                      contact us:
                    </span>
                  </p>
                  <p className="c16">
                    <span className="c8">Email:</span>
                    <span className="c12">&nbsp;info@3dinfinite.com</span>
                  </p>
                  <p className="c16">
                    <span className="c8">Postal address: </span>
                    <span className="c12">
                      3D Universe s.r.o., Sumperk, Pod Senovou 2245/40, 78701,
                      the Czech Republic
                    </span>
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </LayoutOne>
  );
};

export async function getStaticProps(context) {
  return {
    props: {},
  };
}

export default CookiePolicy;
