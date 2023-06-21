import React from 'react';
import ContentLoader from 'react-content-loader';



const Placeholder = () => (
    <ContentLoader
      speed={2}
      width={400}
      height={100}
      viewBox="0 0 400 100"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="3" ry="3" width="400" height="10" />
      <rect x="0" y="20" rx="3" ry="3" width="400" height="10" />
      <rect x="0" y="40" rx="3" ry="3" width="400" height="10" />
      <rect x="0" y="60" rx="3" ry="3" width="400" height="10" />
      <rect x="0" y="80" rx="3" ry="3" width="400" height="10" />
    </ContentLoader>
  );
  

export default Placeholder