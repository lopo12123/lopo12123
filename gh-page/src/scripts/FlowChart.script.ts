import {
    Adornment,
    Binding,
    Diagram,
    GraphLinksModel,
    GraphObject,
    HTMLInfo,
    Link,
    Model,
    Node,
    Palette,
    Panel,
    Placeholder,
    Point,
    Shape,
    Size,
    Spot,
    TextBlock,
    Tool
} from "gojs"
import { ContextMenuControl } from "@/components/FlowChart/ContextMenu";

/**
 * @description item in palette
 */
interface PaletteItem {
    isNode: true
    // text in item
    text: string
    // type of item
    figure: BuildInFigure
    // bg-color of item
    fill: string | 'transparent'  // ! use 'transparent' instead of null
}

/**
 * @description data on items (node)
 */
export type GojsNodeData = PaletteItem & { key: number, __gohashid: number }
/**
 * @description data on items (link)
 */
export type GojsLinkData = {
    isNode: undefined
    from: number  // from key
    to: number  // to key
    fromPort: '' | 'T' | 'R' | 'B' | 'L'  // from port
    toPort: '' | 'T' | 'R' | 'B' | 'L'  // to port
    __gohashid: number
}

/**
 * @description enum of build-in figures
 */
const enum BuildInFigure {
    "Rectangle" = "Rectangle",
    "Square" = "Square",
    "RoundedRectangle" = "RoundedRectangle",
    "Border" = "Border",
    "Ellipse" = "Ellipse",
    "Circle" = "Circle",
    "TriangleRight" = "TriangleRight",
    "TriangleDown" = "TriangleDown",
    "TriangleLeft" = "TriangleLeft",
    "TriangleUp" = "TriangleUp",
    "Triangle" = "Triangle",
    "Diamond" = "Diamond",
    "LineH" = "LineH",
    "LineV" = "LineV",
    "None" = "None",
    "BarH" = "BarH",
    "BarV" = "BarV",
    "MinusLine" = "MinusLine",
    "PlusLine" = "PlusLine",
    "XLine" = "XLine"
}

// alias for gojs.GraphObject.make
const $make = GraphObject.make

// region misc
/**
 * @description [port] create port for elements on the diagram
 * @param name port name
 * @param spot the Spot of the element this port is
 * @param output if the port can output
 * @param input if the port can input
 */
const makePort = (name: 'T' | 'R' | 'B' | 'L', spot: Spot, output: boolean, input: boolean) => {
    return $make(Shape, 'Circle', {
        // default is not seen
        fill: null, stroke: null,
        // port size
        desiredSize: new Size(7, 7),
        // port position
        alignment: spot,
        // just inside the Shape
        alignmentFocus: spot,
        // port name
        portId: name,
        // declare where links may connect at this port
        fromSpot: spot, toSpot: spot,
        // declare whether the user may draw links to/from here
        fromLinkable: output, toLinkable: input,
        // cursor
        cursor: 'pointer'
    })
}
/**
 * @description [port] show/hide small ports in node
 */
const showPort = (node: GraphObject, show: boolean) => {
    // @ts-ignore
    node.ports.each((port) => {
        if(port.portId !== '') {
            port.fill = show ? 'rgba(0, 0, 0, 0.3)' : null
        }
    })
}
// endregion

// region core
/**
 * @description generate an empty model
 */
const emptyModel = () => {
    const _model = Model.fromJson(JSON.stringify({
        class: 'GraphLinkModel',
        linkFromPortIdProperty: 'fromPort',
        linkToPortIdProperty: 'toPort',
        nodeDataArray: [],
        linkDataArray: []
    }))
    _model.name = 'diagram'

    return _model
}
/**
 * @description create a diagram on specific element
 */
