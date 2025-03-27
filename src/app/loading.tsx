'use client'

import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function RootLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-80 z-50">
      <div className="flex flex-col items-center">
        <DotLottieReact
          src="../assets/animations/loading-animation.lottie"
          loop
          autoplay
        />
        <span className="mt-3 text-xl font-medium">Loading...</span>
      </div>
    </div>
  );
}