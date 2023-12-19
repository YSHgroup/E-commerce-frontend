import Head from "next/head";
import { Container, Row, Col } from "react-bootstrap";
// import { prerender } from "../lib/prerendering";
import { metaTag, ogData, jsonldFullData } from "../lib/seo";

import { LayoutOne } from "../components/Layout";

// import bannedIPs from "../data/bannedIPs";

const PrivacyPolicy = () => {
  return (
    <LayoutOne>
      {/* Page Title */}
      <Head>
        <title>Privacy Policy | 3d Infinite</title>
        {metaTag(
          "description",
          "We respect your right to privacy and adhere to highest data protection standards. In this privacy policy, we explain in detail how we collect, use and disclose your personal data, and what choices you have with respect to your personal data. By accessing or using 3dinfinite, you agree to be legally bound by this privacy policy. Please read this document carefully. If you do not agree with one or more provisions of this document, you should not use 3dinfinite. 1. GENERAL INFORMATION 2. TYPES AND PURPOSES OF PERSONAL DATA 3. NON-PERSONAL DATA 4. MARKETING AND ADVERTISING 5. RETENTION PERIOD 6. SHARING AND DISCLOSING DATA 7. INTERNATIONAL TRANSFERS OF PERSONAL DATA 8. PROTECTION OF PERSONAL DATA 9. EXERCISING YOUR RIGHTS 10. TERM, TERMINATION, AND AMENDMENTS 11. CONTACT"
        )}
        {metaTag("keywords", "3dinfinite, privacy, policy, quesions")}
        {ogData({
          title: "Privacy Policy | 3d Infinite",
          description:
            "We respect your right to privacy and adhere to highest data protection standards. In this privacy policy, we explain in detail how we collect, use and disclose your personal data, and what choices you have with respect to your personal data. By accessing or using 3dinfinite, you agree to be legally bound by this privacy policy. Please read this document carefully. If you do not agree with one or more provisions of this document, you should not use 3dinfinite. 1. GENERAL INFORMATION 2. TYPES AND PURPOSES OF PERSONAL DATA 3. NON-PERSONAL DATA 4. MARKETING AND ADVERTISING 5. RETENTION PERIOD 6. SHARING AND DISCLOSING DATA 7. INTERNATIONAL TRANSFERS OF PERSONAL DATA 8. PROTECTION OF PERSONAL DATA 9. EXERCISING YOUR RIGHTS 10. TERM, TERMINATION, AND AMENDMENTS 11. CONTACT",
          url: `${process.env.PUBLIC_BASE_URL}/privacy-policy`,
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
              id: `${process.env.PUBLIC_BASE_URL}/privacy-policy`,
              name: "Privacy Policy",
            },
          ],
          title: "Privacy Policy | 3d Infinite",
          url: `${process.env.PUBLIC_BASE_URL}/privacy-policy`,
          description:
            "We respect your right to privacy and adhere to highest data protection standards. In this privacy policy, we explain in detail how we collect, use and disclose your personal data, and what choices you have with respect to your personal data. By accessing or using 3dinfinite, you agree to be legally bound by this privacy policy. Please read this document carefully. If you do not agree with one or more provisions of this document, you should not use 3dinfinite. 1. GENERAL INFORMATION 2. TYPES AND PURPOSES OF PERSONAL DATA 3. NON-PERSONAL DATA 4. MARKETING AND ADVERTISING 5. RETENTION PERIOD 6. SHARING AND DISCLOSING DATA 7. INTERNATIONAL TRANSFERS OF PERSONAL DATA 8. PROTECTION OF PERSONAL DATA 9. EXERCISING YOUR RIGHTS 10. TERM, TERMINATION, AND AMENDMENTS 11. CONTACT",
          image: [
            `${process.env.PUBLIC_BASE_URL}/assets/images/3d-infinite-logo.png`,
          ],
        })}
      </Head>

      {/* about content */}
      <div className="privacy-policy space-mb--r130">
        <div className="section-title-container space-mb--40">
          <Container>
            <Row>
              <Col lg={12} className="ml-auto mr-auto">
                <div className="c31 c41">
                  <p className="c14 c23">
                    <span className="c34">3dinfinite Privacy Policy</span>
                  </p>
                  <p className="c14 c23">
                    <span className="c9">Effective date: </span>
                    <span className="c19">30 September</span>
                    <span className="c9">&nbsp;</span>
                    <span className="c19">2020</span>
                  </p>
                  <p className="c14 c23 c25">
                    <span className="c3"></span>
                  </p>
                  <p className="c14 c25">
                    <span className="c3"></span>
                  </p>
                  <p className="c14">
                    <span className="c16">
                      We respect your right to privacy and adhere to highest
                      data protection standards.{" "}
                    </span>
                  </p>
                  <p className="c14">
                    <span className="c16">
                      In this privacy policy, we explain in detail how we
                      collect, use and disclose your personal data, and what
                      choices you have with respect to your personal data.
                    </span>
                  </p>
                  <p className="c14">
                    <span className="c16">
                      By accessing or using 3dinfinite, you agree to be legally
                      bound by this privacy policy. Please read this document
                      carefully. If you do not agree with one or more provisions
                      of this document, you should not use 3dinfinite.{" "}
                    </span>
                  </p>
                  <p className="c24 c25 c36">
                    <span className="c16"></span>
                  </p>
                  <p className="c24">
                    <span className="c3">
                      Topics covered in this privacy policy:
                    </span>
                  </p>
                  <p className="c24 c25">
                    <span className="c19"></span>
                  </p>
                  <p className="c7">
                    <span className="c13">1. GENERAL INFORMATION</span>
                  </p>
                  <p className="c7">
                    <span className="c13">
                      2. TYPES AND PURPOSES OF PERSONAL DATA
                    </span>
                  </p>
                  <p className="c7">
                    <span className="c13">3. NON-PERSONAL DATA</span>
                  </p>
                  <p className="c7">
                    <span className="c13">4. MARKETING AND ADVERTISING</span>
                  </p>
                  <p className="c7">
                    <span className="c13">5. RETENTION PERIOD</span>
                  </p>
                  <p className="c7">
                    <span className="c13">6. SHARING AND DISCLOSING DATA</span>
                  </p>
                  <p className="c7">
                    <span className="c13">
                      7. INTERNATIONAL TRANSFERS OF PERSONAL DATA
                    </span>
                  </p>
                  <p className="c7">
                    <span className="c13">8. PROTECTION OF PERSONAL DATA</span>
                  </p>
                  <p className="c7">
                    <span className="c13">9. EXERCISING YOUR RIGHTS</span>
                  </p>
                  <p className="c7">
                    <span className="c13">
                      10. TERM, TERMINATION, AND AMENDMENTS
                    </span>
                  </p>
                  <p className="c7">
                    <span className="c13">11. CONTACT</span>
                  </p>
                  <p className="c24 c23 c25 c28">
                    <span className="c38"></span>
                  </p>
                  <p className="c24 c23 c28" id="h.gjdgxs">
                    <span className="c8">1. GENERAL INFORMATION</span>
                  </p>
                  <p className="c11">
                    <span className="c16">
                      In this section, you can find general informatio
                    </span>
                    <span className="c44">n about 3dinfinite, i</span>
                    <span className="c16">
                      ts owner, and this privacy policy.
                    </span>
                  </p>
                  <p className="c6">
                    <span className="c35"></span>
                  </p>
                  <p className="c11">
                    <span className="c3">1.1 </span>
                    <span className="c0">About the Privacy Policy. </span>
                    <span className="c3">
                      This 3dinfinite privacy policy (the “
                    </span>
                    <span className="c0">Privacy Policy</span>
                    <span className="c3">
                      ”) governs the processing of personal data collected from
                      individual{" "}
                    </span>
                    <span className="c19">users and entities (“</span>
                    <span className="c9">you</span>
                    <span className="c19">” and “</span>
                    <span className="c9">your</span>
                    <span className="c19">”) through the website </span>
                    <span className="c40">
                      <a
                        className="c2"
                        href={`https://www.google.com/url?q=${process.env.PUBLIC_BASE_URL}/&amp;sa=D&amp;source=editors&amp;ust=1623003359485000&amp;usg=AOvVaw17Pw_UEH45e69OSYN2Bq07`}
                      >
                        3dinfinite.com
                      </a>
                    </span>
                    <span className="c19">
                      &nbsp;and the related services (collectively, “
                    </span>
                    <span className="c9">3dinfinite</span>
                    <span className="c19">”). </span>
                    <span className="c3">
                      The Privacy Policy does not cover any third-party
                      websites, applications or software that integrate with
                      3dinfinite or any other third-party products and services.{" "}
                    </span>
                  </p>
                  <p className="c11">
                    <span className="c3">1.2 </span>
                    <span className="c0">Data controlle</span>
                    <span className="c9">r. </span>
                    <span className="c19">
                      3dinfinite is owned, operated, and offered by 3D Universe
                      s.r.o. having a registered business address at Sumperk,
                      Pod Senovou 2245/40, 78701, the Czech Republic and the
                      company ID 09040269 (“
                    </span>
                    <span className="c9">we</span>
                    <span className="c19">”, “</span>
                    <span className="c9">us</span>
                    <span className="c19">”, or “</span>
                    <span className="c9">our</span>
                    <span className="c19">
                      ”). We act in the capacity of a data controller with
                      regard to the personal data processed through 3dinfinite.
                      It means that we are responsible for the collection and
                      use of your personal data through 3dinfinite and we make
                      decisions about the types of personal data that should be
                      collected from you and purposes for which such personal
                      data should be used.
                    </span>
                  </p>
                  <p className="c11">
                    <span className="c19">1.3 </span>
                    <span className="c9">Your consent. </span>
                    <span className="c19">
                      Before you submit any personal data through 3dinfinite,
                      you are encouraged to read this Privacy Policy that is
                      always available on 3dinfinite to understand on what legal
                      bases (other than your consent) we rely when handling your
                      personal data. In some cases, if required by the
                      applicable law, we may seek to obtain your informed
                      consent for the processing of your personal data. For
                      example, we may seek your prior consent if: (i) we intend
                      to collect other types of personal data that are not
                      mentioned in this Privacy Policy; (ii) we would like to
                      use your personal data for other purposes that are not
                      specified in this Privacy Policy; or (iii) we would like
                      to transfer your personal data to third parties that are
                      not listed in this Privacy Policy.{" "}
                    </span>
                  </p>
                  <p className="c11">
                    <span className="c3">1.4 </span>
                    <span className="c0">Children.</span>
                    <span className="c3">&nbsp;</span>
                    <span className="c19">3dinfinite is</span>
                    <span className="c3">
                      &nbsp;not intended for use by children (i.e., persons who
                      are minors in their country of residence). Therefore, we
                      do not knowingly collect minors’ personal data.
                    </span>
                  </p>
                  <p className="c11">
                    <span className="c3">1.5 </span>
                    <span className="c0">Cookies. </span>
                    <span className="c3">We use cookies on </span>
                    <span className="c19">3dinfinite.</span>
                    <span className="c3">
                      &nbsp;For detailed information on our cookie use
                      practices, please refer to our cookie policy available at{" "}
                      <a href="/cookie-policy">3dinfinite.com/cookie-policy</a>
                    </span>
                    <span className="c3">.</span>
                  </p>
                  <p className="c6">
                    <span className="c3"></span>
                  </p>
                  <p className="c24 c23 c28" id="h.30j0zll">
                    <span className="c8">
                      2. TYPES AND PURPOSES OF PERSONAL DATA
                    </span>
                  </p>
                  <p className="c11">
                    <span className="c16">
                      When you use 3dinfinite, we collect a minimal amount of
                      personal data. Your personal data is used for specified
                      and limited purposes. In this section, we explain what
                      types of personal data we collect from you, for what
                      purposes we use that data, and on what legal bases we rely
                      when processing your personal data.{" "}
                    </span>
                  </p>
                  <p className="c6">
                    <span className="c17"></span>
                  </p>
                  <p className="c11">
                    <span className="c19">2.1</span>
                    <span className="c9">&nbsp;Types of personal data. </span>
                    <span className="c19">
                      We comply with data minimisation principles. Thus, we
                      collect only a minimal amount of personal data that is
                      necessary for your use of 3dinfinite. The list of the
                      types of personal data that we collect from you is
                      provided in section 2.3 below.
                    </span>
                  </p>
                  <p className="c11">
                    <span className="c19">2.2 </span>
                    <span className="c9">Purposes of personal data.</span>
                    <span className="c19">
                      &nbsp;We use your personal data for limited, specified and
                      legitimate purposes explicitly mentioned in this Privacy
                      Policy. In short, we use it only for the purposes of
                      enabling you to use 3dinfinite, providing you with the
                      requested services, maintaining and improving 3dinfinite,
                      conducting research about 3dinfinite and our business
                      activities, replying to your enquiries, and pursuing our
                      legitimate business interests. We do not repurpose your
                      personal data. It means that we do not use it for any
                      purposes that are different from the purposes for which
                      your personal data was provided.{" "}
                    </span>
                  </p>
                  <p className="c11">
                    <span className="c3">2.3 </span>
                    <span className="c0">
                      Overview of types and purposes of your personal data.{" "}
                    </span>
                    <span className="c3">
                      The list below provides a detailed description of the
                      types of personal data that we collect from you, the
                      purposes for which we use it, and the legal bases on which
                      we rely when processing your personal data.
                    </span>
                  </p>
                  <ul className="c18 lst-kix_list_2-1 start">
                    <li className="c1 li-bullet-0">
                      <span className="c0">Registration of User Account. </span>
                      <span className="c3">
                        When you register your user account, we collect your
                        username and email address. If you decide to signup by
                        using your Facebook or Google accounts, we collect your
                        internal ID and any information that Facebook or Google
                        shares with us. We use such data to (i) register and
                        maintain your user account, (ii) enable your access to
                        3dinfinite, (iii) provide you with the requested
                        services, (iv) contact you, if necessary, and (v)
                        maintain our business records. The legal bases on which
                        we rely are ‘performing a contract with you’ and
                        ‘pursuing our legitimate business interests’ (i.e.,
                        analyse, grow, and administer 3dinfinite).{" "}
                      </span>
                    </li>
                    <li className="c1 li-bullet-0">
                      <span className="c0">Payments. </span>
                      <span className="c3">
                        When you purchase 3D models, we ask you to provide your
                        payment details, such as your name, credit card number,
                        expiration date, security code, and billing address.
                        Please note that we{" "}
                      </span>
                      <span className="c3 c31">
                        do not accept payments directly or process payments - it
                        is done by our third-third-party payment processor
                        Stripe. We use your payment data to process your
                        payments and maintain our business records. The legal
                        bases on which we rely are ‘performing a contract’ and
                        ‘pursuing our legitimate business interests’ (i.e.,
                        administer our business).{" "}
                      </span>
                      <span className="c3">&nbsp;</span>
                    </li>
                    <li className="c1 li-bullet-0">
                      <span className="c0">
                        Contact form, live chat, and email enquiries.{" "}
                      </span>
                      <span className="c3">
                        When you contact us by email or using the contact form
                        or the live chat available on 3dinfinite, we collect
                        your name, email address, and any information that you
                        decide to include in your message. We use such data to
                        respond to your enquiries and provide you with the
                        requested information. The legal bases on which we rely
                        are ‘pursuing our legitimate business interests’ (i.e.,
                        to grow and promote our business) and ‘your consent’
                        (for optional personal data).
                      </span>
                    </li>
                    <li className="c1 li-bullet-0">
                      <span className="c0 c31">IP address. </span>
                      <span className="c3">
                        When you visit and browse 3dinfinite, we or our
                        third-party analytics service providers (as explained in
                        section 3 below) collect your IP address. We use your IP
                        address to analyse the technical aspect of your use of
                        3dinfinite, prevent fraud and abuse of 3dinfinite, and
                        ensure the security of 3dinfinite. The legal basis that
                        we rely on when processing your IP address is ‘pursuing
                        our legitimate business interests’ (i.e., to analyse and
                        protect 3dinfinite).
                      </span>
                    </li>
                    <li className="c1 li-bullet-0">
                      <span className="c0">Cookies. </span>
                      <span className="c3">
                        When you browse 3dinfinite, we collect your
                        cookie-related data. For more information about the
                        purposes for which we use cookies, please refer to our
                        cookie policy available at{" "}
                        <a href="/cookie-policy">
                          3dinfinite.com/cookie-policy
                        </a>
                      </span>
                      <span className="c3">
                        . The legal bases on which we rely are ‘pursuing our
                        legitimate business interests’ (i.e., to analyse and
                        promote our business) and ‘your consent’. &nbsp;{" "}
                      </span>
                    </li>
                  </ul>
                  <p className="c11">
                    <span className="c3">2.4</span>
                    <span className="c0">&nbsp;Sensitive data. </span>
                    <span className="c3">
                      We do not collect or use any special categories of
                      personal data (“sensitive data”) from you, unless you
                      decide, at your own discretion, to provide such data to
                      us. Sensitive data is information that relates to your
                      health, religious and political beliefs, racial origins,
                      membership of a professional or trade association, or
                      sexual orientation. &nbsp; &nbsp;
                    </span>
                  </p>
                  <p className="c11">
                    <span className="c3">2.5 </span>
                    <span className="c0">
                      Refusal to provide personal data.
                    </span>
                    <span className="c3">
                      &nbsp;If you refuse to provide us with your personal data
                      when we ask to, we may not be able to perform the
                      requested operation and you may not be able to use the
                      full functionality of 3dinfinite, receive our services, or
                      get our response. Please contact us immediately if you
                      think that any personal data that we collect is excessive
                      or not necessary for the intended purpose. &nbsp;
                    </span>
                  </p>
                  <p className="c24 c23 c25 c28">
                    <span className="c20"></span>
                  </p>
                  <p className="c24 c23 c28" id="h.1fob9te">
                    <span className="c8">3. NON-PERSONAL DATA</span>
                  </p>
                  <p className="c11">
                    <span className="c16">
                      When you use 3dinfinite, we receive some technical data
                      for analytics purposes. In this section, we inform you
                      what non-personal data we collect from you and for what
                      purposes we use that data.{" "}
                    </span>
                  </p>
                  <p className="c6">
                    <span className="c17"></span>
                  </p>
                  <p className="c11">
                    <span className="c3">3.1 </span>
                    <span className="c0">Log files and analytics data. </span>
                    <span className="c3">In order to ana</span>
                    <span className="c19">
                      lyse your use of 3dinfinite, we collect and use
                      third-party analytics service Google Analytics and
                      Facebook Pixel to automatically collect certain technical
                      non-personal data about your use of 3dinfinite. Such d
                    </span>
                    <span className="c3">
                      ata does not allow us us to identify you in any manner.
                      The non-personal data{" "}
                    </span>
                    <span className="c19">
                      includes the following information:{" "}
                    </span>
                  </p>
                  <ul className="c18 lst-kix_list_4-0 start">
                    <li className="c5 li-bullet-0">
                      <span className="c19">Your activity on 3dinfinite; </span>
                    </li>
                    <li className="c5 li-bullet-0">
                      <span className="c19">Your device type;</span>
                    </li>
                    <li className="c5 li-bullet-0">
                      <span className="c19">Your operating system;</span>
                    </li>
                    <li className="c5 li-bullet-0">
                      <span className="c19">
                        URL addresses clicked to and from 3Dinfinite; and
                      </span>
                    </li>
                    <li className="c5 li-bullet-0">
                      <span className="c19">Your other online behaviour.</span>
                    </li>
                  </ul>
                  <p className="c11">
                    <span className="c3">3.2 </span>
                    <span className="c0">Your feedback</span>
                    <span className="c3">
                      . If you contact us, we may keep records of any questions,
                      complaints, recommendations, or compliments made by you
                      and the response. Where possible, we will de-identify your
                      personal data (i.e., we will remove all personal data that
                      is not necessary for keeping such records).{" "}
                    </span>
                  </p>
                  <p className="c11">
                    <span className="c3">3.3 </span>
                    <span className="c0">Purposes of non-personal data. </span>
                    <span className="c3">
                      We will use non-personal data for the following purposes:
                    </span>
                  </p>
                  <ul className="c18 lst-kix_list_6-0 start">
                    <li className="c4 li-bullet-1">
                      <span className="c19">
                        To analyse what kind of users use 3dinfinite;
                      </span>
                    </li>
                    <li className="c4 li-bullet-2">
                      <span className="c19">
                        To examine the relevance, popularity, and engagement
                        rate of 3dinfinite;{" "}
                      </span>
                    </li>
                    <li className="c4 li-bullet-1">
                      <span className="c19">
                        To investigate and help prevent security issues and
                        abuse;{" "}
                      </span>
                    </li>
                    <li className="c4 li-bullet-1">
                      <span className="c19">
                        To develop and provide additional features to
                        3dinfinite; and
                      </span>
                    </li>
                    <li className="c4 li-bullet-1">
                      <span className="c19">
                        To personalise 3dinfinite for your specific needs.{" "}
                      </span>
                    </li>
                  </ul>
                  <p className="c11">
                    <span className="c3">3.4</span>
                    <span className="c0">
                      &nbsp;Aggregated and de-identified data.{" "}
                    </span>
                    <span className="c3">
                      In case your non-personal data is combined with certain
                      elements of your personal data in a way that allows us to
                      identify you, we will handle such aggregated data as
                      personal data. If your personal data is aggregated or
                      de-identified in a way that it can no longer be associated
                      with an identified or identifiable natural person, it will
                      not be considered personal data and we may use it for any
                      business purpose.
                    </span>
                  </p>
                  <p className="c24 c23 c25 c28">
                    <span className="c20"></span>
                  </p>
                  <p className="c24 c23 c28" id="h.3znysh7">
                    <span className="c8">4. COMMERCIAL COMMUNICATION</span>
                  </p>
                  <p className="c11">
                    <span className="c16">
                      From time to time, you may receive promotional messages
                      from us. Below, we explain when you may receive such
                      notices from us and what you can do to decline our
                      promotional messages.
                    </span>
                  </p>
                  <p className="c6">
                    <span className="c17"></span>
                  </p>
                  <p className="c11">
                    <span className="c3">4.1 </span>
                    <span className="c0">Newsletters. </span>
                    <span className="c3">
                      If we have your email address, we may send you a
                      newsletter to keep you updated about the latest
                      developments related to 3dinfinite, our new services, and
                      special offers. You will receive our newsletters in the
                      following instances:
                    </span>
                  </p>
                  <ul className="c18 lst-kix_list_8-0 start">
                    <li className="c4 li-bullet-2">
                      <span className="c19">
                        If we receive your express (“opt-in”) consent to receive
                        marketing messages (please note that your voluntary
                        subscription for our newsletters substitutes such
                        consent); or
                      </span>
                    </li>
                    <li className="c4 li-bullet-2">
                      <span className="c19">
                        We decide to send you information about our new products
                        or services that are closely related to the products or
                        services already used by you (e.g., if you have
                        purchased a 3D model from us).{" "}
                      </span>
                    </li>
                  </ul>
                  <p className="c11">
                    <span className="c3">4.2</span>
                    <span className="c0">&nbsp;Opting-out.</span>
                    <span className="c3">
                      &nbsp;You can opt-out from receiving marketing messages at
                      any time free of charge by clicking on the “unsubscribe”
                      link contained in any of the newsletters sent to you or by
                      contacting us directly.
                    </span>
                  </p>
                  <p className="c11">
                    <span className="c3">4.3 </span>
                    <span className="c0">
                      Informational notices and updates.
                    </span>
                    <span className="c3">
                      &nbsp;From time to time, we may send you important
                      informational notices, such as service-related, technical
                      or administrative emails, your privacy and security, and
                      other administrative matters. Please note that we will
                      send such notices on an “if-needed” basis and they do not
                      fall within the scope of commercial communication that
                      requires your prior consent.
                    </span>
                  </p>
                  <p className="c24 c23 c25 c28">
                    <span className="c20"></span>
                  </p>
                  <p className="c24 c23 c28" id="h.2et92p0">
                    <span className="c8">5</span>
                    <span className="c8">. RETENTION PERIOD</span>
                  </p>
                  <p className="c11">
                    <span className="c16">
                      We store your personal data for the time period it is
                      necessary for its intended purposes. In this section, we
                      specify the retention periods for your personal and
                      non-personal data.{" "}
                    </span>
                  </p>
                  <p className="c6">
                    <span className="c17"></span>
                  </p>
                  <p className="c11">
                    <span className="c3">5.1 </span>
                    <span className="c0">Retention of personal data. </span>
                    <span className="c3">
                      We will store your personal data in our systems only for
                      as long as such personal data is required for the purposes
                      described in this Privacy Policy or until you request us
                      to delete your personal data, whichever comes first. After
                      your personal data is no longer necessary for its purposes
                      and there is no other legal basis for storing it, we will
                      immediately securely delete your personal data from our
                      systems.
                    </span>
                  </p>
                  <p className="c11">
                    <span className="c3">5.2 </span>
                    <span className="c0">Retention of non-personal data.</span>
                    <span className="c3">
                      &nbsp;We retain non-personal data pertaining to you for as
                      long as necessary for the purposes described in this
                      Privacy Policy. This may include storing non-personal data
                      for the period of time needed for us to pursue legitimate
                      business interests, conduct audits, comply with (and
                      demonstrate compliance with) legal obligations, resolve
                      disputes and enforce our agreements.
                    </span>
                  </p>
                  <p className="c11">
                    <span className="c3">5.3 </span>
                    <span className="c0">Retention as required by law. </span>
                    <span className="c3">
                      In instances when we are obliged by law to store your
                      personal data for certain period of time (e.g., for
                      business records purposes), we will store your personal
                      data for the time period stipulated by the applicable law
                      and delete the personal data as soon as the required
                      retention period expires.
                    </span>
                  </p>
                  <p className="c24 c23 c25 c28">
                    <span className="c20"></span>
                  </p>
                  <p className="c24 c23 c28" id="h.tyjcwt">
                    <span className="c8">6</span>
                    <span className="c8">. SHARING AND DISCLOSING DATA</span>
                  </p>
                  <p className="c11">
                    <span className="c16">
                      We cooperate with external service providers and share
                      some personal data with them. In this section, you can
                      find information about third parties that have access to
                      your personal data and the instances when we make data
                      transfers.
                    </span>
                  </p>
                  <p className="c6">
                    <span className="c17"></span>
                  </p>
                  <p className="c11">
                    <span className="c3">6.1 </span>
                    <span className="c0">Disclosure to data processors. </span>
                    <span className="c3">
                      If necessary, we will disclose your personal data to the
                      service providers with whom we cooperate (our data
                      processors). For example, we may share your personal and
                      non-personal data with entities that provide certain
                      technical support services to us, such as hosting and
                      email distribution services. We do not sell your personal
                      data to third parties. The disclosure is limited to the
                      situations when such data is required for the following
                      purposes:
                    </span>
                  </p>
                  <ul className="c18 lst-kix_list_6-0">
                    <li className="c4 li-bullet-1">
                      <span className="c19">
                        Ensuring the proper operation of 3dinfinite;
                      </span>
                    </li>
                    <li className="c4 li-bullet-1">
                      <span className="c19">
                        Ensuring the delivery of services requested by you;
                      </span>
                    </li>
                    <li className="c4 li-bullet-1">
                      <span className="c19">
                        Providing you with the requested information;
                      </span>
                    </li>
                    <li className="c4 li-bullet-1">
                      <span className="c19">
                        Pursuing our legitimate business interests;
                      </span>
                    </li>
                    <li className="c4 li-bullet-2">
                      <span className="c19">
                        Enforcing our rights, preventing fraud, and security
                        purposes;
                      </span>
                    </li>
                    <li className="c4 li-bullet-2">
                      <span className="c19">
                        Carrying out our contractual obligations;
                      </span>
                    </li>
                    <li className="c4 li-bullet-2">
                      <span className="c19">Law enforcement purposes; or </span>
                    </li>
                    <li className="c4 li-bullet-2">
                      <span className="c19">
                        If you provide your prior consent to such a disclosure.{" "}
                      </span>
                    </li>
                  </ul>
                  <p className="c11">
                    <span className="c3">6.2 </span>
                    <span className="c0">List of data processors. </span>
                    <span className="c3">
                      The data processors that we choose
                    </span>
                    <span className="c0">&nbsp;</span>
                    <span className="c3">
                      agree to ensure an adequate level of protection of
                      personal data that is consistent with this Privacy Policy
                      and the applicable data protection laws. The data
                      processors that will have access to your personal data
                      are:{" "}
                    </span>
                  </p>
                  <ul className="c18 lst-kix_list_10-0 start">
                    <li className="c5 li-bullet-0">
                      <span className="c3">
                        Our hosting and cloud storage service provider Savana
                        Hosting (https://www.savana.cz) located in the Czech
                        Republic;
                      </span>
                    </li>
                    <li className="c5 li-bullet-0">
                      <span className="c3">
                        Our email marketing service providers MailChimp (
                      </span>
                      <span className="c35">
                        <a
                          className="c2"
                          href="https://www.google.com/url?q=https://mailchimp.com&amp;sa=D&amp;source=editors&amp;ust=1623003359493000&amp;usg=AOvVaw04_G4gGIxqgsD1oUfUE-y3"
                        >
                          https://mailchimp.com
                        </a>
                      </span>
                      <span className="c3">
                        ) located in the United States and LeadHub (
                      </span>
                      <span className="c35">
                        <a
                          className="c2"
                          href="https://www.google.com/url?q=https://www.leadhub.co&amp;sa=D&amp;source=editors&amp;ust=1623003359494000&amp;usg=AOvVaw2YzMt_q8DKKlM4PecB5qHe"
                        >
                          https://www.leadhub.co
                        </a>
                      </span>
                      <span className="c3">
                        ) located in the Czech Republic
                      </span>
                      <span className="c3 c27">;</span>
                    </li>
                    <li className="c5 li-bullet-0">
                      <span className="c3">
                        Our analytics and marketing service providers Google
                        Analytics (
                      </span>
                      <span className="c35">
                        <a
                          className="c2"
                          href="https://www.google.com/url?q=https://analytics.google.com/analytics/&amp;sa=D&amp;source=editors&amp;ust=1623003359494000&amp;usg=AOvVaw16QcyEkzL4nUN4eXx2R5G3"
                        >
                          https://analytics.google.com/analytics/
                        </a>
                      </span>
                      <span className="c3">) and Facebook Pixel (</span>
                      <span className="c35">
                        <a
                          className="c2"
                          href="https://www.google.com/url?q=https://www.facebook.com/business/learn/facebook-ads-pixel&amp;sa=D&amp;source=editors&amp;ust=1623003359494000&amp;usg=AOvVaw3Gh7APA-KZ53KiKoOmHvl3"
                        >
                          https://www.facebook.com/business/learn/facebook-ads-pixel
                        </a>
                      </span>
                      <span className="c3">
                        ) located in the United States;
                      </span>
                    </li>
                    <li className="c5 li-bullet-0">
                      <span className="c3">Our payment processor Stripe (</span>
                      <span className="c35">
                        <a
                          className="c2"
                          href="https://www.google.com/url?q=https://stripe.com&amp;sa=D&amp;source=editors&amp;ust=1623003359495000&amp;usg=AOvVaw1VI6HcGCtsK0bvz9LUQnKg"
                        >
                          https://stripe.com
                        </a>
                      </span>
                      <span className="c3">) and PayPal (</span>
                      <span className="c35">
                        <a
                          className="c2"
                          href="https://www.google.com/url?q=https://www.paypal.com&amp;sa=D&amp;source=editors&amp;ust=1623003359495000&amp;usg=AOvVaw0zhVz5Ni0s7dKLTAPtd5ZP"
                        >
                          https://www.paypal.com
                        </a>
                      </span>
                      <span className="c3">
                        ) located in the United States;{" "}
                      </span>
                    </li>
                    <li className="c5 li-bullet-0">
                      <span className="c3">
                        Our live chat functionality providers LeadHub (
                      </span>
                      <span className="c35">
                        <a
                          className="c2"
                          href="https://www.google.com/url?q=https://www.leadhub.co&amp;sa=D&amp;source=editors&amp;ust=1623003359495000&amp;usg=AOvVaw00ae84K9cMYtNGFO1ar3uC"
                        >
                          https://www.leadhub.co
                        </a>
                      </span>
                      <span className="c3">
                        ) located in the Czech Republic and Facebook (
                      </span>
                      <span className="c35">
                        <a
                          className="c2"
                          href="https://www.google.com/url?q=https://www.facebook.com&amp;sa=D&amp;source=editors&amp;ust=1623003359496000&amp;usg=AOvVaw3l-U0O5Z0eJCrf0hl6hpsD"
                        >
                          https://www.facebook.com
                        </a>
                      </span>
                      <span className="c3">
                        ) located in the United States; and
                      </span>
                    </li>
                    <li className="c5 li-bullet-0">
                      <span className="c3">
                        Our independent contractors and consultants.
                      </span>
                    </li>
                  </ul>
                  <p className="c11">
                    <span className="c3">6.3 </span>
                    <span className="c0">
                      Disclosure of non-personal data.{" "}
                    </span>
                    <span className="c3">
                      Your non-personal data may be disclosed to third parties
                      for any purpose. For example, we may share it with
                      prospects or partners for business or research purposes,
                      for improving 3dinfinite, responding to lawful requests
                      from public authorities or developing new products and
                      services.{" "}
                    </span>
                  </p>
                  <p className="c11">
                    <span className="c3">6.4 </span>
                    <span className="c0">Legal requests.</span>
                    <span className="c3">
                      &nbsp;If requested by a public authority, we will disclose
                      information about the users of 3dinfinite to the extent
                      necessary for pursuing a public interest objective, such
                      as national security or law enforcement.
                    </span>
                  </p>
                  <p className="c11">
                    <span className="c3">6.5 </span>
                    <span className="c0">Successors.</span>
                    <span className="c3">
                      &nbsp;In case our business is sold partly or fully, we
                      will provide your personal data to a purchaser or
                      successor entity and request the successor to handle your
                      personal data in line with this Privacy Policy.
                    </span>
                  </p>
                  <p className="c24 c23 c25 c28">
                    <span className="c20"></span>
                  </p>
                  <p className="c24 c23 c28" id="h.3dy6vkm">
                    <span className="c8">
                      7. INTERNATIONAL TRANSFERS OF PERSONAL DATA
                    </span>
                  </p>
                  <p className="c11">
                    <span className="c16">
                      Your personal data may be transferred outside the country
                      where you reside. In this section, we explain when we
                      transfer personal data abroad and what safeguards we
                      implement to ensure that your personal is properly
                      protected.
                    </span>
                  </p>
                  <p className="c6">
                    <span className="c17"></span>
                  </p>
                  <p className="c11">
                    <span className="c3">
                      Some of our data processors listed in section 6 of this
                      Privacy Policy are located outside the country in which
                      you reside. For example, if you reside in the European
                      Economic Area (EEA), we may need to transfer your personal
                      data to jurisdictions outside the EEA. In case it is
                      necessary to make such a transfer, we will make sure that
                      the jurisdiction in which the recipient third party is
                      located guarantees an adequate level of protection for
                      your personal data or we conclude an agreement with the
                      respective third party that ensures such protection (e.g.,
                      a data processing agreement based pre-approved standard
                      contractual clauses).
                    </span>
                  </p>
                  <p className="c24 c23 c25 c28">
                    <span className="c20"></span>
                  </p>
                  <p className="c24 c23 c28" id="h.1t3h5sf">
                    <span className="c8">8. PROTECTION OF PERSONAL DATA</span>
                  </p>
                  <p className="c11">
                    <span className="c16">
                      We strive to ensure that your personal data is kept safe
                      and secure. In this section, we inform you about our
                      measures that help us to protect your personal data.
                    </span>
                  </p>
                  <p className="c6">
                    <span className="c17"></span>
                  </p>
                  <p className="c11">
                    <span className="c3">8.1 </span>
                    <span className="c0">Security measures.</span>
                    <span className="c3">
                      &nbsp;We implement organisational and technical
                      information security measures to protect your personal
                      data from loss, misuse, unauthorised access, and
                      disclosure. The security measures taken by us include
                      secured networks, SSL protocol, strong passwords, password
                      hashing, limited access to your personal data by our
                      staff, and anonymisation of personal data
                    </span>
                    <span className="c19">&nbsp;(when possible).</span>
                  </p>
                  <p className="c11">
                    <span className="c3">8.2 </span>
                    <span className="c0">Security breaches.</span>
                    <span className="c3">
                      &nbsp;Although we put our best efforts to protect your
                      personal data, given the nature of communications and
                      information processing technology and the Internet, we
                      cannot be liable for any unlawful destruction, loss, use,
                      copying, modification, leakage, and falsification of your
                      personal data caused by circumstances that are beyond our
                      reasonable control. In case a serious breach occurs, we
                      will take reasonable measures to mitigate the breach, as
                      required by the applicable law. Our liability for any
                      security breach will be limited to the highest extent
                      permitted by the applicable law.{" "}
                    </span>
                  </p>
                  <p className="c24 c23 c25 c28">
                    <span className="c10"></span>
                  </p>
                  <p className="c24 c23 c28" id="h.4d34og8">
                    <span className="c8">9. EXERCISING YOUR RIGHTS</span>
                  </p>
                  <p className="c11">
                    <span className="c16">
                      You have the right to control how we process your personal
                      data. Below, we list the rights that you can exercise with
                      regard to your personal data and explain how you can
                      exercise those rights. &nbsp;
                    </span>
                  </p>
                  <p className="c6">
                    <span className="c37"></span>
                  </p>
                  <p className="c11">
                    <span className="c3">9.1 </span>
                    <span className="c0">The list of your rights. </span>
                    <span className="c3">
                      Subject to any exemptions provided by law, you may ask us
                      to:
                    </span>
                  </p>
                  <ul className="c18 lst-kix_list_6-1 start">
                    <li className="c11 c12 li-bullet-1">
                      <span className="c3">
                        Get a copy of your personal data that we store;
                      </span>
                    </li>
                    <li className="c11 c12 li-bullet-1">
                      <span className="c3">
                        Get a list of purposes for which your personal data is
                        processed;
                      </span>
                    </li>
                    <li className="c11 c12 li-bullet-1">
                      <span className="c3">
                        Rectify inaccurate personal data;
                      </span>
                    </li>
                    <li className="c11 c12 li-bullet-1">
                      <span className="c3">
                        Move your personal data to another processor;
                      </span>
                    </li>
                    <li className="c11 c12 li-bullet-1">
                      <span className="c3">
                        Delete your personal data from our systems;
                      </span>
                    </li>
                    <li className="c11 c12 li-bullet-2">
                      <span className="c3 c33">
                        Object and restrict processing of your personal data;
                      </span>
                    </li>
                    <li className="c11 c12 li-bullet-2">
                      <span className="c3 c33">
                        Withdraw your consent, if you have provided one
                      </span>
                      <span className="c3">; or</span>
                    </li>
                    <li className="c11 c12 li-bullet-1">
                      <span className="c3 c33">
                        Process your complaint regarding your personal data.
                      </span>
                    </li>
                  </ul>
                  <p className="c11">
                    <span className="c3 c33">9</span>
                    <span className="c3">.2 </span>
                    <span className="c0">How to exercise your rights?</span>
                    <span className="c3">
                      &nbsp;If you would like to exercise any of your rights
                      listed in section 9.1, please contact us by email{" "}
                    </span>
                    <span className="c19">at info@3dinfinite.com a</span>
                    <span className="c3">
                      nd explain in detail your request. In order to verify the
                      legitimacy of your request, we may ask you to provide us
                      with an identifying piece of information, so that we would
                      be able to identify you in our system. We will answer your
                      request within a reasonable time frame but no later than 2
                      weeks.
                    </span>
                  </p>
                  <p className="c11">
                    <span className="c3">9.3</span>
                    <span className="c0">&nbsp;Complaints.</span>
                    <span className="c3">
                      &nbsp;If you would like to launch a complaint about the
                      way in which we handle your personal data, we kindly ask
                      you to contact us first and express your concerns. After
                      you contact us, we will investigate your complaint and
                      provide you with our response as soon as possible. If you
                      are not satisfied with the outcome of your complaint, you
                      have the right to lodge a complaint with your local data
                      protection authority.
                    </span>
                  </p>
                  <p className="c24 c23 c25 c28">
                    <span className="c20"></span>
                  </p>
                  <p className="c24 c23 c28" id="h.2s8eyo1">
                    <span className="c8">
                      10. TERM, TERMINATION, AND AMENDMENTS
                    </span>
                  </p>
                  <p className="c11">
                    <span className="c16">
                      This Privacy Policy may be changed or terminated at any
                      time. In this section, we explain for how long this
                      document is valid and how you will be informed about any
                      changes.{" "}
                    </span>
                  </p>
                  <p className="c6">
                    <span className="c17"></span>
                  </p>
                  <p className="c11">
                    <span className="c3">10.1 </span>
                    <span className="c0">Term and termination. </span>
                    <span className="c3">
                      This Privacy Policy enters into force on the effective
                      date indicated at the top of the Privacy Policy and
                      remains valid until terminated or updated by us.
                    </span>
                  </p>
                  <p className="c11">
                    <span className="c3">10.2 </span>
                    <span className="c0">Amendments.</span>
                    <span className="c3">
                      &nbsp;The Privacy Policy may be changed from time to time
                      to address the changes in laws, regulations, and industry
                      standards. We encourage you to review our Privacy Policy
                      to stay informed. For significant material changes in the
                      Privacy Policy or, where required by the applicable law,
                      we may seek your consent.
                    </span>
                  </p>
                  <p className="c24 c23 c25 c28">
                    <span className="c20"></span>
                  </p>
                  <p className="c24 c23 c28" id="h.17dp8vu">
                    <span className="c8">11. CONTACT</span>
                  </p>
                  <p className="c6">
                    <span className="c17"></span>
                  </p>
                  <p className="c32">
                    <span className="c42">An</span>
                    <span className="c3">
                      y enquiries about the Privacy Policy and our data
                      protection practices should be addressed to us by using
                      the following contact details:
                    </span>
                  </p>
                  <p className="c11 c43">
                    <span className="c9">Email:</span>
                    <span className="c19">&nbsp;info@3dinfinite.com</span>
                  </p>
                  <p className="c11 c43">
                    <span className="c9">Postal address: </span>
                    <span className="c19">
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

export default PrivacyPolicy;
