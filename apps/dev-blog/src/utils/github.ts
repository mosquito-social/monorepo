import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const OWNER = "mosquito-social";
const REPO = "monorepo";

export type IssueNode = {
  number: number;
  title: string;
  url: string;
  isDone: boolean;
  totalCount: number;
  notDoneCount: number;
  children: IssueNode[];
};

let cachedTree: IssueNode[] | null = null;

// Parse the description to find issues this issue tracks (`- [ ] #123` or `- [x] #123`)
function getTrackedIssues(body: string | null | undefined): number[] {
  if (!body) return [];
  const regex = /-\s+\[[x\s]\]\s+#(\d+)/gi;
  const matches = [...body.matchAll(regex)];
  return matches.map((m) => parseInt(m[1], 10));
}

function computeCountsAndProgress(node: IssueNode) {
  if (node.children.length === 0) {
    node.totalCount = 1;
    node.notDoneCount = node.isDone ? 0 : 1;
  } else {
    let total = 0;
    let notDone = 0;
    for (const child of node.children) {
      computeCountsAndProgress(child);
      total += child.totalCount;
      notDone += child.notDoneCount;
    }
    node.totalCount = total;
    node.notDoneCount = notDone;
  }
}

export async function fetchIssuesTree(forceRefresh = false): Promise<IssueNode[]> {
  if (cachedTree && !forceRefresh) {
    return cachedTree;
  }

  const issues = await octokit.paginate(octokit.rest.issues.listForRepo, {
    owner: OWNER,
    repo: REPO,
    state: "all",
    per_page: 100,
  });

  const issueNodes = new Map<number, IssueNode>();

  for (const issue of issues) {
    // Skip pull requests
    if (issue.pull_request) continue;

    issueNodes.set(issue.number, {
      number: issue.number,
      title: issue.title,
      url: issue.html_url,
      isDone: issue.state === "closed",
      totalCount: 0,
      notDoneCount: 0,
      children: [],
    });
  }

  const childToParent = new Map<number, number>();

  for (const issue of issues) {
    if (issue.pull_request) continue;

    // Support new GitHub Sub-issues feature
    const parentUrl = (issue as any).parent_issue_url;
    if (typeof parentUrl === "string") {
      const parts = parentUrl.split("/");
      const parentNum = parseInt(parts[parts.length - 1], 10);
      if (!isNaN(parentNum) && issueNodes.has(parentNum)) {
        childToParent.set(issue.number, parentNum);
      }
    }

    // Support legacy markdown task lists
    const tracked = getTrackedIssues(issue.body);
    for (const childNum of tracked) {
      if (issueNodes.has(childNum)) {
        childToParent.set(childNum, issue.number);
      }
    }
  }

  const tree: IssueNode[] = [];

  for (const node of issueNodes.values()) {
    const parentId = childToParent.get(node.number);
    if (parentId && issueNodes.has(parentId)) {
      issueNodes.get(parentId)!.children.push(node);
    } else {
      tree.push(node);
    }
  }

  for (const root of tree) {
    computeCountsAndProgress(root);
  }

  cachedTree = tree;
  return tree;
}
