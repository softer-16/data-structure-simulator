const $ = (id) => document.getElementById(id);

const tree = {
  nodes: {
    A: { x: 400, y: 45, l: "B", r: "C" },
    B: { x: 220, y: 135, l: "D", r: "E" },
    C: { x: 580, y: 135, l: "F", r: "G" },
    D: { x: 130, y: 225, l: "H", r: "I" },
    E: { x: 310, y: 225, l: "J", r: "K" },
    F: { x: 490, y: 225, l: "L", r: "M" },
    G: { x: 670, y: 225, l: "N", r: "O" },
    H: { x: 85, y: 315 },
    I: { x: 175, y: 315 },
    J: { x: 265, y: 315 },
    K: { x: 355, y: 315 },
    L: { x: 445, y: 315 },
    M: { x: 535, y: 315 },
    N: { x: 625, y: 315 },
    O: { x: 715, y: 315 }
  },
  root: "A"
};

const graph = {
  n: 15,
  edges: [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6],[3,7],[3,8],[4,9],[4,10],[5,11],[5,12],[6,13],[6,14]],
  pos: {
    0: { x: 400, y: 45 },
    1: { x: 220, y: 135 },
    2: { x: 580, y: 135 },
    3: { x: 130, y: 225 },
    4: { x: 310, y: 225 },
    5: { x: 490, y: 225 },
    6: { x: 670, y: 225 },
    7: { x: 85, y: 315 },
    8: { x: 175, y: 315 },
    9: { x: 265, y: 315 },
    10: { x: 355, y: 315 },
    11: { x: 445, y: 315 },
    12: { x: 535, y: 315 },
    13: { x: 625, y: 315 },
    14: { x: 715, y: 315 }
  }
};

const simState = {
  arrayText: "12,5,4,9,5",
  binaryArrayText: "3,8,12,18,25,31,39,42,56",
  binaryTarget: 42,
  hashText: "19,14,23,1,68",
  bstValues: [50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45, 55, 65, 75, 85],
  bstTarget: 65,
  bstInsert: 33,
  avlValues: [50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45, 55, 65, 75, 85],
  avlTarget: 25,
  avlInsert: 5
};

