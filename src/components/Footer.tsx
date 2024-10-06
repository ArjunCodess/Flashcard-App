import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-4 pr-4 text-right text-sm text-gray-500">
      <p>
        built by{' '}
        <a
          href="https://arjuncodess.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600 transition-colors"
        >
          @arjuncodess
        </a>
      </p>
    </footer>
  );
};

export default Footer;
