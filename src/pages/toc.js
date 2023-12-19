import Link from "next/link";
import Head from "next/head";
import { Container, Row, Col } from "react-bootstrap";

import { LayoutOne } from "../components/Layout";
// import { prerender } from "../lib/prerendering";
import { metaTag, ogData, jsonldFullData } from "../lib/seo";

// import bannedIPs from "../data/bannedIPs";

const About = () => {
  return (
    <LayoutOne>
      {/* Page Title */}
      <Head>
        <title>Terms of Use | 3d Infinite</title>
        {metaTag(
          "description",
          "By accessing or using 3dinfinite, you agree to be legally bound by these Terms. Please read the Terms carefully. If you do not agree with one or more provisions of these Terms, you should not use 3dinfinite."
        )}
        {metaTag("keywords", "3dinfinite, toc, terms of use, contact")}
        {ogData({
          title: "Terms of Use | 3d Infinite",
          description: "By accessing or using 3dinfinite, you agree to be legally bound by these Terms. Please read the Terms carefully. If you do not agree with one or more provisions of these Terms, you should not use 3dinfinite.",
          url: `${process.env.PUBLIC_BASE_URL}/toc`,
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
              id: `${process.env.PUBLIC_BASE_URL}/toc`,
              name: "Terms of Use",
            },
          ],
          title: "Terms of Use | 3d Infinite",
          url: `${process.env.PUBLIC_BASE_URL}/toc`,
          description: "By accessing or using 3dinfinite, you agree to be legally bound by these Terms. Please read the Terms carefully. If you do not agree with one or more provisions of these Terms, you should not use 3dinfinite.",
          image: [
            `${process.env.PUBLIC_BASE_URL}/assets/images/3d-infinite-logo.png`,
          ],
        })}
      </Head>

      {/* about content */}
      <div className="toc space-mb--r130">
        <div className="section-title-container space-mb--40">
          <Container>
            <Row>
              <Col lg={12} className="ml-auto mr-auto">
                <div className="c11 c54">
                  <p className="c17 c10">
                    <span className="c55">3dinfinite Terms of Use</span>
                  </p>
                  <p className="c17 c10">
                    <span className="c8">Last updated:</span>
                    <span className="c4">&nbsp;6 October 2020</span>
                  </p>
                  <p className="c17 c10 c44">
                    <span className="c4"></span>
                  </p>
                  <p className="c17 c10 c28">
                    <span className="c23">
                      By accessing or using 3dinfinite, you agree to be legally
                      bound by these Terms. Please read the Terms carefully. If
                      you do not agree with one or more provisions of these
                      Terms, you should not use 3dinfinite.
                    </span>
                  </p>
                  <p className="c17 c10 c44 c28">
                    <span className="c23"></span>
                  </p>
                  <p className="c17 c10">
                    <span className="c8">Contents of the Terms</span>
                  </p>
                  <p className="c17 c10 c28 c44">
                    <span className="c4"></span>
                  </p>
                  <ol className="" start="1">
                    <li className="c34 c10 li-bullet-0">
                      <span className="c16">GENERAL INFORMATION</span>
                    </li>
                  </ol>
                  <ol className="" start="2">
                    <li className="c10 c34 li-bullet-0">
                      <span className="c16">THE USER ACCOUNT</span>
                    </li>
                  </ol>
                  <ol className="c0" start="3">
                    <li className="c2 li-bullet-1">
                      <span className="c16">THE MODELS</span>
                    </li>
                    <li className="c2">
                      <span className="c16">
                        FEES, PAYMENTS, DELIVERY, AND RETURNS
                      </span>
                    </li>
                    <li className="c34 c10">
                      <span className="c16">ACCEPTABLE USE POLICY</span>
                    </li>
                  </ol>
                  <ol start="6">
                    <li className="c6">
                      <span className="c16">OUR INTELLECTUAL PROPERTY</span>
                    </li>
                  </ol>
                  <ol className="c0" start="7">
                    <li className="c10 c56 li-bullet-3">
                      <span className="c16">AVAILABILITY</span>
                    </li>
                  </ol>
                  <ol className="c0" start="8">
                    <li className="c2 li-bullet-1">
                      <span className="c16">DISCLAIMER OF WARRANTIES</span>
                    </li>
                  </ol>
                  <ol className="c0" start="9">
                    <li className="c2 li-bullet-1">
                      <span className="c16">LIMITATION OF LIABILITY</span>
                    </li>
                    <li className="c2 li-bullet-1">
                      <span className="c16">INDEMNIFICATION</span>
                    </li>
                    <li className="c2 li-bullet-1">
                      <span className="c16">SEVERABILITY</span>
                    </li>
                    <li className="c2 li-bullet-1">
                      <span className="c16">GOVERNING LAW AND DISPUTES</span>
                    </li>
                    <li className="c2 li-bullet-1">
                      <span className="c16">MISCELLANEOUS</span>
                    </li>
                    <li className="c2 li-bullet-1">
                      <span className="c16">CONTACT</span>
                    </li>
                  </ol>
                  <p className="c17 c10 c44 c28">
                    <span className="c23"></span>
                  </p>
                  <p className="c24 c10 c28">
                    <span className="c23"></span>
                  </p>
                  <ol className="c0 lst-kix_list_9-0 start" start="1">
                    <li className="c22 c10 li-bullet-4" id="h.gjdgxs">
                      <span className="c25">GENERAL INFORMATION</span>
                    </li>
                  </ol>
                  <ol className="c0 lst-kix_list_9-1 start" start="1">
                    <li className="c1 c10 li-bullet-5">
                      <span className="c4">
                        These 3dinfinite Terms of Use (the “
                      </span>
                      <span className="c8">Terms</span>
                      <span className="c4">
                        ”) is a legally binding agreement between the owner and
                        operator of the website{" "}
                      </span>
                      <span className="c4">
                        <a
                          className="c27"
                          href={`https://www.google.com/url?q=${process.env.PUBLIC_BASE_URL}/&amp;sa=D&amp;source=editors&amp;ust=1623007742655000&amp;usg=AOvVaw0uNGzjvmgLv33eMJ04k6Hn`}
                        >
                          3dinfinite.com
                        </a>
                      </span>
                      <span className="c4">
                        &nbsp;and the related services (collectively, “
                      </span>
                      <span className="c8">3dinfinite</span>
                      <span className="c4">
                        ”), namely, 3D Universe s.r.o. having a registered
                        business address at Sumperk, Pod Senovou 2245/40, 78701,
                        the Czech Republic and the company ID &nbsp;09040269 (“
                      </span>
                      <span className="c8">we</span>
                      <span className="c4">”, </span>
                      <span className="c8">us</span>
                      <span className="c4">” and “</span>
                      <span className="c8">our</span>
                      <span className="c4">
                        ”) and an individual user or entity (“
                      </span>
                      <span className="c8">you</span>
                      <span className="c4">”, “</span>
                      <span className="c8">your</span>
                      <span className="c4">”, “</span>
                      <span className="c8">user</span>
                      <span className="c4">”) accessing 3dinfinite. </span>
                    </li>
                    <li className="c1 c10 li-bullet-6">
                      <span className="c8">About 3dinfinite</span>
                      <span className="c4">
                        . 3dinfinite is an e-commerce platform that allows you
                        to purchase digital 3D models (the “
                      </span>
                      <span className="c8">Models</span>
                      <span className="c4">
                        ”) offered by registered 3D artists (the “
                      </span>
                      <span className="c8">Artists</span>
                      <span className="c4">”). &nbsp;</span>
                    </li>
                    <li className="c1 c10 li-bullet-5">
                      <span className="c8">License to use 3dinfinite.</span>
                      <span className="c4">
                        &nbsp;We grant you a personal, revocable, non-exclusive,
                        non-transferable and limited license to use 3dinfinite
                        pursuant to these Terms. You are not allowed to use
                        3dinfinite in countries where it may be restricted or
                        prohibited by local legislation.
                      </span>
                    </li>
                  </ol>
                  <ol className="c0 lst-kix_list_10-1 start" start="1">
                    <li className="c1 c10 c11 li-bullet-7">
                      <span className="c8">Minors.</span>
                      <span className="c4">
                        &nbsp;3dinfinite is not marketed and should not be used
                        by persons under the age of 18.{" "}
                      </span>
                    </li>
                    <li className="c1 c10 c11 li-bullet-8">
                      <span className="c8">Disclaimer.</span>
                      <span className="c4">
                        &nbsp;All information provided on 3dinfinite is for
                        general information purposes only; it does not
                        constitute technical or expert advice. Although we
                        regularly monitor 3dinfinite, we cannot guarantee the
                        accuracy, reliability, currency, relevance, and
                        completeness of any information available on 3dinfinite.
                      </span>
                    </li>
                    <li className="c1 c10 c11 li-bullet-5">
                      <span className="c8">Third-party content.</span>
                      <span className="c4">
                        &nbsp;3dinfinite may contain links to websites,
                        services, and other online sources owned and operated by
                        third parties. We are not responsible or liable in any
                        manner for the content of such third-party links,
                        websites, information, and the security and privacy
                        practices deployed by those third parties. Please
                        exercise your due diligence before clicking on any
                        third-party links.{" "}
                      </span>
                    </li>
                  </ol>
                  <ol className="c0 lst-kix_list_11-1 start" start="1">
                    <li className="c1 c10 li-bullet-5">
                      <span className="c8">Support.</span>
                      <span className="c4">
                        &nbsp;Any requests for customer or technical support
                        should be addressed to us by email at
                        info@3dinfinite.com.
                      </span>
                    </li>
                    <li className="c1 li-bullet-5">
                      <span className="c8">
                        Privacy and other relevant terms.
                      </span>
                      <span className="c4">
                        &nbsp;The documents that include important provisions
                        regarding your use of 3dinfinite and should be read and
                        interpreted together with these Terms, are:
                      </span>
                    </li>
                  </ol>
                  <ul className="c0 lst-kix_list_13-1 start">
                    <li className="c40 li-bullet-9">
                      <span className="c4">
                        Our privacy policy available at{" "}
                        <a href="/privacy-policy">
                          3dinfinite.com/privacy-policy
                        </a>
                      </span>
                      <span className="c4">
                        , which describes in detail how we handle your personal
                        data collected through 3dinfinite (the “
                      </span>
                      <span className="c8">Privacy Policy</span>
                      <span className="c4">”); </span>
                    </li>
                    <li className="c40 li-bullet-10">
                      <span className="c4">
                        Our cookie policy available at{" "}
                        <a href="/cookie-policy">
                          3dinfinite.com/cookie-policy
                        </a>
                      </span>
                      <span className="c15">,</span>
                      <span className="c4">
                        &nbsp;which provides information on our cookie usage
                        practices; and
                      </span>
                    </li>
                    <li className="c40 li-bullet-9">
                      <span className="c4">
                        Other individual terms and conditions made available by
                        us on 3dinfinite.
                      </span>
                    </li>
                  </ul>
                  <p className="c39 c10 c50">
                    <span className="c25"></span>
                  </p>
                  <ol className="c0 lst-kix_list_14-0 start" start="2">
                    <li className="c22 c10 li-bullet-4" id="h.30j0zll">
                      <span className="c25">THE USER ACCOUNT</span>
                    </li>
                  </ol>
                  <ol className="c0 lst-kix_list_15-1 start" start="1">
                    <li className="c1 c10 li-bullet-5">
                      <span className="c8">Registering User Account.</span>
                      <span className="c4">
                        &nbsp;In order to access the full functionality of
                        3dinfinite, including purchasing and selling the Models,
                        you must create a user account on 3dinfinite (the “
                      </span>
                      <span className="c8">User</span>
                      <span className="c4">&nbsp;</span>
                      <span className="c8">Account</span>
                      <span className="c4">”), </span>
                      <span className="c4">accept these Terms</span>
                      <span className="c4">, and </span>
                      <span className="c4">review the Privacy Policy</span>
                      <span className="c4">
                        . We reserve the right, at our sole discretion, to
                        refuse to register any User Account for any reason. By
                        registering your User Account, you acknowledge, agree
                        and warrant that:
                      </span>
                    </li>
                  </ol>
                  <ul className="c0 lst-kix_list_13-4 start">
                    <li className="c38 c10 li-bullet-10">
                      <span className="c4">
                        You are a human and not a machine (User Accounts that
                        are registered by machines, bots, and other automated
                        methods are not permitted);
                      </span>
                    </li>
                    <li className="c38 c10 li-bullet-9">
                      <span className="c4">You are at least 18 years old;</span>
                    </li>
                    <li className="c38 c10 li-bullet-9">
                      <span className="c4">
                        You can conclude legally binding contracts with us;
                      </span>
                    </li>
                    <li className="c38 c10 li-bullet-9">
                      <span className="c4">
                        You will comply with these Terms and all applicable
                        local, state, national and foreign laws, treaties, and
                        regulations in connection with your use of 3dinfinite;
                      </span>
                    </li>
                    <li className="c38 c10 li-bullet-11">
                      <span className="c4">
                        You will provide only true, accurate, complete, and
                        up-to-date personal data;
                      </span>
                    </li>
                    <li className="c10 c38 li-bullet-11">
                      <span className="c4">
                        You will register no more than one User Account; and
                      </span>
                    </li>
                    <li className="c38 c10 li-bullet-9">
                      <span className="c4">
                        You will be solely responsible for all information and
                        activities that occur under your User Account.{" "}
                      </span>
                    </li>
                  </ul>
                  <ol className="c0 lst-kix_list_16-1 start" start="2">
                    <li className="c1 c10 li-bullet-6">
                      <span className="c8">Types of User Accounts. </span>
                      <span className="c4">
                        Each type of the User Account may be subject to
                        additional terms and conditions. The following User
                        Accounts are available on 3dinfinite:{" "}
                      </span>
                    </li>
                  </ol>
                  <ul className="c0 lst-kix_list_17-4 start">
                    <li className="c3 li-bullet-12">
                      <span className="c4">Admin User Account;</span>
                    </li>
                    <li className="c3 li-bullet-13">
                      <span className="c4">Editor User Account;</span>
                    </li>
                    <li className="c3 li-bullet-13">
                      <span className="c4">Artist User Account;</span>
                    </li>
                    <li className="c3 li-bullet-13">
                      <span className="c4">
                        Interior Designer &amp; Architect User Account; and
                      </span>
                    </li>
                    <li className="c3 li-bullet-13">
                      <span className="c4">Manufacturer User Account.</span>
                    </li>
                  </ul>
                  <ol className="c0 lst-kix_list_15-1" start="2">
                    <li className="c1 c10 li-bullet-14">
                      <span className="c8">
                        Personal data provided through the User Account.{" "}
                      </span>
                      <span className="c4">
                        The collection and use of your personal data submitted
                        through your User Account is subject to our Privacy
                        Policy. Before registering your User Account, you will
                        be asked to review the Privacy Policy. Please note that
                        we will process personal data for the purposes
                        explicitly listed in the Privacy Policy only.{" "}
                      </span>
                    </li>
                    <li className="c1 c10 li-bullet-6">
                      <span className="c8">Security of the User Account.</span>
                      <span className="c4">
                        &nbsp;You are solely responsible for maintaining the
                        confidentiality of your User Account, including handling
                        your login details and passwords in a secure manner. You
                        further agree to immediately notify us about any
                        allegedly unauthorised use of your User Account or any
                        other security breach related to your User Account. You
                        are responsible for using secure Internet connection and
                        protected networks when accessing 3dinfinite. We cannot
                        and will not be liable for any loss or damage resulting
                        from your failure to comply with these security
                        obligations.
                      </span>
                    </li>
                    <li className="c1 c10 li-bullet-6">
                      <span className="c8">
                        Deactivation of the User Account.{" "}
                      </span>
                      <span className="c4">
                        At any time, you may deactivate your User Account
                        through the settings of your User Account. Upon
                        deactivation of the User Account, these Terms shall
                        terminate.
                      </span>
                    </li>
                    <li className="c1 c10 li-bullet-6">
                      <span className="c8">
                        Suspension and termination of User Account.
                      </span>
                      <span className="c4">
                        &nbsp;We reserve the right to suspend or terminate your
                        User Account if, at our sole discretion, we have grounds
                        to believe that your use of 3dinfinite seriously and
                        repeatedly breaches these Terms. We may also suspend or
                        terminate your User Account upon a lawful request of a
                        public authority.{" "}
                      </span>
                    </li>
                    <li className="c1 c10 li-bullet-6">
                      <span className="c8">Assignment of the Account.</span>
                      <span className="c4">
                        &nbsp;You are not allowed to assign your rights under
                        these Terms and your User Account is not transferable
                      </span>
                      <span className="c20">.</span>
                    </li>
                  </ol>
                  <p className="c24 c10">
                    <span className="c20"></span>
                  </p>
                  <ol className="c0 lst-kix_list_18-0 start" start="1">
                    <li className="c12 c10 li-bullet-15" id="h.1fob9te">
                      <span className="c25">THE MODELS</span>
                    </li>
                  </ol>
                  <ol className="c0 lst-kix_list_18-1 start" start="1">
                    <li className="c7 li-bullet-16">
                      <span className="c4">
                        The Models are created, uploaded, and offered on
                        3dinfinite by the Artists. We reserve the right, at our
                        sole discretion, with or without prior notification to
                        the Artist, to make amendments to the Models.{" "}
                      </span>
                    </li>
                    <li className="c7 li-bullet-17">
                      <span className="c4">
                        The Models featured on 3dinfinite are licensed and not
                        sold. By concluding a service contract through
                        3dinfinite, you obtain a license to use the respective
                        Model (the “
                      </span>
                      <span className="c8">License</span>
                      <span className="c4">
                        ”), subject to the Terms and not ownership of the Model.
                        The License is non-exclusive, personal,
                        non-transferable, worldwide and revocable. The License
                        is valid during the term of the Terms; the termination
                        of the Terms shall result in the revocation of the
                        License.
                      </span>
                    </li>
                    <li className="c7 li-bullet-18">
                      <span className="c8">Permitted use of the Models. </span>
                      <span className="c4">Under the</span>
                      <span className="c8">&nbsp;</span>
                      <span className="c4">License, you are permitted to:</span>
                    </li>
                  </ol>
                  <ul className="c0 lst-kix_list_19-3 start">
                    <li className="c14 c10 li-bullet-19">
                      <span className="c4">
                        Record the Models on an electronic media (e.g., a flash
                        drive, hard disk, CD, or DVD) for your use;
                      </span>
                    </li>
                    <li className="c14 c10 li-bullet-12">
                      <span className="c4">
                        Create material or digital objects on the basis of the
                        Models (the “
                      </span>
                      <span className="c8">Objects</span>
                      <span className="c4">”);</span>
                    </li>
                    <li className="c14 c10 li-bullet-13">
                      <span className="c4">
                        Recreate the Models in a material or digital form for
                        the purpose of creating the Objects;
                      </span>
                    </li>
                    <li className="c14 c10 li-bullet-20">
                      <span className="c4">
                        Use the Objects through any available media;
                      </span>
                    </li>
                    <li className="c14 c10 li-bullet-12">
                      <span className="c4">
                        Resell, rent, and lease the Objects;
                      </span>
                    </li>
                    <li className="c14 c10 li-bullet-13">
                      <span className="c4">Grant rights to the Objects;</span>
                    </li>
                    <li className="c14 c10 li-bullet-21">
                      <span className="c4">Donate the Objects; </span>
                    </li>
                    <li className="c14 c10 li-bullet-13">
                      <span className="c4">Publicly display the Objects;</span>
                    </li>
                    <li className="c14 c10 li-bullet-13">
                      <span className="c4">
                        Use the Models and the Objects in all types of
                        advertising;{" "}
                      </span>
                    </li>
                    <li className="c14 c10 li-bullet-13">
                      <span className="c4">
                        Import and export the Models and the Objects to other
                        countries;{" "}
                      </span>
                    </li>
                    <li className="c14 c10 li-bullet-21">
                      <span className="c4">Use the Objects anonymously;</span>
                    </li>
                    <li className="c14 c10 li-bullet-12">
                      <span className="c4">
                        Make changes, additions, abbreviations, provide
                        illustrations to the Models and the Objects; and
                      </span>
                    </li>
                    <li className="c14 c10 li-bullet-12">
                      <span className="c4">
                        Use the Models and the Objects for commercial and
                        non-commercial purposes.{" "}
                      </span>
                    </li>
                  </ul>
                  <ol className="c0 lst-kix_list_18-1" start="4">
                    <li className="c7 li-bullet-22">
                      <span className="c8">Prohibited use of the Models. </span>
                      <span className="c4">Under the</span>
                      <span className="c8">&nbsp;</span>
                      <span className="c4">
                        License, you are not permitted to:
                      </span>
                    </li>
                  </ol>
                  <ul className="c0 lst-kix_list_19-3 start">
                    <li className="c14 c10 li-bullet-13">
                      <span className="c4">Sub-license the Models;</span>
                    </li>
                    <li className="c10 c14 li-bullet-13">
                      <span className="c4">
                        Grant rights to third parties to use the Models;
                      </span>
                    </li>
                    <li className="c14 c10 li-bullet-21">
                      <span className="c4">
                        Make available to public the Models in their original
                        form through the Internet or any other means, digitally
                        or materially;
                      </span>
                    </li>
                    <li className="c14 c10 li-bullet-13">
                      <span className="c4">
                        Allow third parties to access and use the Models;
                      </span>
                    </li>
                    <li className="c14 c10 li-bullet-13">
                      <span className="c4 c11">S</span>
                      <span className="c4">
                        ell, donate, or rent the Models or electronic media
                        containing the Models (e.g., hard drives or flash
                        drives);
                      </span>
                    </li>
                    <li className="c14 c10 li-bullet-13">
                      <span className="c4">
                        Include the Models in databases or catalogues;{" "}
                      </span>
                    </li>
                    <li className="c14 c10 li-bullet-13">
                      <span className="c4">
                        Distribute the Models without your own creative input;
                      </span>
                    </li>
                    <li className="c14 c10 li-bullet-13">
                      <span className="c4">
                        Create your own 3D models on the basis of the Models;
                      </span>
                    </li>
                    <li className="c14 c10 li-bullet-19">
                      <span className="c4">
                        Use the Models to create trademarks and service marks;
                      </span>
                    </li>
                    <li className="c14 c10 li-bullet-13">
                      <span className="c4">
                        Use the Models for any defamatory, pornographic, obscene
                        or racist purposes;
                      </span>
                    </li>
                    <li className="c14 c10 li-bullet-21">
                      <span className="c4">
                        Impersonate the author of the Model;
                      </span>
                    </li>
                    <li className="c14 c10 li-bullet-12">
                      <span className="c4">
                        Use the Models in any manner that undermines the honour,
                        dignity or reputation of others; and
                      </span>
                    </li>
                    <li className="c14 c10 li-bullet-13">
                      <span className="c4">
                        Use the Models in contrary to the applicable law,
                        including intellectual property rights of others.
                      </span>
                    </li>
                  </ul>
                  <ol className="c0 lst-kix_list_18-1" start="5">
                    <li className="c7 li-bullet-23">
                      <span className="c4">
                        Some Models may contain images, trademarks, service
                        marks, logos, and other forms of intellectual property
                        that may be subject to additional license requirements
                        and terms of use imposed by the Artists. You agree to
                        comply with any Model-specific terms.{" "}
                      </span>
                    </li>
                    <li className="c7 li-bullet-18">
                      <span className="c4">
                        The Models may be available in limited sizes and
                        quantities. The Models are available as long as they are
                        displayed on 3dinfinite. We use reasonable efforts to
                        display colours, images, and other specifications of the
                        Models accurately. However, we cannot guarantee that the
                        screen of your computing device will display the colours
                        and images of the Models accurately. Although we use
                        reasonable efforts to ensure the quality the Models, we
                        cannot warrant that the quality of the Models will meet
                        your expectations.{" "}
                      </span>
                    </li>
                    <li className="c7 li-bullet-24">
                      <span className="c4">
                        By placing your orders for the Models, you acknowledge
                        and agree that:
                      </span>
                    </li>
                  </ol>
                  <ul className="c0 lst-kix_list_20-1 start">
                    <li className="c5 c10 li-bullet-9">
                      <span className="c4">
                        The information displayed on 3dinfinite with regard to
                        the Models is provided by the Artists and, therefore, we
                        are not responsible for any inaccuracies related
                        thereto;
                      </span>
                    </li>
                    <li className="c5 c10 li-bullet-10">
                      <span className="c4">
                        You are responsible for examining the Models immediately
                        after receiving them and, if the Models do not
                        correspond to the description of the Models provided on
                        3dinfinite or are defective in any way, you agree to
                        immediately notify us of the same; and
                      </span>
                    </li>
                    <li className="c5 c10 li-bullet-10">
                      <span className="c4">
                        You agree to follow any and all instructions we or the
                        Artists provide with the Models.
                      </span>
                    </li>
                  </ul>
                  <ol className="c0 lst-kix_list_18-1" start="8">
                    <li className="c7 li-bullet-25">
                      <span className="c4">
                        We reserve the right, but are not obliged, to:
                      </span>
                    </li>
                  </ol>
                  <ul className="c0 lst-kix_list_22-2 start">
                    <li className="c13 c10 li-bullet-26">
                      <span className="c4">
                        Limit the sale of the Models for any person, geographic
                        region or jurisdiction and may exercise this right on a
                        case-by-case basis;{" "}
                      </span>
                    </li>
                    <li className="c10 c13 li-bullet-27">
                      <span className="c4">
                        Limit the quantities of the Models for sale;
                      </span>
                    </li>
                    <li className="c13 c10 li-bullet-26">
                      <span className="c4">
                        Change the descriptions of the Models or the Fees at any
                        time with or without prior notice; and{" "}
                      </span>
                    </li>
                    <li className="c13 c10 li-bullet-28">
                      <span className="c4">
                        Discontinue the Models at any time.
                      </span>
                    </li>
                  </ul>
                  <ol className="c0 lst-kix_list_18-1" start="9">
                    <li className="c7 li-bullet-29">
                      <span className="c15">
                        By purchasing the Models through 3dinfinite, you
                        acknowledge and agree that the Models are created and
                        offered through 3dinfinite by the Artists and the
                        Artists are solely responsible for the Models.
                        Therefore, for any specifics related to the Models, you
                        are requested to contact the respective Artist directly.
                      </span>
                    </li>
                    <li className="c7 li-bullet-30">
                      <span className="c15">
                        We will not be liable for any direct, indirect,
                        consequential or inconsequential loss or damage that
                        results from the Models, and any purchase transactions,
                        or interaction between the users of 3dinfinite.
                      </span>
                    </li>
                    <li className="c7 li-bullet-17">
                      <span className="c15">
                        The Artists are solely responsible for:
                      </span>
                    </li>
                  </ol>
                  <ul className="c0 lst-kix_list_24-1 start">
                    <li className="c10 c52 li-bullet-9">
                      <span className="c4">
                        Ensuring that they are qualified in offering the Models
                        through 3dinfinite;
                      </span>
                    </li>
                    <li className="c52 c10 li-bullet-9">
                      <span className="c4">
                        Paying all applicable taxes, levies, duties, and other
                        fees associated with the Models sold through 3dinfinite;
                        and
                      </span>
                    </li>
                    <li className="c52 c10 li-bullet-9">
                      <span className="c4">
                        Cooperating with us in any audits by providing
                        information and records about the the Models, invoices,
                        tax returns, and other financial reports issued with
                        regard to the Models sold through 3dinfinite.
                      </span>
                    </li>
                  </ul>
                  <ol className="c0 lst-kix_list_18-1" start="12">
                    <li className="c7 li-bullet-31">
                      <span className="c15">
                        You are solely responsible for carrying out appropriate
                        checks regarding the Artists, including their relevant
                        trade and industry accreditations, qualifications, legal
                        authorizations, and the scope of insurance prior to
                        purchasing the Models. None of the references provided
                        by us or the users of 3dinfinite (e.g., reviews,
                        comments, or ratings) represent endorsement,
                        certification or guarantee about any user, as well as
                        the information or services provided by that user.{" "}
                      </span>
                    </li>
                    <li className="c7 li-bullet-32">
                      <span className="c15">
                        We are not responsible for any disputes that arise
                        between the users of 3dinfinite, nor are we obliged to
                        receive or process, complaints against the users of
                        3dinfinite or resolve disputes between the users of
                        3dinfinite, unless the complaint concerns the
                        performance of our legal or contractual obligations
                        under these Terms.
                      </span>
                    </li>
                  </ol>
                  <p className="c24 c10">
                    <span className="c4"></span>
                  </p>
                  <ol className="c0 lst-kix_list_18-0" start="2">
                    <li className="c10 c12 li-bullet-15" id="h.3znysh7">
                      <span className="c25">
                        FEES, PAYMENTS, DELIVERY, AND RETURNS
                      </span>
                    </li>
                  </ol>
                  <ol className="c0 lst-kix_list_25-1 start" start="1">
                    <li className="c26 c10 li-bullet-33">
                      <span className="c8">The Fees.</span>
                      <span className="c4">
                        &nbsp;The purchase of the Models is subject to the
                        applicable fees (the “
                      </span>
                      <span className="c8">Fees</span>
                      <span className="c4">
                        ”) payable by you in accordance with the schedule of the
                        Fees available on the &nbsp;respective webpage of each
                        Model. The Models can be purchased by paying the Fees
                        directly or obtaining credits to purchase the Models.
                        Please note that there are minimum amount requirements
                        for obtaining the credits. By concluding a service
                        contract with us (i.e., placing your order), you agree
                        to pay the Fees in accordance with these Terms, the
                        terms and conditions of the respective Fees, and other
                        terms and conditions in force at the moment the service
                        contract is concluded.
                      </span>
                      <span className="c23">&nbsp;</span>
                      <span className="c4">
                        The Fees are indicated in the United States dollars
                        (USD)
                      </span>

                      <span className="c4">
                        &nbsp;and remain valid for as long as (i) they are
                        indicated on 3dinfinite or (ii) as communicated by us.
                        The Fees are subject to a change without a prior notice.
                        Any changes to the Fees will be made available to you
                        and, if necessary, we will request you to provide
                        consent to the amendments of the Fees.{" "}
                      </span>
                    </li>
                    <li className="c26 c10 li-bullet-34">
                      <span className="c8">Taxes.</span>
                      <span className="c23">&nbsp;</span>
                      <span className="c4">Unless indicated otherwise,</span>
                      <span className="c23">&nbsp;</span>
                      <span className="c4">the Fees include</span>

                      <span className="c4">
                        &nbsp;VAT and all other taxes, levies, and duties
                        imposed by taxing authorities. We are not responsible
                        for covering any Internet service fees, surcharges, and
                        other amounts incurred as a result of your use of
                        3dinfinite and you are solely responsible for covering
                        such costs. &nbsp;
                      </span>
                    </li>
                    <li className="c26 c10 li-bullet-35">
                      <span className="c8">Payment. </span>
                      <span className="c4">
                        All payments related to 3dinfinite are processed by our
                        third-party payment processors Stripe and PayPal (the “
                      </span>
                      <span className="c8">Payment Processors</span>
                      <span className="c4">
                        ”). When you make a payment on 3dinfinite, the Payment
                        Processors collect some personal data from you which
                        allows them to make the payments (e.g, your credit card
                        number, expiration date, billing address, and security
                        codes). The Payment Processors handle all steps in the
                        payment process through their systems, including data
                        collection and data processing. We do not have direct
                        access to your payment information. You are responsible
                        for ensuring that all payment information is correct and
                        the funds necessary for paying the Fees are available.
                        You agree not to hold us liable for payments that do not
                        reach us because you have quoted incorrect payment
                        information or the Payment Processors refused the
                        payment for any other reason.
                      </span>
                    </li>
                    <li className="c10 c26 li-bullet-35">
                      <span className="c8">
                        Technical steps to conclude a service contract.
                      </span>
                      <span className="c4">
                        &nbsp;If you would like to conclude a service contract
                        with us, you need to: (i) visit 3dinfinite; (ii)
                        register your User Account by submitting the requested
                        personal data; (iii) add the chosen Model to your
                        shopping cart; and (iv) provide the required payment
                        information and personal data. You will be able to
                        identify and correct any input errors prior to clicking
                        on the “Pay” button. After you click on the “Pay”
                        button, we will send a confirmatory email informing you
                        about your order. By clicking on the “Pay”
                      </span>
                      <span className="c43">&nbsp;</span>
                      <span className="c4">
                        button and receiving a confirmatory email, you conclude
                        a service contract in English with us on the basis of
                        these Terms. The details of the specific service
                        contract will not be filed by us and, therefore, the
                        specific contract will not be available to you. However,
                        if you do require any information regarding the order,
                        you can consult your User Account or contact us
                        directly.
                      </span>
                    </li>
                    <li className="c26 c10 li-bullet-36">
                      <span className="c8">Right of withdrawal. </span>
                      <span className="c4">
                        We respect consumer rights and comply with the
                        applicable consumer protection laws. If you use
                        3dinfinite as a consumer (i.e., a person acting wholly
                        or mainly outside the scope of trade, business, or
                        profession), you have the right to withdraw from the
                        service contract with us within the period of 14 days
                        after you have received the Model without providing any
                        reason to us. In order to &nbsp;exercise your right of
                        withdrawal and receive a refund, you must inform us of
                        your decision to withdraw from the contract by email at
                        info@3dinfinite.com before the 14-day period expires.
                        You may use the model withdrawal form in Section 4.8,
                        but it is not obligatory. To meet the withdrawal
                        deadline, it is sufficient for you to send your
                        communication concerning your exercise of the right of
                        withdrawal before the withdrawal period has expired.
                      </span>
                    </li>
                    <li className="c26 c10 li-bullet-37">
                      <span className="c8">
                        Exceptions from the right of withdrawal.{" "}
                      </span>
                      <span className="c4">
                        Your right of withdrawal does not apply in the following
                        cases:
                      </span>
                    </li>
                  </ol>
                  <ul className="c0 lst-kix_list_20-2 start">
                    <li className="c3 li-bullet-38">
                      <span className="c4">
                        If you use 3dinfinite as a non-consumer (a ‘consumer’ is
                        any natural person who is acting for purposes which are
                        outside his trade, business, craft or profession); or
                      </span>
                    </li>
                    <li className="c3 li-bullet-13">
                      <span className="c4">
                        If the contract has been fully performed (if the
                        contract has not been fully performed, we reserve the
                        right to charge you proportionally);{" "}
                      </span>
                    </li>
                    <li className="c3 li-bullet-12">
                      <span className="c4">
                        The Models are made to your specifications or are
                        clearly personalised;
                      </span>
                    </li>
                    <li className="c3 li-bullet-13">
                      <span className="c4">
                        We have a reason to believe that your request for
                        withdrawal is abusive (e.g., due to repetitive requests
                        received from the same person). We do not tolerate any
                        abuse of 3dinfinite. In order to prevent abuse of these
                        Terms and 3dinfinite, we reserve the right to refuse
                        future services to&nbsp;(i) a customer who seeks
                        multiple refunds and (ii) a customer who has violated
                        these Terms.
                      </span>
                    </li>
                  </ul>
                  <ol className="c0 lst-kix_list_26-1 start" start="1">
                    <li className="c26 c10 li-bullet-39">
                      <span className="c8">Effects of withdrawal. </span>
                      <span className="c4">
                        If you qualify for the withdrawal, we shall reimburse to
                        you the Fees without undue delay and in any event not
                        later than 14 days from the day on which we are informed
                        about your decision to withdraw from the service
                        contract. We will carry out such reimbursement using the
                        same means of payment as you used for the initial
                        transaction unless you have expressly agreed otherwise;
                        in any event, you will not incur any fees as a result of
                        such reimbursement.
                      </span>
                    </li>
                  </ol>
                  <ol className="c0 lst-kix_list_27-1 start" start="1">
                    <li className="c26 c10 li-bullet-36">
                      <span className="c8">Model withdrawal form.</span>
                      <span className="c4">
                        &nbsp;— To: 3dinfinite Email: info@3dinfinite.com — I/We
                        (*) hereby give notice that I/We (*) withdraw from
                        my/our (*) contract of sale of the following goods
                        (*)/for the provision of the following service (*), —
                        Ordered on (*)/received on (*), — Name of consumer(s), —
                        Address of consumer(s), — Signature of consumer(s) (only
                        if this form is notified on paper), — Date (*) Delete as
                        appropriate.
                      </span>
                    </li>
                    <li className="c26 c10 li-bullet-35">
                      <span className="c8">Delivery.</span>
                      <span className="c4">
                        &nbsp;We will arrange for the Models to be delivered to
                        the email address that you specify during the checkout
                        process. The estimated delivery times remain subject to
                        change at our sole discretion. Please note that the
                        delivery times are estimates only and may depend on
                        various factors that we may not be able to control. If
                        you have not received your Models during the specified
                        delivery times, please contact us&nbsp;and we will look
                        into your order.
                      </span>
                    </li>
                    <li className="c26 c10 li-bullet-40">
                      <span className="c8">
                        Delivery failure due to your fault.
                      </span>
                      <span className="c4">
                        &nbsp;If we are unable to deliver your Models and such a
                        failure occurs due to your fault (e.g., you have
                        provided a wrong email address), we may, but have no
                        obligation to, agree to arrange for re-delivery of the
                        Models.
                      </span>
                    </li>
                    <li className="c26 c10 li-bullet-41">
                      <span className="c8">Faulty Models.</span>
                      <span className="c4">
                        &nbsp;If you find that the Model that you have received
                        is faulty, you can, within 14 days from the day you
                        received the said Model:
                      </span>
                    </li>
                  </ol>
                  <ul className="c0 lst-kix_list_29-0 start">
                    <li className="c47 c10 li-bullet-9">
                      <span className="c4">
                        Request a reduction of the Fees, which we may or may not
                        agree to at our sole discretion; or
                      </span>
                    </li>
                    <li className="c47 c10 li-bullet-9">
                      <span className="c4">
                        Request to replace the Model with the same non-faulty
                        Model or similar Model; or{" "}
                      </span>
                    </li>
                    <li className="c10 c47 li-bullet-9">
                      <span className="c4">Request a refund.</span>
                    </li>
                  </ul>
                  <ol className="c0 lst-kix_list_27-1 start" start="1">
                    <li className="c26 c10 li-bullet-36">
                      <span className="c4">&nbsp;</span>
                      <span className="c8">Payouts to the Artists. </span>
                      <span className="c15">
                        If you use 3dinfinite as the Artist, you are entitled to
                        receive commission for each Model uploaded by you and
                        sold through 3dinfinite (the “
                      </span>
                      <span className="c9">Commission</span>
                      <span className="c15">
                        ”). The Commission rates and the payment terms related
                        thereto are made available on 3dinfinite or communicated
                        to the Artists personally. The Artist hereby
                        acknowledges and agrees that: (i) any payment made with
                        regard to Artist’s Models through 3dinfinite shall be
                        considered as payment by the user directly to the
                        Artist; (ii) the Artist will not charge the user any
                        additional fees for the purchased Models, unless agreed
                        otherwise between the user and the Artist; (iii) we
                        accept payments from the users as Artist’s limited
                        payment collection agent; (iv) our obligation to pay the
                        Artist is subject to and conditional upon successful
                        completion of the sale transactions related to the
                        Models and receipt of the associated payments of the
                        Fees; and (v) we are not responsible for transferring
                        the Artists the funds that have not been successfully
                        obtained from the users.
                      </span>
                      <span className="c30">&nbsp;</span>
                      <span className="c15">
                        After Artist’s Model is sold, we will transfer the
                        Commission generated by the Artist to the Artist Account
                        without undue delay. The Commission can be withdrawn by
                        the Artist from the Artist Account to the Artist’s bank
                        or PayPal account by using a third-party payment
                        processor. The Artists are responsible for paying any
                        and all applicable transfer costs charged by the payment
                        processor.
                      </span>
                    </li>
                  </ol>
                  <p className="c10 c39">
                    <span className="c4"></span>
                  </p>
                  <ol className="c0 lst-kix_list_30-0 start" start="1">
                    <li className="c10 c51 li-bullet-1">
                      <span className="c25">USER-GENERATED CONTENT</span>
                    </li>
                  </ol>
                  <ol className="c0 lst-kix_list_30-1 start" start="1">
                    <li className="c1 li-bullet-6">
                      <span className="c4">
                        You may submit the Models, reviews, comments, texts,
                        photos, and other content (the “
                      </span>
                      <span className="c8">User-Generated Content</span>
                      <span className="c4">
                        ”) on 3dinfinite. Please note that the User-Generated
                        Content may become publicly available. Therefore, we
                        request you to: (i) exercise your due diligence when
                        submitting the User-Generated Content on 3dinfinite;
                        (ii) not to make publicly available any sensitive
                        information; and (iii) make sure that, by submitting the
                        User-Generated Content on 3dinfinite, you comply with
                        these Terms.
                      </span>
                    </li>
                    <li className="c1 li-bullet-42">
                      <span className="c4">
                        The User-Generated Content does not belong to us. By
                        submitting the User-Generated Content on 3dinfinite, you
                        grant us unrestricted, sub-licensable, royalty-free,
                        perpetual, and irrevocable rights to use, distribute,
                        advertise, adapt, remix, modify, publicly display,
                        publicly perform, excerpt, prepare derivative works of,
                        and reproduce the User-Generated Content for the
                        purposes of carrying our legitimate business interests.{" "}
                      </span>
                    </li>
                    <li className="c1 li-bullet-42">
                      <span className="c4">
                        You agree not to submit the User-Generated Content that
                        violates these Terms or any applicable laws, including
                        intellectual property rights of others.
                      </span>
                    </li>
                    <li className="c1 li-bullet-42">
                      <span className="c4">
                        You agree to keep a backup copy of the User-Generated
                        Content at all times. The User-Generated Content
                        uploaded to 3dinfinite cannot and shall not serve as
                        such a copy.
                      </span>
                    </li>
                    <li className="c1 li-bullet-14">
                      <span className="c4">
                        You understand and agree that, in order to ensure the
                        security of 3dinfinite, we may, but have no obligation
                        to, monitor or review the User-Generated Content. We
                        reserve the right, at our sole discretion, to refuse to
                        upload, modify, delete, or remove the User-Generated
                        Content, in whole or in part, that violates these Terms
                        or may harm the reputation of 3dinfinite. However, you
                        remain solely responsible for your User-Generated
                        Content.
                      </span>
                    </li>
                    <li className="c1 li-bullet-42">
                      <span className="c4">
                        You are not allowed to make publicly available personal
                        data of persons who have not provided you with their
                        prior authorisation or consent to share that personal
                        data (e.g., you cannot publish name and contact details
                        of a person who has not allowed you to do so) through
                        the User-Generated Content.{" "}
                      </span>
                    </li>
                    <li className="c1 li-bullet-43">
                      <span className="c4">
                        The User-Generated Content includes your personal views
                        and recommendations. The User-Generated Content does not
                        reflect our views, recommendations, endorsement, or any
                        commitments related thereto.
                        <br />
                      </span>
                    </li>
                  </ol>
                  <ol className="c0 lst-kix_list_30-0" start="2">
                    <li className="c10 c22 li-bullet-4" id="h.2et92p0">
                      <span className="c25">ACCEPTABLE USE POLICY</span>
                    </li>
                  </ol>
                  <ol className="c0 lst-kix_list_30-1 start" start="1">
                    <li className="c1 c10 li-bullet-44">
                      <span className="c4">
                        When using 3dinfinite, you are required to follow our
                        acceptable use policy outlined in this Section 6. Please
                        be advised that we work closely with law enforcement and
                        we report any inappropriate content that may infringe
                        applicable laws.
                      </span>
                    </li>
                    <li className="c1 c10 li-bullet-45">
                      <span className="c4">
                        You are not permitted to use 3dinfinite
                      </span>
                      <span className="c23">&nbsp;</span>
                      <span className="c4">
                        in any manner, including uploading the Models, that
                        substitutes or contributes to the following activities
                        (the list is representative and not exhaustive):{" "}
                      </span>
                    </li>
                  </ol>
                  <ul className="c0 lst-kix_list_31-1 start">
                    <li className="c5 li-bullet-11">
                      <span className="c4">
                        Any unlawful activity, including violation of any laws,
                        statutes, ordinances, or regulations;
                      </span>
                    </li>
                    <li className="c5 li-bullet-10">
                      <span className="c4">
                        Infringement of intellectual property of any other
                        party;
                      </span>
                    </li>
                    <li className="c5 li-bullet-11">
                      <span className="c4">Fraud;</span>
                    </li>
                    <li className="c5 li-bullet-10">
                      <span className="c4">
                        Provision of false, inaccurate, or misleading
                        information;
                      </span>
                    </li>
                    <li className="c5 li-bullet-10">
                      <span className="c4">
                        Posting of the User-Generated Content that depicts,
                        links to, or incites others to commit acts of violence;
                      </span>
                    </li>
                    <li className="c5 li-bullet-9">
                      <span className="c4">
                        Gambling, including contests, lotteries, games of
                        chance, bidding fee auctions, sports forecasting or odds
                        making, Internet gaming, fantasy sports leagues with
                        cash prizes, and sweepstakes; &nbsp;
                      </span>
                    </li>
                    <li className="c5 li-bullet-11">
                      <span className="c4">
                        Spreading of malware (e.g., viruses, worms, Trojan
                        horses), spam, and other illegal messaging;
                      </span>
                    </li>
                    <li className="c5 li-bullet-11">
                      <span className="c4">
                        Spreading ethnically, racially, or otherwise
                        objectionable information;
                      </span>
                    </li>
                    <li className="c5 li-bullet-10">
                      <span className="c4">
                        Sexually explicit, libellous, harassing, defamatory,
                        abusive, profane, vulgar, threatening, hateful, obscene
                        behaviour and terrorism-related content;
                      </span>
                    </li>
                    <li className="c5 li-bullet-10">
                      <span className="c4">
                        Advertising or encouraging the use of tobacco, alcohol,
                        and any illegal substances;
                      </span>
                    </li>
                    <li className="c5 li-bullet-9">
                      <span className="c4">
                        Copying, distributing, renting, reselling, modifying,
                        compromising, damaging, disabling, impairing, and
                        overburdening 3dinfinite;{" "}
                      </span>
                    </li>
                    <li className="c5 li-bullet-9">
                      <span className="c4">
                        Interfering with or abusing other users of 3dinfinite;
                      </span>
                    </li>
                    <li className="c5 li-bullet-9">
                      <span className="c4">
                        Using bots, scripts, and other automated methods; and
                      </span>
                    </li>
                    <li className="c5 li-bullet-9">
                      <span className="c4">
                        Collecting and disclosing any information about the
                        users of 3dinfinite.
                      </span>
                    </li>
                  </ul>
                  <ol className="c0 lst-kix_list_32-1 start" start="3">
                    <li className="c1 c10 li-bullet-46">
                      <span className="c8">
                        Reporting inappropriate content.
                      </span>
                      <span className="c4">
                        &nbsp;If you think that some of the content available on
                        3dinfinite is inappropriate, infringes these Terms,
                        applicable laws, or your or third party’s right to
                        privacy, you are requested to contact us immediately at{" "}
                      </span>
                      <span className="c4">
                        <a className="c27" href="mailto:info@3dinfinite.com">
                          info@3dinfinite.com
                        </a>
                      </span>
                      <span className="c4">.</span>
                    </li>
                    <li className="c1 c10 li-bullet-43">
                      <span className="c4">
                        By Uploading the Models to 3dinfinite, the Artist
                        represents and warrants that:
                      </span>
                    </li>
                  </ol>
                  <ul className="c0 lst-kix_list_33-1 start">
                    <li className="c19 c10 li-bullet-13">
                      <span className="c4">
                        The Model is Artist’s original work and the Model does
                        not contain any copyrighted materials that the Artist
                        does not have the right to use;
                      </span>
                    </li>
                    <li className="c19 c10 li-bullet-21">
                      <span className="c4">
                        The Artist has the full right and authorisation to
                        accept these Terms;
                      </span>
                    </li>
                    <li className="c19 c10 li-bullet-13">
                      <span className="c4">
                        The Model shall not infringe on any third party's
                        copyright, patent, trademark, trade secret or other
                        proprietary rights, rights of publicity or privacy, or
                        moral rights; and
                      </span>
                    </li>
                    <li className="c10 c19 li-bullet-21">
                      <span className="c4">
                        The Artist will submit only true, accurate, complete and
                        up-to-date information and factual assertions about the
                        Models. Upon our request, the Artist agrees to provide
                        evidence or effectuate Artist’s rights under these
                        Terms.{" "}
                      </span>
                    </li>
                  </ul>
                  <p className="c24">
                    <span className="c4"></span>
                  </p>
                  <ol className="c0 lst-kix_list_34-0 start" start="1">
                    <li className="c10 c41 li-bullet-10" id="h.tyjcwt">
                      <span className="c25">OUR </span>
                      <span className="c25">INTELLECTUAL PROPERTY</span>
                    </li>
                  </ol>
                  <ol className="c0 lst-kix_list_34-1 start" start="1">
                    <li className="c32 c10 li-bullet-47">
                      <span className="c8">Our Content. </span>
                      <span className="c4">
                        Most of the content made available by us on 3dinfinite,
                        excluding the User-Generated Content, is owned by us,
                        our partners, agents, licensors, vendors, and/or other
                        content providers (“
                      </span>
                      <span className="c8">Our Content</span>
                      <span className="c4">
                        ”). Our Content includes, but is not limited to, text,
                        images, audiovisual content, source code, trademarks,
                        service marks, and trade names. Our Content is protected
                        by the applicable intellectual property laws and
                        international treaties. You are not allowed, without
                        obtaining prior written authorisation from us, to copy,
                        distribute, make available, disassemble, make
                        alterations, decompile, reverse engineer, translate,
                        adapt, rent, loan, use, lease or attempt to grant other
                        rights to Our Content to third parties, or use any
                        manual or automated means to scrap any content available
                        on 3dinfinite.{" "}
                      </span>
                    </li>
                    <li className="c32 c10 li-bullet-48">
                      <span className="c9">
                        Third-party intellectual property.{" "}
                      </span>
                      <span className="c15">
                        Some of the intellectual property assets, such as the
                        User-Generated Content and trademarks featured on{" "}
                      </span>
                      <span className="c4">3dinfinite</span>
                      <span className="c15">
                        &nbsp;may be owned by the users of{" "}
                      </span>
                      <span className="c4">3dinfinite</span>
                      <span className="c15">
                        &nbsp;and other third parties. Such third-party
                        intellectual property does not belong to us and it
                        remains the sole property of the respective third-party
                        proprietors.
                      </span>
                    </li>
                    <li className="c32 c10 li-bullet-49">
                      <span className="c9">Fair use policy. </span>
                      <span className="c4">
                        In the US and other countries, it may be possible to
                        reuse materials protected by copyright without obtaining
                        permission from a copyright holder under certain
                        circumstances (
                      </span>
                      <span className="c33">‘</span>
                      <span className="c4">fair use</span>
                      <span className="c33">’</span>
                      <span className="c4">
                        ). Such fair use is determined on a case-by-case basis
                        and different rules may apply in different countries.
                        For example, copyright-protected works used for
                        teaching, commentary, criticism, news, or research may
                        fall within the scope of fair use and, therefore, you
                        may not need authorisation to use such works on
                        3dinfinite. We strongly recommend consulting a qualified
                        lawyer to seek advice and make prior assessment of your
                        materials that you intend to use on 3dinfinite under the
                        fair use doctrine. We do not provide advice or
                        assessments regarding the User-Generated Content or fair
                        use policies applicable to you.
                      </span>
                    </li>
                    <li className="c10 c32 li-bullet-50">
                      <span className="c9">
                        Copyright infringement claims (DMCA Policy).{" "}
                      </span>
                      <span className="c15">
                        We respect intellectual property rights. If you have any
                        grounds to believe that any content made available
                        through{" "}
                      </span>
                      <span className="c4">3dinfinite</span>
                      <span className="c15">
                        &nbsp;violates your or third party’s intellectual
                        property rights, please contact us by email.{" "}
                      </span>
                      <span className="c4">&nbsp;</span>
                      <span className="c15">
                        In order to write a proper copyright infringement
                        notice, please perform the following steps:
                      </span>
                    </li>
                  </ol>
                  <ul className="c0 lst-kix_list_33-3 start">
                    <li className="c3 li-bullet-13">
                      <span className="c4">
                        Identify with sufficient detail the copyrighted work
                        that you believe has &nbsp;been infringed;
                      </span>
                    </li>
                    <li className="c3 li-bullet-13">
                      <span className="c4">
                        Identify the material that is claimed to be infringing
                        or to be the subject of infringing activity and that is
                        to be removed or access to which is to be disabled, and
                        information reasonably sufficient to permit us to locate
                        the material;
                      </span>
                    </li>
                    <li className="c3 li-bullet-12">
                      <span className="c4">
                        Provide us with information reasonably sufficient to
                        permit us to contact the complaining party, such as an
                        address, telephone number, and, if available, an email
                        address at which the complaining party may be contacted;
                      </span>
                    </li>
                    <li className="c3 li-bullet-13">
                      <span className="c4">Add the following statement: “</span>
                      <span className="c42">
                        I have a good faith belief that use of the material in
                        the manner complained of is not authorised by the
                        copyright owner, its agent, or the law
                      </span>
                      <span className="c4">”;</span>
                    </li>
                    <li className="c3 li-bullet-13">
                      <span className="c4">Add the following statement: “</span>
                      <span className="c42">
                        I swear, under penalty of perjury, that the information
                        in the notification is accurate, and that I am the
                        copyright owner or am authorised to act on behalf of the
                        owner of an exclusive right that is allegedly infringed
                      </span>
                      <span className="c4">”;</span>
                    </li>
                    <li className="c3 li-bullet-12">
                      <span className="c4">Sign the document; and</span>
                    </li>
                    <li className="c3 li-bullet-13">
                      <span className="c4">
                        Send the document to us by email or post (our contact
                        details are available at the end of the Terms).
                      </span>
                    </li>
                    <li className="c3 li-bullet-38">
                      <span className="c15">
                        Please note that you will be liable for damages,
                        including costs and attorney’s fees, if you materially
                        misrepresent that material is infringing your
                        copyright(s). Therefore, if you are not sure if you are
                        the proper copyright holder or if copyright laws protect
                        the material of yours, you may need to consult a lawyer.
                      </span>
                    </li>
                  </ul>
                  <ol className="c0 lst-kix_list_34-1" start="5">
                    <li className="c32 c10 li-bullet-51">
                      <span className="c9">
                        Copyright counter-notification (DMCA Policy).{" "}
                      </span>
                      <span className="c15">
                        If your content is removed due to operation of our
                        notice and takedown procedure described above and you
                        believe the takedown was improper, you may file a
                        counter-notification by email or regular mail{" "}
                      </span>
                      <span className="c4">
                        (our contact details are available at the end of the
                        Terms)
                      </span>
                      <span className="c15">
                        . We would like to inform you that you will be liable
                        for damages (including costs and attorney’s fees) if you
                        materially misrepresent that the takedown was improper.
                        Therefore, in order to assess the takedown, you may need
                        to consult a lawyer. To write a proper
                        counter-notification, please perform the following
                        steps:
                      </span>
                    </li>
                  </ol>
                  <ul className="c0 lst-kix_list_35-1 start">
                    <li className="c35 c10 li-bullet-52">
                      <span className="c15">
                        Identify the material that has been removed or to which
                        access has been disabled and the location at which the
                        material appeared before it was removed or access to it
                        was disabled;
                      </span>
                    </li>
                    <li className="c10 c35 li-bullet-11">
                      <span className="c15">
                        Specify your name, address, and telephone number;
                      </span>
                    </li>
                    <li className="c35 c10 li-bullet-53">
                      <span className="c15">
                        Include the following statement: “
                      </span>
                      <span className="c42">
                        I consent to the jurisdiction of Federal District Court
                        for the
                      </span>
                      <span className="c15">
                        &nbsp;[insert the federal judicial district in which you
                        are located]”;
                      </span>
                    </li>
                    <li className="c35 c10 li-bullet-10">
                      <span className="c15">
                        Include the following statement: “
                      </span>
                      <span className="c42">
                        I will accept service of process from
                      </span>
                      <span className="c15">
                        &nbsp;[insert the name of the person who submitted the
                        infringement notification] or his/her agent”;
                      </span>
                    </li>
                    <li className="c35 c10 li-bullet-10">
                      <span className="c15">
                        Include the following statement: “
                      </span>
                      <span className="c42">
                        I swear, under penalty of perjury, that I have a good
                        faith belief that the affected material was removed or
                        disabled as a result of a mistake or misidentification
                        of the material to be removed or disabled
                      </span>
                      <span className="c15">”; </span>
                    </li>
                    <li className="c35 c10 li-bullet-11">
                      <span className="c15">Sign the document; and</span>
                    </li>
                    <li className="c35 c10 li-bullet-9">
                      <span className="c15">
                        Send the written communication to us by email
                      </span>
                      <span className="c9">&nbsp;</span>
                      <span className="c15">
                        or post (our contact details are available at the end of
                        the Terms).
                      </span>
                    </li>
                  </ul>
                  <p className="c24 c10">
                    <span className="c15"></span>
                  </p>
                  <ol className="c0 lst-kix_list_36-0 start" start="1">
                    <li className="c10 c45 li-bullet-54" id="h.3dy6vkm">
                      <span className="c25">AVAILABILITY</span>
                    </li>
                  </ol>
                  <ol className="c0 lst-kix_list_36-1 start" start="1">
                    <li className="c1 c10 li-bullet-42">
                      <span className="c4">
                        We put reasonable efforts to ensure that 3dinfinite is
                        always accessible. However, the availability of
                        3dinfinite may be affected by factors, which we cannot
                        reasonably control, such as bandwidth problems,
                        equipment failure, acts and omissions of our third-party
                        service providers, or other{" "}
                      </span>
                      <span className="c23">force majeure</span>
                      <span className="c4">
                        &nbsp;events. We take no responsibility for the
                        unavailability of 3dinfinite caused by such factors.
                      </span>
                    </li>
                  </ol>
                  <p className="c24 c10">
                    <span className="c4"></span>
                  </p>
                  <ol className="c0 lst-kix_list_37-0 start" start="1">
                    <li className="c12 c10 li-bullet-55" id="h.1t3h5sf">
                      <span className="c25">DISCLAIMER OF WARRANTIES</span>
                    </li>
                  </ol>
                  <ol className="c0 lst-kix_list_37-1 start" start="1">
                    <li className="c1 li-bullet-56">
                      <span className="c4">
                        We provide 3dinfinite on “as available”, “as is”, and
                        “with all faults” basis. To the extent permitted by the
                        applicable law, we do not make any representations or
                        warranties about the reliability, suitability, and
                        accuracy, for any purpose, of 3dinfinite, any content
                        featured on 3dinfinite, whether provider by us or by
                        third parties, and hereby disclaim all warranties
                        regarding 3dinfinite and its operation.
                      </span>
                    </li>
                    <li className="c1 li-bullet-43">
                      <span className="c4">
                        It is your sole responsibility to verify and assess the
                        fit for the purpose of 3dinfinite prior to using it and
                        to decide whether or not 3dinfinite fits for the
                        intended use.
                      </span>
                    </li>
                    <li className="c1 li-bullet-56">
                      <span className="c4">
                        By using 3dinfinite, you acknowledge that we may use
                        third-party suppliers to provide the Models and
                        software, hardware, storage, networking, and other
                        technological services. The acts and omissions of
                        third-party suppliers may be outside of our reasonable
                        control. To the maximum extent permitted by law, we
                        exclude any liability for any loss or damage resulting
                        from the acts and omissions of such third-party
                        suppliers.{" "}
                      </span>
                    </li>
                    <li className="c1 li-bullet-57">
                      <span className="c4">
                        Nothing in these Terms shall affect any statutory rights
                        that you are entitled to as a consumer and that you
                        cannot contractually agree to alter or waive.
                      </span>
                    </li>
                  </ol>
                  <p className="c24">
                    <span className="c4"></span>
                  </p>
                  <ol className="c0 lst-kix_list_38-0 start" start="1">
                    <li className="c12 c10 li-bullet-58" id="h.4d34og8">
                      <span className="c25">LIMITATION OF LIABILITY</span>
                    </li>
                  </ol>
                  <ol className="c0 lst-kix_list_38-1 start" start="1">
                    <li className="c1 c10 li-bullet-54">
                      <span className="c4">
                        Unless otherwise excluded or limited by the applicable
                        law, we will not be liable for any damages, including,
                        but not limited to, incidental, punitive, special or
                        other related damages, arising out or in connection with
                        your use of 3dinfinite, the Models, any content made
                        available through 3dinfinite, whether provided by us or
                        by third parties, or any transactions concluded outside
                        3dinfinite or as a result of 3dinfinite. You agree not
                        to hold us liable in respect of any losses arising out
                        of any event or events beyond our reasonable control.{" "}
                      </span>
                    </li>
                    <li className="c1 c10 li-bullet-42">
                      <span className="c4">
                        We will not be liable to you for any direct, indirect or
                        consequential losses, which may be incurred by you in
                        relation to 3dinfinite.{" "}
                      </span>
                    </li>
                    <li className="c1 c10 li-bullet-42">
                      <span className="c4">
                        We will not be liable for any loss or damage, which may
                        be incurred by you as a result of:{" "}
                      </span>
                    </li>
                  </ol>
                  <ul className="c0 lst-kix_list_39-1 start">
                    <li className="c29 c10 li-bullet-11">
                      <span className="c4">
                        Any changes which we may make to 3dinfinite, or for any
                        permanent or temporary cessation in the provision of
                        3dinfinite or any features thereof;
                      </span>
                    </li>
                    <li className="c29 c10 li-bullet-10">
                      <span className="c4">
                        The deletion of, corruption of, or failure to store the
                        User-Generated Content and other data maintained or
                        transmitted by or through 3dinfinite;
                      </span>
                    </li>
                    <li className="c29 c10 li-bullet-10">
                      <span className="c4">
                        Your failure to provide us with accurate personal data;
                        or
                      </span>
                    </li>
                    <li className="c29 c10 li-bullet-9">
                      <span className="c4">
                        Any reliance placed by you on the completeness, accuracy
                        or existence of any content, information,
                        recommendations, or advertising featured on 3dinfinite,
                        or as a result of any relationship or transaction
                        between you and third parties.
                      </span>
                    </li>
                  </ul>
                  <ol className="c0 lst-kix_list_40-1 start" start="4">
                    <li className="c1 c10 li-bullet-42">
                      <span className="c4">
                        This Section 10 shall apply whether or not we have been
                        advised of or should have been aware of the possibility
                        of any such losses arising.
                      </span>
                    </li>
                  </ol>
                  <p className="c24 c10">
                    <span className="c4"></span>
                  </p>
                  <ol className="c0 lst-kix_list_38-0" start="2">
                    <li className="c12 c10 li-bullet-59" id="h.2s8eyo1">
                      <span className="c25">INDEMNIFICATION</span>
                    </li>
                  </ol>
                  <ol className="c0 lst-kix_list_38-1 start" start="1">
                    <li className="c1 li-bullet-54">
                      <span className="c4">
                        You agree to indemnify, defend and hold us, our
                        subsidiaries, affiliates, partners, officers, directors,
                        agents, contractors, licensors, service providers,
                        subcontractors, suppliers, interns and employees,
                        harmless from any claim or demand, including attorneys’
                        fees, made by any third party due to or arising out of
                        your breach of these Terms, your use of 3dinfinite, or
                        your violation of any law or the rights of a third
                        party.
                      </span>
                    </li>
                  </ol>
                  <p className="c24">
                    <span className="c4"></span>
                  </p>
                  <ol className="c0 lst-kix_list_38-0" start="3">
                    <li className="c12 c10 li-bullet-60" id="h.17dp8vu">
                      <span className="c25">SEVERABILITY</span>
                    </li>
                  </ol>
                  <ol className="c0 lst-kix_list_38-1 start" start="1">
                    <li className="c1 li-bullet-61">
                      <span className="c4">
                        In the event that any provision of these Terms is
                        determined to be unlawful, void or unenforceable, such a
                        provision shall nonetheless be enforceable to the
                        fullest extent permitted by the applicable law, and the
                        unenforceable portion shall be deemed to be severed from
                        these Terms. The validity and enforceability of the
                        remaining provisions shall not be affected as a result.
                      </span>
                    </li>
                  </ol>
                  <p className="c24">
                    <span className="c4"></span>
                  </p>
                  <ol className="c0 lst-kix_list_38-0" start="4">
                    <li className="c12 c10 li-bullet-62" id="h.3rdcrjn">
                      <span className="c25">GOVERNING LAW AND DISPUTES</span>
                    </li>
                  </ol>
                  <ol className="c0 lst-kix_list_38-1 start" start="1">
                    <li className="c1 c10 li-bullet-44">
                      <span className="c8">Governing law.</span>
                      <span className="c4">&nbsp;</span>
                      <span className="c4">
                        These Terms shall be governed and construed in
                        accordance with the laws of the Czech Republic, without
                        regard to its conflicts of law provisions.{" "}
                      </span>
                    </li>
                    <li className="c1 li-bullet-7">
                      <span className="c8">Jurisdiction. </span>
                      <span className="c4">
                        You agree to resolve any disputes arising out of or
                        relating to these Terms by means of negotiation with us.
                        If the dispute cannot be resolved by means of
                        negotiation, the courts located in Czech Republic shall
                        have the jurisdiction.{" "}
                      </span>
                    </li>
                    <li className="c1 li-bullet-61">
                      <span className="c8">
                        Alternative dispute resolution (ADR).{" "}
                      </span>
                      <span className="c4">
                        ADR body acts as an independent middleman between an
                        Internet service provider and a customer when an initial
                        complaint cannot be resolved. You do not need (but may
                        opt for) legal assistance or representation to take your
                        case to an ADR scheme. The ADR body investigates
                        complaints by looking at consumer’s and Internet service
                        provider’s arguments and comes to a decision it deems to
                        be fair. More information on the online ADR platform
                        provided by the European Commission (for traders and
                        consumers based in the European Union) is available at{" "}
                      </span>
                      <span className="c4">
                        <a
                          className="c27"
                          href="https://www.google.com/url?q=https://ec.europa.eu/consumers/odr/main/index.cfm?event%3Dmain.home.chooseLanguage&amp;sa=D&amp;source=editors&amp;ust=1623007742681000&amp;usg=AOvVaw0CcgsjZJZgrrQ4NmSSBin5"
                        >
                          https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home.chooseLanguage
                        </a>
                      </span>
                      <span className="c4">&nbsp;.</span>
                    </li>
                    <li className="c1 li-bullet-6">
                      <span className="c4">
                        This section 13 does not affect any statutory rights
                        that you are entitled to as a consumer.
                      </span>
                    </li>
                  </ol>
                  <p className="c24">
                    <span className="c4"></span>
                  </p>
                  <ol className="c0 lst-kix_list_38-0" start="5">
                    <li className="c12 c10 li-bullet-63" id="h.26in1rg">
                      <span className="c25">MISCELLANEOUS</span>
                    </li>
                  </ol>
                  <ol className="c0 lst-kix_list_38-1 start" start="1">
                    <li className="c1 li-bullet-6">
                      <span className="c8">Term and termination.</span>
                      <span className="c4">
                        &nbsp;The Terms enter into force on the date indicated
                        at the top of the Terms and remain in force until
                        updated or terminated by us, you delete your User
                        Account or stop using 3dinfinite.{" "}
                      </span>
                    </li>
                    <li className="c1 li-bullet-14">
                      <span className="c8">Amendments.</span>
                      <span className="c4">
                        &nbsp;We reserve the right to modify these Terms at any
                        time, effective upon posting of an updated version on
                        3dinfinite. Such amendments may be necessary due to the
                        changes in the requirements of laws, regulations, new
                        features of 3dinfinite, and our business practices. We
                        will send you a notification (if we have your email
                        addresses) about any material amendments to the Terms
                        that may be of importance. Your continued use of
                        3dinfinite after any changes shall constitute your
                        consent to such changes. We also reserve the right to
                        modify the services provided through 3dinfinite at any
                        time, at our sole discretion.
                      </span>
                    </li>
                    <li className="c1 li-bullet-42">
                      <span className="c8">Breach of the Terms. </span>
                      <span className="c4">
                        If we believe, at our sole discretion, that you violate
                        these Terms and it is appropriate, necessary or
                        desirable to do so, we may:
                      </span>
                    </li>
                  </ol>
                  <ul className="c0 lst-kix_list_41-0 start">
                    <li className="c29 li-bullet-9">
                      <span className="c4">Send you a formal warning;</span>
                    </li>
                    <li className="c29 li-bullet-10">
                      <span className="c4">
                        Temporarily or permanently prohibit your use of
                        3dinfinite;{" "}
                      </span>
                    </li>
                    <li className="c29 li-bullet-52">
                      <span className="c4">
                        Report you to the relevant public authorities; or
                      </span>
                    </li>
                    <li className="c29 li-bullet-9">
                      <span className="c4">
                        Commence a legal action against the you.
                      </span>
                    </li>
                  </ul>
                  <ol className="c0 lst-kix_list_42-1 start" start="4">
                    <li className="c1 li-bullet-14">
                      <span className="c8">Transfer of rights.</span>
                      <span className="c4">
                        &nbsp;You are not allowed to assign your rights under
                        these Terms. We are entitled to transfer our rights and
                        obligations under these Terms entirely or partially to a
                        third party by giving a prior notice to you. If you do
                        not agree to the transfer, you can terminate these Terms
                        with immediate effect by and stopping to use 3dinfinite.{" "}
                      </span>
                    </li>
                  </ol>
                  <ol className="c0 lst-kix_list_38-1" start="4">
                    <li className="c1 c10 li-bullet-42">
                      <span className="c8">Merger or acquisition.</span>
                      <span className="c4">
                        &nbsp;In the event 3dinfinite, during the term of these
                        Terms, is &nbsp;acquired, merged, or sold, these Terms
                        shall not automatically be terminated and we agree to
                        use our best efforts to ensure that the transferee or
                        surviving company shall assume and be bound by the
                        provisions of these Terms.
                      </span>
                    </li>
                    <li className="c1 c10 li-bullet-42">
                      <span className="c8">Entire agreement.</span>
                      <span className="c4">
                        &nbsp;These Terms, together with the documents referred
                        to therein, represent entire agreement between you and
                        us regarding your relationship with us and govern your
                        use of 3dinfinite.{" "}
                      </span>
                    </li>
                  </ol>
                  <p className="c24 c10">
                    <span className="c4"></span>
                  </p>
                  <ol className="c0 lst-kix_list_38-0" start="6">
                    <li className="c12 c10 li-bullet-64" id="h.lnxbz9">
                      <span className="c25">CONTACT</span>
                    </li>
                  </ol>
                  <p className="c10 c48">
                    <span className="c4">
                      Any of your questions and notices regarding these Terms
                      should be sent to us by using the following contact
                      details:
                    </span>
                  </p>
                  <p className="c49 c10">
                    <span className="c8">Email:</span>
                    <span className="c4">&nbsp;info@3dinfinite.com</span>
                  </p>
                  <p className="c49 c10">
                    <span className="c8">Postal address: </span>
                    <span className="c4">
                      3D Universe s.r.o., Sumperk, Pod Senovou 2245/40, 78701,
                      the Czech Republic
                    </span>
                  </p>
                  <p className="c10 c49">
                    <span className="c8">VAT number: </span>
                    <span className="c4">CZ09040269</span>
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
export default About;
