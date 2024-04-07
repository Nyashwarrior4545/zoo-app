import React from 'react';
import Layout from '../componets/Layout';

const AccessibilityPage = () => {
  return (
    <Layout>
    <div className="page">
      <h1>Accessibility</h1>
      <p>This site has been designed with accessibility in mind.</p>
      <p>We have strived to make this site adhere to priority 1 and 2 guidelines of the W3 Web Content Accessibility Guidelines. All pages have been checked in accordance with the W3C and Section 508 guidelines and adhere to these as far as possible.</p>
      <p>All pages use structured semantic mark-up where possible.</p>
      <p>All text (including headings) can be enlarged using the browser.</p>
      <p>All functional images used other than decorative graphics include descriptive ALT tags.</p>
      <p>The site should work well in all modern web browsers. It has been tested and proven to be fully usable in the following browsers: Internet Explorer 9+, Chrome, Firefox, and Opera.</p>
      <h2>Text resizing</h2>
      <p>You can resize the text on this site using your browser by following these instructions:</p>
      <h3>PC</h3>
      <ul>
        <li>Increase text size: Hold down the CTRL key and press +</li>
        <li>Decrease text size: Hold down the CTRL key and press –</li>
      </ul>
      <h3>Mac</h3>
      <ul>
        <li>Increase text size: Hold down the Command key and press +</li>
        <li>Decrease text size: Hold down the Command key and press –</li>
      </ul>
    </div>
    </Layout>
  );
};

export default AccessibilityPage;
