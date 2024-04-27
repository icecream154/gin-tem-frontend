import React, {Component, LegacyRef} from 'react';
import { BasicUnitProps, CustomUnitProps } from './UnitProps';
import './Unit.css';
import { isMobile } from '../../util/envUtil';

export class CustomUnit<T extends CustomUnitProps> extends Component<T> {

}

export class Unit extends CustomUnit<BasicUnitProps> {
	derivedStyleObj = Object.assign(this.props.styleAttr.getComposeObj(), this.props.customStyleAttr)
	derivedCustomStyleAttr = this.props.customStyleAttr ? this.props.customStyleAttr : {}

	renderChildren = () => {
		return React.Children.map(this.props.children, (child) => {
			return child;
		});
	};


	render() {
		let onClickFunc = this.props.onClick;
		if (!onClickFunc) {
			onClickFunc = function () { }
		}

		let onMouseEnterFunc = this.props.onMouseEnter;
		if (!onMouseEnterFunc) {
			onMouseEnterFunc = function () { }
		}

		let onMouseLeaveFunc = this.props.onMouseLeave;
		if (!onMouseLeaveFunc) {
			onMouseLeaveFunc = function () { }
		}
		let onTouchMove = this.props.onTouchMove;
		if (!onTouchMove) {
			onTouchMove = function () { }
		}

		let cName = "";
		if (this.props.needHover) {
			cName = "hoverCursor";
		}
		if (this.props.classname) {
			cName = this.props.classname
		}

		return (
			<div
				key={this.props.unitActionKey}
				ref={this.props.unitRef as LegacyRef<HTMLDivElement>}
				className={cName}
				onMouseEnter={(event) => { if (onMouseEnterFunc) onMouseEnterFunc(event) }}
				onMouseLeave={(event) => { if (onMouseLeaveFunc) onMouseLeaveFunc(event) }}
				onTouchMove={(event) => { if (onTouchMove) onTouchMove(event) }}
				onClick={(e) => {
					if (onClickFunc) onClickFunc()
					if (this.props.stopClickPropagation) e.preventDefault()
				}}
				// onClick={() => { if (!isMobile() && onClickFunc) onClickFunc() }}
				// onTouchEndCapture={() => { if (isMobile() && onClickFunc) onClickFunc() }}
				style={this.derivedStyleObj}>
				{
					this.renderChildren()
				}
			</div>
		)
	}
}