
'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function Progress() {
  return (
        <ProgressBar
          height="14px"
          color="#000"
          options={{ showSpinner: false }}
          shallowRouting
        />
  );
}