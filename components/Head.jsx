import Head from 'next/head';

const CustomHead = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="Krishnam Katiyar is an avid full stack developer and ai/ml engineer building websites and ai agents you'd love to use"
      />
      <meta
        name="keywords"
        content="krishnam katiyar, krishnam, katiyar, web developer portfolio, krishnam web developer, krishnam developer, mern stack, krishnam gyanani portfolio, vscode-portfolio"
      />
      <meta property="og:title" content="Krishnam Katiyar's Portfolio" />
      <meta
        property="og:description"
        content="A full stack developer and ai/ml engineer building websites and ai agents that you'd like to use."
      />
      <meta property="og:image" content="https://imgur.com/4zi5KkQ.png" />
      <meta property="og:url" content="https://krishnamkatiyar.in" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default CustomHead;

CustomHead.defaultProps = {
  title: 'Nitin Ranganath',
};