const codes = {
  buildTree: `void createBiTree(BiNode*& T, char a[100][3], int n, int& i) {
    if (i >= n) return;
    T = new BiNode;
    T->data = a[i][0];
    T->lchild = NULL;
    T->rchild = NULL;
    int k = i;
    if (a[k][1] == '1') {
        i++;
        createBiTree(T->lchild, a, n, i);
    }
    if (a[k][2] == '1') {
        i++;
        createBiTree(T->rchild, a, n, i);
    }
}`,
  treeArray: `void toArray(BiNode* T, char s[], int i, int& maxIndex) {
    if (T == NULL) return;
    s[i] = T->data;
    if (i > maxIndex) maxIndex = i;
    toArray(T->lchild, s, i * 2, maxIndex);
    toArray(T->rchild, s, i * 2 + 1, maxIndex);
}`,
  lca: `BiNode* lca(BiNode* T, char a, char b) {
    if (T == NULL) return NULL;
    if (T->data == a || T->data == b) return T;
    BiNode* left = lca(T->lchild, a, b);
    BiNode* right = lca(T->rchild, a, b);
    if (left != NULL && right != NULL) return T;
    if (left != NULL) return left;
    return right;
}`,
  leafPath: `void leafPath(BiNode* T, char path[], int len) {
    if (T == NULL) return;
    path[len] = T->data;
    len++;
    if (T->lchild == NULL && T->rchild == NULL) {
        for (int i = len - 1; i >= 0; i--) cout << path[i];
    }
    leafPath(T->lchild, path, len);
    leafPath(T->rchild, path, len);
}`,
  childSibling: `struct CsNode {
    char data;
    CsNode* firstChild;
    CsNode* nextSibling;
};

// firstChild 向下，nextSibling 向右`,
  matrix: `void addEdge(int a, int b) {
    edge[a][b] = 1;
    edge[b][a] = 1;
}

int getEdgeNum() {
    int sum = 0;
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++)
            if (edge[i][j] == 1) sum++;
    return sum;
}`,
  dfs: `void DFS(int v, int visited[]) {
    cout << v << " ";
    visited[v] = 1;
    for (int i = 0; i < n; i++) {
        if (edge[v][i] == 1 && visited[i] == 0) {
            DFS(i, visited);
        }
    }
}`,
  bfs: `void BFS(int v) {
    int visited[50] = { 0 };
    queue<int> q;
    q.push(v);
    visited[v] = 1;
    while (!q.empty()) {
        int x = q.front();
        q.pop();
        cout << x << " ";
        for (int i = 0; i < n; i++) {
            if (edge[x][i] == 1 && visited[i] == 0) {
                visited[i] = 1;
                q.push(i);
            }
        }
    }
}`,
  binary: `int binarySearch(Elem A[], int n, Key x) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (A[mid].key == x) return mid;
        else if (A[mid].key < x) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
  hash: `void addLinear(int key) {
    int pos = key % m;
    while (table[pos] != EMPTY) {
        pos = (pos + 1) % m;
    }
    table[pos] = key;
}`,
  insertion: `void insertSort(Elem A[], int n) {
    for (int i = 1; i < n; i++) {
        Elem temp = A[i];
        int j = i - 1;
        while (j >= 0 && A[j].key > temp.key) {
            A[j + 1] = A[j];
            j--;
        }
        A[j + 1] = temp;
    }
}`,
  bubble: `void bubbleSort(Elem A[], int n) {
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - 1 - i; j++) {
            if (A[j].key > A[j + 1].key) {
                swap(A[j], A[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
  quick: `void quickSort(Elem A[], int low, int high) {
    if (low >= high) return;
    int i = low, j = high;
    Elem pivot = A[low];
    while (i < j) {
        while (i < j && A[j].key >= pivot.key) j--;
        A[i] = A[j];
        while (i < j && A[i].key <= pivot.key) i++;
        A[j] = A[i];
    }
    A[i] = pivot;
    quickSort(A, low, i - 1);
    quickSort(A, i + 1, high);
}`,
  merge: `void mergeSort(Elem A[], int left, int right) {
    if (left >= right) return;
    int mid = (left + right) / 2;
    mergeSort(A, left, mid);
    mergeSort(A, mid + 1, right);
    merge(A, left, mid, right);
}`,
  dijkstra: `while (还有未确定顶点) {
    u = dist 最小的未确定顶点;
    fixed[u] = true;
    for (u 的每个邻接点 v) {
        if (dist[u] + w(u,v) < dist[v]) {
            dist[v] = dist[u] + w(u,v);
            parent[v] = u;
        }
    }
}`
};

codes.bst = `Node* searchBST(Node *T, Key x) {
    if (T == NULL) return NULL;
    if (x == T->key) return T;
    if (x < T->key) return searchBST(T->lchild, x);
    return searchBST(T->rchild, x);
}

void insertBST(Node*& T, Key x) {
    if (T == NULL) T = new Node(x);
    else if (x < T->key) insertBST(T->lchild, x);
    else if (x > T->key) insertBST(T->rchild, x);
}`;

codes.avl = `int height(Node* T) { return T ? T->height : 0; }
int balance(Node* T) { return height(T->left) - height(T->right); }

Node* rotateRight(Node* y) {
    Node* x = y->left;
    y->left = x->right;
    x->right = y;
    update(y); update(x);
    return x;
}

Node* insertAVL(Node* T, int x) {
    if (T == NULL) return new Node(x);
    if (x < T->key) T->left = insertAVL(T->left, x);
    else if (x > T->key) T->right = insertAVL(T->right, x);
    update(T);
    if (balance(T) > 1) return rotateRight(T); // 简化示例
    return T;
}`;

const algorithms = [
  { id: "fact", page: 3, group: "递归", title: "阶乘递归 Fact", subtitle: "调用栈入栈/出栈", complexity: "O(n)", build: buildFactSteps, render: renderCallStack, code: codes.buildTree },
  { id: "hanoi", page: 4, group: "递归", title: "汉诺塔 Hanoi", subtitle: "先移 n-1，再移最大盘，再移 n-1", complexity: "O(2^n)", build: buildHanoiSteps, render: renderHanoi, code: codes.buildTree },
  { id: "traversal", page: 8, group: "树与二叉树", title: "二叉树三序遍历", subtitle: "根的位置决定先/中/后序", complexity: "O(n)", build: buildTraversalSteps, render: renderTraversal, code: codes.treeArray },
  { id: "heightCount", page: 9, group: "树与二叉树", title: "高度/结点数/叶子数", subtitle: "同一棵树，不同合并方式", complexity: "O(n)", build: buildTreeMetricSteps, render: renderTraversal, code: codes.leafPath },
  { id: "buildTree", page: 10, group: "实验四：二叉树与树", title: "二叉树递归建树", subtitle: "从 BinaryTree 文件记录生成二叉链表", complexity: "O(n)", build: buildTreeSteps, render: renderTreeBuild, code: codes.buildTree },
  { id: "treeArray", page: 11, group: "实验四：二叉树与树", title: "二叉链表转顺序存储", subtitle: "按完全二叉树编号放入数组", complexity: "O(n)", build: buildArraySteps, render: renderArrayTree, code: codes.treeArray },
  { id: "relation", page: 12, group: "实验四：二叉树与树", title: "父/兄弟/孩子查询", subtitle: "查找结点 B 的亲属关系", complexity: "O(n)", build: buildRelationSteps, render: renderRelation, code: codes.treeArray },
  { id: "lca", page: 13, group: "实验四：二叉树与树", title: "最近共同祖先 LCA", subtitle: "求 D 与 E 的最近共同祖先", complexity: "O(n)", build: buildLcaSteps, render: renderLca, code: codes.lca },
  { id: "leafPath", page: 14, group: "实验四：二叉树与树", title: "叶子到根路径", subtitle: "用 path 数组记录根到叶，反向输出", complexity: "O(n)", build: buildLeafPathSteps, render: renderLeafPath, code: codes.leafPath },
  { id: "childSibling", page: 15, group: "实验四：二叉树与树", title: "孩子兄弟表示与树的度", subtitle: "firstChild 向下，nextSibling 向右", complexity: "O(n)", build: buildChildSiblingSteps, render: renderChildSibling, code: codes.childSibling },
  { id: "matrix", page: 17, group: "图", title: "邻接矩阵 / 边数 / 树判定", subtitle: "无向边写两格，只数右上三角", complexity: "O(V²)", build: buildMatrixSteps, render: renderMatrix, code: codes.matrix },
  { id: "adjList", page: 18, group: "图", title: "邻接表", subtitle: "只存真正相连的邻居", complexity: "O(V+E)", build: buildAdjListSteps, render: renderAdjList, code: codes.matrix },
  { id: "dfs", page: 19, group: "图", title: "DFS 深度优先搜索", subtitle: "递归栈：一条路走到底", complexity: "矩阵 O(V²)", build: buildDfsSteps, render: renderGraphTraversal, code: codes.dfs },
  { id: "bfs", page: 20, group: "图", title: "BFS 广度优先搜索", subtitle: "队列：水波纹逐层扩散", complexity: "矩阵 O(V²)", build: buildBfsSteps, render: renderGraphTraversal, code: codes.bfs },
  { id: "prim", page: 21, group: "图", title: "Prim 最小生成树", subtitle: "从点集合向外扩张", complexity: "O(V²)", build: buildPrimSteps, render: renderWeightedGraph, code: codes.dijkstra },
  { id: "kruskal", page: 21, group: "图", title: "Kruskal 最小生成树", subtitle: "边从小到大，不成环就选", complexity: "O(E log E)", build: buildKruskalSteps, render: renderWeightedGraph, code: codes.dijkstra },
  { id: "topo", page: 22, group: "图", title: "拓扑排序", subtitle: "不断删除入度为 0 的点", complexity: "O(V+E)", build: buildTopoSteps, render: renderTopo, code: codes.dijkstra },
  { id: "dijkstra", page: 23, group: "最短路径", title: "Dijkstra 单源最短路径", subtitle: "每次确定当前最近的点，再松弛邻居", complexity: "朴素 O(V²)", build: buildDijkstraSteps, render: renderDijkstra, code: codes.dijkstra },
  { id: "floyd", page: 24, group: "最短路径", title: "Floyd 任意两点最短路", subtitle: "枚举中转点 k", complexity: "O(V³)", build: buildFloydSteps, render: renderFloyd, code: codes.dijkstra },
  { id: "sequential", page: 25, group: "查找", title: "顺序查找", subtitle: "从头到尾一个个比", complexity: "O(n)", build: buildSequentialSteps, render: renderBinary, code: codes.binary },
  { id: "binary", page: 25, group: "查找", title: "二分查找", subtitle: "每轮排除一半候选区间", complexity: "O(log n)", build: buildBinarySteps, render: renderBinary, code: codes.binary },
  { id: "block", page: 26, group: "查找", title: "分块查找", subtitle: "先查索引，再查块内", complexity: "介于 O(n) 与 O(log n)", build: buildBlockSteps, render: renderBlock, code: codes.binary },
  { id: "bst", page: 26, group: "查找", title: "BST 二叉排序树探索", subtitle: "自己输入数，观察插入和查找路径", complexity: "平均 O(log n)，最坏 O(n)", build: buildBstSteps, render: renderBst, code: codes.bst, params: "bst" },
  { id: "avl", page: 27, group: "查找", title: "AVL 平衡二叉树探索", subtitle: "插入后自动检查平衡并旋转", complexity: "O(log n)", build: buildAvlSteps, render: renderAvl, code: codes.avl, params: "avl" },
  { id: "hash", page: 28, group: "查找", title: "哈希表冲突处理", subtitle: "线性探测与链地址法对照", complexity: "平均 O(1)", build: buildHashSteps, render: renderHash, code: codes.hash },
  { id: "insertion", page: 29, group: "排序", title: "直接插入排序", subtitle: "输入数组，观察逐个插入", complexity: "O(n²)", build: () => buildInsertionSteps(parseNums(simState.arrayText)), render: renderArraySort, code: codes.insertion, params: "array" },
  { id: "shell", page: 29, group: "排序", title: "希尔排序", subtitle: "按增量分组插入", complexity: "依增量而定", build: buildShellSteps, render: renderArraySort, code: codes.insertion },
  { id: "bubble", page: 29, group: "排序", title: "冒泡排序", subtitle: "输入数组，观察相邻交换", complexity: "O(n²)", build: () => buildBubbleSteps(parseNums(simState.arrayText)), render: renderArraySort, code: codes.bubble, params: "array" },
  { id: "quick", page: 29, group: "排序", title: "快速排序一趟划分", subtitle: "pivot 归位，左右分区", complexity: "平均 O(n log n)", build: () => buildQuickSteps([12,5,4,19,8,21,15]), render: renderArraySort, code: codes.quick },
  { id: "selection", page: 29, group: "排序", title: "直接选择排序", subtitle: "每趟选最小放前面", complexity: "O(n²)", build: buildSelectionSteps, render: renderArraySort, code: codes.insertion },
  { id: "heap", page: 29, group: "排序", title: "堆排序", subtitle: "大根堆反复取最大", complexity: "O(n log n)", build: () => buildHeapSteps([50,30,70,20,40,60,80,10,25,35,45,55,65,75,85]), render: renderHeap, code: codes.insertion },
  { id: "merge", page: 29, group: "排序", title: "归并排序合并", subtitle: "两个有序表合成一个有序表", complexity: "O(n log n)", build: buildMergeSteps, render: renderMerge, code: codes.merge },
  { id: "counting", page: 29, group: "排序", title: "计数排序", subtitle: "统计每个值出现次数", complexity: "O(n+k)", build: buildCountingSteps, render: renderCounting, code: codes.hash },
  { id: "radix", page: 29, group: "排序", title: "基数排序", subtitle: "按个位、十位逐位分桶", complexity: "O(d(n+r))", build: buildRadixSteps, render: renderBuckets, code: codes.hash },
  { id: "bucket", page: 29, group: "排序", title: "桶排序", subtitle: "按范围分桶，桶内排序", complexity: "依分布而定", build: buildBucketSteps, render: renderBuckets, code: codes.hash }
];

let current = algorithms[0];
let steps = [];
let stepIndex = 0;
let timer = null;

function setAlgorithm(id) {
  current = algorithms.find(a => a.id === id) || algorithms[0];
  steps = current.build();
  stepIndex = 0;
  stop();
  renderParams();
  renderAll();
  scrollWorkspaceTop();
}

function renderAll() {
  $("category").textContent = current.group;
  $("title").textContent = current.title;
  $("subtitle").textContent = current.subtitle;
  $("complexity").textContent = `复杂度：${current.complexity}`;
  $("stepCount").textContent = `${stepIndex + 1} / ${steps.length}`;
  updateStepButtons();
  document.querySelectorAll(".algoBtn").forEach(b => b.classList.toggle("active", b.dataset.id === current.id));
  const step = steps[stepIndex] || {};
  $("visualSummary").innerHTML = renderVisualSummary(current);
  $("visualGuide").innerHTML = renderVisualGuide(current, step);
  renderStepHistory();
  $("stepText").textContent = step.text || "";
  $("defenseText").textContent = step.defense || "学习时先看算法目标，再看核心变量，最后看每一步如何推进。";
  $("stateText").innerHTML = Object.entries(step.state || {}).map(([k, v]) => `<div class="stateItem"><b>${k}</b>：${v}</div>`).join("");
  $("visual").innerHTML = "";
  const visualPanel = document.querySelector(".visualPanel");
  if (visualPanel) {
    const largeVisuals = new Set(["fact", "hanoi", "sequential", "binary", "block", "merge", "counting", "radix", "bucket", "hash", "floyd", "topo"]);
    visualPanel.dataset.algo = current.id;
    visualPanel.dataset.scale = largeVisuals.has(current.id) ? "large" : "normal";
  }
  current.render($("visual"), step, stepIndex);
  if (visualPanel) visualPanel.scrollTop = 0;
  renderCode(current.code, step.lines || []);
  renderKnowledge();
}

function renderVisualGuide(algo, step) {
  const guide = getVisualGuide(algo, step);
  return `<b>看图指南：</b>${escapeHtml(guide)}`;
}

function renderVisualSummary(algo) {
  return `<b>解析：</b>${escapeHtml(getAlgorithmSummary(algo))}`;
}

function getAlgorithmSummary(algo) {
  const byId = {
    fact: "阶乘递归把 Fact(n) 拆成 n * Fact(n-1)，所以每次调用都必须让 n 变小。看到 Fact(0)=1 时递归停止，之后结果会沿调用栈一层层返回。",
    hanoi: "汉诺塔的关键不是乱试移动，而是把“大问题”拆成三步：先挪开 n-1 个小盘，移动最大盘，再把 n-1 个小盘挪回来。动画每一步都在执行这个固定套路。",
    traversal: "三序遍历访问的是同一棵树，区别只在“什么时候记录根结点”。根先被记录是先序，夹在左右子树中间是中序，左右子树都处理完再记录是后序。",
    heightCount: "求高度、结点数、叶子数都可以递归完成，因为一棵树可以分成根、左子树、右子树。高度取左右较大值加 1，结点数左右相加再加根，叶子数只在没有孩子时计 1。",
    buildTree: "递归建树通常按文件或数组的顺序读结点。本题读到一行就创建当前结点，左/右标志为 1 才继续递归创建对应孩子；标志为 0 就说明该方向为空。",
    treeArray: "二叉链表转顺序存储时，要把指针关系翻译成数组下标关系。根放 1，左孩子放 2*i，右孩子放 2*i+1；这样即使某些位置为空，也能保留树的形状。",
    relation: "父、兄弟、孩子查询本质都是围绕指针关系找位置。孩子直接看目标结点左右指针，父结点要从根开始找谁指向目标，兄弟则是找到父亲后看另一个孩子。",
    lca: "最近共同祖先是两个结点路径第一次汇合的位置。递归查找时，如果当前结点左子树找到一个目标、右子树也找到一个目标，当前结点就是最近的共同祖先。",
    leafPath: "叶子到根路径通常先在递归下行时记录根到叶的 path。到达叶子后，path 里已经保存完整路径；题目若要求叶到根，只需要把 path 反向输出。",
    childSibling: "孩子兄弟表示法把普通树改造成“向下找第一个孩子、向右找下一个兄弟”的结构。求某个结点的度时，不是看左右孩子，而是沿 firstChild 后的兄弟链数有几个孩子。",
    matrix: "邻接矩阵用二维数组表示图中任意两点是否相连。无向边 a-b 必须同时写 edge[a][b] 和 edge[b][a]，统计边数时只看右上三角，避免同一条边被算两次。",
    adjList: "邻接表给每个顶点准备一个邻居名单，只保存真实存在的边。边少时它比矩阵省空间；无向图中一条边会出现在两个顶点的邻居名单里。",
    dfs: "DFS 深度优先搜索像走迷宫：遇到没访问过的邻居就马上深入，直到走不动再回退。visited 用来防止在有环图里无限绕圈，递归调用栈保存当前路径。",
    bfs: "BFS 广度优先搜索按层推进：先访问起点，再访问一圈邻居，再访问邻居的邻居。队列保证先进先出，所以无权图中第一次到达某点时，路径层数就是最短的。",
    prim: "Prim 用“点集合扩张”的思想找最小生成树。它始终维护一批已选顶点，每次从连接内外两个集合的边里挑最短的一条，把新的顶点纳入生成树。",
    kruskal: "Kruskal 从边的角度出发，把所有边按权值从小到大尝试加入。只要加入后不会形成环，这条边就保留；最终选出 n-1 条边时得到最小生成树。",
    topo: "拓扑排序处理的是有先后依赖的有向无环图。入度为 0 的点表示没有前置条件，可以先输出；输出它后删除出边，新的入度为 0 的点继续进入队列。",
    dijkstra: "Dijkstra 用 dist 数组记录从起点到各点的当前最短距离。每轮选出未确定点里 dist 最小的点固定下来，再用它更新邻居；它适用于非负权图。",
    floyd: "Floyd 求任意两点最短路，核心是允许越来越多的中转点。枚举 k 时，检查 i 到 j 如果经过 k 是否更短，若更短就更新距离矩阵 D[i][j]。",
    sequential: "顺序查找不依赖数据是否有序，方法就是从头到尾逐个比较。它简单但效率低，最坏情况下要看完整个表；动画中的高亮格就是当前比较对象。",
    binary: "二分查找必须建立在有序数组上。每次取中间位置 mid 比较，目标更大就丢掉左半边，目标更小就丢掉右半边，因此查找范围会快速缩小。",
    block: "分块查找把数据分成若干块，并用索引表记录每块的范围。先通过索引判断目标可能在哪一块，再进入块内顺序查找，是顺序查找和二分思想的折中。",
    bst: "BST 二叉排序树要求左子树都比根小，右子树都比根大。查找或插入时每到一个结点只需决定向左还是向右，直到找到目标或遇到空位置。",
    avl: "AVL 是带平衡要求的 BST。插入先按 BST 规则进行，之后沿路径回看高度差；若某个结点左右高度差超过 1，就通过旋转把树重新变矮、变平衡。",
    hash: "哈希表用函数把关键字直接映射到数组位置，理想情况下接近 O(1)。如果不同关键字算到同一格就发生冲突，需要用线性探测或链地址法继续存放。",
    insertion: "直接插入排序把左边维护成有序区。每轮取出右边第一个元素 temp，把有序区中比它大的元素依次右移，最后把 temp 插入空出来的位置。",
    shell: "希尔排序是改进版插入排序。它先用较大的 gap 让远距离元素提前移动，数组逐渐接近有序；当 gap 缩小到 1 时，再做一次普通插入排序完成收尾。",
    bubble: "冒泡排序每次只比较相邻两个元素，逆序就交换。经过一趟扫描，未排序区最大值会一路被交换到最右端，所以右侧会逐步形成有序区。",
    quick: "快速排序先选一个 pivot，把小的放左边、大的放右边，使 pivot 找到最终位置。然后左右两边再递归做同样的事，平均情况下速度很快。",
    selection: "直接选择排序每一趟都在未排序区寻找最小值。找到后把它交换到未排序区最前面，因此前面的有序区会一个位置一个位置地扩大。",
    heap: "堆排序把数组看成完全二叉树，并调整成大根堆。堆顶总是当前最大值，每轮把堆顶交换到末尾，再对剩余部分重新下滤成堆。",
    merge: "归并排序的合并阶段面对两个已经有序的子表。每次比较两个表头，把较小者放入结果表；一边用完后，把另一边剩余元素整体接上。",
    counting: "计数排序适合取值范围不大的整数。它不做两两比较，而是用 count[value] 统计每个值出现几次，再按值从小到大输出对应次数。",
    radix: "基数排序把多位数拆成个位、十位、百位等逐位处理。每一趟按当前位分桶并稳定收集，低位顺序才不会被高位处理破坏。",
    bucket: "桶排序先按数值范围把元素分到不同桶中，让每个桶只处理一小段数据。桶内排序后按桶顺序拼接，如果数据分布均匀，整体效率会很好。"
  };
  const byGroup = {
    "递归": "判断递归题：先找出口，再看规模是否变小，最后看返回值如何合并。",
    "实验四：二叉树与树": "判断树题：先明确当前结点，再看左子树和右子树分别如何递归处理。",
    "图": "判断图题：先确定存储结构，再看边、visited、栈/队列或集合如何变化。",
    "最短路径": "判断路径题：核心是距离数组或距离矩阵什么时候被更新。",
    "查找": "判断查找题：先看数据是否有序，再决定顺序查、二分、树查还是哈希。",
    "排序": "判断排序题：先看每一趟确定哪个位置或区间，再看比较/移动/交换规则。"
  };
  return byId[algo.id] || byGroup[algo.group] || `判断 ${algo.title}：抓住核心变量如何变化。`;
}

function getVisualGuide(algo, step) {
  const byId = {
    fact: "左侧展示的是递归调用栈。每点下一步，就相当于函数继续调用或开始返回；栈越长表示递归钻得越深，命中出口后才会一层层算回结果。",
    hanoi: "三根柱子表示 A、B、C，数字越大盘子越大。每一步只移动一个盘，目标是把所有盘从起点搬到目标柱，同时始终保持大盘不能压在小盘上。",
    traversal: "同一棵四层二叉树会被按先序、中序、后序访问。高亮结点是当前访问位置，下方输出会不断追加；区别只在 visit 当前根结点的时机。",
    heightCount: "这张图不是在改变树，而是在说明同一棵树可以计算不同指标：高度看最长路径，结点数看所有结点，叶子数只看没有孩子的结点。",
    buildTree: "这张图在模拟从文件逐行建树：下方每个小格是一行输入，1 表示还要递归创建对应子树；高亮边表示这一步把新结点挂到父结点下面。",
    treeArray: "树上的结点会被放进下方数组。根结点放在 1 号位，左孩子放 2*i，右孩子放 2*i+1；看图时重点观察树位置和数组下标如何对应。",
    relation: "这张图在围绕目标结点 B 查询亲属关系：父结点要从根往下找，兄弟来自同一个父结点的另一个孩子，孩子直接看 B 的左右指针。",
    lca: "LCA 的目标是找两个结点第一次汇合的祖先。看图时观察 H 和 K 分别从左右子树返回，某个结点左右两边都找到目标时，它就是最近共同祖先。",
    leafPath: "高亮路径表示递归当前走过的根到叶路径。到达叶子后，path 数组里保存的是从根到叶；题目要求叶子到根时，就反向输出这条路径。",
    childSibling: "这不是普通二叉树左右孩子图。firstChild 指针向下找到第一个孩子，nextSibling 指针向右串起兄弟；沿兄弟链数孩子个数，就能求树的度。",
    matrix: "矩阵第 i 行第 j 列表示顶点 i 和 j 是否有边。无向边要同时写两个对称位置；统计边数时只看右上三角，避免同一条边被重复数两次。",
    adjList: "每一行表示一个顶点的邻居名单。邻接表不画不存在的边，只把真正相连的顶点放进列表，所以它比矩阵更适合边比较少的图。",
    dfs: "DFS 像走迷宫：从当前点优先继续往深处走，走到不能走再回退。看图时重点盯住递归栈，它表示当前还没有完全返回的路径。",
    bfs: "BFS 像水波纹：先处理起点，再处理第一圈邻居，再处理第二圈邻居。看图时重点盯住队列，先进队的顶点会先被处理。",
    prim: "Prim 从一个已选顶点集合开始，每一步只在“已选集合”和“未选顶点”之间挑最短边。高亮边表示被加入最小生成树的边。",
    kruskal: "Kruskal 不从某个点出发，而是把边按权值从小到大试选。每一步如果加入这条边不会形成环，就把它放进最小生成树。",
    topo: "拓扑排序只适用于有向无环图。每一步选择入度为 0 的点输出，并删除它的出边；如果最后还有点输出不了，就说明图里有环。",
    dijkstra: "Dijkstra 每一步固定一个当前距离最短的顶点，再用它尝试更新邻居距离。看下方 dist 数组：被固定的点不会再改变。",
    floyd: "Floyd 看的是距离矩阵。每一轮允许一个新顶点 k 当中转站，检查 i 到 j 经过 k 会不会更短；变短就更新矩阵里的距离。",
    sequential: "顺序查找没有技巧，就是从左到右逐个比较。高亮位置是当前正在比的元素，找到目标就返回下标，找完都没有就是失败。",
    binary: "二分查找必须在有序数组上进行。每次比较 mid 后会排除一半区间；变灰的格子表示已经不可能包含目标。",
    block: "分块查找先看索引表确定目标可能在哪一块，再在块内顺序查找。它介于顺序查找和二分查找之间，适合块间有序、块内无序的数据。",
    bst: "BST 遵守小走左、大走右。查找和插入时每一步只会选择一个方向，另一整棵子树会被排除；新插入的结点最终一定挂在叶子位置。",
    avl: "AVL 先按 BST 规则插入，再检查高度和平衡因子。若某个结点左右高度差超过 1，就通过旋转把树重新调整平衡。",
    hash: "哈希表先用哈希函数算位置。若目标格已经被占，就按冲突处理规则继续找位置；本演示用线性探测展示冲突如何被解决。",
    insertion: "插入排序把左边看成有序区。每轮取一个新元素 temp，把有序区里比 temp 大的元素右移，最后把 temp 插到空位。",
    shell: "希尔排序是分组插入排序。gap 大时元素可以跨很远移动，gap 逐渐缩小到 1 后，最后一次就是普通插入排序。",
    bubble: "冒泡排序每次比较相邻元素，逆序就交换。一趟结束后，当前未排序区最大的元素会被推到最右边。",
    quick: "快速排序一趟划分会选一个 pivot。左右指针交替寻找不合适的元素并移动，最终 pivot 归位，左边都不大于它，右边都不小于它。",
    selection: "选择排序每一趟在未排序区找最小值，把它交换到未排序区最前面。看图时重点关注 min 指针如何更新。",
    heap: "堆排序先把数组看成完全二叉树并调整成大根堆。堆顶是最大值，每轮把堆顶换到右侧已排序区，再对剩余堆下滤调整。",
    merge: "归并排序的合并过程会同时看两个有序子表的表头。谁更小就先放进结果表，直到一边为空，再接上另一边剩余元素。",
    counting: "计数排序不比较大小，而是统计每个值出现了几次。count 数组记录频率，再按值从小到大输出对应次数。",
    radix: "基数排序按位分桶：先按个位，再按十位。每一轮都要稳定收集，才能保证低位已经排好的相对顺序不被破坏。",
    bucket: "桶排序先按数值范围把元素分到不同桶里，再对桶内排序，最后按桶顺序拼接。数据分布越均匀，效果越好。"
  };
  const byGroup = {
    "递归": "这张图展示递归拆解和回收结果的过程。看图时先找递归出口，再看当前问题怎样变成更小的问题。",
    "实验四：二叉树与树": "这张图围绕二叉树指针、递归和路径变化展开。高亮表示当前处理的结点，已变绿表示已经处理过。",
    "图": "这张图展示图的存储或遍历。重点看顶点、边、visited 标记，以及当前数据结构是矩阵、邻接表、栈还是队列。",
    "最短路径": "这张图展示距离如何被一步步更新。重点看当前固定的点、中转点或 dist 数组的变化。",
    "查找": "这张图展示查找范围如何缩小。高亮表示当前比较位置，灰色或排除区表示已经不可能成为答案。",
    "排序": "这张图展示数组如何逐步变有序。高亮表示正在比较或移动的元素，绿色表示已经确定位置或已经有序。"
  };
  return byId[algo.id] || byGroup[algo.group] || `本图演示 ${algo.title} 的执行过程。高亮部分表示当前步骤正在处理的位置，右侧步骤会解释为什么这样做。`;
}

function renderStepHistory() {
  const history = $("stepHistory");
  if (!history) return;
  history.innerHTML = steps.slice(0, stepIndex + 1).map((s, i) => `
    <div class="historyItem ${i === stepIndex ? "current" : ""}">
      <span class="historyIndex">${i + 1}.</span>${escapeHtml(s.text || "")}
    </div>
  `).join("");
  history.scrollTop = history.scrollHeight;
}

function parseNums(text) {
  const nums = String(text || "")
    .split(/[\s,，]+/)
    .map(s => Number(s.trim()))
    .filter(n => Number.isFinite(n));
  return nums.length ? nums : [12, 5, 4, 9, 5];
}

function rebuildFromParams() {
  steps = current.build();
  stepIndex = 0;
  stop();
  renderAll();
  scrollWorkspaceTop();
}

function scrollWorkspaceTop() {
  const workspace = document.querySelector(".workspace");
  if (workspace) workspace.scrollTop = 0;
}

function renderParams() {
  const panel = $("paramPanel");
  if (!current.params) {
    panel.innerHTML = "";
    return;
  }
  if (current.params === "array") {
    panel.innerHTML = `
      <label class="paramGroup">数组
        <input id="arrayParam" value="${escapeHtml(simState.arrayText)}" />
      </label>
      <button id="arrayApply">用这个数组重建动画</button>
      <span class="paramNote">用逗号或空格分隔，例如 12,5,4,9,5</span>`;
    $("arrayApply").onclick = () => {
      simState.arrayText = $("arrayParam").value;
      rebuildFromParams();
    };
    return;
  }
  if (current.params === "bst") {
    panel.innerHTML = `
      <label class="paramGroup">初始序列
        <input id="bstValues" value="${simState.bstValues.join(",")}" />
      </label>
      <button id="bstRebuild">重建 BST</button>
      <label class="paramGroup">插入
        <input id="bstInsert" type="number" value="${simState.bstInsert}" />
      </label>
      <button id="bstDoInsert">演示插入</button>
      <label class="paramGroup">查找
        <input id="bstTarget" type="number" value="${simState.bstTarget}" />
      </label>
      <button id="bstDoSearch">演示查找</button>
      <span class="paramNote">规则：小走左，大走右；重复值默认不插入。</span>`;
    $("bstRebuild").onclick = () => {
      simState.bstValues = parseNums($("bstValues").value);
      simState.bstOp = "overview";
      rebuildFromParams();
    };
    $("bstDoInsert").onclick = () => {
      simState.bstValues = parseNums($("bstValues").value);
      simState.bstInsert = Number($("bstInsert").value);
      simState.bstOp = "insert";
      rebuildFromParams();
    };
    $("bstDoSearch").onclick = () => {
      simState.bstValues = parseNums($("bstValues").value);
      simState.bstTarget = Number($("bstTarget").value);
      simState.bstOp = "search";
      rebuildFromParams();
    };
    return;
  }
  if (current.params === "avl") {
    panel.innerHTML = `
      <label class="paramGroup">初始序列
        <input id="avlValues" value="${simState.avlValues.join(",")}" />
      </label>
      <button id="avlRebuild">重建 AVL</button>
      <label class="paramGroup">插入
        <input id="avlInsert" type="number" value="${simState.avlInsert}" />
      </label>
      <button id="avlDoInsert">演示插入与旋转</button>
      <label class="paramGroup">查找
        <input id="avlTarget" type="number" value="${simState.avlTarget}" />
      </label>
      <button id="avlDoSearch">演示查找</button>
      <span class="paramNote">AVL 会在插入后检查平衡因子，必要时旋转。</span>`;
    $("avlRebuild").onclick = () => {
      simState.avlValues = parseNums($("avlValues").value);
      simState.avlOp = "overview";
      rebuildFromParams();
    };
    $("avlDoInsert").onclick = () => {
      simState.avlValues = parseNums($("avlValues").value);
      simState.avlInsert = Number($("avlInsert").value);
      simState.avlOp = "insert";
      rebuildFromParams();
    };
    $("avlDoSearch").onclick = () => {
      simState.avlValues = parseNums($("avlValues").value);
      simState.avlTarget = Number($("avlTarget").value);
      simState.avlOp = "search";
      rebuildFromParams();
    };
  }
}

function renderCode(src, hotLines) {
  const hot = new Set(hotLines);
  $("codeBox").innerHTML = src.split("\n").map((line, i) => {
    const note = explainCodeLine(line, current);
    const cls = `${hot.has(i + 1) ? "codeLine hot" : "codeLine"}${note ? "" : " simple"}`;
    if (!note) {
      return `<div class="${cls}"><div class="codeText">${escapeHtml(line || " ")}</div></div>`;
    }
    return `<div class="${cls}">
      <div class="codeText">${escapeHtml(line || " ")}</div>
      <div class="codeExplain"><b>语法：</b>${escapeHtml(note.syntax)}<br><b class="role">作用：</b>${escapeHtml(note.role)}</div>
    </div>`;
  }).join("");
}

function explainCodeLine(line, algo) {
  const raw = line;
  const s = line.trim();
  const lower = s.toLowerCase();
  const family = algo?.group || "";
  const title = algo?.title || "当前算法";
  if (isLowInfoCodeLine(s)) return null;
  if (lower.startsWith("//")) return { syntax: "`//` 是单行注释，编译器不会执行它。", role: "这行是给人看的说明，用来解释指针、变量或算法约定。" };
  if (/^struct\b/.test(s)) return { syntax: "`struct` 定义结构体，相当于自定义一种数据类型。", role: "把一个结点需要保存的数据和指针打包在一起，后面才能用它表示树、链表或图的结点。" };
  if (/^(void|int|bool|node\*|binode\*|csnode\*|elem)/i.test(s) && s.includes("(")) {
    const name = (s.match(/([A-Za-z_]\w*)\s*\(/) || [,"函数"])[1];
    return { syntax: "这是函数定义：最前面是返回类型，中间是函数名，括号里是参数。`*` 表示指针，`&` 表示引用传参。", role: `${name} 是 ${title} 的核心过程；调用它时，程序会带着参数进入这段算法逻辑。` };
  }
  if (/^(int|bool|elem|node\*|binode\*|csnode\*|queue<|vector<)/i.test(s)) {
    if (s.includes("=")) return { syntax: "这是变量定义并初始化：左边声明变量类型和名字，右边给它一个初始值。", role: "先准备算法要用的临时变量，例如下标、指针、队列、当前结点或基准值。" };
    return { syntax: "这是变量或对象声明：告诉程序接下来要使用什么类型的数据。", role: "为后续计算准备名字和存储空间；没有这一步，后面就不能使用这些变量。" };
  }
  if (lower.startsWith("if ")) {
    const cond = (s.match(/\((.*)\)/) || [,"条件"])[1];
    return { syntax: "`if` 是条件判断；括号里的表达式为真，就执行后面的语句或花括号代码块。", role: `根据 ${cond} 判断算法下一步该不该进入这个分支，这是控制流程方向的关键。` };
  }
  if (lower.startsWith("else if")) return { syntax: "`else if` 表示前面的 if 不成立时，再检查一个新条件。", role: "让程序在多个可能情况中选择正确路径，例如小于走左、大于走右、相等就找到。" };
  if (lower.startsWith("else")) return { syntax: "`else` 表示前面的 if / else if 都不成立时执行。", role: "处理剩下的情况，保证算法不会漏掉某一类输入。" };
  if (lower.startsWith("for ")) return { syntax: "`for(初始化; 条件; 更新)` 是计数循环，常用来按下标扫描数组、矩阵或邻居表。", role: family === "图" ? "逐个检查顶点或边，判断是否相邻、是否访问过、是否需要更新。" : "按顺序遍历一段数据，每一轮处理一个位置或一组元素。" };
  if (lower.startsWith("while ")) return { syntax: "`while` 是条件循环，只要括号里的条件为真就继续执行。", role: "表示算法要反复推进，直到查找范围为空、队列为空、冲突解决或左右指针相遇。" };
  if (s.includes("return")) {
    if (s === "return;" || s.includes("return NULL") || s.includes("return -1")) return { syntax: "`return` 结束当前函数；后面带的值会作为函数结果交回调用者。", role: "这里通常表示递归出口、查找失败、空结点或算法已经没有继续处理的对象。" };
    return { syntax: "`return 表达式` 会结束函数，并把表达式的结果返回给上一层调用。", role: "把当前层已经算出的答案交回去，例如返回找到的结点、更新后的树根或最终结果。" };
  }
  if (s.includes("new ")) return { syntax: "`new` 在内存中创建一个新对象，并返回它的地址；指针变量负责保存这个地址。", role: "算法需要新增结点时会用它，例如建树或插入 BST/AVL 的新结点。" };
  if (s.includes("->")) return { syntax: "`->` 是指针访问成员的写法，例如 `T->data` 表示访问 T 指向结点里的 data。", role: "通过指针读写结点内容或连接左右孩子，是链式树结构能连起来的关键。" };
  if (s.includes(".push") || s.includes("push(")) return { syntax: "`push` 表示把元素放入栈或队列等容器中。", role: "把后面要处理的对象加入等待区，例如 BFS 把新发现的邻居入队。" };
  if (s.includes(".pop") || s.includes("pop(")) return { syntax: "`pop` 表示从栈或队列中移除一个元素。", role: "当前元素已经被取出处理，容器会转向下一个等待处理的对象。" };
  if (s.includes(".front")) return { syntax: "`front()` 读取队头元素，但不删除它。", role: "BFS 先看队头是谁，再把它出队并访问它的邻居。" };
  if (s.includes("swap(")) return { syntax: "`swap(a,b)` 交换两个变量或数组元素的值。", role: "排序中用它把元素放到更合适的位置，例如冒泡、选择或堆排序。" };
  if (s.includes("++") || s.includes("--")) return { syntax: "`++` / `--` 出现在复杂表达式里时，表示一边使用变量一边改变它的值。", role: "这里通常是在循环或数组位置推进时顺手更新下标，需要结合整行判断它先用值还是先变化。" };
  if (s.includes("=")) {
    if (s.includes("==") || s.includes("<=") || s.includes(">=") || s.includes("!=")) return { syntax: "这一行包含比较运算，`==` 判断相等，`!=` 判断不等，`<=` / `>=` 判断范围关系。", role: "通过比较决定是否找到目标、是否继续循环、是否需要更新答案。" };
    if (s.includes("[") && s.includes("]")) return { syntax: "`数组[下标] = 值` 表示把某个位置改成新值；二维数组会写成 `a[i][j]`。", role: "把算法状态记录到数组或矩阵中，例如标记边、保存结点、更新距离或移动排序元素。" };
    return { syntax: "`=` 是赋值，不是判断相等；它把右边的结果存进左边变量。", role: "更新算法当前状态，例如改变指针、距离、下标、临时变量或树的连接关系。" };
  }
  if (s.includes("cout")) return { syntax: "`cout` 是 C++ 输出语句，`<<` 把内容送到屏幕。", role: "把当前访问到的结点、路径或结果打印出来，方便观察算法执行顺序。" };
  if (s.includes("break")) return { syntax: "`break` 会立刻跳出当前循环。", role: "当已经找到答案或无需继续扫描时，提前结束循环，减少无用操作。" };
  if (s.includes("continue")) return { syntax: "`continue` 会跳过本轮剩余语句，直接进入下一轮循环。", role: "当前元素不需要处理时，用它快速转到下一个元素。" };
  if (family === "排序") return { syntax: "这是排序过程中的普通语句，通常配合循环、比较、赋值或交换一起工作。", role: "它负责维护有序区、未排序区、基准值、堆结构或临时结果表。" };
  if (family === "图" || family === "最短路径") return { syntax: "这是图算法中的普通语句，通常围绕顶点、边、距离或访问标记展开。", role: "它会改变图算法的状态，例如选择边、标记顶点、更新距离或推进队列。" };
  return { syntax: "这是当前函数中的一条普通语句，需要结合上下文理解。", role: "它服务于当前算法流程，通常是在准备数据、推进状态或收尾结果。" };
}

function isLowInfoCodeLine(s) {
  if (!s) return true;
  if (/^[{};]+$/.test(s)) return true;
  if (/^}\s*(else\b.*)?$/.test(s)) return true;
  if (/^(void|int|bool|node\*|binode\*|csnode\*?|elem)\b.*\([^)]*\)\s*\{?$/i.test(s)) return true;
  if (/^(if|else\s+if|else|for|while)\b/.test(s)) return true;
  if (/^[A-Za-z_]\w*(\+\+|--);$/.test(s)) return true;
  if (/^(\+\+|--)[A-Za-z_]\w*;$/.test(s)) return true;
  if (/^[A-Za-z_]\w*(\[[^\]]+\])*(\s*->\s*[A-Za-z_]\w*)?\s*=\s*[^=].*;$/.test(s)) return true;
  if (/^[A-Za-z_]\w*(\[[^\]]+\])*(\s*->\s*[A-Za-z_]\w*)?\s*[\+\-\*\/%]?=\s*.*;$/.test(s)) return true;
  if (/^[A-Za-z_]\w*\*?\s+[A-Za-z_]\w*(\s*=\s*.*)?;$/.test(s)) return true;
  return false;
}

function renderKnowledge() {
  $("knowledgeTitle").textContent = `${current.title}：相关知识点讲解`;
  const data = getKnowledge(current);
  $("knowledgeBody").innerHTML = data.map(card => `
    <article class="knowledgeCard">
      <h4>${escapeHtml(card.title)}</h4>
      ${Array.isArray(card.body)
        ? `<ul>${card.body.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>`
        : `<p>${escapeHtml(card.body)}</p>`}
    </article>
  `).join("");
}

function getKnowledge(algo) {
  const common = {
    "递归": [
      { title:"1. 递归到底在干什么", body:"递归不是“神秘地自己调用自己”，而是把一个大问题拆成一个更小但同类型的问题。例如 Fact(4) 不急着算结果，而是先说：只要我知道 Fact(3)，我就能用 4*Fact(3) 得到答案。这样不断向下拆，直到遇到最小问题 Fact(0)=1，再一层一层返回。" },
      { title:"2. 写递归代码的固定模板", body:["第一步写出口：什么情况下不用再递归，直接返回结果。","第二步写当前层要做什么：当前参数代表哪个问题。","第三步写递归调用：把问题规模变小，传给同一个函数。","第四步写回收结果：递归返回后，当前层如何利用子问题答案。"] },
      { title:"3. 调用栈怎么理解", body:"每调用一次函数，系统都会给这次调用单独开一份局部变量空间，压入调用栈。递归向下时是在不断入栈；遇到出口后开始出栈。出栈时不是重新执行所有逻辑，而是回到当初暂停的位置继续算后半句。" },
      { title:"4. 常见疑问", body:["为什么递归一定要有出口？没有出口就会无限入栈直到栈溢出。","为什么递归会回到上一层？因为函数调用结束后，控制权回到调用它的那一行。","递归和循环有什么关系？很多递归可以改写成循环加栈，但递归更适合天然分层的问题。"] }
    ],
    "实验四：二叉树与树": [
      { title:"1. 二叉链表是什么", body:"二叉树最常用的存储方式是二叉链表。每个结点包含三部分：data 保存数据，lchild 指向左孩子，rchild 指向右孩子。如果某个孩子不存在，对应指针就是 NULL。这样整棵树不是连续存在数组里，而是靠指针连接起来。" },
      { title:"2. 为什么二叉树天然适合递归", body:"每棵二叉树都可以看成：根结点 + 左子树 + 右子树。左子树和右子树本身又是二叉树，所以处理整棵树的方法可以原封不动用来处理子树。建树、遍历、求高度、求叶子数、找路径，本质都是先处理当前结点，再递归处理左右子树。" },
      { title:"3. 四层树要观察什么规律", body:["根结点 A 在第 1 层。","B、C 是第 2 层，它们分别是 A 的左右子树根。","D、E、F、G 是第 3 层，能清楚看到递归分叉。","H 到 O 是第 4 层叶子，最适合观察递归什么时候返回。","顺序存储中，根下标为 1，左孩子是 2*i，右孩子是 2*i+1。"] },
      { title:"4. 建树函数为什么 i 要用引用", body:"文件按先序排列：根、左子树、右子树。程序每读一行就创建一个结点，读完当前结点后要继续读下一行。如果 i 不是引用，那么递归函数内部改动的 i 不会影响外层，外层还会停在旧位置，右子树就会读错。引用的作用是让所有递归层共享同一个“当前读到第几行”的指针。" },
      { title:"5. 学习时怎么抓重点", body:["先看文件格式：每行是 当前结点 + 是否有左子树 + 是否有右子树。","再看创建顺序：先创建根，如果左标志为 1 就递归创建左子树，如果右标志为 1 就递归创建右子树。","最后注意 k=i：保存当前行，防止递归创建左子树时把 i 改掉，导致右标志判断错位。"] }
    ],
    "图": [
      { title:"1. 图和树的区别", body:"树是一种特殊的图：连通、无环、n 个顶点正好有 n-1 条边。普通图更自由，顶点之间可以有环，也可以不连通。正因为图可能有环，遍历图时必须有 visited 数组，否则程序可能在环里反复转。" },
      { title:"2. 邻接矩阵", body:"邻接矩阵是一个二维数组 edge[i][j]。如果 i 和 j 有边，就记为 1 或边权；没有边就记为 0 或无穷。无向图的矩阵关于主对角线对称，因为 i-j 和 j-i 是同一条边。矩阵优点是判断两点是否相邻很快，缺点是顶点多但边少时浪费空间。" },
      { title:"3. 邻接表", body:"邻接表给每个顶点维护一个邻居表，只存真正相连的顶点。比如顶点 0 只和 1、2 相连，那么 adj[0] 里只放 1 和 2。它适合稀疏图，空间复杂度是 O(V+E)，遍历一个顶点的所有邻居也更自然。" },
      { title:"4. DFS 与 BFS", body:["DFS：深度优先，一条路先走到底，走不动再回退，底层依靠递归栈或手写栈。","BFS：广度优先，先访问起点的一圈邻居，再访问下一圈，底层依靠队列。","无权图最短路径一般用 BFS，因为它按层推进，第一次到达某点就是最短步数。"] },
      { title:"5. 矩阵数边怎么理解", body:"无向图每条边会在矩阵中出现两次：edge[a][b] 和 edge[b][a]。如果把整个矩阵都数一遍，边数会翻倍。所以通常只数右上三角，也就是 j 从 i+1 开始。" }
    ],
    "最短路径": [
      { title:"松弛", body:"松弛就是问：从起点到 v 的距离，能不能通过 u 中转变得更短。如果更短，就更新 dist[v]。" },
      { title:"Dijkstra", body:"每轮选当前未确定顶点中 dist 最小的点，把它固定下来，再用它更新邻居。它不能处理负权边。" },
      { title:"Floyd", body:"Floyd 枚举中转点 k，尝试让任意 i 到 j 经过 k 变短，核心公式是 D[i][j]=min(D[i][j],D[i][k]+D[k][j])。" }
    ],
    "查找": [
      { title:"1. 查找算法先看前提", body:"顺序查找什么表都能用，但最坏要一个个比到最后。二分查找必须要求顺序表有序，否则 mid 左右的排除逻辑不成立。BST 要求每个结点满足左小右大。哈希查找依赖哈希函数把关键字映射到表中位置。" },
      { title:"2. 二分查找边界", body:"二分查找有三个核心变量：low、high、mid。每次比较 A[mid] 和目标 x，如果 A[mid] 小，说明左半边都不可能是答案，low=mid+1；如果 A[mid] 大，high=mid-1。注意一定要 +1 或 -1，否则可能死循环。" },
      { title:"3. BST", body:"BST 每比较一次，就决定往左子树还是右子树走，另一边整棵子树都被排除。插入时也是同样规则，最后一定挂到某个空指针位置，所以新结点总是叶子。BST 平均效率不错，但如果插入序列本来有序，树会退化成链表。" },
      { title:"4. AVL", body:"AVL 是带平衡条件的 BST。任意结点左右子树高度差不能超过 1。插入后先按 BST 规则放入新结点，再沿返回路径更新高度和平衡因子；如果发现失衡，就根据 LL、RR、LR、RL 四种情况旋转。" },
      { title:"5. 哈希", body:"哈希表追求平均 O(1)。核心问题不是比较大小，而是冲突：两个关键字可能算出同一个位置。线性探测会向后找空位，链地址法会在同一个桶里挂链表。" }
    ],
    "排序": [
      { title:"1. 排序算法的共同目标", body:"排序的本质是把无序序列变成按关键字递增或递减的序列。不同算法的差别在于每一趟“确定了什么”：冒泡每趟把最大值推到末尾，选择每趟选最小值放前面，插入每趟把一个新元素插入有序区，快速排序每趟让 pivot 归位。" },
      { title:"2. 稳定性", body:"如果两个相等元素在排序前 A 在 B 前面，排序后 A 仍在 B 前面，这个排序就是稳定的。插入排序、冒泡排序、归并排序通常稳定；选择排序、快速排序、堆排序通常不稳定。理解稳定性时，要关注相等元素在移动或交换后相对顺序有没有改变。" },
      { title:"3. 时间复杂度怎么记", body:["O(n²)：直接插入、冒泡、选择，适合小规模或基本有序数据。","O(n log n)：快速、归并、堆，是比较排序里常见的高效算法。","O(n+k) 或 O(d(n+r))：计数、桶、基数排序，不完全靠比较，但要求数据范围或位数条件合适。"] },
      { title:"4. 读排序代码的思路", body:["先看外层循环控制“趟数”。","再看内层循环做比较、移动或交换。","然后指出哪些区间已经有序，哪些区间还未处理。","最后理解最好、最坏、平均复杂度，以及是否稳定。"] }
    ]
  };
  const cards = common[algo.group] || common["排序"];
  const personal = {
    bst: { title:"本算法特别注意", body:"输入一个数查找时，每一步只会走左或右，不会两边都找；插入时一定插到叶子位置。" },
    avl: { title:"本算法特别注意", body:"AVL 先按 BST 插入，再从插入位置向上更新高度和平衡因子，失衡才旋转。" },
    matrix: { title:"本算法特别注意", body:"为了不让矩阵占满屏幕，这里用 10×10 展示。它已经足够说明对称、边数统计和树判定。" },
    dfs: { title:"本算法特别注意", body:"DFS 的输出顺序取决于邻居扫描顺序。扫描顺序不同，合法 DFS 序列也可能不同。" },
    bfs: { title:"本算法特别注意", body:"BFS 入队前就要标记 visited，防止同一个顶点被多个前驱重复拉进队列。" },
    childSibling: { title:"本算法特别注意", body:"孩子兄弟表示不是普通二叉树：左指针表示第一个孩子，右指针表示下一个兄弟。" }
  };
  return personal[algo.id] ? [personal[algo.id], ...cards] : cards;
}

function escapeHtml(s) {
  return s.replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
}

function next() {
  if (stepIndex < steps.length - 1) {
    stepIndex++;
    renderAll();
  } else {
    stop();
    updateStepButtons();
  }
}

function prev() {
  if (stepIndex > 0) {
    stepIndex--;
    renderAll();
  }
}

function reset() {
  stepIndex = 0;
  stop();
  renderAll();
  scrollWorkspaceTop();
}

function play() {
  if (timer) return stop();
  $("playBtn").textContent = "⏸ 暂停";
  timer = setInterval(next, Number($("speedInput").value));
}

function stop() {
  if (timer) clearInterval(timer);
  timer = null;
  $("playBtn").textContent = "▶ 播放";
}

function updateStepButtons() {
  const atEnd = stepIndex >= steps.length - 1;
  const atStart = stepIndex <= 0;
  const nextBtn = $("nextBtn");
  const prevBtn = $("prevBtn");
  nextBtn.classList.toggle("finalStep", atEnd);
  nextBtn.setAttribute("aria-disabled", atEnd ? "true" : "false");
  nextBtn.title = atEnd ? "已经是最后一步，没有下一步" : "前进一步";
  nextBtn.textContent = atEnd ? "已到最后一步" : "下一步 →";
  prevBtn.classList.toggle("mutedStep", atStart);
}

function initNav() {
  const list = $("algoList");
  const groups = {};
  algorithms.forEach(a => (groups[a.group] ||= []).push(a));
  list.innerHTML = Object.entries(groups).map(([g, arr]) => `
    <div class="groupTitle">${g}</div>
    ${arr.map(a => `<button class="algoBtn" data-id="${a.id}"><span class="pageTag">P${a.page}</span>${a.title}</button>`).join("")}
  `).join("");
  list.addEventListener("click", e => {
    const btn = e.target.closest(".algoBtn");
    if (btn) setAlgorithm(btn.dataset.id);
  });
  $("filterInput").addEventListener("input", e => {
    const q = e.target.value.trim().toLowerCase();
    document.querySelectorAll(".algoBtn").forEach(btn => {
      btn.style.display = btn.textContent.toLowerCase().includes(q) ? "" : "none";
    });
  });
}

function treeSvg(active = [], done = [], activeEdges = []) {
  const nodes = tree.nodes;
  const edges = Object.entries(nodes).flatMap(([k, n]) => [n.l && [k, n.l], n.r && [k, n.r]].filter(Boolean));
  return `<div class="svgWrap"><svg viewBox="0 -20 800 410" width="800">
    ${edges.map(([a,b]) => `<line class="edge ${activeEdges.some(e => e[0]===a && e[1]===b) ? "active" : ""}" x1="${nodes[a].x}" y1="${nodes[a].y}" x2="${nodes[b].x}" y2="${nodes[b].y}"/>`).join("")}
    ${Object.entries(nodes).map(([k,n]) => `<g class="treeNode ${active.includes(k) ? "active" : done.includes(k) ? "done" : ""}">
      <circle cx="${n.x}" cy="${n.y}" r="23"></circle><text x="${n.x}" y="${n.y}">${k}</text>
    </g>`).join("")}
  </svg></div>`;
}

function graphSvg(active = [], done = [], activeEdges = []) {
  return `<div class="svgWrap"><svg viewBox="0 -20 800 410" width="800">
    ${graph.edges.map(([a,b]) => `<line class="edge ${activeEdges.some(e => (e[0]===a && e[1]===b) || (e[0]===b && e[1]===a)) ? "active" : ""}" x1="${graph.pos[a].x}" y1="${graph.pos[a].y}" x2="${graph.pos[b].x}" y2="${graph.pos[b].y}"/>`).join("")}
    ${Object.entries(graph.pos).map(([k,p]) => `<g class="node ${active.includes(Number(k)) ? "active" : done.includes(Number(k)) ? "done" : ""}">
      <circle cx="${p.x}" cy="${p.y}" r="23"></circle><text x="${p.x}" y="${p.y}">${k}</text>
    </g>`).join("")}
  </svg></div>`;
}

function renderTreeBuild(el, step) {
  el.innerHTML = treeSvg(step.active || [], step.done || [], step.edge ? [step.edge] : []) +
    renderFileRows(step.row ?? -1) +
    `<div class="formula">文件按先序排列：根 → 左子树 → 右子树。标志 1 表示继续递归创建。</div>`;
}

function renderFileRows(activeRow) {
  const rows = ["A 1 1", "B 1 1", "D 1 1", "H 0 0", "I 0 0", "E 1 1", "J 0 0", "K 0 0", "C 1 1", "F 1 1", "L 0 0", "M 0 0", "G 1 1", "N 0 0", "O 0 0"];
  return `<div class="row">${rows.map((r,i) => `<div><div class="cell small ${i===activeRow ? "active" : i<activeRow ? "done" : ""}">${r}</div><div class="index">行 ${i}</div></div>`).join("")}</div>`;
}

function buildTreeSteps() {
  const seq = [
    ["A", 0, null, "读到 A 1 1，创建根结点 A。", [3,4]],
    ["B", 1, ["A","B"], "A 有左子树，i++，递归创建 A 的左孩子 B。", [8,9]],
    ["D", 2, ["B","D"], "B 有左子树，创建 D；D 也有左右孩子，所以继续深入第四层。", [8,9,12]],
    ["H", 3, ["D","H"], "D 的左孩子是 H；H 的左右标志都是 0，所以 H 是叶子。", [8,9,12]],
    ["I", 4, ["D","I"], "回到 D，继续创建右孩子 I。D 的左右子树都完成。", [12,13]],
    ["E", 5, ["B","E"], "回到 B，创建右孩子 E。", [12,13]],
    ["J", 6, ["E","J"], "E 的左孩子是 J，J 是第四层叶子。", [8,9]],
    ["K", 7, ["E","K"], "E 的右孩子是 K。到这里 B 的整棵子树完成。", [12,13]],
    ["C", 8, ["A","C"], "回到 A，创建右孩子 C。注意保存 k=i，才能正确判断 A 的右子树。", [12,13]],
    ["F", 9, ["C","F"], "C 有左子树，创建 F。", [8,9]],
    ["L", 10, ["F","L"], "F 的左孩子是 L。", [8,9]],
    ["M", 11, ["F","M"], "F 的右孩子是 M。", [12,13]],
    ["G", 12, ["C","G"], "回到 C，创建右孩子 G。", [12,13]],
    ["N", 13, ["G","N"], "G 的左孩子是 N。", [8,9]],
    ["O", 14, ["G","O"], "G 的右孩子是 O，四层二叉树创建完成。", [12,13]]
  ];
  const done = [];
  return seq.map(([node,row,edge,text,lines]) => {
    done.push(node);
    return { text, active: [node], done: done.slice(), edge, row, lines, state: { i: row, "当前结点": node }, defense: "学习重点：文件是先序，i 用引用推进，k 保存当前行以免右子树判断错位。" };
  });
}

function buildFactSteps() {
  const steps = [];
  const stack = [];
  for (let n = 5; n >= 1; n--) {
    stack.push(`Fact(${n}) 等 Fact(${n - 1})`);
    steps.push({
      text:`调用 Fact(${n})：还没到出口，先把当前层压入调用栈，等待 ${n} * Fact(${n - 1}) 的结果。`,
      stack: stack.slice(),
      state:{n, 动作:"入栈", 暂停原因:`必须先算 Fact(${n - 1})`},
      lines:[1,3],
      defense:"递归不是马上得到答案，而是把当前层挂起，继续去算更小的问题。"
    });
  }
  stack.push("Fact(0) = 1");
  steps.push({ text:"调用 Fact(0)：命中出口，直接返回 1。没有这个出口，递归会一直调用下去。", stack:stack.slice(), state:{n:0, 返回:1, 动作:"命中出口"}, lines:[2] });
  let result = 1;
  for (let n = 1; n <= 5; n++) {
    result *= n;
    const visible = [];
    for (let k = 5; k > n; k--) visible.push(`Fact(${k}) 等 Fact(${k - 1})`);
    visible.push(`Fact(${n}) = ${result}`);
    steps.push({
      text:`从 Fact(${n - 1}) 返回后，回到 Fact(${n})：计算 ${n} * Fact(${n - 1}) = ${result}，然后把结果交回上一层。`,
      stack:visible,
      state:{当前层:`Fact(${n})`, 子问题结果:`Fact(${n - 1})`, 返回值:result},
      lines:[3],
      defense:"看递归返回时，要盯住“上一层暂停在哪一行”，返回值会回到那一行继续参与计算。"
    });
  }
  return steps;
}

function renderCallStack(el, step) {
  el.innerHTML = `<div><div class="label">调用栈：底部是先调用的函数</div><div class="stackQueue">${(step.stack || []).map(x => `<div class="token">${x}</div>`).join("")}</div></div>`;
}

function buildHanoiSteps() {
  const pegs = { A:[4,3,2,1], B:[], C:[] };
  const moves = [];
  function plan(n, from, to, aux) {
    if (n === 1) {
      moves.push({ disk:1, from, to, reason:`只剩 1 号盘，直接从 ${from} 移到 ${to}。` });
      return;
    }
    moves.push({ plan:true, n, from, to, aux, reason:`要移动 ${n} 个盘：先把上面 ${n - 1} 个从 ${from} 移到 ${aux}，给最大盘让路。` });
    plan(n - 1, from, aux, to);
    moves.push({ disk:n, from, to, reason:`上面 ${n - 1} 个盘已经让开，移动当前最大盘 ${n}：${from} -> ${to}。` });
    plan(n - 1, aux, to, from);
  }
  plan(4, "A", "B", "C");
  const steps = [{ text:"目标：把 4 个盘从 A 移到 B，C 作为辅助柱。4 个盘会产生 2^4-1=15 次真正移动。", pegs:clonePegs(pegs), state:{任务:"Hanoi(4,A,B,C)", 移动次数:"15"}, lines:[1], move:"分解任务" }];
  let moveNo = 0;
  moves.forEach(m => {
    if (m.plan) {
      steps.push({ text:m.reason, pegs:clonePegs(pegs), state:{子问题:`Hanoi(${m.n}, ${m.from}, ${m.to}, ${m.aux})`, 策略:"先挪 n-1，再挪最大盘，再挪 n-1"}, lines:[1], move:"分解子问题" });
      return;
    }
    moveNo++;
    const disk = pegs[m.from].pop();
    pegs[m.to].push(disk);
    steps.push({
      text:`第 ${moveNo} 次移动：${m.reason}`,
      pegs:clonePegs(pegs),
      move:`${m.from}->${m.to}`,
      state:{移动序号:`${moveNo}/15`, 盘号:disk, 规则:"小盘必须在大盘上面"},
      defense:"每一步只能移动最上面的一个盘，并且不能把大盘放到小盘上。"
    });
  });
  steps[steps.length - 1].defense = "汉诺塔的核心递推：Hanoi(n)=Hanoi(n-1)+移动最大盘+Hanoi(n-1)，所以移动次数是 2^n-1。";
  return steps;
}

function clonePegs(pegs) {
  return { A:pegs.A.slice(), B:pegs.B.slice(), C:pegs.C.slice() };
}

function renderHanoi(el, step) {
  const peg = (name, disks) => `<div><div class="label">${name}</div><div class="stackQueue" style="height:165px;align-items:flex-end;flex-direction:column-reverse">${disks.map(d => `<div class="token" style="width:${50+d*24}px;text-align:center">${d}</div>`).join("")}</div></div>`;
  el.innerHTML = `<div class="row" style="gap:40px">${peg("A", step.pegs.A)}${peg("B", step.pegs.B)}${peg("C", step.pegs.C)}</div><div class="formula">本步移动：${step.move || "分解任务"}</div>`;
}

function buildTraversalSteps() {
  const seqs = [
    ["先序", ["A","B","D","H","I","E","J","K","C","F","L","M","G","N","O"], "根-左-右：visit 放在两个递归前。"],
    ["中序", ["H","D","I","B","J","E","K","A","L","F","M","C","N","G","O"], "左-根-右：visit 放在两个递归中间。"],
    ["后序", ["H","I","D","J","K","E","B","L","M","F","N","O","G","C","A"], "左-右-根：visit 放在两个递归后。"]
  ];
  return seqs.flatMap(([name, seq, desc]) => seq.map((node, i) => ({ text:`${name}遍历：访问 ${node}。${desc}`, active:[node], done:seq.slice(0,i), state:{遍历类型:name, 输出:seq.slice(0,i+1).join(" ")}, defense:"判断遍历类型只看 visit(T) 在递归调用前、中、后。"})));
}

function renderTraversal(el, step) {
  el.innerHTML = treeSvg(step.active || [], step.done || []) + `<div class="formula">输出：${step.state?.输出 || ""}</div>`;
}

function buildTreeMetricSteps() {
  return [
    { text:"求高度先一路递归到第四层：H、I 没有孩子，所以它们的左子树高度和右子树高度都是 0。", active:["H","I"], done:[], state:{函数:"Height", 当前:"H/I", 左右高度:"0 和 0", 返回:"1"}, lines:[1] },
    { text:"回到 D：左孩子 H 返回 1，右孩子 I 返回 1，所以 D 的高度=max(1,1)+1=2。", active:["D","H","I"], done:["H","I"], state:{当前:"D", 合并:"max(1,1)+1", 返回:2}, lines:[1] },
    { text:"同理，E 的左右孩子 J、K 都是叶子，所以 E 的高度也是 2。B 收到 D=2、E=2，返回 max(2,2)+1=3。", active:["B","D","E"], done:["H","I","J","K"], state:{当前:"B", 左子树高度:2, 右子树高度:2, 返回:3}, lines:[1] },
    { text:"右子树 C 的计算完全对称：F、G 高度为 2，C 返回 3；最后 A 收到左右高度都是 3，整棵树高度为 4。", active:["A","B","C"], done:["B","C"], state:{当前:"A", 左右高度:"3 和 3", 整树高度:4}, lines:[1] },
    { text:"求结点数时，每个结点都返回：左子树结点数 + 右子树结点数 + 自己 1 个。D 子树有 H、I 和 D，共 3 个。", active:["D","H","I"], done:["H","I"], state:{函数:"Count", 当前:"D", 合并:"1+1+1", 返回:3}, lines:[2] },
    { text:"B 子树由 D 子树 3 个、E 子树 3 个、B 自己 1 个组成，所以 B 子树结点数是 7。", active:["B","D","E"], done:["D","E"], state:{当前:"B", 合并:"3+3+1", 返回:7}, lines:[2] },
    { text:"A 收到左子树 7 个、右子树 7 个，再加 A 自己，整棵树结点数是 15。", active:["A","B","C"], done:["B","C"], state:{当前:"A", 合并:"7+7+1", 结点总数:15}, lines:[2] },
    { text:"求叶子数时，只有左右孩子都为空的结点才返回 1。第四层 H 到 O 全是叶子，其它内部结点不直接计 1。", active:["H","I","J","K","L","M","N","O"], state:{函数:"LeafCount", 叶子:"H,I,J,K,L,M,N,O", 叶子数:8}, lines:[3] },
    { text:"最后向上合并叶子数：D 有 2 个叶子，B 有 4 个叶子，A 左右各 4 个，所以整棵树叶子数是 8。", active:["A","B","C"], done:["H","I","J","K","L","M","N","O"], state:{合并:"4+4", 整树叶子数:8}, lines:[3], defense:"高度用 max 合并；结点数和叶子数用加法合并。不要把这三类返回值混在一起。" }
  ];
}

function buildArraySteps() {
  const mapping = [["A",1],["B",2],["D",4],["H",8],["I",9],["E",5],["J",10],["K",11],["C",3],["F",6],["L",12],["M",13],["G",7],["N",14],["O",15]];
  const arr = Array(16).fill("#");
  return mapping.map(([n, idx]) => {
    arr[idx] = n;
    return { text: `访问结点 ${n}，按完全二叉树编号放入 s[${idx}]。`, active:[n], done: mapping.filter(m => arr[m[1]] !== "#").map(m => m[0]), arr: arr.slice(), state:{ "当前结点": n, "数组下标": idx, "编号规则":"左=2*i，右=2*i+1" }, lines:[3,4,5,6], defense:"理解提醒：从 1 开始编号时，根为 1，父子编号公式最简单。" };
  });
}

function renderArrayTree(el, step) {
  el.innerHTML = treeSvg(step.active || [], step.done || []) + `<div class="row">${(step.arr || []).slice(1).map((v,i) => `<div><div class="cell ${v !== "#" ? "done" : ""}">${v}</div><div class="index">${i+1}</div></div>`).join("")}</div>`;
}

function buildRelationSteps() {
  return [
    { text:"目标是查询结点 B。先从根 A 开始搜索 B。", active:["A"], state:{目标:"B"}, lines:[1,2] },
    { text:"A 不是 B，进入左子树，找到 B。", active:["B"], done:["A"], state:{findNode:"返回 B 指针"}, lines:[4,5] },
    { text:"查父结点时，发现 A 的左孩子就是 B，所以父结点是 A。", active:["A","B"], edge:["A","B"], state:{父结点:"A"}, lines:[5] },
    { text:"B 的兄弟是 A 的另一个孩子 C；B 的孩子是 D、E。", active:["B","C","D","E"], done:["A"], state:{右兄弟:"C", 左孩子:"D", 右孩子:"E"}, lines:[6] }
  ].map(s => ({...s, defense:"学习重点：二叉树没有 parent 指针，所以父结点要从根开始找谁的孩子等于 x。"}));
}

function renderRelation(el, step) {
  el.innerHTML = treeSvg(step.active || [], step.done || [], step.edge ? [step.edge] : []) +
    `<div class="formula">查询 B：父=A，右兄弟=C，左孩子=D，右孩子=E。</div>`;
}

function buildLcaSteps() {
  return [
    { text:"求 H 和 K 的最近共同祖先。从 A 开始，递归看左右子树。", active:["A"], state:{目标:"H 和 K"}, lines:[1,2] },
    { text:"进入左子树 B。H 在 D 下面，K 在 E 下面，两个目标都属于 B 的范围。", active:["B"], done:["A"], lines:[4] },
    { text:"继续往下：左子树 D 找到 H，右子树 E 找到 K。", active:["D","E","H","K"], done:["A","B"], lines:[4,5] },
    { text:"回到 B 时，left 和 right 都非空，说明 H、K 分居 B 的左右两侧，所以最近共同祖先是 B。", active:["B"], done:["H","K"], state:{left:"H", right:"K", LCA:"B"}, lines:[6], defense:"如果一个目标是另一个目标的祖先，算法会直接返回那个祖先，也是正确的。" }
  ];
}

function renderLca(el, step) {
  el.innerHTML = treeSvg(step.active || [], step.done || []) + `<div class="formula">规律：左右子树各找到一个目标时，当前根就是最近共同祖先。</div>`;
}

function buildLeafPathSteps() {
  const leaves = [["H",["A","B","D","H"]],["I",["A","B","D","I"]],["J",["A","B","E","J"]],["K",["A","B","E","K"]],["L",["A","C","F","L"]],["M",["A","C","F","M"]],["N",["A","C","G","N"]],["O",["A","C","G","O"]]];
  return leaves.map(([leaf,path]) => ({ text:`递归走到叶子 ${leaf}，path 保存根到叶：${path.join(" → ")}；反向输出：${path.slice().reverse().join(" → ")}。`, active:path, done:[leaf], state:{path:path.join(", "), 输出:path.slice().reverse().join("->")}, lines:[3,4,5,7], defense:"path 是当前递归路径，len 是值传递，返回上一层后不会污染其他路径。" }));
}

function renderLeafPath(el, step) {
  el.innerHTML = treeSvg(step.active || [], step.done || []) + `<div class="row">${(step.active || []).map(x => `<div class="token">${x}</div>`).join("")}</div><div class="formula">到叶子后，把 path 反向输出。</div>`;
}

function buildChildSiblingSteps() {
  return [
    { text:"普通树 A 的孩子是 B、C、D。孩子兄弟表示中，A.firstChild 指向 B。", state:{firstChild:"A -> B"}, active:["A","B"] },
    { text:"B.nextSibling 指向 C，C.nextSibling 指向 D。兄弟们横向串成链。", state:{兄弟链:"B -> C -> D"}, active:["B","C","D"] },
    { text:"求 A 的度：从 firstChild 开始沿 nextSibling 数，B、C、D 共 3 个孩子。", state:{nodeDegree:"3"}, active:["A"] },
    { text:"广义表输出：根 A 后面有孩子，所以写 A(B,C,D)。", state:{广义表:"A(B,C,D)"}, active:["A","B","C","D"], defense:"学习重点：firstChild 向下，nextSibling 向右，它不是普通二叉树的左右孩子。" }
  ];
}

function renderChildSibling(el, step) {
  const active = new Set(step.active || []);
  const edgeCls = (a, b) => active.has(a) && active.has(b) ? "active" : "";
  const nodes = [["A",210,72],["B",210,232],["C",430,232],["D",650,232]];
  el.innerHTML = `<div class="csDiagram">
  <div class="svgWrap"><svg viewBox="0 0 860 420" width="860" aria-label="孩子兄弟表示示意图">
      <defs>
        <marker id="csArrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L0,6 L9,3 z" fill="#8a9ba3"></path>
        </marker>
        <marker id="csArrowActive" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L0,6 L9,3 z" fill="#b7791f"></path>
        </marker>
      </defs>
      <line class="edge ${edgeCls("A","B")}" marker-end="url(#${edgeCls("A","B") ? "csArrowActive" : "csArrow"})" x1="210" y1="108" x2="210" y2="192"/>
      <line class="edge ${edgeCls("B","C")}" marker-end="url(#${edgeCls("B","C") ? "csArrowActive" : "csArrow"})" x1="248" y1="232" x2="392" y2="232"/>
      <line class="edge ${edgeCls("C","D")}" marker-end="url(#${edgeCls("C","D") ? "csArrowActive" : "csArrow"})" x1="468" y1="232" x2="612" y2="232"/>
      <rect x="252" y="132" width="158" height="36" rx="4" fill="#fff" opacity=".96"/>
      <rect x="320" y="178" width="190" height="36" rx="4" fill="#fff" opacity=".96"/>
      <rect x="540" y="178" width="190" height="36" rx="4" fill="#fff" opacity=".96"/>
      <text x="331" y="154" class="csLabel">firstChild 向下</text>
      <text x="415" y="200" class="csLabel">nextSibling 向右</text>
      <text x="635" y="200" class="csLabel">nextSibling 向右</text>
      ${nodes.map(([n,x,y]) => `<g class="node ${active.has(n)?"active":""}"><circle cx="${x}" cy="${y}" r="36"/><text x="${x}" y="${y}">${n}</text></g>`).join("")}
      <text x="210" y="330" class="csHint">A 的孩子链：B → C → D</text>
      <text x="210" y="362" class="csHint">所以树的度 = max(结点孩子数) = 3</text>
    </svg></div>
  </div>`;
}

function buildMatrixSteps() {
  const matrixN = 10;
  const matrixEdges = graph.edges.filter(([a,b]) => a < matrixN && b < matrixN);
  const mat = Array.from({length:matrixN}, () => Array(matrixN).fill(0));
  const steps = [];
  matrixEdges.forEach(([a,b]) => {
    mat[a][b] = mat[b][a] = 1;
    steps.push({ text:`添加无向边 ${a}-${b}：edge[${a}][${b}] 和 edge[${b}][${a}] 都置为 1。`, mat: clone(mat), activeEdge:[a,b], state:{边:`${a}-${b}`, 原因:"无向图矩阵对称"}, lines:[1,2,3,4], defense:"无向边必须写两个位置；有向边只写 edge[a][b]。" });
  });
  steps.push({ text:`统计边数时只看右上三角 j=i+1，得到 ${matrixEdges.length} 条边。这里用 10×10 矩阵演示，已经足够看清对称和计数规律。`, mat: clone(mat), state:{边数:matrixEdges.length, 顶点数:matrixN, 树判定:"边数 n-1 且连通，所以是树"}, lines:[8,9,10], defense:"如果扫完整矩阵，无向边会被重复计算两次。" });
  return steps;
}

function buildAdjListSteps() {
  const adj = Array.from({length:graph.n}, () => []);
  return graph.edges.map(([a,b]) => {
    adj[a].push(b); adj[b].push(a);
    return { text:`添加无向边 ${a}-${b}：把 ${b} 放进 adj[${a}]，把 ${a} 放进 adj[${b}]。`, adj:adj.map(x=>x.slice()), state:{边:`${a}-${b}`, 空间:"只存真实邻居"}, defense:"邻接表适合稀疏图，空间 O(V+E)。" };
  });
}

function renderAdjList(el, step) {
  el.innerHTML = `<div>${(step.adj || []).map((list,i) => `<div class="row" style="justify-content:flex-start;margin:8px 0"><div class="cell active">顶点 ${i}</div>${list.map(v=>`<div class="token">${v}</div>`).join("") || "<span class='formula'>暂无邻居</span>"}</div>`).join("")}</div>`;
}

function buildWeightedGraphData() {
  return {
    pos:{0:{x:300,y:60},1:{x:140,y:160},2:{x:300,y:180},3:{x:460,y:160},4:{x:300,y:300}},
    edges:[[0,1,2],[0,2,4],[1,2,1],[1,4,7],[2,3,3],[2,4,5],[3,4,2]]
  };
}

function buildPrimSteps() {
  const chosen = [];
  return [
    { text:"从顶点 0 开始，已选集合 U={0}。", chosen:[], active:[0], state:{U:"{0}"} },
    { text:"连接 U 和外部的最小边是 0-1，权值 2，选入。", chosen:[[0,1]], active:[1], state:{U:"{0,1}", 边:"0-1"} },
    { text:"当前最小跨边是 1-2，权值 1，选入。", chosen:[[0,1],[1,2]], active:[2], state:{U:"{0,1,2}", 边:"1-2"} },
    { text:"当前最小跨边是 2-3，权值 3，选入。", chosen:[[0,1],[1,2],[2,3]], active:[3], state:{U:"{0,1,2,3}", 边:"2-3"} },
    { text:"当前最小跨边是 3-4，权值 2，选入。得到最小生成树。", chosen:[[0,1],[1,2],[2,3],[3,4]], active:[4], state:{总边数:"n-1=4"}, defense:"Prim 是从点集合向外扩张，每次选连接内外的最小边。" }
  ];
}

function buildKruskalSteps() {
  return [
    { text:"把所有边按权值排序：1-2(1),0-1(2),3-4(2),2-3(3)...", chosen:[], active:[], state:{排序:"按边权从小到大"} },
    { text:"选 1-2，当前不会成环。", chosen:[[1,2]], active:[1,2], state:{选边:"1-2"} },
    { text:"选 0-1，仍不会成环。", chosen:[[1,2],[0,1]], active:[0,1], state:{选边:"0-1"} },
    { text:"选 3-4，形成另一个连通块。", chosen:[[1,2],[0,1],[3,4]], active:[3,4], state:{选边:"3-4"} },
    { text:"选 2-3，把两个连通块连起来，得到 n-1 条边。", chosen:[[1,2],[0,1],[3,4],[2,3]], active:[2,3], state:{完成:"最小生成树"}, defense:"Kruskal 是边优先，需要并查集判断是否成环。" }
  ];
}

function renderWeightedGraph(el, step) {
  const g = buildWeightedGraphData();
  const chosen = step.chosen || [];
  const isChosen = (a,b) => chosen.some(e => (e[0]===a&&e[1]===b)||(e[0]===b&&e[1]===a));
  el.innerHTML = `<div class="svgWrap"><svg viewBox="0 0 600 360" width="620">
    ${g.edges.map(([a,b,w]) => {
      const pa=g.pos[a], pb=g.pos[b];
      return `<line class="edge ${isChosen(a,b)?"active":""}" x1="${pa.x}" y1="${pa.y}" x2="${pb.x}" y2="${pb.y}"/>${edgeWeightLabel(pa, pb, w, 18)}`;
    }).join("")}
    ${Object.entries(g.pos).map(([k,p]) => `<g class="node ${(step.active||[]).includes(Number(k))?"active":""}"><circle cx="${p.x}" cy="${p.y}" r="27"/><text x="${p.x}" y="${p.y}">${k}</text></g>`).join("")}
  </svg></div>`;
}

function edgeWeightLabel(pa, pb, text, offset = 16) {
  const mx = (pa.x + pb.x) / 2;
  const my = (pa.y + pb.y) / 2;
  const dx = pb.x - pa.x;
  const dy = pb.y - pa.y;
  const len = Math.hypot(dx, dy) || 1;
  let nx = -dy / len;
  let ny = dx / len;
  if (Math.abs(dy) < 8) ny = -1;
  if (Math.abs(dx) < 8) nx = 1;
  const x = Math.round(mx + nx * offset);
  const y = Math.round(my + ny * offset);
  return `<g class="edgeWeight"><rect class="edgeWeightBg" x="${x - 13}" y="${y - 11}" width="26" height="22" rx="4"/><text class="edgeWeightText" x="${x}" y="${y}">${text}</text></g>`;
}

function buildTopoSteps() {
  return [
    { text:"计算入度：0 的入度为 0，可以先输出。", out:[0], zero:[0], state:{入度0:"0"} },
    { text:"删除 0 的出边后，1 和 2 入度变成 0。", out:[0,1], zero:[1,2], state:{输出:"0 1"} },
    { text:"继续输出 2，删除它的出边。", out:[0,1,2], zero:[2], state:{输出:"0 1 2"} },
    { text:"3 的前驱都已输出，输出 3。", out:[0,1,2,3], zero:[3], state:{输出:"0 1 2 3"} },
    { text:"最后输出 4，拓扑排序完成。", out:[0,1,2,3,4], zero:[4], state:{拓扑序列:"0 1 2 3 4"}, defense:"如果最后输出顶点数少于总顶点数，说明图里有环。" }
  ];
}

function renderTopo(el, step) {
  const pos={0:[80,160],1:[210,95],2:[210,225],3:[360,160],4:[510,160]};
  const edges=[[0,1],[0,2],[1,3],[2,3],[3,4]];
  const out = new Set((step.out||[]).map(String));
  el.innerHTML = `<div class="svgWrap"><svg viewBox="0 0 600 320" width="620">
    <defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#8a9ba3"/></marker></defs>
    ${edges.map(([a,b])=>`<line class="edge" marker-end="url(#arrow)" x1="${pos[a][0]}" y1="${pos[a][1]}" x2="${pos[b][0]}" y2="${pos[b][1]}"/>`).join("")}
    ${Object.entries(pos).map(([n,[x,y]])=>`<g class="node ${out.has(n)?"done":""}"><circle cx="${x}" cy="${y}" r="27"/><text x="${x}" y="${y}">${n}</text></g>`).join("")}
  </svg></div><div class="formula">输出序列：${(step.out||[]).join(" ")}</div>`;
}

function buildFloydSteps() {
  return [
    { text:"初始 D 矩阵：只知道直接边，没有边为 ∞。", k:"-", mat:[[0,2,8],[2,0,3],[8,3,0]] },
    { text:"允许 0 做中转点，检查 D[i][j] 是否能通过 0 变短。", k:0, mat:[[0,2,8],[2,0,3],[8,3,0]] },
    { text:"允许 1 做中转点：0 到 2 可以从 8 改成 0->1->2 = 5。", k:1, mat:[[0,2,5],[2,0,3],[5,3,0]], state:{更新:"D[0][2]=5, D[2][0]=5"} },
    { text:"允许 2 做中转点，没有更短路径，结束。", k:2, mat:[[0,2,5],[2,0,3],[5,3,0]], defense:"Floyd 核心公式：D[i][j]=min(D[i][j], D[i][k]+D[k][j])。" }
  ];
}

function renderFloyd(el, step) {
  const mat = step.mat;
  el.innerHTML = `<div class="matrix" style="grid-template-columns: repeat(4, 54px)">
    <div></div><div class="matrixCell head">0</div><div class="matrixCell head">1</div><div class="matrixCell head">2</div>
    ${mat.map((r,i)=>`<div class="matrixCell head">${i}</div>${r.map(v=>`<div class="matrixCell ${step.k!== "-" ? "one" : ""}">${v}</div>`).join("")}`).join("")}
  </div><div class="formula">当前中转点 k=${step.k}</div>`;
}

function buildSequentialSteps() {
  const arr=[7,3,9,5], target=9;
  return arr.map((v,i)=>({text:`比较 A[${i}]=${v} 与目标 ${target}。${v===target?"找到，返回下标 "+i:"不相等，继续下一个。"}`, arr, low:0, high:arr.length-1, mid:i, target, state:{i, "A[i]":v}, lines:[2,3], defense:"顺序查找不要求有序，但最坏要比较 n 次。"}));
}

function buildBlockSteps() {
  return [
    { text:"分块有序：块间有序，块内无序。先看索引表。", blocks:[[3,8,5],[14,12,10],[21,18,19]], index:[8,14,21], activeBlock:null },
    { text:"目标 12 小于等于第二块最大值 14，所以定位到第二块。", blocks:[[3,8,5],[14,12,10],[21,18,19]], index:[8,14,21], activeBlock:1, state:{目标:12, 命中索引:"第2块"} },
    { text:"在第二块内部顺序查找，找到 12。", blocks:[[3,8,5],[14,12,10],[21,18,19]], index:[8,14,21], activeBlock:1, activeValue:12, defense:"分块查找性能介于顺序查找和二分查找之间。" }
  ];
}

function renderBlock(el, step) {
  el.innerHTML = `<div class="row">${step.blocks.map((b,i)=>`<div><div class="label">索引 max=${step.index[i]}</div><div class="row">${b.map(v=>`<div class="cell ${i===step.activeBlock?"active":""} ${v===step.activeValue?"done":""}">${v}</div>`).join("")}</div></div>`).join("")}</div>`;
}

function renderMatrix(el, step) {
  const mat = step.mat || [];
  el.innerHTML = `<div class="matrix" style="grid-template-columns: repeat(${mat.length + 1}, 34px)">
    <div></div>${mat.map((_,i)=>`<div class="matrixCell head">${i}</div>`).join("")}
    ${mat.map((row,i) => `<div class="matrixCell head">${i}</div>${row.map(v => `<div class="matrixCell ${v ? "one" : ""}">${v}</div>`).join("")}`).join("")}
  </div>`;
}

function buildDfsSteps() {
  const order = [0,1,3,7,8,4,9,10,2,5,11,12,6,13,14];
  const parent = {1:0,2:0,3:1,4:1,5:2,6:2,7:3,8:3,9:4,10:4,11:5,12:5,13:6,14:6};
  const pathTo = (v) => {
    const path = [];
    while (v !== undefined) { path.unshift(v); v = parent[v]; }
    return path;
  };
  return order.map((v,i) => {
    const stack = pathTo(v);
    return { mode:"dfs", text:`访问 ${v}，标记 visited[${v}]=1。DFS 会一直沿着当前分支向第四层深入，走到叶子后再回退。`, active:[v], done:order.slice(0,i), stack, output:order.slice(0,i+1), state:{递归栈:stack.join(" -> "), 输出:order.slice(0,i+1).join(" ")}, lines:[2,3,4,5,6], defense:"DFS 依靠递归栈；如果不写 visited，遇到环会无限递归。" };
  });
}

function buildBfsSteps() {
  const adj = Array.from({length: graph.n}, () => []);
  graph.edges.forEach(([a,b]) => { adj[a].push(b); adj[b].push(a); });
  const visited = Array(graph.n).fill(false);
  const queue = [0], output = [], steps = [];
  visited[0] = true;
  steps.push({ mode:"bfs", text:"起点 0 入队并标记。BFS 会一层一层推进。", active:[0], done:[], queue:queue.slice(), output:[], state:{队列:"[0]"}, lines:[3,4] });
  while (queue.length) {
    const v = queue.shift();
    output.push(v);
    const added = [];
    adj[v].forEach(n => {
      if (!visited[n]) {
        visited[n] = true;
        queue.push(n);
        added.push(n);
      }
    });
    steps.push({ mode:"bfs", text:`${v} 出队。${added.length ? `发现未访问邻居 ${added.join("、")}，依次入队。` : "没有新的未访问邻居。"}`, active:[v].concat(added), done:output.slice(), queue:queue.slice(), output:output.slice(), state:{队列:`[${queue.join(",")}]`, 输出:output.join(" ")}, lines:[6,7,10,11], defense:"BFS 按层扩展，因此适合无权图最短路径。" });
  }
  return steps;
}

function renderGraphTraversal(el, step) {
  const ds = step.mode === "dfs" ? step.stack : step.queue;
  el.innerHTML = graphSvg(step.active || [], step.done || []) +
    `<div><div class="label">${step.mode === "dfs" ? "递归栈" : "队列"}</div><div class="stackQueue">${(ds || []).map(x => `<div class="token">${x}</div>`).join("") || "<span class='formula'>空</span>"}</div></div>
     <div class="formula">输出序列：${(step.output || []).join(" ")}</div>`;
}

function buildBinarySteps() {
  const arr = [3,8,12,18,25,31,39,42,56];
  const x = 42;
  return [
    { text:"初始候选区间是整个数组 [0,8]。", arr, low:0, high:8, mid:null, target:x, state:{low:0, high:8, x}, lines:[2,3] },
    { text:"mid=(0+8)/2=4，A[4]=25，小于 42，所以左半边和 mid 都排除。", arr, low:0, high:8, mid:4, target:x, state:{mid:4, "A[mid]":25, 操作:"low=mid+1=5"}, lines:[4,6] },
    { text:"新区间 [5,8]。mid=6，A[6]=39，小于 42，继续排除左边。", arr, low:5, high:8, mid:6, target:x, state:{mid:6, "A[mid]":39, 操作:"low=7"}, lines:[4,6] },
    { text:"新区间 [7,8]。mid=7，A[7]=42，找到目标。", arr, low:7, high:8, mid:7, target:x, state:{mid:7, "A[mid]":42, 返回:7}, lines:[5], defense:"二分必须有序；边界更新要用 mid+1 或 mid-1。" }
  ];
}

function renderBinary(el, step) {
  el.innerHTML = `<div class="row">${step.arr.map((v,i) => `<div><div class="cell ${i===step.mid?"active": i>=step.low && i<=step.high ? "" : "bad"}">${v}</div><div class="index">${i}</div></div>`).join("")}</div><div class="formula">目标 x=${step.target}；候选区间 [${step.low}, ${step.high}]</div>`;
}

function makeNode(key) { return { key, left: null, right: null, height: 1 }; }

function cloneTree(node) {
  if (!node) return null;
  return { key: node.key, height: node.height, left: cloneTree(node.left), right: cloneTree(node.right) };
}

function bstInsert(root, key, trace = []) {
  if (!root) {
    trace.push({ type: "create", key });
    return makeNode(key);
  }
  let cur = root;
  while (cur) {
    trace.push({ type: "compare", at: cur.key, key });
    if (key === cur.key) {
      trace.push({ type: "duplicate", at: cur.key, key });
      return root;
    }
    if (key < cur.key) {
      if (!cur.left) {
        cur.left = makeNode(key);
        trace.push({ type: "attach", parent: cur.key, side: "左孩子", key });
        return root;
      }
      cur = cur.left;
    } else {
      if (!cur.right) {
        cur.right = makeNode(key);
        trace.push({ type: "attach", parent: cur.key, side: "右孩子", key });
        return root;
      }
      cur = cur.right;
    }
  }
  return root;
}

function buildBst(values) {
  let root = null;
  values.forEach(v => { root = bstInsert(root, v, []); });
  return root;
}

function bstSearchTrace(root, target) {
  const trace = [];
  let cur = root;
  while (cur) {
    trace.push({ at: cur.key, target });
    if (target === cur.key) {
      trace.push({ found: true, at: cur.key, target });
      return trace;
    }
    cur = target < cur.key ? cur.left : cur.right;
  }
  trace.push({ found: false, target });
  return trace;
}

function buildBstSteps() {
  const values = simState.bstValues.length ? simState.bstValues : [50,30,70];
  const op = simState.bstOp || "overview";
  const base = buildBst(values);
  if (op === "insert") {
    const trace = [];
    const root = cloneTree(base);
    const before = cloneTree(root);
    bstInsert(root, simState.bstInsert, trace);
    const steps = [{ text:`当前 BST 由初始序列 ${values.join(", ")} 建成。准备插入 ${simState.bstInsert}。`, tree:before, active:[], state:{初始序列:values.join(", "), 插入值:simState.bstInsert}, lines:[7] }];
    let tempRoot = cloneTree(base);
    trace.forEach(t => {
      if (t.type === "compare") {
        steps.push({ text:`比较 ${t.key} 和当前结点 ${t.at}：${t.key < t.at ? "更小，往左走" : t.key > t.at ? "更大，往右走" : "相等，不重复插入"}。`, tree:cloneTree(tempRoot), active:[t.at], state:{当前结点:t.at, 插入值:t.key}, lines:[8,9,13] });
      } else if (t.type === "attach") {
        bstInsert(tempRoot, t.key, []);
        steps.push({ text:`找到空位置，把 ${t.key} 挂到 ${t.parent} 的${t.side}。`, tree:cloneTree(tempRoot), active:[t.key, t.parent], state:{父结点:t.parent, 新结点:t.key, 方向:t.side}, lines:[10,14], defense:"插入 BST 时，新结点一定作为叶子挂入。" });
      } else if (t.type === "duplicate") {
        steps.push({ text:`${t.key} 已存在，当前版本默认不插入重复值。`, tree:cloneTree(tempRoot), active:[t.at], state:{重复值:t.key}, defense:"学习提示：重复关键字可以选择忽略、计数或放到固定一侧，本程序选择忽略。" });
      }
    });
    return steps;
  }
  if (op === "search") {
    const trace = bstSearchTrace(base, simState.bstTarget);
    return trace.map(t => {
      if (t.found) return { text:`目标 ${t.target} 等于当前结点 ${t.at}，查找成功。`, tree:base, active:[t.at], state:{目标:t.target, 结果:"找到"}, lines:[3], defense:"BST 查找每一步都排除一整棵子树。" };
      if (t.found === false) return { text:`走到空指针仍未找到 ${t.target}，查找失败。`, tree:base, active:[], state:{目标:t.target, 结果:"不存在"}, lines:[2] };
      return { text:`比较目标 ${t.target} 与当前结点 ${t.at}：${t.target < t.at ? "目标更小，走左子树" : "目标更大，走右子树"}。`, tree:base, active:[t.at], state:{当前结点:t.at, 目标:t.target}, lines:[4,5] };
    });
  }
  return [{ text:`当前 BST 由序列 ${values.join(", ")} 建成。你可以在上方输入一个数进行插入或查找。`, tree:base, active:[], state:{初始序列:values.join(", ")}, defense:"BST 的核心规则：小于根走左，大于根走右；形态取决于插入顺序。" }];
}

function layoutBinaryTree(root) {
  const nodes = [];
  const edges = [];
  function walk(node, depth, minX, maxX) {
    if (!node) return;
    const x = (minX + maxX) / 2;
    const y = 66 + depth * 78;
    nodes.push({ key: node.key, x, y, h: node.height });
    if (node.left) {
      const lx = (minX + x) / 2, ly = 66 + (depth + 1) * 78;
      edges.push({ a: node.key, b: node.left.key, x1: x, y1: y, x2: lx, y2: ly });
      walk(node.left, depth + 1, minX, x);
    }
    if (node.right) {
      const rx = (x + maxX) / 2, ry = 66 + (depth + 1) * 78;
      edges.push({ a: node.key, b: node.right.key, x1: x, y1: y, x2: rx, y2: ry });
      walk(node.right, depth + 1, x, maxX);
    }
  }
  walk(root, 0, 35, 765);
  return { nodes, edges };
}

function renderBst(el, step) {
  el.innerHTML = renderTreeSvg(step.tree, step.active || [], [], false);
}

function renderTreeSvg(root, active = [], done = [], showHeight = false) {
  if (!root) return `<div class="formula">空树</div>`;
  const { nodes, edges } = layoutBinaryTree(root);
  const activeSet = new Set(active.map(String)), doneSet = new Set(done.map(String));
  const maxY = Math.max(...nodes.map(n => n.y)) + 60;
  const r = showHeight ? 30 : 26;
  return `<div class="svgWrap"><svg viewBox="0 0 800 ${maxY}" width="800">
    ${edges.map(e => `<line class="edge" x1="${e.x1}" y1="${e.y1}" x2="${e.x2}" y2="${e.y2}"/>`).join("")}
    ${nodes.map(n => `<g class="node ${activeSet.has(String(n.key)) ? "active" : doneSet.has(String(n.key)) ? "done" : ""}">
      <circle cx="${n.x}" cy="${n.y}" r="${r}"></circle>
      <text x="${n.x}" y="${n.y - (showHeight ? 8 : 0)}">${n.key}</text>
      ${showHeight ? `<text class="heightText" x="${n.x}" y="${n.y + 13}">h=${n.h}</text>` : ""}
    </g>`).join("")}
  </svg></div>`;
}

function height(n) { return n ? n.height : 0; }
function updateHeight(n) { if (n) n.height = Math.max(height(n.left), height(n.right)) + 1; }
function balanceFactor(n) { return n ? height(n.left) - height(n.right) : 0; }

function rotateRight(y) {
  const x = y.left;
  const t2 = x.right;
  x.right = y;
  y.left = t2;
  updateHeight(y);
  updateHeight(x);
  return x;
}

function rotateLeft(x) {
  const y = x.right;
  const t2 = y.left;
  y.left = x;
  x.right = t2;
  updateHeight(x);
  updateHeight(y);
  return y;
}

function avlInsert(root, key, events = []) {
  if (!root) {
    events.push({ type: "create", key });
    return makeNode(key);
  }
  events.push({ type: "compare", at: root.key, key });
  if (key < root.key) root.left = avlInsert(root.left, key, events);
  else if (key > root.key) root.right = avlInsert(root.right, key, events);
  else {
    events.push({ type: "duplicate", at: root.key, key });
    return root;
  }
  updateHeight(root);
  const bf = balanceFactor(root);
  events.push({ type: "check", at: root.key, bf, key });

  if (bf > 1 && key < root.left.key) {
    events.push({ type: "rotate", kind: "LL：右旋", at: root.key });
    return rotateRight(root);
  }
  if (bf < -1 && key > root.right.key) {
    events.push({ type: "rotate", kind: "RR：左旋", at: root.key });
    return rotateLeft(root);
  }
  if (bf > 1 && key > root.left.key) {
    events.push({ type: "rotate", kind: "LR：先左旋左孩子，再右旋", at: root.key });
    root.left = rotateLeft(root.left);
    return rotateRight(root);
  }
  if (bf < -1 && key < root.right.key) {
    events.push({ type: "rotate", kind: "RL：先右旋右孩子，再左旋", at: root.key });
    root.right = rotateRight(root.right);
    return rotateLeft(root);
  }
  return root;
}

function buildAvl(values) {
  let root = null;
  values.forEach(v => { root = avlInsert(root, v, []); });
  return root;
}

function buildAvlSteps() {
  const values = simState.avlValues.length ? simState.avlValues : [30,20,40];
  const op = simState.avlOp || "overview";
  const base = buildAvl(values);
  if (op === "search") {
    const trace = bstSearchTrace(base, simState.avlTarget);
    return trace.map(t => {
      if (t.found) return { text:`目标 ${t.target} 等于当前结点 ${t.at}，查找成功。AVL 查找过程和 BST 一样。`, tree:base, active:[t.at], state:{目标:t.target, 结果:"找到"}, lines:[13,14] };
      if (t.found === false) return { text:`走到空指针仍未找到 ${t.target}。`, tree:base, active:[], state:{目标:t.target, 结果:"不存在"}, lines:[12] };
      return { text:`比较 ${t.target} 与 ${t.at}：${t.target < t.at ? "更小，走左" : "更大，走右"}。`, tree:base, active:[t.at], state:{当前:t.at, 目标:t.target}, lines:[13,14] };
    });
  }
  if (op === "insert") {
    const root = cloneTree(base);
    const before = cloneTree(root);
    const events = [];
    const after = avlInsert(root, simState.avlInsert, events);
    const steps = [{ text:`当前 AVL 由序列 ${values.join(", ")} 建成。准备插入 ${simState.avlInsert}。`, tree:before, active:[], state:{初始序列:values.join(", "), 插入值:simState.avlInsert}, lines:[11] }];
    let temp = cloneTree(base);
    for (const ev of events) {
      if (ev.type === "compare") {
        steps.push({ text:`比较 ${ev.key} 与当前结点 ${ev.at}：${ev.key < ev.at ? "更小，进入左子树" : ev.key > ev.at ? "更大，进入右子树" : "相等"}。`, tree:cloneTree(temp), active:[ev.at], state:{当前:ev.at, 插入值:ev.key}, lines:[13,14] });
      } else if (ev.type === "create") {
        temp = avlInsert(cloneTree(base), simState.avlInsert, []);
        steps.push({ text:`找到空位置，插入新叶子 ${ev.key}。接下来沿返回路径更新高度并检查平衡。`, tree:cloneTree(temp), active:[ev.key], state:{新结点:ev.key}, lines:[12] });
      } else if (ev.type === "check") {
        steps.push({ text:`回到结点 ${ev.at}，更新高度，计算平衡因子 BF=${ev.bf}。${Math.abs(ev.bf) <= 1 ? "仍然平衡。" : "失衡，需要旋转。"}`, tree:cloneTree(temp), active:[ev.at], state:{结点:ev.at, 平衡因子:ev.bf}, lines:[15,16] });
      } else if (ev.type === "rotate") {
        steps.push({ text:`在结点 ${ev.at} 发生 ${ev.kind}。旋转后恢复 AVL 平衡。`, tree:cloneTree(after), active:[ev.at], state:{旋转类型:ev.kind}, lines:[5,6,7,8,16], defense:"AVL 的核心：先按 BST 插入，再从插入点往上检查 BF，失衡就用 LL/RR/LR/RL 旋转。" });
      }
    }
    steps.push({ text:"插入完成。所有结点平衡因子都回到 -1、0、1 范围内。", tree:cloneTree(after), active:[simState.avlInsert], state:{完成:"AVL 保持平衡"}, defense:"AVL 查找、插入、删除都能保持 O(log n)，代价是插入/删除时可能旋转。" });
    return steps;
  }
  return [{ text:`当前 AVL 由序列 ${values.join(", ")} 建成。每个结点下面显示高度 h。你可以输入一个数观察插入和旋转。`, tree:base, active:[], state:{初始序列:values.join(", ")}, defense:"AVL 是带平衡约束的 BST：任意结点左右子树高度差不超过 1。" }];
}

function renderAvl(el, step) {
  const rotation = step.state?.旋转类型 ? `<div class="row"><span class="rotateBadge">${step.state.旋转类型}</span></div>` : "";
  el.innerHTML = renderTreeSvg(step.tree, step.active || [], [], true) + rotation;
}

function buildHashSteps() {
  const keys = [19,14,23,1,68], m = 7;
  const table = Array(m).fill("");
  const steps = [];
  keys.forEach(k => {
    let pos = k % m, probes = [pos];
    while (table[pos] !== "") { pos = (pos + 1) % m; probes.push(pos); }
    table[pos] = k;
    steps.push({ text:`插入 ${k}：H(${k})=${k % m}。${probes.length>1 ? "发生冲突，线性向后探测到 " + pos : "位置空，直接放入 " + pos}。`, table:table.slice(), probes, state:{key:k, hash:k%m, 探测:probes.join(" -> ")}, defense:"开放地址法删除元素不能简单清空，否则会破坏探测链。" });
  });
  return steps;
}

function renderHash(el, step) {
  el.innerHTML = `<div class="row">${step.table.map((v,i) => `<div><div class="cell ${step.probes.includes(i)?"active":v!==""?"done":""}">${v || "空"}</div><div class="index">${i}</div></div>`).join("")}</div><div class="formula">线性探测：pos = (pos + 1) % m</div>`;
}

function buildInsertionSteps(arr) {
  const a = arr.slice(), steps = [{text:"初始数组。A[0] 单独一个元素，天然有序。", arr:a.slice(), active:[], done:[0], lines:[1]}];
  for (let i=1;i<a.length;i++) {
    const temp=a[i]; let j=i-1;
    steps.push({text:`取 A[${i}]=${temp} 作为 temp，准备插入左边有序区。`, arr:a.slice(), active:[i], done:range(0,i-1), state:{i,temp}, lines:[2,3]});
    while (j>=0 && a[j]>temp) {
      a[j+1]=a[j];
      steps.push({text:`A[${j}]=${a[j]} 大于 temp=${temp}，右移到 A[${j+1}]。`, arr:a.slice(), active:[j,j+1], done:range(0,i), state:{j,temp}, lines:[5,6]});
      j--;
    }
    a[j+1]=temp;
    steps.push({text:`把 temp=${temp} 放入 A[${j+1}]，本轮插入完成。`, arr:a.slice(), active:[j+1], done:range(0,i), lines:[9], defense:"插入排序稳定，因为相等时不右移。" });
  }
  return steps;
}

function buildBubbleSteps(arr) {
  const a=arr.slice(), steps=[{text:"初始数组。每趟比较相邻元素。", arr:a.slice(), active:[], done:[]}];
  for (let i=0;i<a.length-1;i++) {
    let swapped=false;
    for (let j=0;j<a.length-1-i;j++) {
      steps.push({text:`比较 A[${j}]=${a[j]} 和 A[${j+1}]=${a[j+1]}。`, arr:a.slice(), active:[j,j+1], done:range(a.length-i,a.length-1), lines:[4,5]});
      if (a[j]>a[j+1]) {
        [a[j],a[j+1]]=[a[j+1],a[j]];
        swapped=true;
        steps.push({text:"逆序，交换。", arr:a.slice(), active:[j,j+1], done:range(a.length-i,a.length-1), lines:[6,7]});
      }
    }
    steps.push({text:`第 ${i+1} 趟结束，当前最大值已经冒到未排序区末尾。`, arr:a.slice(), active:[], done:range(a.length-1-i,a.length-1), lines:[9]});
    if (!swapped) break;
  }
  return steps;
}

function buildQuickSteps(arr) {
  const a=arr.slice(), steps=[];
  let low=0, high=a.length-1, i=low, j=high, pivot=a[low];
  steps.push({text:`选择 A[${low}]=${pivot} 作为 pivot，左边留出空位。`, arr:a.slice(), active:[low], pivot, lines:[3,4]});
  while (i<j) {
    while (i<j && a[j]>=pivot) { steps.push({text:`从右找小于 pivot 的数：A[${j}]=${a[j]} >= ${pivot}，j 左移。`, arr:a.slice(), active:[j], pivot, lines:[6]}); j--; }
    if (i<j) { a[i]=a[j]; steps.push({text:`找到 A[${j}]=${a[j]} 小于 pivot，填到左边空位 A[${i}]。`, arr:a.slice(), active:[i,j], pivot, lines:[7]}); }
    while (i<j && a[i]<=pivot) { steps.push({text:`从左找大于 pivot 的数：A[${i}]=${a[i]} <= ${pivot}，i 右移。`, arr:a.slice(), active:[i], pivot, lines:[8]}); i++; }
    if (i<j) { a[j]=a[i]; steps.push({text:`找到 A[${i}]=${a[i]} 大于 pivot，填到右边空位 A[${j}]。`, arr:a.slice(), active:[i,j], pivot, lines:[9]}); }
  }
  a[i]=pivot;
  steps.push({text:`i 和 j 相遇，把 pivot=${pivot} 放到 A[${i}]，一趟划分完成。`, arr:a.slice(), active:[i], done:[i], pivot, lines:[11], defense:"一趟划分只保证 pivot 归位，左右两边还要递归排序。" });
  return steps;
}

function buildMergeSteps() {
  return [
    { text:"两个有序子表准备合并。", left:[3,12,25,40], right:[5,9,31,42], merged:[], active:"", lines:[4,5] },
    { text:"比较 3 和 5，取较小的 3。", left:[12,25,40], right:[5,9,31,42], merged:[3], active:"left" },
    { text:"比较 12 和 5，取 5。", left:[12,25,40], right:[9,31,42], merged:[3,5], active:"right" },
    { text:"比较 12 和 9，取 9。", left:[12,25,40], right:[31,42], merged:[3,5,9], active:"right" },
    { text:"比较 12 和 31，取 12。", left:[25,40], right:[31,42], merged:[3,5,9,12], active:"left" },
    { text:"继续合并，直到一边为空，再把另一边剩余元素接上。", left:[], right:[], merged:[3,5,9,12,25,31,40,42], active:"", defense:"归并排序稳定的关键：相等时先取左表元素。" }
  ];
}

function renderArraySort(el, step) {
  el.innerHTML = `<div class="row">${step.arr.map((v,i) => `<div><div class="cell ${step.active?.includes(i)?"active":step.done?.includes(i)?"done":""}">${v}</div><div class="index">${i}</div></div>`).join("")}</div>${step.pivot ? `<div class="formula">pivot = ${step.pivot}</div>` : ""}`;
}

function renderMerge(el, step) {
  const row = (label, arr, active) => `<div><div class="label">${label}</div><div class="row">${arr.map(v => `<div class="cell ${active?"active":""}">${v}</div>`).join("") || "<span class='formula'>空</span>"}</div></div>`;
  el.innerHTML = row("左有序表", step.left, step.active==="left") + row("右有序表", step.right, step.active==="right") + row("合并结果", step.merged, true);
}

function buildShellSteps() {
  const a = parseNums(simState.arrayText);
  const steps = [{ text:"初始数组。希尔排序先用较大的 gap 粗略调整，再逐步缩小 gap。", arr:a.slice(), active:[], done:[], state:{gap:"尚未开始"}, lines:[1] }];
  for (let gap = Math.floor(a.length / 2); gap >= 1; gap = Math.floor(gap / 2)) {
    steps.push({ text:`本轮 gap=${gap}：下标相差 ${gap} 的元素属于同一组，在组内做插入排序。`, arr:a.slice(), active:[], done:[], state:{gap}, lines:[2,3] });
    for (let i = gap; i < a.length; i++) {
      const temp = a[i];
      let j = i;
      steps.push({ text:`取 A[${i}]=${temp}，它要和 A[${i-gap}], A[${i-2*gap}] ... 比较。`, arr:a.slice(), active:[i], done:[], state:{gap, i, temp}, lines:[4,5] });
      while (j >= gap && a[j - gap] > temp) {
        a[j] = a[j - gap];
        steps.push({ text:`A[${j-gap}]=${a[j-gap]} 大于 temp=${temp}，沿 gap 间隔右移到 A[${j}]。`, arr:a.slice(), active:[j-gap,j], done:[], state:{gap, temp}, lines:[6,7] });
        j -= gap;
      }
      a[j] = temp;
      steps.push({ text:`把 temp=${temp} 放到 A[${j}]。gap=${gap} 的这一小组局部有序。`, arr:a.slice(), active:[j], done:[], state:{gap, 放入位置:j}, lines:[9] });
    }
  }
  steps.push({ text:"gap 缩小到 1 并完成后，整个数组有序。", arr:a.slice(), active:[], done:range(0,a.length-1), state:{完成:"有序"}, defense:"希尔排序本质是“分组插入排序”。gap 不是 1 时，元素可以一次跨很远，减少后面直接插入排序的移动次数。" });
  return steps;
}

function buildSelectionSteps() {
  const a = parseNums(simState.arrayText);
  const steps = [{ text:"初始数组。选择排序每一趟从未排序区选最小值，放到未排序区最前面。", arr:a.slice(), active:[], done:[], lines:[1] }];
  for (let i = 0; i < a.length - 1; i++) {
    let min = i;
    steps.push({ text:`第 ${i+1} 趟开始：先假设 A[${i}]=${a[i]} 是未排序区最小值。`, arr:a.slice(), active:[i], done:range(0,i-1), state:{i, min}, lines:[2,3] });
    for (let j = i + 1; j < a.length; j++) {
      steps.push({ text:`比较当前最小 A[${min}]=${a[min]} 和 A[${j}]=${a[j]}。`, arr:a.slice(), active:[min,j], done:range(0,i-1), state:{min, j}, lines:[4,5] });
      if (a[j] < a[min]) {
        min = j;
        steps.push({ text:`发现更小的 A[${j}]=${a[j]}，更新 min=${j}。`, arr:a.slice(), active:[min], done:range(0,i-1), state:{min}, lines:[6] });
      }
    }
    if (min !== i) {
      [a[i], a[min]] = [a[min], a[i]];
      steps.push({ text:`把本趟最小值交换到 A[${i}]，A[0..${i}] 变成已排序区。`, arr:a.slice(), active:[i,min], done:range(0,i), state:{交换:`${i} <-> ${min}`}, lines:[8] });
    } else {
      steps.push({ text:`min 仍然是 ${i}，不用交换。A[${i}] 固定。`, arr:a.slice(), active:[i], done:range(0,i), state:{无需交换:true}, lines:[8] });
    }
  }
  steps.push({ text:"排序完成。选择排序交换次数少，但比较次数始终接近 n(n-1)/2。", arr:a.slice(), active:[], done:range(0,a.length-1), defense:"选择排序通常不稳定：如果最小值和前面的元素交换，可能改变相等元素的先后顺序。" });
  return steps;
}

function buildHeapSteps(seed) {
  const a = (seed && seed.length ? seed : parseNums(simState.arrayText)).slice();
  const steps = [{ text:"初始数组。堆排序先把数组看成完全二叉树，再调整成大根堆。", arr:a.slice(), active:[], heapSize:a.length, done:[], state:{堆大小:a.length}, lines:[1] }];
  const siftDown = (start, end) => {
    let root = start;
    while (root * 2 + 1 <= end) {
      let child = root * 2 + 1;
      let swap = root;
      steps.push({ text:`检查结点 A[${root}]=${a[root]} 的孩子，左孩子 A[${child}]=${a[child]}${child+1<=end ? `，右孩子 A[${child+1}]=${a[child+1]}` : ""}。`, arr:a.slice(), active:[root,child,child+1].filter(i => i <= end), heapSize:end+1, done:range(end+1,a.length-1), state:{root, child}, lines:[5,6] });
      if (a[swap] < a[child]) swap = child;
      if (child + 1 <= end && a[swap] < a[child + 1]) swap = child + 1;
      if (swap === root) {
        steps.push({ text:`A[${root}] 已经不小于孩子，当前子树满足大根堆。`, arr:a.slice(), active:[root], heapSize:end+1, done:range(end+1,a.length-1), state:{停止:"无需下滤"}, lines:[10] });
        return;
      }
      [a[root], a[swap]] = [a[swap], a[root]];
      steps.push({ text:`孩子 A[${swap}] 更大，交换 A[${root}] 和 A[${swap}]，较小值继续向下检查。`, arr:a.slice(), active:[root,swap], heapSize:end+1, done:range(end+1,a.length-1), state:{交换:`${root} <-> ${swap}`}, lines:[8,9] });
      root = swap;
    }
  };
  for (let i = Math.floor(a.length / 2) - 1; i >= 0; i--) {
    steps.push({ text:`从最后一个非叶子结点 A[${i}] 开始向下调整。`, arr:a.slice(), active:[i], heapSize:a.length, done:[], lines:[2,3] });
    siftDown(i, a.length - 1);
  }
  steps.push({ text:"建堆完成：A[0] 是整个堆的最大值。", arr:a.slice(), active:[0], heapSize:a.length, done:[], state:{堆顶:a[0]}, defense:"大根堆只保证父结点 >= 孩子，不保证整棵树从左到右有序。" });
  for (let end = a.length - 1; end > 0; end--) {
    [a[0], a[end]] = [a[end], a[0]];
    steps.push({ text:`把堆顶最大值 ${a[end]} 交换到 A[${end}]，它以后不再参与堆调整。`, arr:a.slice(), active:[0,end], heapSize:end, done:range(end,a.length-1), state:{已固定位置:end}, lines:[12,13] });
    siftDown(0, end - 1);
  }
  steps.push({ text:"所有最大值依次放到数组右侧，排序完成。", arr:a.slice(), active:[], heapSize:0, done:range(0,a.length-1), defense:"堆排序时间复杂度 O(n log n)，原地排序，但不稳定。" });
  return steps;
}

function renderHeap(el, step) {
  const heapSize = step.heapSize ?? step.arr.length;
  const cells = `<div class="row">${step.arr.map((v,i) => `<div><div class="cell ${step.active?.includes(i)?"active":step.done?.includes(i)?"done":i<heapSize?"":"muted"}">${v}</div><div class="index">${i}</div></div>`).join("")}</div>`;
  el.innerHTML = cells + `<div class="formula">堆区：A[0..${Math.max(heapSize-1,0)}]，已排序区在右侧</div>` + renderHeapSvg(step.arr, heapSize, step.active || []);
}

function renderHeapSvg(arr, heapSize, active = []) {
  if (heapSize <= 0) return `<div class="formula">堆区为空，排序完成。</div>`;
  const activeSet = new Set(active);
  const nodes = [];
  const edges = [];
  const walk = (i, depth, minX, maxX) => {
    if (i >= heapSize) return;
    const x = (minX + maxX) / 2;
    const y = 48 + depth * 72;
    nodes.push({ i, v: arr[i], x, y });
    const l = i * 2 + 1, r = i * 2 + 2;
    if (l < heapSize) {
      const lx = (minX + x) / 2, ly = 48 + (depth + 1) * 72;
      edges.push({ x1:x, y1:y, x2:lx, y2:ly });
      walk(l, depth + 1, minX, x);
    }
    if (r < heapSize) {
      const rx = (x + maxX) / 2, ry = 48 + (depth + 1) * 72;
      edges.push({ x1:x, y1:y, x2:rx, y2:ry });
      walk(r, depth + 1, x, maxX);
    }
  };
  walk(0, 0, 35, 565);
  const maxY = Math.max(...nodes.map(n => n.y)) + 50;
  return `<div class="svgWrap"><svg viewBox="0 0 600 ${maxY}" width="650">
    ${edges.map(e => `<line class="edge" x1="${e.x1}" y1="${e.y1}" x2="${e.x2}" y2="${e.y2}"/>`).join("")}
    ${nodes.map(n => `<g class="node ${activeSet.has(n.i) ? "active" : ""}">
      <circle cx="${n.x}" cy="${n.y}" r="25"></circle>
      <text x="${n.x}" y="${n.y - 5}">${n.v}</text>
      <text x="${n.x}" y="${n.y + 17}" style="font-size:10px;fill:#64748b">[${n.i}]</text>
    </g>`).join("")}
  </svg></div>`;
}

function buildCountingSteps() {
  const a = [3,1,2,3,0,2,1,3];
  const max = Math.max(...a);
  const cnt = Array(max + 1).fill(0);
  const out = [];
  const steps = [{ text:"计数排序适合取值范围不大的整数。先准备 count[0..max]。", arr:a.slice(), count:cnt.slice(), output:out.slice(), active:[], lines:[1], state:{max} }];
  a.forEach((v,i) => {
    cnt[v]++;
    steps.push({ text:`读到 A[${i}]=${v}，所以 count[${v}] 加 1。`, arr:a.slice(), count:cnt.slice(), output:out.slice(), active:[v], state:{读取:`A[${i}]=${v}`, [`count[${v}]`]:cnt[v]}, lines:[3,4] });
  });
  for (let value = 0; value < cnt.length; value++) {
    while (cnt[value] > 0) {
      out.push(value);
      cnt[value]--;
      steps.push({ text:`count[${value}] 还有次数，输出一个 ${value}，然后 count[${value}] 减 1。`, arr:a.slice(), count:cnt.slice(), output:out.slice(), active:[value], state:{输出:value}, lines:[6,7,8] });
    }
  }
  steps.push({ text:"按 count 从小到大输出完毕，得到有序序列。", arr:a.slice(), count:cnt.slice(), output:out.slice(), active:[], defense:"普通计数排序不是比较排序；如果要稳定，通常先做前缀和，再从右向左放入输出数组。" });
  return steps;
}

function renderCounting(el, step) {
  const row = (label, arr, activeSet = new Set()) => `<div><div class="label">${label}</div><div class="row">${arr.map((v,i) => `<div><div class="cell ${activeSet.has(i)?"active":""}">${v}</div><div class="index">${i}</div></div>`).join("") || "<span class='formula'>空</span>"}</div></div>`;
  el.innerHTML = row("原数组", step.arr) + row("count 数组", step.count, new Set(step.active || [])) + row("输出结果", step.output);
}

function buildRadixSteps() {
  let nums = [73,45,79,90,81,75,24,12];
  const steps = [{ text:"基数排序从低位到高位处理。这里先按个位分桶，再按十位分桶。", buckets:[], output:nums.slice(), state:{当前位:"准备"}, lines:[1] }];
  [1,10].forEach(place => {
    const buckets = Array.from({length:10}, () => []);
    nums.forEach(n => buckets[Math.floor(n / place) % 10].push(n));
    steps.push({ text:`按 ${place === 1 ? "个位" : "十位"} 分桶：数字 n 进入第 floor(n/${place})%10 个桶。`, buckets:buckets.map(b => b.slice()), output:nums.slice(), state:{当前位:place === 1 ? "个位" : "十位"}, lines:[3,4] });
    nums = buckets.flat();
    steps.push({ text:`按桶号从 0 到 9 依次收集，得到 ${nums.join(", ")}。`, buckets:buckets.map(b => b.slice()), output:nums.slice(), state:{收集后:nums.join(", ")}, lines:[6,7] });
  });
  steps.push({ text:"最高位处理完后，序列有序。", buckets:[], output:nums.slice(), defense:"LSD 基数排序必须保持每一趟分配收集稳定，否则低位已经排好的相对顺序会被破坏。" });
  return steps;
}

function buildBucketSteps() {
  const nums = [0.42,0.32,0.73,0.25,0.88,0.61,0.11,0.54];
  const names = ["[0,0.33)", "[0.33,0.66)", "[0.66,1)"];
  const buckets = [[],[],[]];
  const steps = [{ text:"桶排序按范围分桶。数据越均匀，桶内排序越轻松。", buckets:buckets.map(b => b.slice()), bucketNames:names, output:nums.slice(), lines:[1] }];
  nums.forEach(v => {
    const idx = Math.min(2, Math.floor(v * 3));
    buckets[idx].push(v);
    steps.push({ text:`${v} 落在范围 ${names[idx]}，放入第 ${idx} 个桶。`, buckets:buckets.map(b => b.slice()), bucketNames:names, output:nums.slice(), active:idx, state:{元素:v, 桶:names[idx]}, lines:[3,4] });
  });
  buckets.forEach((b,i) => {
    b.sort((x,y) => x-y);
    steps.push({ text:`对第 ${i} 个桶内部排序，桶内变成 ${b.join(", ")}。`, buckets:buckets.map(x => x.slice()), bucketNames:names, output:nums.slice(), active:i, state:{桶内排序:names[i]}, lines:[6] });
  });
  const output = buckets.flat();
  steps.push({ text:`按桶的范围从小到大拼接：${output.join(", ")}。`, buckets:buckets.map(b => b.slice()), bucketNames:names, output, state:{结果:output.join(", ")}, lines:[8], defense:"桶排序依赖数据分布。如果所有元素都挤进一个桶，性能会退化为桶内排序的性能。" });
  return steps;
}

function renderBuckets(el, step) {
  const names = step.bucketNames || Array.from({length:10}, (_,i) => String(i));
  const buckets = step.buckets || [];
  const bucketHtml = buckets.length
    ? `<div class="buckets">${buckets.map((b,i) => `<div class="bucket ${step.active===i?"active":""}"><div class="label">${names[i] ?? i}</div>${b.map(v => `<span>${v}</span>`).join("") || "<em>空</em>"}</div>`).join("")}</div>`
    : "";
  el.innerHTML = bucketHtml + `<div><div class="label">当前序列 / 输出</div><div class="row">${(step.output || []).map(v => `<div class="cell done">${v}</div>`).join("")}</div></div>`;
}

function buildDijkstraSteps() {
  return [
    { text:"初始化：起点 0 的 dist=0，其余为无穷。", dist:[0,"∞","∞","∞","∞"], fixed:[], active:[0], state:{起点:0}, lines:[1] },
    { text:"选择未确定点中 dist 最小的 0，固定它，并松弛邻居 1、2。", dist:[0,2,5,"∞","∞"], fixed:[0], active:[0,1,2], state:{fixed:"0", 更新:"dist[1]=2, dist[2]=5"}, lines:[2,3,4] },
    { text:"选择 dist 最小的 1，松弛 3、4。", dist:[0,2,5,6,4], fixed:[0,1], active:[1,3,4], state:{fixed:"0,1", 更新:"dist[3]=6, dist[4]=4"}, lines:[2,4,5] },
    { text:"选择 dist 最小的 4，已没有更优更新。", dist:[0,2,5,6,4], fixed:[0,1,4], active:[4], state:{fixed:"0,1,4"}, lines:[2,3] },
    { text:"继续固定 2、3，最终得到从 0 到所有点的最短距离。", dist:[0,2,5,6,4], fixed:[0,1,4,2,3], active:[2,3], state:{最终距离:"0,2,5,6,4"}, lines:[1,2], defense:"Dijkstra 不能处理负权边，因为固定后的最短距离不能再被推翻。" }
  ];
}

function renderDijkstra(el, step) {
  el.innerHTML = dijkstraGraphSvg(step.active || [], step.fixed || []) +
    `<div class="row">${step.dist.map((d,i) => `<div><div class="cell ${step.fixed.includes(i)?"done":step.active.includes(i)?"active":""}">${d}</div><div class="index">dist[${i}]</div></div>`).join("")}</div>`;
}

function dijkstraGraphSvg(active = [], done = []) {
  const pos = {
    0: { x: 300, y: 55 },
    1: { x: 150, y: 155 },
    2: { x: 450, y: 155 },
    3: { x: 220, y: 285 },
    4: { x: 380, y: 285 }
  };
  const edges = [[0,1,2],[0,2,5],[1,3,4],[1,4,2],[2,3,1],[4,3,2]];
  return `<div class="svgWrap"><svg viewBox="0 0 600 335" width="620">
    ${edges.map(([a,b,w]) => {
      return `<line class="edge" x1="${pos[a].x}" y1="${pos[a].y}" x2="${pos[b].x}" y2="${pos[b].y}"/>
        ${edgeWeightLabel(pos[a], pos[b], w, 17)}`;
    }).join("")}
    ${Object.entries(pos).map(([k,p]) => `<g class="node ${active.includes(Number(k)) ? "active" : done.includes(Number(k)) ? "done" : ""}">
      <circle cx="${p.x}" cy="${p.y}" r="27"></circle><text x="${p.x}" y="${p.y}">${k}</text>
    </g>`).join("")}
  </svg></div>`;
}

function clone(x) { return x.map(r => r.slice()); }
function range(a,b) { const out=[]; for(let i=a;i<=b;i++) if(i>=0) out.push(i); return out; }

function init() {
  initNav();
  $("nextBtn").addEventListener("click", next);
  $("prevBtn").addEventListener("click", prev);
  $("resetBtn").addEventListener("click", reset);
  $("playBtn").addEventListener("click", play);
  $("speedInput").addEventListener("input", () => { if (timer) { stop(); play(); } });
  $("codeFab").addEventListener("click", () => {
    $("codePanel").classList.add("open");
    $("codePanel").setAttribute("aria-hidden", "false");
  });
  $("codeClose").addEventListener("click", () => {
    $("codePanel").classList.remove("open");
    $("codePanel").setAttribute("aria-hidden", "true");
  });
  $("codePanel").addEventListener("click", e => {
    if (e.target.id === "codePanel") $("codeClose").click();
  });
  setAlgorithm("buildTree");
}

init();
