import {ColumnAttr, GridAttr} from '../../basic/compose';
import {StyleAttr} from '../../basic/style';
import {WindowParamContext} from '../../context/WindowContext';
import {FadeInUnit} from './FadeInUnit';
import {FadeOnlyOutUnit} from './FadeOnlyOutUnix';
import {CustomUnit, Unit} from './Unit';
import {ColumnProps, UnitActionType} from './UnitProps';
import {OpacityInUnit} from "./OpacityInUnit";

export class ColumnUnit extends CustomUnit<ColumnProps> {
	static contextType = WindowParamContext;

	render() {
		return (
			<WindowParamContext.Consumer>
				{wpt => {
					let wp = wpt.param;
					const { sizeAttr, colorAttr, fontAttr, unitAction } = this.props
					let bStyle = StyleAttr.setStyleAttr(new StyleAttr(wp,
						this.props.unitAction === UnitActionType.expand ? new GridAttr(wp) : new ColumnAttr(wp)),
						sizeAttr, colorAttr, fontAttr)
					if (this.props.align === "left") {
						bStyle.composeAttr.align = "left";
					}
					if (this.props.align === "right") {
						bStyle.composeAttr.align = "right";
					}

					if (unitAction === UnitActionType.fadeIn) {
						return (
							<FadeInUnit
								classname={this.props.classname}
								unitRef={this.props.unitRef}
								needHover={this.props.needHover}
								unitActionKey={this.props.unitActionKey}
								onMouseEnter={this.props.onMouseEnter}
								onMouseLeave={this.props.onMouseLeave}
								onTouchMove={this.props.onTouchMove}
								onClick={this.props.onClick}
								styleAttr={bStyle}
								customStyleAttr={this.props.customStyleAttr}>
								{this.props.children}
							</FadeInUnit>
						)
					}

					if (unitAction === UnitActionType.fadeOut) {
						return (
							<FadeOnlyOutUnit
								classname={this.props.classname}
								unitRef={this.props.unitRef}
								needHover={this.props.needHover}
								unitActionKey={this.props.unitActionKey}
								onMouseEnter={this.props.onMouseEnter}
								onMouseLeave={this.props.onMouseLeave}
								onTouchMove={this.props.onTouchMove}
								onClick={this.props.onClick}
								styleAttr={bStyle}
								customStyleAttr={this.props.customStyleAttr}>
								{this.props.children}
							</FadeOnlyOutUnit>
						)
					}

					if (unitAction === UnitActionType.opacity) {
						return (
							<OpacityInUnit
								classname={this.props.classname}
								unitRef={this.props.unitRef}
								needHover={this.props.needHover}
								unitActionKey={this.props.unitActionKey}
								onMouseEnter={this.props.onMouseEnter}
								onMouseLeave={this.props.onMouseLeave}
								onTouchMove={this.props.onTouchMove}
								onClick={this.props.onClick}
								styleAttr={bStyle}
								customStyleAttr={this.props.customStyleAttr}>
								{this.props.children}
							</OpacityInUnit>
						)
					}

					if (unitAction === UnitActionType.expand && this.props.unitExpandProps) {
						let { isExpand, transition } = this.props.unitExpandProps;
						return (
							<div
								key={this.props.unitActionKey}
								style={{
									"display": "grid",
									"transition": transition,
									"overflow": "hidden",
									"gridTemplateRows": isExpand ? "1fr" : "0fr"
								}}
							>
								<div style={{ "minHeight": "0px" }}>
									<ColumnUnit
										classname={this.props.classname}
										needHover={this.props.needHover}
										onMouseEnter={this.props.onMouseEnter}
										onMouseLeave={this.props.onMouseLeave}
										onClick={this.props.onClick}
										customStyleAttr={this.props.customStyleAttr}>
										{this.props.children}
									</ColumnUnit>
								</div>
							</div>
						)
					}

					return (
						<Unit
							classname={this.props.classname}
							unitRef={this.props.unitRef}
							needHover={this.props.needHover}
							onMouseEnter={this.props.onMouseEnter}
							onMouseLeave={this.props.onMouseLeave}
							onTouchMove={this.props.onTouchMove}
							onClick={this.props.onClick}
							styleAttr={bStyle}
							unitActionKey={this.props.unitActionKey}
							customStyleAttr={this.props.customStyleAttr}>
							{this.props.children}
						</Unit>
					)
				}
				}
			</WindowParamContext.Consumer>
		)
	}
}