const baseDiagram = (el: HTMLDivElement) => {
    return $make(
        Diagram, el,
        {
            // 背景网格
            grid: $make(
                Panel, "Grid",
                $make(Shape, 'LineH', { stroke: 'lightgray', strokeWidth: 0.5 }),
                $make(Shape, 'LineH', { stroke: 'gray', strokeWidth: 0.5, interval: 10 }),
                $make(Shape, 'LineV', { stroke: 'lightgray', strokeWidth: 0.5 }),
                $make(Shape, 'LineV', { stroke: 'gray', strokeWidth: 0.5, interval: 10 }),
            ),
            // 拖拽功能
            // - 不允许拖拽线条
            "draggingTool.dragsLink": false,
            // - 格线吸附
            "draggingTool.isGridSnapEnabled": true,
            // 连线功能
            // - 不允许无连接的线
            "linkingTool.isUnconnectedLinkValid": false,
            "linkingTool.portGravity": 20,
            // 编辑连线连接目标
            // - 不允许无连接的线
            "relinkingTool.isUnconnectedLinkValid": false,
            "relinkingTool.portGravity": 20,
            "relinkingTool.fromHandleArchetype": $make(Shape, 'Diamond', {
                segmentIndex: 0,
                cursor: 'pointer',
                desiredSize: new Size(8, 8),
                fill: 'lightblue',
                stroke: 'lightblue'
            }),
            "relinkingTool.toHandleArchetype": $make(Shape, 'Diamond', {
                segmentIndex: -1,
                cursor: 'pointer',
                desiredSize: new Size(8, 8),
                fill: 'lightblue',
                stroke: 'lightblue'
            }),
            // 编辑连线转折
            "linkReshapingTool.handleArchetype": $make(Shape, 'Diamond', {
                desiredSize: new Size(7, 7),
                fill: 'lightblue',
                stroke: 'lightblue'
            }),
            "rotatingTool.handleAngle": 270,
            "rotatingTool.handleDistance": 30,
            "rotatingTool.snapAngleMultiple": 15,
            "rotatingTool.snapAngleEpsilon": 15,
            "undoManager.isEnabled": true
        }
    )
}
/**
 * @description [template: node-selection] selection adornment template for node
 */
const nodeSelectTemplate = () => {
    return $make(
        Adornment, 'Auto',
        $make(Shape, { fill: null, stroke: 'deepskyblue', strokeWidth: 1, strokeDashArray: [ 4, 2 ] }),
        $make(Placeholder)
    )
}
/**
 * @description [template: node-resize] resize adornment template for node
 */
const nodeResizeTemplate = () => {
    return $make(
        Adornment, 'Spot', { locationSpot: Spot.Right },
        $make(Placeholder),
        $make(Shape, {
            alignment: Spot.TopLeft,
            cursor: 'nw-resize',
            desiredSize: new Size(6, 6),
            fill: 'lightblue',
            stroke: 'deepskyblue'
        }),
        $make(Shape, {
            alignment: Spot.Top,
            cursor: 'n-resize',
            desiredSize: new Size(6, 6),
            fill: 'lightblue',
            stroke: 'deepskyblue'
        }),
        $make(Shape, {
            alignment: Spot.TopRight,
            cursor: 'ne-resize',
            desiredSize: new Size(6, 6),
            fill: 'lightblue',
            stroke: 'deepskyblue'
        }),
        $make(Shape, {
            alignment: Spot.Right,
            cursor: 'e-resize',
            desiredSize: new Size(6, 6),
            fill: 'lightblue',
            stroke: 'deepskyblue'
        }),
        $make(Shape, {
            alignment: Spot.BottomRight,
            cursor: 'sw-resize',
            desiredSize: new Size(6, 6),
            fill: 'lightblue',
            stroke: 'deepskyblue'
        }),
        $make(Shape, {
            alignment: Spot.Bottom,
            cursor: 's-resize',
            desiredSize: new Size(6, 6),
            fill: 'lightblue',
            stroke: 'deepskyblue'
        }),
        $make(Shape, {
            alignment: Spot.BottomLeft,
            cursor: 'se-resize',
            desiredSize: new Size(6, 6),
            fill: 'lightblue',
            stroke: 'deepskyblue'
        }),
        $make(Shape, {
            alignment: Spot.Left,
            cursor: 'w-resize',
            desiredSize: new Size(6, 6),
            fill: 'lightblue',
            stroke: 'deepskyblue'
        }),
    )
}
/**
 * @description [template: node-rotate] rotate adornment template for node
 */
