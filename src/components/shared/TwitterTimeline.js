import React, { useEffect, useRef } from "react";
import twitterLines from '../../data/twitterLignes'; 
import HashLoader from "react-spinners/HashLoader";

const TwitterTimeline = ({ lineID }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const twitterScriptURL = "https://platform.twitter.com/widgets.js";
        let script = document.querySelector(`script[src="${twitterScriptURL}"]`);

        if (!script) {
            script = document.createElement("script");
            script.src = twitterScriptURL;
            script.async = true;
            document.body.appendChild(script);
        }

        // Clean up
        return () => {
            // Check if the container still exists in the DOM
            if (containerRef.current) {
                // Remove the Twitter timeline from the container
                while (containerRef.current.firstChild) {
                    containerRef.current.firstChild.remove();
                }
            }

            // Remove specific iframes
            const settingsIframe = document.querySelector('iframe[title="Twitter settings iframe"]');
            const analyticsIframe = document.querySelector('iframe#rufous-sandbox');

            if (settingsIframe) {
                settingsIframe.remove();
            }

            if (analyticsIframe) {
                analyticsIframe.remove();
            }

            // Remove script if no other TwitterTimeline components are mounted
            if (!document.querySelector(".twitter-timeline")) {
                script.remove();
            }
        };
    }, []); // Empty array ensures effect runs once on mount and cleanup on unmount

    const lineInfo = twitterLines.find(line => line.id === lineID);

    return (
        <div ref={containerRef}>
            {lineInfo
                ? <a className="twitter-timeline" href={lineInfo.twitterUrl} data-height="500"><div className="flex items-center justify-center"><HashLoader size={30} color="#6D28D9" /></div></a>
                : <p>Pas d'Information</p>
            }
        </div>
    );
}

export default TwitterTimeline;