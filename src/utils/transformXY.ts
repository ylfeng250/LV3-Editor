import type { MoveDirection } from "../type";
/**
 * 宽高的缩放变化
 * @param moveDirection  移动方向
 * @param orginStyle 元素的属性 width height top left
 * @param oriPos   鼠标按下时所记录的坐标
 * @param currentPoint  当前坐标信息
 */
export default function transformXY(
	moveDirection: MoveDirection,
	orginStyle,
	orginPoint,
	curPoint,
	boundarySize
) {
	const style = { ...orginStyle };
	const offsetX = curPoint.x - orginPoint.x;
	const offsetY = curPoint.y - orginPoint.y;
	switch (moveDirection) {
		// 东
		case "e":
			// 向右拖拽添加宽度
			style.width += offsetX;
			return style;
		// 西
		case "w":
			// 增加宽度、位置同步左移
			style.width -= offsetX;
			style.left += offsetX;
			return style;
		// 南
		case "s":
			style.height += offsetY;
			return style;
		// 北
		case "n":
			style.height -= offsetY;
			style.top += offsetY;
			break;
		// 东北
		case "ne":
			style.height -= offsetY;
			style.top += offsetY;
			style.width += offsetX;
			break;
		// 西北
		case "nw":
			style.height -= offsetY;
			style.top += offsetY;
			style.width -= offsetX;
			style.left += offsetX;
			break;
		// 东南
		case "se":
			style.height += offsetY;
			style.width += offsetX;
			break;
		// 西南
		case "sw":
			style.height += offsetY;
			style.width -= offsetX;
			style.left += offsetX;
			break;
	}
	return style;
}
