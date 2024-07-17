/**React component to render a textarea and div called "mermaid" */
import { useEffect, useState, useRef } from "react";
import mermaid from "mermaid"; // Import the mermaid library
function MermaidWrapper({ markup, flows }) {
    const [graph, setGraph] = useState(markup);
    const [buttons, setButtons] = useState(flows || []);
    const mermaidHolderRef = useRef(null);

    useEffect(() => {
        // wait for page to load
        if (document.readyState === 'complete') {
            if (!window.mermaid) {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.min.js';
                //script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mermaid/9.3.0/mermaid.min.js';
                script.addEventListener('load', () => {
                    // wait for document to be ready
                    document.addEventListener('DOMContentLoaded', () => {
                        mermaidHolderRef.current.removeAttribute('data-processed');
                        mermaidHolderRef.current.innerHTML = graph;
                        window.mermaid.mermaidAPI.initialize({
                            securityLevel: 'loose',
                        });
                        window.mermaid.contentLoaded();
                    });
                }
                );
                //                    window.mermaid.mermaidAPI.initialize({
                //                        securityLevel: 'loose',
                //                    });
                //                    window.mermaid.contentLoaded();
                //                });
                script.addEventListener('error', (e) => {
                    console.error('Failed to load mermaid script:', e);
                });
                document.body.appendChild(script);
            }
        }
    }, []);

    useEffect(() => {
        if (document.readyState === 'complete') {
            if (window.mermaid) {
                mermaidHolderRef.current.removeAttribute('data-processed');
                mermaidHolderRef.current.innerHTML = graph;
                window.mermaid.mermaidAPI.initialize({
                    securityLevel: 'loose',
                });
            }
            drawDiagram();
        }
    }, [graph]);

    const drawDiagram = async () => {
        try {
            const element = document.querySelector('.mermaid');
            const graphDefinition = mermaidHolderRef.current.value;
            const { svg, bindFunctions } = await mermaid.render('mermaid', graphDefinition);
            element.innerHTML = svg;
            if (bindFunctions) {
                bindFunctions(element);
            }
        } catch (e) {
            console.log('Failed to render mermaid:', e);
        }
    };
    let buttonStyle = {
        padding: '10px',
        margin: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        background: '#f9f9f9',
        color: '#333',
    }
    return (
        <>
            {buttons.map((button, index) => (
                <button
                    key={index}
                    style={buttonStyle}
                    onClick={() => {
                        setGraph(button.flow)

                    }}
                >
                    {button.label}
                </button>
            ))}
            <details>
                <summary>Mermaid Syntax</summary>
                <textarea
                    style={{
                        width: '100%',
                        height: '200px',
                        padding: '10px',
                        fontSize: '16px',
                        fontFamily: 'monospace',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        marginBottom: '10px'
                    }}
                    ref={mermaidHolderRef}
                    data-processed="true"
                    onChange={(e) => setGraph(e.target.value)}
                    //defaultValue={graph}
                    value={graph}
                    //cols="80"
                    //width should be 100% of the parent container
                    rows="10"
                />
            </details>

            <div className="mermaid" style={{
                background: '#f9f9f9',
                border: '1px solid #ddd',
                padding: '10px',
                margin: '10px 0',
                borderRadius: '5px',
                color: '#333'
            }}>
                {graph}
            </div>
        </>
    );
}

export default MermaidWrapper;