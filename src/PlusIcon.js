import React from 'react';
import PropTypes from 'prop-types';

function PlusIcon({ onClick, className }) {
  return (
    <svg
      onClick={onClick}
      role="button"
      tabIndex="0"
      aria-label="Add track"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width="32"
      height="32"
      style={{ cursor: 'pointer' }}
    >
      <g>
        <circle cx="16" cy="16" r="14" fill="#ffc107" />
        <path
          d="M24 17h-7v7h-2v-7h-7v-2h7v-7h2v7h7z"
          fill="#fff"
        />
      </g>
    </svg>
  );
}

PlusIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default React.memo(PlusIcon);
