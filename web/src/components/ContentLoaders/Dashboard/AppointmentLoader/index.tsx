import React from 'react'
import ContentLoader from 'react-content-loader'

const AppointmentLoader: React.FC = props => {
  return (
    <ContentLoader
      speed={2}
      width={250}
      height={100}
      viewBox="0 0 250 100"
      backgroundColor="#bfbfbf"
      foregroundColor="#e6e6e6"
      {...props}
    >
      <circle cx="55" cy="47" r="32" />
      <rect x="105" y="38" rx="2" ry="2" width="108" height="19" />
    </ContentLoader>
  )
}

export default AppointmentLoader
