import Box from '@component/Box';
import OtherLayout from '@component/layout/OtherLayout';
import { H1, H4, Paragraph } from '@component/Typography';
import useAllProductCategories from '@hook/Home/useAllProductCategories';
import useProductCount from '@hook/useNoOfProduct';
import useWindowSize from '@hook/useWindowSize';
import Head from 'next/head';
import React from 'react';

const ProductSearchResult = () => {
  const width = useWindowSize();
  const isTablet = width < 1025;

  return (
    <>
      <Head>
        <title>privacy policy - Nobarun International</title>
      </Head>
      <Box p="20px" mb="70px">
        <H1
          textAlign="center"
          mt={isTablet ? '35px' : ''}
          mb={30}
          fontSize="4rem">
          privacy policy
        </H1>
        <Paragraph
          mb="4rem"
          fontSize="2.5rem"
          lineHeight="3.5rem"
          textAlign="justify"
          fontWeight="600"
          color="#7D879C"
        >
          At nobarunbd, accessible from{' '}
          <a href="https://www.nobarunbd.com/" style={{ color: '#0082c9' }}>
            www.nobarunbd.com
          </a>{' '}
          , one of our main priorities is the privacy of our visitors. This
          Privacy Policy document contains types of information that is
          collected and recorded by nobarunbd and how we use it.
          <br />
          If you have additional questions or require more information about our
          Privacy Policy, do not hesitate to contact us.
          <br />
          <br />
          This Privacy Policy applies only to our online activities and is valid
          for visitors to our website with regards to the information that they
          shared and/or collect in nobarunbd. This policy is not applicable to
          any information collected offline or via channels other than this
          website. Our Privacy Policy was created with the help of the Free
          Privacy Policy Generator.
          <br /> <br />
        </Paragraph>
        <H4 fontSize="2.5rem" mb="2rem">
          Consent
        </H4>
        <Paragraph
          mb="4rem"
          fontSize="2.5rem"
          lineHeight="3.5rem"
          textAlign="justify"
          fontWeight="600"
          color="#7D879C"
        >
          By using our website, you hereby consent to our Privacy Policy and
          agree to its terms.
          <br /> <br />
        </Paragraph>
        <H4 fontSize="2.5rem" mb="2rem">
          Information we collect
        </H4>
        <Paragraph
          mb="4rem"
          fontSize="2.5rem"
          lineHeight="3.5rem"
          textAlign="justify"
          fontWeight="600"
          color="#7D879C"
        >
          The personal information that you are asked to provide, and the
          reasons why you are asked to provide it, will be made clear to you at
          the point we ask you to provide your personal information.
          <br />
          <br />
          If you contact us directly, we may receive additional information
          about you such as your name, email address, phone number, the contents
          of the message and/or attachments you may send us, and any other
          information you may choose to provide.
          <br /> <br />
          When you register for an Account, we may ask for your contact
          information, including items such as name, company name, address,
          email address, and telephone number.
        </Paragraph>

        <H4 fontSize="2.5rem" mb="2rem">
          How we use your information
        </H4>
        <Paragraph
          mb="4rem"
          fontSize="2.5rem"
          lineHeight="3.5rem"
          textAlign="justify"
          fontWeight="600"
          color="#7D879C"
        >
          We use the information we collect in various ways, including to:
          <li>Provide, operate, and maintain our website</li>
          <li>Improve, personalize, and expand our website</li>
          <li>Understand and analyze how you use our website</li>
          <li>Develop new products, services, features, and functionality</li>
          <li>
            Communicate with you, either directly or through one of our
            partners, including for customer service, to provide you with
            updates and other information relating to the website, and for
            marketing and promotional purposes
          </li>
          <li>Send you emails </li>
          <li>Find and prevent fraud</li>
          <li>Log Files</li>
          <br />
          nobarunbd follows a standard procedure of using log files. These files
          log visitors when they visit websites. All hosting companies do this
          and a part of hosting services' analytics. The information collected
          by log files include internet protocol (IP) addresses, browser type,
          Internet Service Provider (ISP), date and time stamp, referring/exit
          pages, and possibly the number of clicks. These are not linked to any
          information that is personally identifiable. The purpose of the
          information is for analyzing trends, administering the site, tracking
          users' movement on the website, and gathering demographic information.
          <br />
        </Paragraph>
        <H4 fontSize="2.5rem" mb="2rem">
          Cookies and Web Beacons
        </H4>
        <Paragraph
          mb="4rem"
          fontSize="2.5rem"
          lineHeight="3.5rem"
          textAlign="justify"
          fontWeight="600"
          color="#7D879C"
        >
          Like any other website, nobarunbd uses 'cookies'. These cookies are
          used to store information including visitors' preferences, and the
          pages on the website that the visitor accessed or visited. The
          information is used to optimize the users' experience by customizing
          our web page content based on visitors' browser type and/or other
          information.
          <br />
          <br />
          For more general information on cookies, please read the Cookies
          article on Generate Privacy Policy website.
        </Paragraph>
        <H4 fontSize="2.5rem" mb="2rem">
          Advertising Partners Privacy Policies
        </H4>
        <Paragraph
          mb="4rem"
          fontSize="2.5rem"
          lineHeight="3.5rem"
          textAlign="justify"
          fontWeight="600"
          color="#7D879C"
        >
          You may consult this list to find the Privacy Policy for each of the
          advertising partners of nobarunbd.
          <br />
          <br />
          Third-party ad servers or ad networks uses technologies like cookies,
          JavaScript, or Web Beacons that are used in their respective
          advertisements and links that appear on nobarunbd, which are sent
          directly to users' browser. They automatically receive your IP address
          when this occurs. These technologies are used to measure the
          effectiveness of their advertising campaigns and/or to personalize the
          advertising content that you see on websites that you visit.
          <br />
          <br />
          Note that nobarunbd has no access to or control over these cookies
          that are used by third-party advertisers.
        </Paragraph>
        <H4 fontSize="2.5rem" mb="2rem">
          Third Party Privacy Policies
        </H4>
        <Paragraph
          mb="4rem"
          fontSize="2.5rem"
          lineHeight="3.5rem"
          textAlign="justify"
          fontWeight="600"
          color="#7D879C"
        >
          nobarunbd's Privacy Policy does not apply to other advertisers or
          websites. Thus, we are advising you to consult the respective Privacy
          Policies of these third-party ad servers for more detailed
          information. It may include their practices and instructions about how
          to opt-out of certain options.
          <br />
          <br />
          You can choose to disable cookies through your individual browser
          options. To know more detailed information about cookie management
          with specific web browsers, it can be found at the browsers'
          respective websites.
        </Paragraph>
        <H4 fontSize="2.5rem" mb="2rem">
          CCPA Privacy Rights (Do Not Sell My Personal Information)
        </H4>
        <Paragraph
          mb="4rem"
          fontSize="2.5rem"
          lineHeight="3.5rem"
          textAlign="justify"
          fontWeight="600"
          color="#7D879C"
        >
          Under the CCPA, among other rights, California consumers have the
          right to:
          <li>
            Request that a business that collects a consumer's personal data
            disclose the categories and specific pieces of personal data that a
            business has collected about consumers.
          </li>
          <li>
            Request that a business delete any personal data about the consumer
            that a business has collected.
          </li>
          <li>
            Request that a business that sells a consumer's personal data, not
            sell the consumer's personal data.
          </li>
          <br />
          If you make a request, we have one month to respond to you. If you
          would like to exercise any of these rights, please contact us.
        </Paragraph>
        <H4 fontSize="2.5rem" mb="2rem">
          GDPR Data Protection Rights
        </H4>
        <Paragraph
          mb="4rem"
          fontSize="2.5rem"
          lineHeight="3.5rem"
          textAlign="justify"
          fontWeight="600"
          color="#7D879C"
        >
          We would like to make sure you are fully aware of all of your data
          protection rights. Every user is entitled to the following:
          <li>
            The right to access – You have the right to request copies of your
            personal data. We may charge you a small fee for this service.
          </li>
          <li>
            The right to rectification – You have the right to request that we
            correct any information you believe is inaccurate. You also have the
            right to request that we complete the information you believe is
            incomplete.
          </li>
          <li>
            The right to erasure – You have the right to request that we erase
            your personal data, under certain conditions.
          </li>
          <li>
            The right to restrict processing – You have the right to request
            that we restrict the processing of your personal data, under certain
            conditions.
          </li>
          <li>
            The right to object to processing – You have the right to object to
            our processing of your personal data, under certain conditions.
          </li>
          <li>
            The right to data portability – You have the right to request that
            we transfer the data that we have collected to another organization,
            or directly to you, under certain conditions.
          </li>
          <br />
          If you make a request, we have one month to respond to you. If you
          would like to exercise any of these rights, please contact us.
          <br />
          <br />
          As long as the website and the information and services on the website
          are provided free of charge, we will not be liable for any loss or
          damage of any nature.
        </Paragraph>
        <H4 fontSize="2.5rem" mb="2rem">
          Children's Information
        </H4>
        <Paragraph
          mb="4rem"
          fontSize="2.5rem"
          lineHeight="3.5rem"
          textAlign="justify"
          fontWeight="600"
          color="#7D879C"
        >
          Another part of our priority is adding protection for children while
          using the internet. We encourage parents and guardians to observe,
          participate in, and/or monitor and guide their online activity.
          <br />
          <br />
          nobarunbd does not knowingly collect any Personal Identifiable
          Information from children under the age of 13. If you think that your
          child provided this kind of information on our website, we strongly
          encourage you to contact us immediately and we will do our best
          efforts to promptly remove such information from our records.
        </Paragraph>
      </Box>
    </>
  );
};

ProductSearchResult.layout = OtherLayout;

export async function getStaticProps() {
  let categories = [];
  let count = null;
  try {
    categories = await useAllProductCategories();
    categories = JSON.parse(JSON.stringify(categories));
  } catch (e) {}
  try {
    count = await useProductCount();
  } catch (e) {
  } finally {
    return {
      props: {
        categories,
        count,
      },
      revalidate: 30,
    };
  }
}

export default ProductSearchResult;
