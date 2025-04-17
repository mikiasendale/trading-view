import React, { useEffect, useRef } from 'react';

function TradingViewWidget() {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-forex-heat-map.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "width": "1000",
        "height": "600", // Adjusted height for better fit
        "currencies": [
          "EUR",
          "USD",
          "JPY",
          "GBP",
          "CHF",
          "AUD",
          "CAD",
          "NZD",
          "CNY"
        ],
        "isTransparent": false,
        "colorTheme": "light",
        "locale": "en",
        "backgroundColor": "#ffffff"
      }`;

    // Check if the container ref is available before appending
    if (container.current) {
        // Clear previous script if component re-renders (optional but good practice)
        while (container.current.firstChild) {
            container.current.removeChild(container.current.firstChild);
        }
        container.current.appendChild(script);
    }

    // Cleanup function to remove the script when the component unmounts
    return () => {
      if (container.current && container.current.contains(script)) {
        container.current.removeChild(script);
      }
    };
  }, []); // Empty dependency array ensures this runs only once after initial mount

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: "600px", width: "1000px" }}>
      <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
}

export default TradingViewWidget; 