import { Tab } from '../components/index';
import createElement from '../babel/babelTransformToJSX';
import TabPane from '../components/Tab/TabPane';

const App = (
  <Tab className="tab-root">
    <TabPane title={111}></TabPane>
    <TabPane title={222}></TabPane>
    <TabPane title={333}></TabPane>
  </Tab>
);

export default App;
