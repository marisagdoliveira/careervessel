import React, { useEffect } from 'react'

const Chatbot = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
        script.type = "text/javascript";
        script.onload = () => {
          window.voiceflow.chat.load({
            verify: { projectID: '65983e955cb4d9c47331efa0' },
            url: 'https://general-runtime.voiceflow.com',
            versionID: 'production'
          });
        };
        document.body.appendChild(script);
      }, []);
  return (
    <div></div>
  )
}

export default Chatbot