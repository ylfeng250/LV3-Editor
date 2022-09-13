export interface NodeElement {
	id: string;
	componentName: string; // 组件名称
	title: string; // 组件的标题
	propValue: any;
	position: Position;
	style?: React.CSSProperties;
}

export interface Position {
	top: number;
	left: number;
	right?: number;
	bottom?: number;
}