const nodeRotateTemplate = () => {
    return $make(
        Adornment, { locationSpot: Spot.Center, locationObjectName: 'CIRCLE' },
        $make(Shape, 'Circle', {
            name: 'CIRCLE',
            cursor: 'pointer',
            desiredSize: new Size(7, 7),
            fill: 'lightblue',
            stroke: 'deepskyblue'
        }),
        $make(Shape, {
            geometryString: 'M3.5 7 L3.5 30',
            isGeometryPositioned: true,
            stroke: 'deepskyblue',
            strokeWidth: 1,
            strokeDashArray: [ 4, 2 ]
        })
    )
}
/**
 * @description [template: node] template for node
 */
const nodeTemplate = (ctxMenu: HTMLInfo) => {
    return $make(
        Node, 'Spot',
        {
            contextMenu: ctxMenu,
            locationSpot: Spot.Center,
            selectable: true, selectionAdornmentTemplate: nodeSelectTemplate(),
            resizable: true, resizeObjectName: 'PANEL', resizeAdornmentTemplate: nodeResizeTemplate(),
            rotatable: true, rotateAdornmentTemplate: nodeRotateTemplate()
        },
        new Binding('location', 'loc', Point.parse).makeTwoWay(Point.stringify),
        new Binding('angle').makeTwoWay(),
        // the main object is a Panel that surrounds a TextBlock with a Shape
        $make(
            Panel, 'Auto', { name: 'PANEL' },
            new Binding('desiredSize', 'size', Size.parse).makeTwoWay(Size.stringify),
            // region 外侧边框
            $make(
                Shape, 'Rectangle', {
                    // the default port: if no spot on link data, use closest side
                    portId: '',
                    fromLinkable: true, toLinkable: true,
                    cursor: 'pointer',
                    // default color (can be changed by new Binding('fill'))
                    fill: 'transparent',
                    strokeWidth: 2,
                },
                // custom color
                new Binding('fill'),
                new Binding('figure'),
                new Binding('stroke')
            ),
            // endregion
            // region 内部文字
            $make(
                TextBlock, {
                    font: 'bold 11pt Helvetica, Arial, sans-serif',
                    margin: 8,
                    maxSize: new Size(160, NaN),
                    wrap: TextBlock.WrapFit,
                    editable: true,
                },
                new Binding('text').makeTwoWay(),
                new Binding('stroke', 'textColor')
            )
            // endregion
        ),
        // four small named ports, one on each side:
        makePort('T', Spot.Top, true, true),
        makePort('R', Spot.Right, true, true),
        makePort('B', Spot.Bottom, true, true),
        makePort('L', Spot.Left, true, true),
        // handle mouse enter/leave events to show/hide the ports
        {
            mouseEnter: (e, node) => {
                showPort(node, true)
            },
            mouseLeave: (e, node) => {
                showPort(node, false)
            }
        }
    )
}
/**
 * @description [template: link-selection] selection adornment template for link
 */
const linkSelectTemplate = () => {
    return $make(
        Adornment, 'Link',
        $make(Shape, {
            // isPanelMain declares that this Shape shares the Link.geometry
            isPanelMain: true,
            fill: 'transparent',
            stroke: 'deepskyblue',
            // use selection object's strokeWidth
            strokeWidth: 0
        })
    )
}
/**
 * @description [template: link] template for link
 */
