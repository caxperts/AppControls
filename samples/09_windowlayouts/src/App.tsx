import { Application } from '@caxperts/universal.api';

type Container = {
  ContentType?: string;
  ContainerType?: string;
  Orientation?: string;
  SubContainers?: Container[];
  ActiveContainerIndex?: number;
  Identifier?: string;
  Width?: string;
  Height?: string;
};

// ============================================================
// JSON version
// ============================================================

type PathEntry = { node: Container; parent: Container; index: number };

/** Returns the path from root to the first node matching predicate (last entry = matched node). */
function findPath(root: Container, predicate: (c: Container) => boolean): PathEntry[] | null {
  function search(container: Container, path: PathEntry[]): PathEntry[] | null {
    if (predicate(container)) return path;
    for (let i = 0; i < (container.SubContainers?.length ?? 0); i++) {
      const child = container.SubContainers![i];
      const found = search(child, [...path, { node: child, parent: container, index: i }]);
      if (found) return found;
    }
    return null;
  }
  return search(root, []);
}

/**
 * Moves the App panel below ThreeDView (JSON layout).
 *  1. Find App → remove it → collapse any ancestor that now has only one child.
 *  2. Find ThreeDView → replace it with a new vertical SplitContainer holding both.
 */
function moveAppBelowThreeDViewJson(layout: object): object {
  const root = JSON.parse(JSON.stringify(layout)) as { RootContainer: Container };
  const rc   = root.RootContainer;

  // Step 1: remove App and collapse single-child ancestors
  const appPath = findPath(rc, (c) => c.ContentType === 'App');
  if (!appPath) return root;

  const { node: app, parent: appParent, index: appIndex } = appPath[appPath.length - 1];
  appParent.SubContainers!.splice(appIndex, 1);

  for (let i = appPath.length - 2; i >= 0; i--) {
    const { node, parent, index } = appPath[i];
    if (node.SubContainers!.length === 1) {
      parent.SubContainers![index] = node.SubContainers![0];  // unwrap single-child container
    } else {
      break;
    }
  }

  // Step 2: wrap ThreeDView and App in a new vertical SplitContainer
  const threeDPath = findPath(rc, (c) => c.ContentType === 'ThreeDView');
  if (!threeDPath) return root;

  const { node: threeDView, parent: threeDParent, index: threeDIndex } = threeDPath[threeDPath.length - 1];
  threeDParent.SubContainers![threeDIndex] = {
    Orientation: 'Vertical',
    ContainerType: 'SplitContainer',
    Width: threeDView.Width,
    Height: threeDView.Height,
    SubContainers: [threeDView, app],
  };

  return root;
}

// ============================================================
// XML version
// ============================================================

/**
 * Moves the App panel below ThreeDView (XML layout).
 *  1. Find App → remove it → collapse any ancestor that now has only one child.
 *  2. Find ThreeDView → replace it with a new vertical SplitContainer holding both.
 */
function moveAppBelowThreeDViewXml(xmlString: string): string {
  const doc = new DOMParser().parseFromString(xmlString, 'application/xml');

  // Step 1: remove App and collapse single-child ancestors
  const app       = doc.querySelector('ContentContainer[ContentType="App"]')!;
  const appParent = app.parentElement!;
  app.remove();

  let ancestor = appParent;
  while (ancestor.parentElement) {
    if (ancestor.children.length === 1) {
      const onlyChild = ancestor.children[0];
      ancestor.parentElement!.replaceChild(onlyChild, ancestor);  // unwrap single-child container
      ancestor = onlyChild.parentElement!;
    } else {
      break;
    }
  }

  // Step 2: wrap ThreeDView and App in a new vertical SplitContainer
  const threeDView = doc.querySelector('ContentContainer[ContentType="ThreeDView"]')!;
  const split      = doc.createElement('SplitContainer');
  split.setAttribute('Width',       threeDView.getAttribute('Width')!);
  split.setAttribute('Height',      threeDView.getAttribute('Height')!);
  split.setAttribute('Orientation', 'Vertical');

  threeDView.parentElement!.replaceChild(split, threeDView);
  split.appendChild(threeDView);
  split.appendChild(app);

  return new XMLSerializer().serializeToString(doc);
}

function App() {

  // Reads the current window layout as JSON, moves the App panel below the
  // 3D view, and writes the transformed layout back to UPV.
  async function applyAppBelowThreeDViewJson() {
    const layoutJson  = await Application.getInstance().Settings.WindowLayoutJson.get();
    const transformed = moveAppBelowThreeDViewJson(JSON.parse(layoutJson));
    console.log(JSON.stringify(transformed));
    await Application.getInstance().Settings.WindowLayoutJson.set(JSON.stringify(transformed));
  }

  // Same transformation as above but operating on the XML representation of the layout.
  async function applyAppBelowThreeDViewXml() {
    const layoutXml   = await Application.getInstance().Settings.WindowLayoutXML.get();
    const transformed = moveAppBelowThreeDViewXml(layoutXml);
    console.log(transformed);
    await Application.getInstance().Settings.WindowLayoutXML.set(transformed);
  }

  return (
    <>
      {/* Move the App panel below the 3D view using the JSON layout */}
      <button onClick={applyAppBelowThreeDViewJson}>App Below 3D View (JSON)</button>
      {/* Move the App panel below the 3D view using the XML layout */}
      <button onClick={applyAppBelowThreeDViewXml}>App Below 3D View (XML)</button>
    </>
  );
}

export default App;
