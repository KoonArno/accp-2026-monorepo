declare module 'react-modal-video' {
  import React from 'react';

  export interface ModalVideoProps {
    channel: string;
    isOpen: boolean;
    videoId: string;
    onClose: () => void;
    allowFullScreen?: boolean;
    ratio?: string;
    autoplay?: boolean;
    [key: string]: any; // Allow other optional props
  }

  const ModalVideo: React.FC<ModalVideoProps>;
  export default ModalVideo;
}