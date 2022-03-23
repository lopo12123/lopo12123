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
    Part,
    Placeholder,
    Point,
    Shape,
    Size,
    Spot,
    TextBlock,
    Tool
} from "gojs"
// gojs extension: Inspector
import { Inspector } from "gojs/extensionsJSM/DataInspector";
// gojs extension: figure (just load the file then use)
// import "gojs/extensionsJSM/Figures";

import { ContextMenuControl } from "@/components/FlowChart/ContextMenu";

/**
 * @description figures: build-in
 */
const Figure_BuildIn = [
    'Rectangle', 'Square', 'RoundedRectangle', 'Border', 'Ellipse',
    'Circle', 'TriangleRight', 'TriangleDown', 'TriangleLeft', 'TriangleUp',
    'Triangle', 'Diamond', 'LineH', 'LineV', 'None',
    'BarH', 'BarV', 'MinusLine', 'PlusLine', 'XLine'
] as const

/**
 * @description figures: extension
 */
const Figure_Extension = [
    // todo dynamic import figures
]

/**
 * @description item in palette
 */
interface PaletteItem {
    isNode: true
    // text in item
    text: string
    // text color
    textColor: string
    // type of item
    figure: (typeof Figure_BuildIn)[number]
    // background-color of item (#rrggbb)
    fill: string
    // border-color of item (#rrggbb)
    stroke: string
    // border-width of item (number)
    strokeWidth: number
    // [optional] item that need to be hide
    hidden?: Exclude<keyof PaletteItem, 'hidden' | 'isNode'>[]
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
 * @description create an empty model
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
        Adornment, 'Spot', { locationSpot: Spot.Center },
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
                    fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
                    toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
                    cursor: 'pointer',
                    // default color (can be changed by new Binding('fill'))
                    fill: 'white',
                    strokeWidth: 2,
                },
                // custom color
                new Binding('fill'),
                new Binding('stroke'),
                new Binding('figure'),
                new Binding('strokeWidth')
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
            new Binding('fill', 'stroke'),
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
                Shape, 'Rectangle',
                { fill: null, stroke: '#343434', strokeWidth: 0.5, minSize: new Size(40, NaN) },
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
                    stroke: '#999999',
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
/**
 * @description [static: palette] palette items (config)
 */
const paletteItems: PaletteItem[] = [
    {
        isNode: true,
        text: 'Start',
        textColor: '#cccccc',
        figure: 'Circle',
        fill: '#ffffff',
        stroke: '#000000',
        strokeWidth: 2
    },
    {
        isNode: true,
        text: 'Progress',
        textColor: '#cccccc',
        figure: 'Rectangle',
        fill: '#ffffff',
        stroke: '#000000',
        strokeWidth: 2
    },
    {
        isNode: true,
        text: 'Branch',
        textColor: '#cccccc',
        figure: 'Diamond',
        fill: '#ffffff',
        stroke: '#000000',
        strokeWidth: 2
    },
    {
        isNode: true,
        text: 'Comment',
        textColor: '#cccccc',
        figure: 'RoundedRectangle',
        fill: '#ffffff',
        stroke: '#000000',
        strokeWidth: 2
    },
    {
        isNode: true,
        text: 'Text',
        textColor: '#cccccc',
        figure: 'Rectangle',
        fill: 'transparent',
        stroke: 'transparent',
        strokeWidth: 0,
        hidden: [ 'fill', 'figure', 'stroke', 'strokeWidth' ]
    },
    {
        isNode: true,
        text: 'Port',
        textColor: '#cccccc',
        figure: 'Triangle',
        fill: '#ffffff',
        stroke: '#000000',
        strokeWidth: 2
    }
]
// endregion

// region utils
/**
 * @description props of contextMenu(HTMLInfo)
 */
interface contextMenuProp {
    show: (obj: GraphObject, diagram: Diagram, tool: Tool) => void
    hide: (diagram: Diagram, tool: Tool) => void
}

/**
 * @description create HTMLInfo as context menu
 */
const createContextMenu = (prop: contextMenuProp) => {
    return $make(HTMLInfo, {
        show: prop.show,
        hide: prop.hide
    })
}

/**
 * @description create diagram with template and event bind
 */
const createDiagram = (diagramEl: HTMLDivElement, ctxMenu: HTMLInfo) => {
    // create a basic diagram instance
    const _diagram = baseDiagram(diagramEl)

    // set node template (select、resize、rotate)
    _diagram.nodeTemplate = nodeTemplate(ctxMenu)
    // set link template (select、resize)
    _diagram.linkTemplate = linkTemplate(ctxMenu)
    // bind context menu
    _diagram.contextMenu = ctxMenu

    return _diagram
}

