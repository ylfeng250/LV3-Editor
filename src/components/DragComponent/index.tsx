import React, { useState, ReactNode } from "react";
import { useNodeElements } from "../../model/useElementStore";
import { emitUpdateNodeElementPositionEvent } from "../../events";
import classnames from "classnames";
import { Position } from "../../types";
import "./index.scss";

export interface DragComponentProps {
	id: string;
	position: Position;
	onPositionChange?: (position: Position) => void;
	children: ReactNode;
	isActive?: boolean;
	className?: string;
}

export default function DragComponent(props: DragComponentProps) {
	const {
		id,
		position,
		children,
		onPositionChange,
		isActive = false,
		className,
	} = props;
	const dragComponentClassName = classnames(className, {
		"active-node-element": isActive,
	});
	const [positionState, setPositionState] = useState(position);
	const { setCurrentElementId, clearCurrentElementId } = useNodeElements();
	const handleMouseDown = (e: React.MouseEvent) => {
		// 设置当前操作的 element
		setCurrentElementId(id);
		const startX = e.clientX;
		const startY = e.clientY;
		const mouseMove = (moveEvent: MouseEvent) => {
			const moveX = moveEvent.clientX - startX;
			const moveY = moveEvent.clientY - startY;
			const newPosition = {
				top: positionState.top + moveY,
				left: positionState.left + moveX,
			};
			onPositionChange && onPositionChange(newPosition);
			setPositionState(newPosition);
		};

		const mouseUp = (upEvent: MouseEvent) => {
			clearCurrentElementId();
			document.removeEventListener("mousemove", mouseMove);
			document.removeEventListener("mouseup", mouseUp);
		};

		document.addEventListener("mousemove", mouseMove);
		document.addEventListener("mouseup", mouseUp);
	};

	return (
		<div className="lv3-drag-component">
			<div
				id={id}
				onMouseDown={handleMouseDown}
				onMouseUp={() => {
					emitUpdateNodeElementPositionEvent({
						nodeElementId: id,
						updateNodeElementPosition: positionState,
					});
				}}
				className={dragComponentClassName}
				style={{
					position: "absolute",
					top: `${positionState.top}px`,
					left: `${positionState.left}px`,
					bottom: `${positionState.bottom}px`,
					right: `${positionState.right}px`,
					userSelect: "none",
				}}
			>
				{children}
			</div>
		</div>
	);
}
