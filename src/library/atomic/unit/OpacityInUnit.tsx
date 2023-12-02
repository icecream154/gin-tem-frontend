import { useState, useEffect, useRef } from 'react'
import { BasicUnitProps } from './UnitProps';
import './OpacityInUnit.css';
import { checkKeyInSession, storeKeyInSession } from '../../util/storageUtil';

export function OpacityInUnit(props: BasicUnitProps) {
    const [isVisible, setVisible] = useState(false);

    let sessionSeen = checkKeyInSession(props.unitActionKey)

    const domRef = useRef<HTMLInputElement>(null!)
    useEffect(() => {
        let df = domRef.current;
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Not possible to set it back to false like this:
                    setVisible(true);
                    storeKeyInSession(props.unitActionKey);
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
            className={`opacity-in-section ${isVisible || sessionSeen ? 'is-visible' : ''}`}
        >
            {
                props.children
            }
        </div>
    )
}