/**
 * @description create palette with template and event bind
 */
const createPalette = (paletteEl: HTMLDivElement, ctxMenu: HTMLInfo, diagram: Diagram) => {
    // create a palette instance
    return $make(
        Palette, paletteEl,
        {
            name: 'palette',
            contextMenu: ctxMenu,
            maxSelectionCount: 1,
            nodeTemplateMap: diagram.nodeTemplateMap,
            model: new GraphLinksModel(paletteItems, [], {
                // set a name to identify 'palette',
                // so that can avoid calling callback
                // when do context-click on its node
                name: 'palette'
            })
        }
    )
}

/**
 * @description create inspector for given diagram
 */
const createInspector = (inspectorEl: HTMLDivElement, diagram: Diagram) => {
    // get id (or set it manually if it`s not exist)
    let elId = inspectorEl.id
    if(!elId || elId.trim() === '') {
        inspectorEl.id = `inspector-${ Date.now() }`
        elId = inspectorEl.id
    }

    // @ts-ignore [Here. Of course they are the same].
    // param: diagram
    // require: import("~/node_modules/gojs/release/go.d.ts").Diagram
    // accept: import("~/node_modules/gojs/release/go-module.d.ts").Diagram
    //
    // However, when a private item with the same name in two class,
    // the are supposed to be the same type from an 'interface' or a 'type',
    // otherwise they are different even if they are all 'string' or anything else.
    return new Inspector(elId, diagram, {
        properties: {
            // hide some items
            isNode: { show: false },
            loc: { show: false },
            size: { show: false },
            points: { show: false },
            hidden: { show: false },

            // set read-only
            key: { show: Inspector.showIfPresent, readOnly: true },

            // both nodes and links
            text: { show: true, type: 'string' },
            textColor: {
                show: Inspector.showIfPresent,
                type: 'color'
            },
            fill: {
                show: (data: Part) => {
                    return data.data.fill && (!data.data.hidden || !data.data.hidden.includes('fill'))
                },
                type: 'color'
            },
            stroke: {
                show: (data: Part) => {
                    return data.data.strokeWidth && (!data.data.hidden || !data.data.hidden.includes('strokeWidth'))
                },
                type: 'color'
            },
            strokeWidth: {
                show: (data: Part) => {
                    return data.data.strokeWidth && (!data.data.hidden || !data.data.hidden.includes('strokeWidth'))
                },
                type: 'number'
            },
            // nodes only
            figure: {
                show: (data: Part) => {
                    return data.data.figure && (!data.data.hidden || !data.data.hidden.includes('figure'))
                },
                type: 'select',
                choices: Figure_BuildIn
            },
            // links only
            fromPort: {
                show: Inspector.showIfPresent,
                type: 'select',
                choices: [
                    // '' means it will automatically find the shortest way to connect
                    '', 'T', 'R', 'B', 'L'
                ]
            },
            toPort: {
                show: Inspector.showIfPresent,
                type: 'select',
                choices: [
                    // '' means it will automatically find the shortest way to connect
                    '', 'T', 'R', 'B', 'L'
                ]
            }
        }
    })
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

    constructor(
        diagramEl: HTMLDivElement,
        paletteEl: HTMLDivElement,
        inspectorEl: HTMLDivElement,
        ctxControl: ContextMenuControl
    ) {
        // create context menu
        const ctxMenu = createContextMenu({
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
        this.palette = createPalette(paletteEl, ctxMenu, this.diagram)

        // create inspector
        createInspector(inspectorEl, this.diagram)

        // region event listener
        // 1. when a link is drawn, manually set its text to '' (default: undefined)
        this.diagram.addDiagramListener('LinkDrawn', (e) => {
            e.subject.data.text = ''
            e.subject.data.textColor = '#999999'
            e.subject.data.stroke = '#999999'
        })
        // 2. when the model has been changed, ...
        // endregion
    }

    /**
     * @description load json data to model
     */
    private fromJson(jsonStr: string) {
        this.model = Model.fromJson(jsonStr)
        this.diagram.model = this.model
    }

    /**
     * @description return json data from model
     */
    private toJson() {
        return this.model?.toJson() ?? ''
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
        this.diagram.makeImageData({
            callback: (dataUrl) => {
                const aTag = document.createElement('a')
                aTag.download = `canvas_${ Date.now() }.png`
                aTag.href = dataUrl
                aTag.click()
            }
        })
    }

    // endregion

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