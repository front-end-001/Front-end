import TabContainer from './component/TabContainer'
import ScrollContainer from './component/ScrollContainer'
import Text from './component/Text'
function myCreate (Class, attributes, ...children) {
    const object = new Class()
    for (const a in attributes) {
        object.setAttribute(a, attributes[a])
    }
    for (const c of children) {
        if(typeof c === "string") {
            object.appendChild(new Text(c))
        } else {
            object.appendChild(c)
        }
    }
    return object
}
const tab = <TabContainer className="tab-container">
    <ScrollContainer tabTitle='推荐' style="-webkit-overflow-scrolling:touch;overflow:scroll;white-space:normal;background-color:blue" />
    <ScrollContainer tabTitle='有趣的店' style="-webkit-overflow-scrolling:touch;overflow:scroll;white-space:normal;background-color:green" />
    <ScrollContainer tabTitle='好店' style="-webkit-overflow-scrolling:touch;overflow:scroll;white-space:normal;background-color:red" />
</TabContainer>
tab.appendTo(document.body)
