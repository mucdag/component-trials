export class MuMultiLineChartData {
    name: string;
    color?= '#8c8ea4';
    details: MuMultiLineChartDataDetail[] = [];
    yIndex?= 1;
    index?: string;
}
export class MuMultiLineChartDataDetail {
    xValue: number | Date;
    yValue: number;
}

export class MuMultiLineChartYAxis {
    index: number;
    title: string;
    color: string;
    min?: number;
    max?: number;
    x1?: number;
    x2?: number;
    y1?: number;
    y2?: number;

    steps?: MuMultiLineChartStep[] = [];
}

export class MuMultiLineChartStep {
    x: number;
    y: number;
    titles: string[];
}

export class MuMultiLineChartPolyLine {
    points: string;
    color: string;
}

export class MuMultiLineChartCircle {
    x: number;
    y: number;
    dataX: string;
    dataY: string;
    dataIndex: string;
}

export class MuMultiLineChartRect {
    x: number;
    y: number;
    width: number;
    height: number;
    titles: string[];
    constructor() {
        this.titles = [];
    }
}