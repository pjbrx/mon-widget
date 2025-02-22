import React, { useEffect, useRef } from "react";

const AssistantWidget = ({ agentId, index }) => {
  const widgetRef = useRef(null);
  const heightPercentage = 80 - index * 17.5;

  useEffect(() => {
    if (!document.querySelector("script[src='https://elevenlabs.io/convai-widget/index.js']")) {
      const script = document.createElement("script");
      script.src = "https://elevenlabs.io/convai-widget/index.js";
      script.async = true;
      script.type = "text/javascript";
      document.body.appendChild(script);
    }

    const interval = setInterval(() => {
      if (widgetRef.current) {
        widgetRef.current.style.position = "relative";
        widgetRef.current.style.height = `${heightPercentage}%`;
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [heightPercentage]);

  return (
    <div className="widget-container">
      <elevenlabs-convai ref={widgetRef} agent-id={agentId}></elevenlabs-convai>
    </div>
  );
};

export default AssistantWidget;