const linkTemplate = (ctxMenu: HTMLInfo) => {
    return $make(
        Link,
        {
            contextMenu: ctxMenu,
            routing: Link.AvoidsNodes,
            curve: Link.JumpOver,
            corner: 5,
            toShortLength: 4,
            cursor: 'pointer',
            // select adornment
            selectable: true,
            selectionAdornmentTemplate: linkSelectTemplate(),
            // edit config
            relinkableFrom: true,
            relinkableTo: true,
            reshapable: true
        },
        new Binding('points').makeTwoWay(),
        // 连线的形状
        $make(
            Shape, { isPanelMain: true, strokeWidth: 2, stroke: '#999999' },
            new Binding('stroke')
        ),
        // 箭头
        $make(
            Shape, { toArrow: 'Standard', stroke: '#999999', fill: '#999999' },
            new Binding('fill', 'stroke'),
            new Binding('stroke'),
        ),
        // 连线上的文字块
        $make(
            Panel, 'Auto',
            // region 外框
            $make(
                Shape, 'RoundedRectangle',
                { fill: null, stroke: '#999999', minSize: new Size(40, NaN) },
                // 不选中时使此文本框不可见
                new Binding('visible', 'isSelected').ofObject()
            ),
            // endregion
            // region 内容
            $make(
                TextBlock,
                {
                    textAlign: 'center',
                    font: '10pt helvetica, arial, sans-serif',
                    // 连线文字颜色
                    stroke: '#777777',
                    margin: 5,
                    minSize: new Size(40, NaN),
                    editable: true
                },
                new Binding('text').makeTwoWay(),
                new Binding('stroke', 'textColor')
            )
            // endregion
        )
    )
}

interface contextMenuProp {
    show: (obj: GraphObject, diagram: Diagram, tool: Tool) => void
    hide: (diagram: Diagram, tool: Tool) => void
}

const contextMenu = (prop: contextMenuProp) => {
    return $make(HTMLInfo, {
        show: prop.show,
        hide: prop.hide
    })
}
// endregion

// region utils
/**
 * @description create diagram with template and event bind
 */
const createDiagram = (diagramEl: HTMLDivElement, ctxMenu: HTMLInfo) => {
    // generate a basic diagram instance
    const _diagram = baseDiagram(diagramEl)

    // set node template (select、resize、rotate)
    _diagram.nodeTemplate = nodeTemplate(ctxMenu)
    // set link template (select、resize)
    _diagram.linkTemplate = linkTemplate(ctxMenu)
    // bind context menu
    _diagram.contextMenu = ctxMenu

    return _diagram
}
const createPalette = (paletteEl: HTMLDivElement, ctxMenu: HTMLInfo, diagram: Diagram, items: PaletteItem[]) => {
    // generate a palette instance
    return $make(
        Palette, paletteEl,
        {
            name: 'palette',
            contextMenu: ctxMenu,
            maxSelectionCount: 1,
            nodeTemplateMap: diagram.nodeTemplateMap,
            model: new GraphLinksModel(items, [], {
                // set a name to identify 'palette',
                // so that can avoid calling callback
                // when do context-click on its node
                name: 'palette'
            })
        }
    )
}

// endregion

class GojsOperate {
    private readonly diagram: Diagram
    private readonly palette: Palette

    private get model() {
        return this.diagram.model
    }

    private set model(val: Model) {
        this.diagram.model = val
    }

    private readonly paletteItemList: PaletteItem[] = [
        { isNode: true, text: 'Start', figure: BuildInFigure.Circle, fill: 'transparent' },
        { isNode: true, text: 'Progress', figure: BuildInFigure.Rectangle, fill: 'transparent' },
        { isNode: true, text: 'Branch', figure: BuildInFigure.Diamond, fill: 'transparent' },
        { isNode: true, text: 'Comment', figure: BuildInFigure.RoundedRectangle, fill: 'transparent' },
    ]

