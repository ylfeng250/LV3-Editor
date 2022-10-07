import React, { useRef, useState } from "react";
import type { MoveDirection } from "../../type";
import { transformXY } from "../../utils";
import "./index.scss";
// 东南西北， 东北、西北、东南、西南 拉伸收缩的 8 个端点
const points: MoveDirection[] = ["e", "w", "s", "n", "ne", "nw", "se", "sw"];
const canvasStyle = {
	width: 500,
	height: 500,
	top: 100,
	left: 100,
};
export default function DragBox() {
	const [style, setStyle] = useState({
		left: 100,
		top: 100,
		width: 100,
		height: 100,
	});

	const isDown = useRef(false);
	const handleMouseDownOnGragBox = (e: React.MouseEvent) => {
		isDown.current = true;
		// 鼠标坐标
		const orginPoint = {
			x: e.clientX,
			y: e.clientY,
		};
		// 鼠标移动
		function move(e: MouseEvent) {
			// 判断鼠标是否按住
			if (!isDown.current) return;
			// 元素位置 = 初始位置+鼠标偏移量
			const top = style.top + (e.clientY - orginPoint.y);
			const left = style.left + (e.clientX - orginPoint.x);
			// 限制必须在这个范围内移动 画板的高度-元素的高度
			const newStyle = { ...style };

			newStyle.top = Math.max(
				0,
				Math.min(top, canvasStyle.height - style.height)
			);
			newStyle.left = Math.max(
				0,
				Math.min(left, canvasStyle.width - style.width)
			);
			setStyle(newStyle);
		}
		// 鼠标被抬起
		function up() {
			isDown.current = false;
			removeEventListener("mousemove", move);
			removeEventListener("mouseup", up);
		}
		addEventListener("mousemove", move);
		addEventListener("mouseup", up);
	};
	const handleMouseDownOnPoint = (
		pointDirection: MoveDirection,
		e: React.MouseEvent
	) => {
		e.stopPropagation();
		e.preventDefault();
		console.log(pointDirection);
		// 鼠标坐标
		const orginPoint = {
			x: e.clientX,
			y: e.clientY,
		};
		function move(e: MouseEvent) {
			const curPoint = {
				x: e.clientX,
				y: e.clientY,
			};
			const newStyle = transformXY(
				pointDirection,
				style,
				orginPoint,
				curPoint,
				canvasStyle
			);
			setStyle(newStyle);
		}
		// 鼠标被抬起
		function up() {
			removeEventListener("mousemove", move);
			removeEventListener("mouseup", up);
		}
		addEventListener("mousemove", move);
		addEventListener("mouseup", up);
	};
	const handleMouseDownOnRotate = (e: React.MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
		// 先计算下元素的中心点, x，y 作为坐标原点
		const center_x = style.width / 2 + style.left;
		const center_y = style.height / 2 + style.top;
		function move(e: MouseEvent) {
			const curPoint = {
				x: e.clientX,
				y: e.clientY,
			};

			// 运用高中的三角函数
			const newStyle = { ...style };
			newStyle.transform = `rotate(${
				Math.atan2(curPoint.y - center_y, curPoint.x - center_x) *
					(180 / Math.PI) -
				90
			}deg)`;
			setStyle(newStyle);
		}
		// 鼠标被抬起
		function up() {
			removeEventListener("mousemove", move);
			removeEventListener("mouseup", up);
		}
		addEventListener("mousemove", move);
		addEventListener("mouseup", up);
	};
	return (
		<div
			className="drag-box"
			style={style}
			onMouseDown={handleMouseDownOnGragBox}
		>
			{points.map((item) => (
				<div
					className={`control-point point-${item}`}
					key={item}
					style={{
						transform: style.transform,
					}}
					onMouseDown={(e) => {
						handleMouseDownOnPoint(item, e);
					}}
				></div>
			))}
			<div
				className="control-point control-rotator"
				onMouseDown={handleMouseDownOnRotate}
			></div>
		</div>
	);
}
