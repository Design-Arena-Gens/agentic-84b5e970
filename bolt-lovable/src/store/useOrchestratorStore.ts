import { create } from "zustand";
import { nanoid } from "nanoid";

type ModuleRunState = "idle" | "running" | "success" | "error";

export type WorkflowNode = {
  id: string;
  moduleId: string;
  label: string;
  state: ModuleRunState;
  logs: string[];
  position: number;
};

export type WorkflowEdge = {
  id: string;
  source: string;
  target: string;
};

type WorkflowStore = {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  addNode: (moduleId: string, label: string) => void;
  removeNode: (id: string) => void;
  reorderNode: (nodeId: string, position: number) => void;
  setNodeState: (nodeId: string, state: ModuleRunState, log?: string) => void;
  resetWorkflow: () => void;
};

const defaultNodes: WorkflowNode[] = [
  {
    id: "architect-node",
    moduleId: "architect",
    label: "Experience Blueprint",
    state: "idle",
    logs: [],
    position: 0,
  },
  {
    id: "coder-node",
    moduleId: "coder",
    label: "Component Generation",
    state: "idle",
    logs: [],
    position: 1,
  },
  {
    id: "debugger-node",
    moduleId: "debugger",
    label: "Quality Sweep",
    state: "idle",
    logs: [],
    position: 2,
  },
  {
    id: "handler-node",
    moduleId: "handler",
    label: "Automated Patching",
    state: "idle",
    logs: [],
    position: 3,
  },
];

const defaultEdges: WorkflowEdge[] = [
  { id: "edge-architect-coder", source: "architect-node", target: "coder-node" },
  { id: "edge-coder-debugger", source: "coder-node", target: "debugger-node" },
  { id: "edge-debugger-handler", source: "debugger-node", target: "handler-node" },
];

export const useOrchestratorStore = create<WorkflowStore>((set) => ({
  nodes: defaultNodes,
  edges: defaultEdges,
  addNode: (moduleId, label) =>
    set((state) => {
      const id = `${moduleId}-${nanoid(6)}`;
      const position = state.nodes.length;
      return {
        nodes: [
          ...state.nodes,
          { id, moduleId, label, state: "idle", logs: [], position },
        ],
        edges: [
          ...state.edges,
          ...(state.nodes.length
            ? [
                {
                  id: `edge-${state.nodes[state.nodes.length - 1].id}-${id}`,
                  source: state.nodes[state.nodes.length - 1].id,
                  target: id,
                },
              ]
            : []),
        ],
      };
    }),
  removeNode: (id) =>
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== id),
      edges: state.edges.filter((edge) => edge.source !== id && edge.target !== id),
    })),
  reorderNode: (nodeId, position) =>
    set((state) => {
      const nodes = [...state.nodes];
      const targetIndex = nodes.findIndex((node) => node.id === nodeId);
      if (targetIndex === -1) return state;

      const [node] = nodes.splice(targetIndex, 1);
      nodes.splice(position, 0, node);

      return {
        nodes: nodes.map((item, index) => ({ ...item, position: index })),
        edges: nodes.slice(1).map((node, index) => ({
          id: `edge-${nodes[index].id}-${node.id}`,
          source: nodes[index].id,
          target: node.id,
        })),
      };
    }),
  setNodeState: (nodeId, stateName, log) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              state: stateName,
              logs: log ? [...node.logs, `[${new Date().toLocaleTimeString()}] ${log}`] : node.logs,
            }
          : node,
      ),
    })),
  resetWorkflow: () =>
    set({
      nodes: defaultNodes,
      edges: defaultEdges,
    }),
}));
