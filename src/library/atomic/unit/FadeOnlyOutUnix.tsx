import { useState, useEffect, useRef } from 'react'
import { BasicUnitProps } from './UnitProps';
import './FadeOnlyOutUnit.css';

/**
    TODO: 如何渐变消失
 */

export function FadeOnlyOutUnit(props: BasicUnitProps) {
    const [isVisible, setVisible] = useState(false);

    const domRef = useRef<HTMLInputElement>(null!)
    useEffect(() => {
        let df = domRef.current;
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Not possible to set it back to false like this:
                    setVisible(true);
                    // No need to keep observing:
                    observer.unobserve(df);
                }
            });
        });
        observer.observe(df);
        return () => observer.unobserve(df);
    }, []);

    let derivedStyleObj = Object.assign(props.styleAttr.getComposeObj(), props.customStyleAttr)
    let onClickFunc = props.onClick;
    if (!onClickFunc) {
        onClickFunc = function () { }
    }

    let onMouseEnterFunc = props.onMouseEnter;
    if (!onMouseEnterFunc) {
        onMouseEnterFunc = function () { }
    }

    let onMouseLeaveFunc = props.onMouseLeave;
    if (!onMouseLeaveFunc) {
        onMouseLeaveFunc = function () { }
    }

    return (
        <div
            onMouseEnter={(event) => { if (onMouseEnterFunc) onMouseEnterFunc(event) }}
            onMouseLeave={(event) => { if (onMouseLeaveFunc) onMouseLeaveFunc(event) }}
            onClick={() => { if (onClickFunc) onClickFunc() }}
            style={derivedStyleObj}
            ref={domRef}
            className={`fade-only-out-section ${isVisible ? 'is-visible' : ''}`}
        >
            {
                props.children
            }
        </div>
    )
}