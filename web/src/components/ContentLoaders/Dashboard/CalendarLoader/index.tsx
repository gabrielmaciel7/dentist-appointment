import React from 'react'
import ContentLoader from 'react-content-loader'

const CalendarLoader: React.FC = props => {
  return (
    <ContentLoader
      speed={2}
      width={360}
      height={330}
      viewBox="0 0 360 330"
      backgroundColor="#bfbfbf"
      foregroundColor="#e6e6e6"
      {...props}
    >
      <rect x="64" y="172" rx="3" ry="3" width="37" height="34" />
      <rect x="108" y="171" rx="3" ry="3" width="37" height="34" />
      <rect x="153" y="172" rx="3" ry="3" width="37" height="34" />
      <rect x="197" y="171" rx="3" ry="3" width="37" height="34" />
      <rect x="241" y="171" rx="3" ry="3" width="37" height="34" />
      <rect x="64" y="128" rx="3" ry="3" width="37" height="34" />
      <rect x="108" y="127" rx="3" ry="3" width="37" height="34" />
      <rect x="153" y="128" rx="3" ry="3" width="37" height="34" />
      <rect x="197" y="127" rx="3" ry="3" width="37" height="34" />
      <rect x="241" y="127" rx="3" ry="3" width="37" height="34" />
      <rect x="64" y="214" rx="3" ry="3" width="37" height="34" />
      <rect x="108" y="213" rx="3" ry="3" width="37" height="34" />
      <rect x="153" y="214" rx="3" ry="3" width="37" height="34" />
      <rect x="197" y="213" rx="3" ry="3" width="37" height="34" />
      <rect x="241" y="213" rx="3" ry="3" width="37" height="34" />
      <rect x="63" y="84" rx="3" ry="3" width="37" height="34" />
      <rect x="107" y="83" rx="3" ry="3" width="37" height="34" />
      <rect x="152" y="84" rx="3" ry="3" width="37" height="34" />
      <rect x="196" y="83" rx="3" ry="3" width="37" height="34" />
      <rect x="240" y="83" rx="3" ry="3" width="37" height="34" />
      <rect x="63" y="34" rx="3" ry="3" width="37" height="34" />
      <rect x="107" y="33" rx="3" ry="3" width="37" height="34" />
      <rect x="152" y="34" rx="3" ry="3" width="37" height="34" />
      <rect x="196" y="33" rx="3" ry="3" width="37" height="34" />
      <rect x="240" y="33" rx="3" ry="3" width="37" height="34" />
    </ContentLoader>
  )
}

export default CalendarLoader