    constructor(
        diagramEl: HTMLDivElement,
        paletteEl: HTMLDivElement,
        ctxControl: ContextMenuControl
    ) {
        // generate context menu
        const ctxMenu = contextMenu({
            show: (obj, diagram, tool) => {
                // avoid calling context callback when the event`s source is 'palette' rather then 'diagram'
                const diagramName = diagram.model.name as ('palette' | 'diagram')
                if(diagramName === 'palette') {
                    (diagram.contextMenu as HTMLInfo)?.hide?.(diagram, tool)
                    return
                }

                const mousePt = diagram.lastInput.viewPoint
                const originEvent = diagram.lastInput.event as PointerEvent

                if(obj === null) ctxControl('blank', [ mousePt.x, mousePt.y ], null, originEvent)

                else {
                    // @ts-ignore
                    const objData: GojsNodeData | GojsLinkData = obj.data

                    if(!objData.isNode) {
                        ctxControl('link', [ mousePt.x, mousePt.y ], objData, originEvent)
                    }
                    else {
                        ctxControl('node', [ mousePt.x, mousePt.y ], objData, originEvent)
                    }
                }
            },
            hide: (diagram) => {
                const originEvent = diagram.lastInput.event as PointerEvent
                ctxControl('hide', [ -1000, -1000 ], null, originEvent)
            }
        })
        // create diagram
        this.diagram = createDiagram(diagramEl, ctxMenu)
        // bind model
        this.model = emptyModel()
        // create palette
        this.palette = createPalette(paletteEl, ctxMenu, this.diagram, this.paletteItemList)

        // event listener
        // this.diagram.addDiagramListener('Modified', (e) => {
        //     console.log(e)
        // })
    }

    // region commands
    /**
     * @description do cut
     */
    public doCut() {
        this.diagram.commandHandler.canCutSelection()
        && this.diagram.commandHandler.cutSelection()
    }

    /**
     * @description do copy
     */
    public doCopy() {
        this.diagram.commandHandler.canCopySelection()
        && this.diagram.commandHandler.copySelection()
    }

    /**
     * @description do paste
     */
    public doPaste(pos: [ number, number ]) {
        this.diagram.commandHandler.canPasteSelection()
        && this.diagram.commandHandler.pasteSelection(new Point(...pos))
    }

    /**
     * @description do delete
     */
    public doDelete() {
        this.diagram.commandHandler.deleteSelection()
    }

    /**
     * @description set node`s fill (background color)
     */
    public doSetFill(dataObj: GojsNodeData, val: string) {
        this.model.setDataProperty(dataObj, 'fill', val)
    }

    /**
     * @description set node/link`s stroke (border color)
     */
    public doSetStroke(dataObj: GojsNodeData | GojsLinkData, val: string) {
        this.model.setDataProperty(dataObj, 'stroke', val)
    }

    /**
     * @description set node/link`s text color
     */
    public doSetTextColor(dataObj: GojsNodeData | GojsLinkData, val: string) {
        this.model.setDataProperty(dataObj, 'textColor', val)
    }

    /**
     * @description zoom to fit
     */
    public doZoomToFit() {
        this.diagram.commandHandler.canZoomToFit()
        && this.diagram.commandHandler.zoomToFit()
    }

    /**
     * @description clear diagram
     */
    public doClear() {
        this.diagram.clear()
    }

    /**
     * @description download the canvas as png
     */
    public doDownload() {
        this.diagram.makeImage({
            callback: (data) => {
                console.log(data)
            }
        })
    }
    // endregion

    /**
     * @description load json data to model
     */
    public fromJson(jsonStr: string) {
        this.model = Model.fromJson(jsonStr)
        this.diagram.model = this.model
    }

    /**
     * @description return json data from model
     */
    public toJson() {
        return this.model?.toJson() ?? ''
    }

    /**
     * @description destroy diagram instance and unbind with dom
     */
    public dispose() {
        this.diagram.div = null
        this.palette.div = null
    }
}

export {
    GojsOperate
}