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

const traversalTree = {
  nodes: {
    A: { x: 400, y: 45, l: "B", r: "C" },
    B: { x: 230, y: 135, l: "D" },
    C: { x: 570, y: 135, l: "E", r: "F" },
    D: { x: 145, y: 225, r: "H" },
    E: { x: 500, y: 225, l: "I", r: "J" },
    F: { x: 685, y: 225, r: "K" },
    H: { x: 220, y: 315 },
    I: { x: 430, y: 315 },
    J: { x: 560, y: 315 },
    K: { x: 730, y: 315 }
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
  sortArrays: {
    insertion: "12,5,4,9,5",
    shell: "12,5,4,9,5",
    bubble: "12,5,4,9,5",
    selection: "12,5,4,9,5"
  },
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

function getSortArrayText(id) {
  return (simState.sortArrays && simState.sortArrays[id]) || simState.arrayText;
}

function setSortArrayText(id, value) {
  if (!simState.sortArrays) simState.sortArrays = {};
  simState.sortArrays[id] = value;
}
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
  { id: "complexityLoop", page: "总1", group: "基础与复杂度", title: "循环复杂度判断", subtitle: "单循环、嵌套循环、折半循环", complexity: "看增长方式", build: buildComplexityLoopSteps, render: renderComplexityLoop, code: codes.binary },
  { id: "linearInsertDelete", page: "总2", group: "线性表", title: "顺序表插入删除移动", subtitle: "删除左移，插入右移", complexity: "O(n)", build: buildLinearInsertDeleteSteps, render: renderArraySort, code: codes.insertion },
  { id: "linkedDedup", page: "总2", group: "线性表", title: "有序链表删除重复", subtitle: "pre/p/q 指针不断接链", complexity: "O(n)", build: buildLinkedDedupSteps, render: renderLinkedList, code: codes.bst },
  { id: "orderedIntersection", page: "总2", group: "线性表", title: "有序表交集 A=A∩B", subtitle: "双指针同步向前", complexity: "O(m+n)", build: buildOrderedIntersectionSteps, render: renderDualList, code: codes.merge },
  { id: "linkedSplit", page: "总2", group: "线性表", title: "链表按条件拆分", subtitle: "尾插到两条结果链", complexity: "O(n)", build: buildLinkedSplitSteps, render: renderSplitList, code: codes.bst },
  { id: "linkedInsertionSort", page: "总2", group: "线性表", title: "链表递增排序", subtitle: "摘结点插入有序链", complexity: "O(n²)", build: buildLinkedInsertionSortSteps, render: renderLinkedSort, code: codes.insertion },
  { id: "doubleListDelete", page: "总2", group: "线性表", title: "双链表删除指针", subtitle: "前后两个方向都要接回", complexity: "O(1)", build: buildDoubleListDeleteSteps, render: renderDoubleListDelete, code: codes.bst },
  { id: "linkedQueueEnqueue", page: "总3", group: "栈队串数组", title: "链队入队", subtitle: "rear->next=s，再 rear=s", complexity: "O(1)", build: buildLinkedQueueEnqueueSteps, render: renderLinkedQueue, code: codes.bfs },  { id: "stackSequence", page: "总3", group: "栈队串数组", title: "出栈序列合法性", subtitle: "目标不在栈顶就继续压栈", complexity: "O(n)", build: buildStackSequenceSteps, render: renderStackSequence, code: codes.bfs },
  { id: "circularQueue", page: "总3", group: "栈队串数组", title: "循环队列判空判满", subtitle: "front/rear 取模绕回", complexity: "O(1)", build: buildCircularQueueSteps, render: renderCircularQueue, code: codes.bfs },
  { id: "stringSubstrings", page: "总3", group: "栈队串数组", title: "串的子串数量", subtitle: "长度为 n 的非空子串数", complexity: "公式 O(1)", build: buildStringSubstringsSteps, render: renderStringSubstrings, code: codes.binary },
  { id: "arrayAddress", page: "总3", group: "栈队串数组", title: "二维数组地址计算", subtitle: "行优先 / 列优先公式", complexity: "O(1)", build: buildArrayAddressSteps, render: renderArrayAddress, code: codes.matrix },
  { id: "sparseMatrix", page: "总3", group: "栈队串数组", title: "稀疏矩阵三元组", subtitle: "只记录非零元素", complexity: "O(t)", build: buildSparseMatrixSteps, render: renderSparseMatrix, code: codes.matrix },
  { id: "generalizedList", page: "总3", group: "栈队串数组", title: "广义表 head/tail", subtitle: "逐层取表头和表尾", complexity: "O(嵌套深度)", build: buildGeneralizedListSteps, render: renderGeneralizedList, code: codes.childSibling },
  { id: "arrayPartition", page: "总8", group: "栈队串数组", title: "数组正负分区", subtitle: "左右指针原地交换", complexity: "O(n)", build: buildArrayPartitionSteps, render: renderArraySort, code: codes.quick },  { id: "fact", page: 3, group: "递归", title: "阶乘递归 Fact", subtitle: "调用栈入栈/出栈", complexity: "O(n)", build: buildFactSteps, render: renderCallStack, code: codes.buildTree },
  { id: "hanoi", page: 4, group: "递归", title: "汉诺塔 Hanoi", subtitle: "先移 n-1，再移最大盘，再移 n-1", complexity: "O(2^n)", build: buildHanoiSteps, render: renderHanoi, code: codes.buildTree },
  { id: "preorderTraversal", page: 8, group: "树与二叉树", title: "前序遍历", subtitle: "根 → 左子树 → 右子树", complexity: "O(n)", build: buildPreorderSteps, render: renderIrregularTraversal, code: codes.treeArray },
  { id: "inorderTraversal", page: 8, group: "树与二叉树", title: "中序遍历", subtitle: "左子树 → 根 → 右子树", complexity: "O(n)", build: buildInorderSteps, render: renderIrregularTraversal, code: codes.treeArray },
  { id: "postorderTraversal", page: 8, group: "树与二叉树", title: "后序遍历", subtitle: "左子树 → 右子树 → 根", complexity: "O(n)", build: buildPostorderSteps, render: renderIrregularTraversal, code: codes.treeArray },
  { id: "heightCount", page: 9, group: "树与二叉树", title: "高度/结点数/叶子数", subtitle: "同一棵树，不同合并方式", complexity: "O(n)", build: buildTreeMetricSteps, render: renderTraversal, code: codes.leafPath },
  { id: "restoreTree", page: "总4", group: "树与二叉树", title: "遍历序列还原二叉树", subtitle: "先序定根，中序切左右", complexity: "O(n)", build: buildRestoreTreeSteps, render: renderRestoreTree, code: codes.treeArray },
  { id: "threadedTree", page: "总4", group: "树与二叉树", title: "中序线索二叉树", subtitle: "用空指针保存前驱后继", complexity: "O(n)", build: buildThreadedTreeSteps, render: renderThreadedTree, code: codes.treeArray },
  { id: "forestTransform", page: "总4", group: "树与二叉树", title: "树森林转二叉树", subtitle: "左孩子右兄弟", complexity: "O(n)", build: buildForestTransformSteps, render: renderForestTransform, code: codes.childSibling },
  { id: "huffman", page: "总4", group: "树与二叉树", title: "Huffman 树与 WPL", subtitle: "每次合并最小两个权值", complexity: "O(n log n)", build: buildHuffmanSteps, render: renderHuffman, code: codes.treeArray },
  { id: "nonRecursivePreorder", page: "总4", group: "树与二叉树", title: "非递归先序遍历", subtitle: "栈模拟根左右", complexity: "O(n)", build: buildNonRecursivePreorderSteps, render: renderTreeStack, code: codes.dfs },
  { id: "deleteSubtree", page: "总4", group: "树与二叉树", title: "删除值为 x 的子树", subtitle: "先找到，再后序释放", complexity: "O(n)", build: buildDeleteSubtreeSteps, render: renderTreeMutation, code: codes.leafPath },
  { id: "swapChildren", page: "总4", group: "树与二叉树", title: "交换二叉树左右孩子", subtitle: "递归交换每个结点", complexity: "O(n)", build: buildSwapChildrenSteps, render: renderTreeMutation, code: codes.leafPath },
  { id: "levelOrderLeaves", page: "总4", group: "树与二叉树", title: "层序输出叶子", subtitle: "队列遍历，遇叶输出", complexity: "O(n)", build: buildLevelOrderLeavesSteps, render: renderLevelOrderLeaves, code: codes.bfs },  { id: "buildTree", page: 10, group: "实验四：二叉树与树", title: "二叉树递归建树", subtitle: "从 BinaryTree 文件记录生成二叉链表", complexity: "O(n)", build: buildTreeSteps, render: renderTreeBuild, code: codes.buildTree },
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
  { id: "connectedComponents", page: "总5", group: "图", title: "输出连通分量", subtitle: "多次 DFS 扫完整图", complexity: "O(V+E)", build: buildConnectedComponentsSteps, render: renderComponentGraph, code: codes.dfs },
  { id: "matrixToList", page: "总5", group: "图", title: "邻接矩阵转邻接表", subtitle: "扫描矩阵行，发现 1 就加邻居", complexity: "O(V²)", build: buildMatrixToListSteps, render: renderMatrixToList, code: codes.matrix },
  { id: "deleteVertexConnectivity", page: "总5", group: "图", title: "删除顶点后判断连通", subtitle: "跳过该点再 DFS/BFS", complexity: "O(V+E)", build: buildDeleteVertexConnectivitySteps, render: renderDeleteVertexGraph, code: codes.dfs },
  { id: "aoeCritical", page: "总5", group: "图", title: "AOE 网关键路径", subtitle: "ve/vl 相等的活动是关键活动", complexity: "O(V+E)", build: buildAoeSteps, render: renderAoe, code: codes.dijkstra },  { id: "dijkstra", page: 23, group: "最短路径", title: "Dijkstra 单源最短路径", subtitle: "每次确定当前最近的点，再松弛邻居", complexity: "朴素 O(V²)", build: buildDijkstraSteps, render: renderDijkstra, code: codes.dijkstra },
  { id: "floyd", page: 24, group: "最短路径", title: "Floyd 任意两点最短路", subtitle: "枚举中转点 k", complexity: "O(V³)", build: buildFloydSteps, render: renderFloyd, code: codes.dijkstra },
  { id: "sequential", page: 25, group: "查找", title: "顺序查找", subtitle: "从头到尾一个个比", complexity: "O(n)", build: buildSequentialSteps, render: renderBinary, code: codes.binary },
  { id: "sequentialAsl", page: "总6", group: "查找", title: "顺序查找 ASL", subtitle: "比较次数求平均", complexity: "O(n)", build: buildSequentialAslSteps, render: renderSequentialAsl, code: codes.binary },
  { id: "binaryDecisionTree", page: "总6", group: "查找", title: "二分查找判定树", subtitle: "比较次数等于所在层数", complexity: "O(log n)", build: buildBinaryDecisionTreeSteps, render: renderDecisionTree, code: codes.binary },
  { id: "bstDelete", page: "总6", group: "查找", title: "BST 删除结点", subtitle: "叶子、单孩子、双孩子三类", complexity: "O(h)", build: buildBstDeleteSteps, render: renderBst, code: codes.bst },
  { id: "bstAsl", page: "总6", group: "查找", title: "BST 平均查找长度 ASL", subtitle: "深度加权求平均", complexity: "O(n)", build: buildBstAslSteps, render: renderBstAsl, code: codes.bst },
  { id: "hashAsl", page: "总6", group: "查找", title: "散列表成功/失败 ASL", subtitle: "逐个统计探测次数", complexity: "平均 O(1)", build: buildHashAslSteps, render: renderHashAsl, code: codes.hash },  { id: "binary", page: 25, group: "查找", title: "二分查找", subtitle: "每轮排除一半候选区间", complexity: "O(log n)", build: buildBinarySteps, render: renderBinary, code: codes.binary },
  { id: "block", page: 26, group: "查找", title: "分块查找", subtitle: "先查索引，再查块内", complexity: "介于 O(n) 与 O(log n)", build: buildBlockSteps, render: renderBlock, code: codes.binary },
  { id: "bst", page: 26, group: "查找", title: "BST 二叉排序树探索", subtitle: "自己输入数，观察插入和查找路径", complexity: "平均 O(log n)，最坏 O(n)", build: buildBstSteps, render: renderBst, code: codes.bst, params: "bst" },
  { id: "avl", page: 27, group: "查找", title: "AVL 平衡二叉树探索", subtitle: "插入后自动检查平衡并旋转", complexity: "O(log n)", build: buildAvlSteps, render: renderAvl, code: codes.avl, params: "avl" },
  { id: "hash", page: 28, group: "查找", title: "哈希表冲突处理", subtitle: "线性探测与链地址法对照", complexity: "平均 O(1)", build: buildHashSteps, render: renderHash, code: codes.hash },
  { id: "insertion", page: 29, group: "排序", title: "直接插入排序", subtitle: "输入数组，观察逐个插入", complexity: "O(n²)", build: () => buildInsertionSteps(parseNums(getSortArrayText("insertion"))), render: renderArraySort, code: codes.insertion, params: "array" },
  { id: "shell", page: 29, group: "排序", title: "希尔排序", subtitle: "按增量分组插入", complexity: "依增量而定", build: () => buildShellSteps(parseNums(getSortArrayText("shell"))), render: renderArraySort, code: codes.insertion, params: "array" },
  { id: "bubble", page: 29, group: "排序", title: "冒泡排序", subtitle: "输入数组，观察相邻交换", complexity: "O(n²)", build: () => buildBubbleSteps(parseNums(getSortArrayText("bubble"))), render: renderArraySort, code: codes.bubble, params: "array" },
  { id: "quick", page: 29, group: "排序", title: "快速排序一趟划分", subtitle: "pivot 归位，左右分区", complexity: "平均 O(n log n)", build: () => buildQuickSteps([12,5,4,19,8,21,15]), render: renderArraySort, code: codes.quick },
  { id: "selection", page: 29, group: "排序", title: "直接选择排序", subtitle: "每趟选最小放前面", complexity: "O(n²)", build: () => buildSelectionSteps(parseNums(getSortArrayText("selection"))), render: renderArraySort, code: codes.insertion, params: "array" },
  { id: "heap", page: 29, group: "排序", title: "堆排序", subtitle: "大根堆反复取最大", complexity: "O(n log n)", build: () => buildHeapSteps([50,30,70,20,40,60,80,10,25,35,45,55,65,75,85]), render: renderHeap, code: codes.insertion },
  { id: "merge", page: 29, group: "排序", title: "归并排序合并", subtitle: "两个有序表合成一个有序表", complexity: "O(n log n)", build: buildMergeSteps, render: renderMerge, code: codes.merge },
  { id: "counting", page: 29, group: "排序", title: "计数排序", subtitle: "统计每个值出现次数", complexity: "O(n+k)", build: buildCountingSteps, render: renderCounting, code: codes.hash },
  { id: "radix", page: 29, group: "排序", title: "基数排序", subtitle: "按个位、十位逐位分桶", complexity: "O(d(n+r))", build: buildRadixSteps, render: renderBuckets, code: codes.hash },
  { id: "bucket", page: 29, group: "排序", title: "桶排序", subtitle: "按范围分桶，桶内排序", complexity: "依分布而定", build: buildBucketSteps, render: renderBuckets, code: codes.hash }
];

const extraComplexityInfo = {
  complexityLoop:{time:"按代码形态：O(1)/O(log n)/O(n)/O(n^2)",space:"通常 O(1)",note:"先看循环变量增长方式，再保留最高阶。"},
  linearInsertDelete:{time:"最好 O(1)，平均/最坏 O(n)",space:"O(1)",note:"表尾操作最好；表头或中间操作要移动元素。"},
  linkedDedup:{time:"O(n)",space:"O(1)",note:"有序链表重复值相邻，一趟扫描即可。"},
  orderedIntersection:{time:"O(m+n)",space:"O(1) 或 O(min(m,n))",note:"双指针只向前移动；新建结果表时空间为交集大小。"},
  linkedSplit:{time:"O(n)",space:"O(1)",note:"若重连原结点，每个结点只访问一次。"},
  linkedInsertionSort:{time:"最好 O(n)，平均/最坏 O(n^2)",space:"O(1)",note:"基本有序时插入位置容易找到；一般要在有序链中扫描。"},
  doubleListDelete:{time:"已知结点 O(1)，查找结点 O(n)",space:"O(1)",note:"删除本身只改前后两个方向的指针。"},
  linkedQueueEnqueue:{time:"入队/出队 O(1)",space:"O(n)",note:"链式队列不固定容量，但每个元素有指针域。"},
  stackSequence:{time:"O(n)",space:"O(n)",note:"每个元素最多压栈一次、弹栈一次。"},
  circularQueue:{time:"入队/出队 O(1)",space:"O(m)",note:"m 是数组容量；牺牲一格时最多存 m-1 个元素。"},
  stringSubstrings:{time:"公式 O(1)，枚举 O(n^2)",space:"公式 O(1)，保存所有子串 O(n^2)",note:"问数量用公式，问列出所有子串才枚举。"},
  arrayAddress:{time:"O(1)",space:"O(1)",note:"地址计算只套公式，与矩阵实际大小无关。"},
  sparseMatrix:{time:"扫描 O(mn)，处理三元组 O(t)",space:"O(t)",note:"t 是非零元素个数。"},
  generalizedList:{time:"与嵌套深度和操作次数有关",space:"O(1) 到 O(深度)",note:"每次 head/tail 只处理当前一层。"},
  arrayPartition:{time:"O(n)",space:"O(1)",note:"左右指针各自单向移动，原地交换。"},
  restoreTree:{time:"O(n) 到 O(n^2)",space:"O(n)",note:"用哈希表记录中序位置可 O(n)，反复线性查根最坏 O(n^2)。"},
  threadedTree:{time:"线索化 O(n)",space:"O(1) 额外线索域",note:"利用空指针域，还需要 ltag/rtag 标志。"},
  forestTransform:{time:"O(n)",space:"O(1) 或 O(n)",note:"原地改指针是 O(1) 额外空间，新建结构是 O(n)。"},
  huffman:{time:"朴素 O(n^2)，堆优化 O(n log n)",space:"O(n)",note:"每次选当前最小两个权值合并。"},
  nonRecursivePreorder:{time:"O(n)",space:"O(h) 到 O(n)",note:"每个结点入栈出栈一次，h 为树高。"},
  deleteSubtree:{time:"O(n)",space:"O(h)",note:"最坏要找完整棵树，释放目标子树也要访问其全部结点。"},
  swapChildren:{time:"O(n)",space:"O(h)",note:"每个结点交换一次左右孩子。"},
  levelOrderLeaves:{time:"O(n)",space:"O(w)",note:"w 是树的最大宽度，队列最多保存一层。"},
  connectedComponents:{time:"邻接表 O(V+E)，邻接矩阵 O(V^2)",space:"O(V)",note:"每个未访问顶点都可能启动一次 DFS/BFS。"},
  matrixToList:{time:"O(V^2)",space:"O(V+E)",note:"必须扫描整个矩阵，结果只保存真实边。"},
  deleteVertexConnectivity:{time:"邻接表 O(V+E)，邻接矩阵 O(V^2)",space:"O(V)",note:"遍历时跳过被删除顶点及关联边。"},
  aoeCritical:{time:"O(V+E)",space:"O(V+E)",note:"基于拓扑序正向求 ve、逆向求 vl。"},
  sequentialAsl:{time:"最好 O(1)，平均/最坏 O(n)",space:"O(1)",note:"等概率成功 ASL=(n+1)/2。"},
  binaryDecisionTree:{time:"O(log n)",space:"画树 O(n)，实际查找 O(1)",note:"判定树用于分析比较次数。"},
  bstDelete:{time:"平均 O(log n)，最坏 O(n)",space:"递归 O(h)，迭代 O(1)",note:"h 是树高；退化 BST 删除也会退化。"},
  bstAsl:{time:"计算 ASL O(n)，单次查找 O(h)",space:"O(h)",note:"成功查找次数等于目标所在层数。"},
  hashAsl:{time:"平均 O(1)，最坏 O(n)",space:"O(m+n)",note:"冲突越多，探测路径越长，ASL 越大。"}
};
function getComplexityInfo(algo) {
  const exact = {
    fact: { time:"最好/平均/最坏：O(n)", space:"O(n) 调用栈", note:"Fact(n) 从 n 一直递归到 0，每少 1 就多一层调用；没有提前结束分支。" },
    hanoi: { time:"最好/平均/最坏：O(2^n)", space:"O(n) 调用栈", note:"n 个盘必须执行 2^n-1 次移动，盘数每加 1，步骤几乎翻倍。" },
    preorderTraversal: { time:"O(n)", space:"O(h)", note:"前序每个结点访问一次；h 是递归栈深度，不平衡树可能接近 n。" },
    inorderTraversal: { time:"O(n)", space:"O(h)", note:"中序每个结点访问一次；若树退化成链，递归栈最坏 O(n)。" },
    postorderTraversal: { time:"O(n)", space:"O(h)", note:"后序也必须访问所有结点；常用于先处理孩子再处理根。" },
    heightCount: { time:"O(n)", space:"O(h)", note:"高度、结点数、叶子数都要看完整棵树；递归栈深度取决于树高。" },
    buildTree: { time:"O(n)", space:"O(h)+O(n)", note:"每条文件记录创建一个结点；结点本身占 O(n)，递归栈取决于树高 h。" },
    treeArray: { time:"O(n)", space:"O(n)", note:"每个结点按编号写入顺序数组一次；数组需要保存所有结点位置。" },
    relation: { time:"最好 O(1)，最坏 O(n)", space:"O(h)", note:"若目标刚好在当前结点附近会很快；若在深层或不存在，需要扫描整棵树。" },
    lca: { time:"最好 O(1)，最坏 O(n)", space:"O(h)", note:"若根结点就是答案可立即返回；否则可能要分别搜索左右子树。" },
    leafPath: { time:"O(n)", space:"O(h)", note:"每个结点最多入路径一次；path 和递归栈长度等于当前根到叶路径高度。" },
    childSibling: { time:"O(n)", space:"O(h)", note:"统计树的度要看每个结点的孩子链；递归深度取决于孩子兄弟结构高度。" },
    matrix: { time:"建矩阵 O(E)，数边/判定 O(V^2)", space:"O(V^2)", note:"邻接矩阵必须准备 V×V 个格子；无向图数边只看上三角，避免同一条边数两次。" },
    adjList: { time:"建表 O(V+E)，遍历邻居 O(度数)", space:"O(V+E)", note:"只保存真实存在的边，稀疏图比邻接矩阵更省空间。" },
    dfs: { time:"邻接表 O(V+E)，邻接矩阵 O(V^2)", space:"O(V)", note:"visited 数组 O(V)，递归栈最深可能 O(V)；矩阵每个顶点都要扫一整行。" },
    bfs: { time:"邻接表 O(V+E)，邻接矩阵 O(V^2)", space:"O(V)", note:"队列和 visited 最多保存 O(V) 个顶点；矩阵实现同样需要逐行扫描。" },
    prim: { time:"朴素邻接矩阵 O(V^2)", space:"O(V^2)", note:"每轮从未选点里找最近点，矩阵版本适合稠密图。" },
    kruskal: { time:"O(E log E)", space:"O(V+E)", note:"主要开销是给边排序；并查集查询和合并接近常数。" },
    topo: { time:"O(V+E)", space:"O(V)", note:"每个点入队出队一次，每条边只用来减少一次入度。" },
    dijkstra: { time:"朴素 O(V^2)，堆优化 O((V+E)logV)", space:"O(V+E)", note:"本演示按朴素写法：每轮线性找最近未确定点；若用优先队列适合稀疏图。" },
    floyd: { time:"O(V^3)", space:"O(V^2)", note:"三层循环枚举中转点 k、起点 i、终点 j；适合点数较少的任意两点最短路。" },
    sequential: { time:"最好 O(1)，平均 O(n)，最坏 O(n)", space:"O(1)", note:"目标在第一个位置是最好；目标在最后或不存在是最坏。" },
    binary: { time:"最好 O(1)，平均/最坏 O(log n)", space:"O(1)", note:"第一次 mid 命中是最好；否则每轮排除一半，但前提是顺序表已经有序。" },
    block: { time:"约 O(√n)，最坏 O(n)", space:"O(块数)", note:"索引和块大小设计合理时接近 √n；块过大或索引失效时会退化。" },
    bst: { time:"最好/平均 O(log n)，最坏 O(n)", space:"O(h)", note:"树较平衡时每次排除半边；若按有序序列插入，BST 退化成链表。" },
    avl: { time:"最好/平均/最坏 O(log n)", space:"O(h)", note:"AVL 强制左右高度差不超过 1，所以查找、插入、删除的路径高度都保持对数级。" },
    hash: { time:"平均 O(1)，最坏 O(n)", space:"O(n)", note:"哈希函数分布均匀、负载因子合适时最快；大量冲突集中到同一桶会退化。" },
    insertion: { time:"最好 O(n)，平均/最坏 O(n^2)", space:"O(1)", note:"数组基本有序时几乎不用右移；完全逆序时每个新元素都要一路挪到前面。" },
    shell: { time:"依增量而定，常见约 O(n^1.3) 到 O(n^2)", space:"O(1)", note:"gap 选择决定效率；gap 逐步缩小能减少最后一次直接插入排序的移动量。" },
    bubble: { time:"最好 O(n)，平均/最坏 O(n^2)", space:"O(1)", note:"若一趟没有交换可提前结束是最好；逆序时交换和比较最多。" },
    quick: { time:"最好/平均 O(n log n)，最坏 O(n^2)", space:"平均 O(log n)，最坏 O(n)", note:"pivot 每次接近中间最好；每次都选到最大或最小会极度不平衡。" },
    selection: { time:"最好/平均/最坏 O(n^2)", space:"O(1)", note:"无论数组是否有序，每一趟都要扫描未排序区找最小值。" },
    heap: { time:"最好/平均/最坏 O(n log n)", space:"O(1)", note:"建堆 O(n)，之后每次取最大并下沉调整，整体保持 n log n。" },
    merge: { time:"最好/平均/最坏 O(n log n)", space:"O(n)", note:"每层合并都处理全部元素，共约 log n 层；需要临时数组保存合并结果。" },
    counting: { time:"O(n+k)", space:"O(k)", note:"k 是数值范围。范围小很快；若最大最小差距巨大，空间会浪费。" },
    radix: { time:"O(d(n+r))", space:"O(n+r)", note:"d 是位数，r 是基数。适合位数固定的整数或字符串关键字。" },
    bucket: { time:"平均 O(n+k)，最坏 O(n^2)", space:"O(n+k)", note:"数据均匀落入桶时很快；若大量元素挤进同一个桶，桶内排序可能退化。" }
  };
  return exact[algo.id] || { time:`${algo.complexity}`, space:"视具体存储结构而定", note:"先看输入规模 n、顶点数 V、边数 E 或范围 k，再判断循环层数和额外数组。" };
}

function renderComplexity(algo) {
  const c = getComplexityInfo(algo);
  return `
    <div class="complexityLabel">复杂度</div>
    <div class="complexityRows">
      <span>时间</span><b>${escapeHtml(c.time)}</b>
      <span>空间</span><b>${escapeHtml(c.space)}</b>
    </div>
    <div class="complexityNote">${escapeHtml(c.note)}</div>
  `;
}
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
  $("complexity").innerHTML = renderComplexity(current);
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
    const largeVisuals = new Set(["complexityLoop", "linearInsertDelete", "linkedDedup", "orderedIntersection", "linkedSplit", "linkedInsertionSort", "doubleListDelete", "linkedQueueEnqueue", "stackSequence", "circularQueue", "stringSubstrings", "arrayAddress", "sparseMatrix", "generalizedList", "arrayPartition", "fact", "hanoi", "sequential", "sequentialAsl", "binary", "binaryDecisionTree", "block", "merge", "counting", "radix", "bucket", "hash", "hashAsl", "floyd", "topo", "restoreTree", "threadedTree", "forestTransform", "huffman", "nonRecursivePreorder", "deleteSubtree", "swapChildren", "levelOrderLeaves", "connectedComponents", "matrixToList", "deleteVertexConnectivity", "aoeCritical"]);
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
    preorderTraversal: "前序遍历的判断点是：一进入某棵子树，立刻先输出这棵子树的根，然后才去左子树和右子树。适合观察“从根开始展开结构”的过程。",
    inorderTraversal: "中序遍历的判断点是：先把左子树全部处理完，再输出根，最后处理右子树。对 BST 来说，中序输出会天然得到从小到大的序列。",
    postorderTraversal: "后序遍历的判断点是：根结点必须等左子树、右子树都处理完之后才输出。它特别适合删除树、统计子树信息这类“孩子先完成，父亲再汇总”的问题。",
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
    "基础与复杂度": "复杂度题先找输入规模 n，再看循环/递归如何推进，最后保留最高阶。",
    "线性表": "线性表题先判断顺序存储还是链式存储；顺序表看移动，链表看指针。",
    "栈队串数组": "栈队串数组题先抓规则或公式：栈后进先出、队列先进先出、数组地址看存储优先级。",
    "树与二叉树": "树题先看根、左右子树、遍历顺序和递归返回；普通树转换要牢记左孩子右兄弟。",
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
    preorderTraversal: "这棵树故意画得不对称：B 只有左路，D 只有右孩子，F 只有右孩子。前序看图时只记一句：碰到一棵子树先输出根，再向左，再向右。",
    inorderTraversal: "这棵树故意画得不对称，方便看出“回到根”的时机。中序不是一看到根就输出，而是左边走完后才输出根，再转去右边。",
    postorderTraversal: "这棵树故意画得不对称，方便观察返回过程。后序中叶子通常先出现，根 A 一定最后出现，因为左右子树要先全部完成。",
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
    "基础与复杂度": "这张图把循环次数、公式或递推过程画出来。先看变量怎么变，再看执行次数如何随 n 增长。",
    "线性表": "这张图重点看元素移动或指针改接。顺序表通常看格子搬动，链表通常看 next/prior 如何变化。",
    "栈队串数组": "这张图重点看栈顶、队头队尾、字符串长度、数组下标或公式。每一步都对应一个明确规则。",
    "树与二叉树": "这张图重点看当前结点、左右子树、队列/栈或遍历序列。高亮结点就是当前处理位置。",
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
        <input id="arrayParam" value="${escapeHtml(getSortArrayText(current.id))}" />
      </label>
      <button id="arrayApply">用这个数组重建动画</button>
      <span class="paramNote">用逗号或空格分隔，例如 12,5,4,9,5</span>`;
    $("arrayApply").onclick = () => {
      setSortArrayText(current.id, $("arrayParam").value);
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

const knowledgeExtras = {
  fact: {
    vars:["n 是当前要计算的阶乘规模，每递归一次减 1。", "返回值代表当前层 Fact(n) 的计算结果，不是全局变量。", "调用栈从 Fact(4)、Fact(3) 一直压到出口，再反向返回。"],
    scenarios:["适合讲解递归出口、递归规模缩小和返回值回收。", "不适合用来处理 n 很大的情况，因为调用栈会随 n 增长。"],
    mistakes:["把 Fact(0) 忘记写成 1，会导致乘法没有停止点。", "递归调用仍然传 n，会无限调用自己。"],
    practice:["能否指出动画中哪一步是入栈，哪一步是出栈？", "能否解释为什么 Fact(4) 不是先得到 24，而是先等待 Fact(3)？", "能否手写 Fact(3) 的完整返回顺序？"]
  },
  hanoi: {
    vars:["n 表示当前要移动的盘子数量。", "from、mid、to 不是固定柱子名，而是当前递归层里的起点、辅助、目标。", "最大盘只有在上面的 n-1 个小盘移走后才能移动。"],
    scenarios:["适合理解分治递归：大问题拆成两个 n-1 子问题加一次关键操作。", "盘数稍大时步骤指数增长，所以动画只适合小规模演示。"],
    mistakes:["死记 A、B、C 柱会乱，必须看当前层三根柱子的角色。", "移动最大盘前若没有先挪走 n-1 个小盘，规则就被破坏。"],
    practice:["能否写出移动 3 个盘的 7 步顺序？", "能否说明为什么步骤数是 2^n-1？", "能否在任意递归层指出辅助柱是哪一根？"]
  },
  preorderTraversal: {
    vars:["当前结点就是当前子树的根。", "访问动作发生在进入左右子树之前。", "输出序列会先出现每棵子树的根，再出现它的后代。"],
    scenarios:["适合复制树结构，因为先拿到根才能创建左右孩子。", "适合输出目录树、表达式树前缀形式等需要先看到父结点的场景。"],
    mistakes:["进入一个结点后还先去找最左叶子，这是中序思路，不是前序。", "遇到只有右孩子的结点时忘记继续访问右子树。"],
    practice:["能否说出 A 为什么一定是第一个输出？", "能否解释 B 之后为什么是 D，而不是 C？", "能否用根-左-右写出任意小子树的前序？"]
  },
  inorderTraversal: {
    vars:["左子树必须先完成。", "根结点夹在左子树输出和右子树输出之间。", "对 BST 来说，中序输出会递增。"],
    scenarios:["适合从 BST 中得到有序序列。", "适合配合先序或后序还原二叉树，因为中序能切分左右子树。"],
    mistakes:["一看到根就输出，会把中序写成前序。", "处理完左孩子后忘记回到父结点输出根。"],
    practice:["能否说明 D 为什么排在 H 前面？", "能否解释 A 为什么不是第一个也不是最后一个？", "能否把每个结点标成“左完-根-右”的执行顺序？"]
  },
  postorderTraversal: {
    vars:["左子树和右子树都完成后才能访问根。", "根结点通常出现在自己整棵子树输出的最后。", "返回上一层时，当前子树已经完整处理完。"],
    scenarios:["适合删除或释放整棵树，因为必须先释放孩子再释放父结点。", "适合计算子树高度、结点数、表达式树求值等需要孩子结果再汇总父结点的任务。"],
    mistakes:["叶子访问完就忘记回到父结点继续判断右子树。", "在左右子树没完成时提前输出根。"],
    practice:["能否说明 A 为什么一定最后输出？", "能否解释 H 为什么在 D 前面？", "能否判断某个结点能否输出：只看它的左右子树是否都完成？"]
  },
  heightCount: {
    vars:["left 保存左子树递归得到的结果。", "right 保存右子树递归得到的结果。", "不同问题只改变合并公式：高度取最大，结点数相加，叶子数判断无孩子。"],
    scenarios:["适合同一棵树上比较递归返回值如何合并。", "高度用于判断树是否平衡，叶子数用于统计终端结点。"],
    mistakes:["高度不是结点总数，而是最长根到叶路径长度。", "只有一个孩子的结点不是叶子，必须左右孩子都为空。"],
    practice:["能否在四层树里指出每个叶子的高度返回值？", "能否写出结点数的递归公式？", "能否解释为什么高度要 max(left,right)+1？"]
  },
  buildTree: {
    vars:["T 是当前递归层要创建并挂接的结点指针。", "a[i] 是文件当前行，包含结点数据和左右孩子标志。", "i 用引用共享读文件位置，k 保存当前行用于判断左右标志。"],
    scenarios:["适合从先序文件或数组恢复二叉链表。", "文件格式必须能说明每个结点是否继续生成左右子树。"],
    mistakes:["如果不保存 k，递归建完左子树后 i 已变化，右标志可能读错。", "如果 i 不是引用，外层无法知道内层已经读到哪一行。"],
    practice:["能否说明为什么第一行一定创建根结点？", "能否跟着动画指出 i 每次增加后读到哪一行？", "能否解释标志 0 为什么表示对应指针为 NULL？"]
  },
  treeArray: {
    vars:["i 是当前结点在顺序数组中的理论编号。", "2*i 是左孩子位置，2*i+1 是右孩子位置。", "maxIndex 用来记录数组最右边实际用到的位置。"],
    scenarios:["适合观察树的父子编号关系，完全二叉树尤其方便。", "普通稀疏二叉树会留下空位，空间利用率不一定高。"],
    mistakes:["根结点若从 1 开始编号，公式才是 2*i 和 2*i+1。", "把空孩子也当成数组元素会导致错误输出。"],
    practice:["能否根据编号 13 反推出它的父结点编号？", "能否指出某个结点写入顺序数组的下标？", "能否解释为什么链式树转数组可能浪费空间？"]
  },
  relation: {
    vars:["target 是要查询关系的结点。", "parent 需要从根遍历寻找，链式结点通常没有直接向上的指针。", "sibling 是同一个父结点的另一个孩子。"],
    scenarios:["适合练习二叉链表中的指针关系判断。", "如果频繁查父结点，可以额外保存 parent 指针来换取时间。"],
    mistakes:["目标是根时没有父结点，也就没有兄弟。", "只有一个孩子时，不能凭空说它有兄弟。"],
    practice:["能否找出 B 的父亲、孩子、兄弟？", "能否解释为什么找父亲要从根开始？", "能否处理目标不存在的情况？"]
  },
  lca: {
    vars:["T 是当前递归搜索的子树根。", "left 和 right 分别表示两个目标是否在左右子树中被找到。", "返回值表示当前子树中已经找到的目标或最近共同祖先。"],
    scenarios:["适合普通二叉树，不要求 BST 的大小关系。", "如果是 BST，还可以利用左小右大的性质更快判断方向。"],
    mistakes:["只要左右两边都找到目标，当前结点才是分叉点。", "一个目标是另一个目标祖先时，祖先本身就是 LCA。"],
    practice:["能否解释 D 和 E 的 LCA 为什么是 B？", "能否判断 H 和 K 的 LCA？", "能否说出目标不存在时要额外检查什么？"]
  },
  leafPath: {
    vars:["path 保存从根到当前结点已经走过的路线。", "len 表示 path 当前有效长度。", "叶子条件是 lchild 和 rchild 同时为空。"],
    scenarios:["适合输出所有根到叶路径、判断路径和、寻找所有终端路线。", "路径数组通常复用，不需要给每条路径重新开数组。"],
    mistakes:["递归返回时 path 中旧值可能还在，但 len 控制有效范围。", "遇到非叶子不能输出路径，否则路径没有走到终点。"],
    practice:["能否跟着动画写出 A-B-D-H 的 path 变化？", "能否解释为什么输出叶子到根时要反向打印？", "能否判断一个只有左孩子的结点是不是叶子？"]
  },
  childSibling: {
    vars:["firstChild 指向第一个孩子，表示向下一层。", "nextSibling 指向下一个兄弟，表示同一层向右。", "树的度等于所有结点孩子个数的最大值。"],
    scenarios:["适合表示普通树，因为普通树每个结点孩子数不固定。", "用两个指针就能把多孩子结构转成二叉形态存储。"],
    mistakes:["不要把 firstChild/nextSibling 当成普通二叉树的左孩子/右孩子。", "统计度时要数一个结点的孩子链，不是数整棵树有几层。"],
    practice:["能否沿 A 的 firstChild 找到第一个孩子？", "能否沿 B 的 nextSibling 数出 A 的全部孩子？", "能否解释为什么图中 A 的度是 3？"]
  },
  matrix: {
    vars:["edge[i][j] 表示顶点 i 到顶点 j 是否有边或边权。", "无向图要求 edge[i][j] 与 edge[j][i] 同时写入。", "右上三角用于避免重复统计同一条无向边。"],
    scenarios:["适合顶点数不大、边较多、经常判断两点是否相邻的图。", "边很少的稀疏图用矩阵会浪费大量 0。"],
    mistakes:["无向边只写一个格子会让矩阵不对称。", "数边时扫完整矩阵会把一条边算两次。"],
    practice:["能否解释为什么 edge[0][1] 和 edge[1][0] 都是 1？", "能否数出 10 个顶点树应有多少条边？", "能否说明树判定为什么还要检查连通？"]
  },
  adjList: {
    vars:["adj[i] 是顶点 i 的邻居名单。", "无向图中一条边会出现在两个顶点的邻居名单里。", "度数就是邻居表长度。"],
    scenarios:["适合稀疏图、遍历邻居、DFS/BFS 等操作。", "如果需要频繁 O(1) 判断两点是否有边，矩阵更直接。"],
    mistakes:["无向边只加一边会导致从另一个顶点走不回来。", "邻接表不是按不存在的边补 0，而是只列真实邻居。"],
    practice:["能否说出顶点 0 的邻居表为什么有 1 和 2？", "能否根据邻接表还原边集合？", "能否比较同一个稀疏图矩阵和邻接表的空间差异？"]
  },
  dfs: {
    vars:["visited[v] 标记顶点 v 是否已经访问过。", "递归栈记录当前深入路径。", "邻居扫描顺序决定 DFS 输出顺序。"],
    scenarios:["适合连通性判断、找路径、拓扑排序辅助、检测环。", "不保证无权图最短路径，因为它可能先走很深的绕路。"],
    mistakes:["访问后不标记 visited，会在有环图里无限递归。", "不同邻居顺序产生不同 DFS 序列，不代表谁一定错。"],
    practice:["能否指出当前递归栈里有哪些顶点？", "能否解释为什么 DFS 会回退？", "能否判断一个顶点什么时候不会再被访问？"]
  },
  bfs: {
    vars:["queue 保存等待处理的顶点。", "visited 在入队前设置，防止重复入队。", "层数表示从起点出发经过的边数。"],
    scenarios:["适合无权图最短路径、层次遍历、社交关系几度以内搜索。", "如果边有不同权值，应该改用 Dijkstra 等算法。"],
    mistakes:["出队时才标记可能导致同一个顶点被多个前驱重复加入队列。", "BFS 的先后顺序也受邻居表顺序影响。"],
    practice:["能否写出每一轮队列内容？", "能否解释为什么第一次到达某点就是最短步数？", "能否判断哪些点属于第 2 层？"]
  },
  prim: {
    vars:["selected 表示已经加入生成树的顶点集合。", "lowcost[v] 表示 v 连到当前集合的最小边权。", "parent[v] 记录这条最小边来自哪个已选顶点。"],
    scenarios:["适合稠密无向连通网，尤其是邻接矩阵实现。", "每一步从点集合扩张，思路像不断扩大一个安全区域。"],
    mistakes:["不能选择连接两个已选顶点的边，否则会形成环。", "只看边最小不够，还必须保证它连接集合内外。"],
    practice:["能否指出当前集合外 lowcost 最小的顶点？", "能否解释加入新点后为什么要更新 lowcost？", "能否判断 Prim 和 Kruskal 的选择视角有什么不同？"]
  },
  kruskal: {
    vars:["edges 是按权值排序后的边表。", "并查集记录每个顶点属于哪个连通分量。", "选中的边数达到 V-1 时生成树完成。"],
    scenarios:["适合边较少的稀疏图。", "从全局最小边开始尝试，不依赖起点。"],
    mistakes:["边权小但两个端点已经连通时必须跳过。", "生成树边数一定是 V-1，多选会成环，少选不连通。"],
    practice:["能否说明某条边为什么被跳过？", "能否手动执行一次 union 操作？", "能否比较 Kruskal 和 Prim 哪个更适合稀疏图？"]
  },
  topo: {
    vars:["inDegree[v] 表示还有多少前驱任务没完成。", "队列保存当前所有入度为 0 的顶点。", "输出序列表示满足依赖关系的处理顺序。"],
    scenarios:["适合课程先修关系、任务调度、编译依赖等有向无环图。", "只对 DAG 有完整拓扑序。"],
    mistakes:["有环时没有顶点能继续变成入度 0，不能强行输出。", "同一时刻多个入度 0 顶点可任选，所以拓扑序可能不唯一。"],
    practice:["能否指出当前哪些点入度为 0？", "能否解释删除一个点后为什么后继入度减 1？", "能否判断输出数量小于顶点数意味着什么？"]
  },
  dijkstra: {
    vars:["dist[v] 是当前已知从源点到 v 的最短距离估计。", "fixed[v] 表示 v 的最短路已经确定。", "parent[v] 用来还原最短路径。"],
    scenarios:["适合所有边权非负的单源最短路径问题。", "导航、网络延迟、最小代价路径都常用这个思想。"],
    mistakes:["存在负权边时，已经确定的点可能后来又变短，Dijkstra 不适用。", "松弛时要判断 dist[u]+w 是否比原 dist[v] 更小。"],
    practice:["能否解释为什么每轮选 dist 最小的未确定点？", "能否手算一次松弛更新？", "能否根据 parent 还原一条最短路径？"]
  },
  floyd: {
    vars:["k 是当前允许使用的中转点编号。", "D[i][j] 表示当前允许范围内 i 到 j 的最短距离。", "path 或 next 表可用于恢复实际路线。"],
    scenarios:["适合点数较少、需要查询任意两点最短路的图。", "可处理负权边，但不能有负权回路。"],
    mistakes:["k 必须放在最外层，表示逐步扩大允许中转点集合。", "无穷距离参与加法时要小心，不存在路径不能直接相加。"],
    practice:["能否解释 D[i][j] 经过 k 变短是什么意思？", "能否说出三层循环各自枚举什么？", "能否判断 Floyd 与 Dijkstra 的适用区别？"]
  },
  sequential: {
    vars:["i 是当前比较的位置。", "x 是目标关键字。", "返回下标表示成功，返回 -1 或 0 常表示失败，取决于教材约定。"],
    scenarios:["适合无序表、数据量很小、一次性查找。", "当数据很大且查找频繁时，应该考虑排序后二分、树或哈希。"],
    mistakes:["循环边界写错会漏掉最后一个元素。", "找不到时必须有明确失败返回值。"],
    practice:["能否数出查找失败需要比较几次？", "能否说明目标在第一个位置为什么是最好情况？", "能否把顺序查找改成带哨兵版本？"]
  },
  binary: {
    vars:["low 和 high 表示当前候选区间边界。", "mid 是本轮比较位置。", "有序性是排除半边的逻辑依据。"],
    scenarios:["适合静态有序顺序表。", "链表不适合普通二分，因为无法 O(1) 访问中间位置。"],
    mistakes:["忘记 mid+1 或 mid-1 会导致区间不变。", "原表无序时二分结果没有意义。"],
    practice:["能否画出每轮 low、mid、high 的变化？", "能否解释为什么最多约 log2(n) 轮？", "能否处理目标不存在时的退出条件？"]
  },
  block: {
    vars:["索引表保存每块最大关键字和块起始位置。", "块间有序，块内可以无序。", "块大小影响索引查找和块内扫描的平衡。"],
    scenarios:["适合数据分块管理、块内不方便完全排序的场景。", "比顺序查找快，但通常不如严格有序表二分。"],
    mistakes:["索引表最大关键字维护错误，会定位到错误块。", "只查索引不查块内不能确定目标是否存在。"],
    practice:["能否根据目标值先定位到哪个块？", "能否解释为什么块内可以无序？", "能否分析块太大和块太小分别有什么问题？"]
  },
  bst: {
    vars:["key 是结点关键字。", "left/right 分别指向比当前结点小/大的子树。", "当前比较结点决定下一步向左还是向右。"],
    scenarios:["适合动态查找表，支持插入、查找、删除。", "数据随机时效果较好，数据有序插入时会退化。"],
    mistakes:["插入时不能破坏左小右大，否则后续查找路径全错。", "重复关键字要提前约定：忽略、计数或固定放一侧。"],
    practice:["能否解释查找 65 为什么一路走到对应路径？", "能否手动插入 33 并指出它挂在哪个父结点下？", "能否说明 BST 中序遍历为什么有序？"]
  },
  avl: {
    vars:["height 是结点高度。", "balance=左高-右高，用来判断是否失衡。", "旋转要同时恢复平衡和保持 BST 中序有序。"],
    scenarios:["适合需要稳定 O(log n) 查找和插入的动态表。", "相比普通 BST，AVL 插入删除更复杂，但查询更稳定。"],
    mistakes:["只旋转不更新高度会让后续判断错误。", "LR 和 RL 需要先对子结点旋转，再对失衡结点旋转。"],
    practice:["能否找出第一个失衡祖先？", "能否根据插入路径判断 LL、RR、LR、RL？", "能否解释旋转后为什么中序序列不变？"]
  },
  hash: {
    vars:["hash(key) 决定初始桶位置。", "负载因子表示表中元素数量和表容量的比例。", "冲突处理决定同位置多个关键字如何安放。"],
    scenarios:["适合等值查找，不适合直接做范围查询。", "关键字分布均匀、表容量合适时效率最高。"],
    mistakes:["只记平均 O(1) 不看冲突，会误判最坏情况。", "线性探测删除元素时不能简单清空，否则可能断开探测链。"],
    practice:["能否计算 19 在表长 m 下的初始位置？", "能否解释线性探测为何会产生聚集？", "能否比较链地址法和开放定址法？"]
  },
  insertion: {
    vars:["i 是当前要插入的元素位置。", "temp 暂存被拿出来的元素。", "j 从有序区末尾向左寻找插入位置。"],
    scenarios:["适合小数组或基本有序数组。", "常作为希尔排序或小规模快速排序子数组的收尾算法。"],
    mistakes:["插入排序主要是右移元素，不是相邻交换。", "如果不先保存 temp，右移会覆盖待插入值。"],
    practice:["能否指出当前左侧有序区范围？", "能否跟踪 temp 在一趟中的位置？", "能否解释基本有序时为什么接近 O(n)？"]
  },
  shell: {
    vars:["gap 是本轮分组间隔。", "相差 gap 的下标属于同一组。", "temp 和 j 的移动逻辑与直接插入排序相同，只是步长变成 gap。"],
    scenarios:["适合中等规模数组，代码简单且通常比直接插入快。", "效率取决于增量序列，教材常用 gap=n/2 逐步减半演示。"],
    mistakes:["不要把 gap 分组理解成连续切块，它是按下标间隔分组。", "gap 最后必须变成 1，否则不能保证全局有序。"],
    practice:["能否列出 gap=2 时每一组的下标？", "能否解释远距离移动为什么能减少最后一轮工作量？", "能否把一趟 gap 插入过程手算出来？"]
  },
  bubble: {
    vars:["i 表示已经完成的趟数。", "j 扫描当前未排序区的相邻元素。", "swapped 用来判断本趟是否发生交换。"],
    scenarios:["适合教学演示相邻交换和稳定性。", "实际大数据排序很少使用，因为平均效率低。"],
    mistakes:["每趟确定的是右侧最大值，不是左侧最小值。", "内层上界要随 i 缩短，否则会重复比较已确定区。"],
    practice:["能否指出每趟结束后哪个元素已经归位？", "能否解释没有交换时为什么可以提前停止？", "能否判断相等元素是否会交换？"]
  },
  quick: {
    vars:["pivot 是基准值，最终会归位。", "i 和 j 从两端向中间移动。", "一次 partition 只保证 pivot 左小右大，不保证两侧内部有序。"],
    scenarios:["平均性能好，工程中常作为通用排序思想。", "递归深度取决于划分是否均衡。"],
    mistakes:["把一趟划分当成完整排序是常见误解。", "pivot 选择极端时会退化成 O(n^2)。"],
    practice:["能否指出 pivot 最终落在哪个位置？", "能否解释空位法为什么不会丢数据？", "能否判断哪些输入会让快速排序最坏？"]
  },
  selection: {
    vars:["i 是当前要放最小值的位置。", "min 保存未排序区最小元素下标。", "未排序区每趟缩小一格。"],
    scenarios:["适合交换代价很高但比较代价较低的场景，因为每趟最多交换一次。", "教学上适合理解选择最值和有序区扩张。"],
    mistakes:["选择排序不是边比较边交换，而是先找完 min 再交换。", "即使数组已经有序，也仍要扫描找最小值。"],
    practice:["能否指出当前 min 为什么更新？", "能否说明每趟结束后前缀区有什么性质？", "能否举例说明选择排序为什么不稳定？"]
  },
  heap: {
    vars:["堆顶保存当前最大值。", "heapSize 表示还属于堆的范围。", "downAdjust 或 siftDown 通过下沉恢复父大于子的性质。"],
    scenarios:["适合需要 O(1) 额外空间且时间稳定的比较排序。", "也常用于优先队列和 Top K 问题。"],
    mistakes:["建堆不是从根开始，而通常从最后一个非叶子结点向前调整。", "交换堆顶到末尾后，末尾已经属于有序区，不能再参与下沉。"],
    practice:["能否找出数组表示中某结点的左右孩子下标？", "能否说明为什么大根堆堆顶最大？", "能否手动执行一次下沉过程？"]
  },
  merge: {
    vars:["leftIndex 和 rightIndex 分别指向两个有序子表当前表头。", "temp 保存合并后的结果。", "mid 把当前区间分成左右两半。"],
    scenarios:["适合稳定排序、链表排序、外部排序。", "当数据量大到无法一次全部放内存时，归并思想非常常用。"],
    mistakes:["合并前左右两边必须已经各自有序。", "某一边耗尽后，另一边剩余元素要整体接上。"],
    practice:["能否比较两个表头并决定取哪一个？", "能否解释相等时先取左边为什么稳定？", "能否说明归并为什么需要额外数组？"]
  },
  counting: {
    vars:["count[value] 记录某个值出现次数。", "k 是可能取值范围大小。", "输出阶段按值从小到大重复写出。"],
    scenarios:["适合整数、范围小、重复值较多的数据。", "如果需要稳定计数排序，还要把次数改造成前缀和位置。"],
    mistakes:["计数排序不是比较排序，不能直接处理任意对象。", "值域很大时 count 数组会浪费大量空间。"],
    practice:["能否根据原数组填出 count 数组？", "能否从 count 数组还原排序结果？", "能否判断什么时候计数排序不划算？"]
  },
  radix: {
    vars:["d 是需要处理的位数。", "bucket[0..r-1] 保存当前位相同的元素。", "稳定收集保证低位已有顺序不被打乱。"],
    scenarios:["适合位数固定的整数、编号、字符串等关键字。", "当关键字长度不大时，可以避免大量比较。"],
    mistakes:["每一位分桶都必须稳定，否则前一轮结果会失效。", "位数不同的数据要先约定补零或按规则处理。"],
    practice:["能否按个位把一组数分到 10 个桶？", "能否解释为什么先排个位再排十位？", "能否判断 r 和 d 对复杂度有什么影响？"]
  },
  bucket: {
    vars:["bucketIndex 决定元素落入哪个桶。", "桶内排序处理同一范围内的局部无序。", "最后按桶号顺序连接得到整体有序。"],
    scenarios:["适合数据近似均匀分布在某个范围内。", "常用于浮点数区间排序或先分区再局部排序。"],
    mistakes:["桶边界设计错误会导致元素落错桶。", "所有元素集中到一个桶时，桶排序退化成桶内排序。"],
    practice:["能否给每个元素计算桶号？", "能否解释为什么桶号从小到大连接后整体有序？", "能否判断什么分布适合桶排序？"]
  }
};
function getKnowledge(algo) {
  const detailById = {
    fact: { idea:"阶乘递归只解决一个问题：Fact(n)=n*Fact(n-1)。它把大问题不断缩小到 Fact(0)=1 或 Fact(1)=1，再沿调用栈逐层乘回去。", process:"执行时先检查递归出口；没到出口就保存当前 n，调用更小的 Fact(n-1)。底层返回后，上一层才继续完成 n * 子结果。", tips:"最容易错的是没有出口，或者递归参数没有变小。阶乘递归没有分支选择，时间和调用栈空间都随 n 线性增长。" },
    hanoi: { idea:"汉诺塔把移动 n 个盘拆成三步：先移动 n-1 个小盘，移动最大盘，再移动 n-1 个小盘。每次递归只是柱子的角色发生变化。", process:"Hanoi(n,A,B,C) 中 A 是起点，B 是辅助，C 是目标。先 Hanoi(n-1,A,C,B)，再移动 A 到 C，最后 Hanoi(n-1,B,A,C)。", tips:"不要死记柱子名字，要看起点、辅助、目标的角色。步骤数是 2^n-1，盘数增加一点，动画步骤会明显变多。" },
    preorderTraversal: { idea:"前序遍历把根放在最前面，规则是根、左、右。它像先写目录标题，再展开目录下面的内容。", process:"从 A 开始先输出 A，再进入 A 的左子树 B；进入 B 时又先输出 B，再继续进入 D。遇到空孩子就返回上一层，左边处理完后再处理右子树 C。", tips:"判断前序时不要等孩子结束，看到当前子树根就立刻输出。参差树上如果某个结点没有左孩子，就直接跳到它的右孩子。" },
    inorderTraversal: { idea:"中序遍历把根放在左子树和右子树中间，规则是左、根、右。它强调“先走到最左，再回头输出根”。", process:"从 A 出发不能马上输出 A，要先进入左子树 B；B 又先进入 D。D 没有左孩子，所以输出 D，再去 D 的右孩子 H。左侧全部结束后才回到 B、再回到 A。", tips:"中序最容易错在过早输出根。做题时可以在每个结点旁边写成“左完才根，根完才右”。" },
    postorderTraversal: { idea:"后序遍历把根放在最后，规则是左、右、根。它体现先处理孩子、最后处理父结点的思想。", process:"从 A 出发先递归左子树 B；B 的 D 子树里要先处理 H，再回到 D，最后回到 B。整棵左子树、右子树都输出完以后，A 才能最后输出。", tips:"后序题可以反复问自己：这个结点的左右子树都完成了吗？没完成就不能输出这个结点。" },
    heightCount: { idea:"高度、结点数、叶子数都基于同一棵树递归，但合并方式不同：高度取 max，结点数做加法，叶子数先判断是否无孩子。", process:"空树返回 0；非空结点递归求左右子树结果。高度返回 max(left,right)+1，结点数返回 left+right+1，叶子数遇到叶子返回 1。", tips:"叶子必须左右孩子都为空，只有一个孩子的结点不是叶子。高度看最长路径，不是结点总数。" },
    buildTree: { idea:"二叉树递归建树按文件先序记录创建结点：先读当前结点，再根据左右标志递归创建左子树和右子树。", process:"读到一行就 new 一个结点，把 data 填进去；左标志为 1 就继续读后续行建左孩子，右标志为 1 就建右孩子，否则对应指针为空。", tips:"读文件位置 i 必须在递归层之间共享，所以常用引用传递。还要保存当前行 k，避免建左子树时 i 改变后右标志判断错位。" },
    treeArray: { idea:"二叉链表转顺序存储利用完全二叉树编号：根在 i，左孩子在 2*i，右孩子在 2*i+1。", process:"递归访问当前结点，把它写入数组位置 i；再把左孩子写入 2*i，把右孩子写入 2*i+1。空结点直接返回。", tips:"普通二叉树不一定满，顺序数组可能出现空位。这个方法查父子位置方便，但稀疏树会浪费空间。" },
    relation: { idea:"父/兄弟/孩子查询本质是围绕指针关系判断。孩子从当前结点往下看，父亲则需要从根开始找谁的孩子指向目标。", process:"找父亲时遍历每个结点，检查 left 或 right 是否为目标。找到父亲后，另一个孩子就是兄弟；目标是根时没有父亲。", tips:"链式二叉树通常没有 parent 指针，所以父查询不能从目标往上走。目标不存在、根结点、独生子都是要单独说明的边界。" },
    lca: { idea:"最近共同祖先是两个目标结点往上遇到的最近分叉点，也可能就是其中一个目标本身。", process:"递归在左右子树中查找目标。左、右都返回非空时，当前根就是 LCA；只有一边非空时，把那一边的结果继续向上返回。", tips:"如果一个目标是另一个目标的祖先，算法会返回祖先本身。严格题目中若允许目标不存在，还要额外确认两个目标都被找到。" },
    leafPath: { idea:"叶子到根路径依赖 path 数组保存当前从根走到结点的路线。到达叶子时，这条路线就完整了。", process:"递归进入结点时把结点加入 path；如果它是叶子就输出 path；否则继续递归左右孩子。返回上一层时复用同一个 path。", tips:"只有左右孩子都为空才打印路径。回溯只是恢复临时路径状态，不是删除树上的结点。" },
    childSibling: { idea:"孩子兄弟表示用 firstChild 指向第一个孩子，用 nextSibling 指向下一个兄弟，两个指针就能表示普通树的任意多个孩子。", process:"统计某个结点的孩子数时，先沿 firstChild 到第一个孩子，再沿 nextSibling 横向数完兄弟链。树的度就是所有结点孩子数的最大值。", tips:"这不是普通二叉树语义：左指针表示向下找孩子，右指针表示同层找兄弟。看图时方向含义不能混淆。" },
    matrix: { idea:"邻接矩阵用 matrix[i][j] 表示顶点 i 和 j 是否有边。无向图一条边要写两个对称位置。", process:"添加无向边 i-j 时，同时设置 matrix[i][j] 和 matrix[j][i]。数边时只扫描右上三角，避免同一条边被数两次。", tips:"矩阵判断两点是否相邻很快，但空间固定是 V^2。树判定不能只看边数，还要确认连通且无环。" },
    adjList: { idea:"邻接表只保存真实存在的邻居，每个顶点对应一个邻居列表，适合边数远少于 V^2 的稀疏图。", process:"添加无向边 u-v 时，把 v 加入 u 的邻居表，也把 u 加入 v 的邻居表。遍历顶点 u 时只扫描 adj[u]。", tips:"邻接表空间是 O(V+E)。判断两个指定点是否相邻不如矩阵直接，但遍历邻居更省事。" },
    dfs: { idea:"DFS 深度优先，一看到未访问邻居就继续深入，直到走不动再回退。它像走迷宫时先死磕一条路。", process:"访问顶点时先标记 visited，再扫描邻居；遇到未访问邻居就递归 DFS。递归返回后继续扫描当前顶点剩下的邻居。", tips:"图里可能有环，visited 必不可少。DFS 输出顺序受邻居扫描顺序影响，不同合法顺序可能都正确。" },
    bfs: { idea:"BFS 广度优先，按距离层层扩散：先处理起点，再处理第一层邻居，再处理第二层邻居。", process:"起点入队并标记；每次取队头访问，把它所有未访问邻居入队。队列先进先出保证近的点先处理。", tips:"邻居入队前就要标记 visited，防止重复入队。无权图求最短步数常用 BFS，因为第一次到达就是最短。" },
    prim: { idea:"Prim 从已选顶点集合向外扩张，每次选择连接集合内外的最小边，把一个新顶点加入生成树。", process:"维护 lowcost，表示每个未选顶点连接当前生成树的最小代价。加入新顶点后，用它更新其他未选顶点的 lowcost。", tips:"Prim 每次只加入集合外的新顶点，所以不会成环。邻接矩阵朴素实现 O(V^2)，适合稠密图。" },
    kruskal: { idea:"Kruskal 从边出发，把所有边按权值从小到大尝试，能加入且不成环的边就选入生成树。", process:"先排序边；再用并查集判断一条边两个端点是否已在同一集合。不同集合就加入并合并，同一集合就跳过。", tips:"主要开销是边排序 O(E log E)。它更适合稀疏图，关键是会不会成环，而不是从哪个点开始。" },
    topo: { idea:"拓扑排序用于有向无环图，把有依赖关系的任务排成一个不违反先后顺序的序列。", process:"把所有入度为 0 的点入队；取出一个点输出，并让它指向的后继入度减 1。新的入度 0 点继续入队。", tips:"如果还有点没输出但没有入度为 0 的点，说明图中有环。拓扑序不一定唯一。" },
    dijkstra: { idea:"Dijkstra 求非负权图从一个源点到所有点的最短距离，每轮确定当前距离最小的未确定顶点。", process:"维护 dist 和 visited。选出未确定点中 dist 最小的 u，把 u 固定，再用 u 的出边尝试松弛邻居 v。", tips:"它不能处理负权边。朴素矩阵写法 O(V^2)，用优先队列和邻接表可优化稀疏图。" },
    floyd: { idea:"Floyd 求任意两点之间的最短路，核心思想是逐步允许更多中转点参与路径。", process:"三层循环枚举 k、i、j，判断从 i 到 j 直接走，是否不如经过 k 更短。公式是 D[i][j]=min(D[i][j],D[i][k]+D[k][j])。", tips:"时间 O(V^3)，空间 O(V^2)，适合点数较少但要查询任意两点最短路的情况。" },
    sequential: { idea:"顺序查找从表头开始逐个比较，不要求数据有序，也不要求特殊存储结构。", process:"当前元素等于目标就返回下标；否则继续比较下一个。扫完整个表还没找到，就返回查找失败。", tips:"目标在第一个位置最好 O(1)，目标在最后或不存在最坏 O(n)。它简单但大数据量下效率低。" },
    binary: { idea:"二分查找每次比较中间元素，并根据有序性排除一半候选区间。", process:"维护 low、high、mid。A[mid] 小于目标时 low=mid+1；A[mid] 大于目标时 high=mid-1；相等就返回。", tips:"前提必须是有序顺序表。更新边界时要 +1 或 -1，否则区间可能不缩小导致死循环。" },
    block: { idea:"分块查找先用索引确定目标可能在哪一块，再在块内顺序查找，是顺序查找和二分思想之间的折中。", process:"索引表通常保存每块最大关键字和起始位置。先查索引定位块，再进入对应块逐个比较。", tips:"块间有序即可，块内可无序。块大小接近 √n 时常见效率较好，块太大或太多都会拖慢。" },
    bst: { idea:"BST 二叉排序树遵守左小右大，每比较一次就能排除一整棵左子树或右子树。", process:"查找从根开始，小就走左，大就走右，相等成功。插入也按同样规则走，直到遇到空指针并挂入新结点。", tips:"树平衡时接近 O(log n)，按升序或降序插入会退化成链表，最坏 O(n)。本演示默认重复值不插入。" },
    avl: { idea:"AVL 是强制平衡的 BST，任意结点左右子树高度差不能超过 1。", process:"先按 BST 规则插入，再沿插入路径向上更新高度和平衡因子。发现失衡后，根据 LL、RR、LR、RL 四种情况旋转。", tips:"看动画时先找第一个失衡祖先，再判断新结点落在它的哪条路径。旋转后仍要保持 BST 中序有序。" },
    hash: { idea:"哈希查找用哈希函数把关键字映射到数组下标，理想情况下不用逐个比较就能定位。", process:"计算 hash(key) 得到位置；若位置为空或命中则结束；若冲突，线性探测继续找空位，链地址法则进入桶内链表。", tips:"平均 O(1) 依赖哈希函数分布均匀和负载因子合适。大量冲突会让查找退化。" },
    insertion: { idea:"直接插入排序维护左侧有序区，每次从未排序区取一个 temp 插入到正确位置。", process:"先暂存 temp，把比 temp 大的元素逐个右移，空位不断向左移动。找到位置后，把 temp 放回空位。", tips:"右移不是交换，所以动画会显示暂存值和空位。基本有序时很快，完全逆序时 O(n^2)。" },
    shell: { idea:"希尔排序是带 gap 的分组插入排序，先让远距离元素提前移动，再逐渐缩小 gap。", process:"gap 大于 1 时，下标相差 gap 的元素为一组，在组内做插入排序。gap 最终变成 1，再完成普通插入排序。", tips:"复杂度依赖增量序列。右移阶段同样是暂存 temp、移动空位，不是简单交换。" },
    bubble: { idea:"冒泡排序通过相邻比较和交换，把当前未排序区最大值一趟一趟推到右端。", process:"内层循环比较 A[j] 和 A[j+1]，逆序就交换。每趟结束后，右侧增加一个确定位置。", tips:"如果一整趟没有交换，说明数组已有序，可以提前结束。相等元素不交换时，冒泡排序稳定。" },
    quick: { idea:"快速排序一趟划分选择 pivot，让小于 pivot 的元素在左，大于 pivot 的元素在右，pivot 最终归位。", process:"空位法先暂存 pivot，左右指针交替找小数和大数填空。相遇位置就是 pivot 的最终位置。", tips:"一趟划分不是完整排序，左右子区间还要递归。pivot 每次极端会退化成 O(n^2)。" },
    selection: { idea:"直接选择排序每趟从未排序区选出最小值，放到未排序区开头。", process:"用 min 记录当前最小下标，扫描剩余元素不断更新 min。一趟结束后，只交换一次 A[i] 和 A[min]。", tips:"无论原数组是否有序，都要扫描未排序区，所以时间总是 O(n^2)。通常不稳定。" },
    heap: { idea:"堆排序利用大根堆性质：每个父结点都不小于孩子，因此最大值始终在堆顶。", process:"先建大根堆；再反复交换堆顶和当前末尾，把最大值放到有序区，并对剩余堆下沉调整。", tips:"堆排序时间稳定 O(n log n)，额外空间 O(1)，但通常不稳定。看动画时重点看下沉如何恢复堆性质。" },
    merge: { idea:"归并排序合并阶段把两个已经有序的子表合成一个更大的有序表。", process:"左右表各有一个指针，每次比较表头，取较小者进入结果表。某一边为空后，把另一边剩余元素直接接上。", tips:"相等时先取左表元素可以保持稳定。归并需要 O(n) 临时空间，但时间始终 O(n log n)。" },
    counting: { idea:"计数排序不比较元素大小，而是统计每个值出现次数，再按值从小到大输出。", process:"扫描原数组，count[value]++；再从最小值到最大值读取 count，把对应值重复输出。", tips:"适合整数范围 k 不大的情况。复杂度 O(n+k)，如果 k 巨大，空间会非常浪费。" },
    radix: { idea:"基数排序把关键字按个位、十位等位数分桶，多轮稳定分配和收集后得到有序序列。", process:"每一轮按当前位把元素放入 0 到 r-1 号桶，再按桶号顺序收集，进入下一位。", tips:"每轮必须稳定，否则低位排序结果会被破坏。d 是位数，r 是基数，复杂度 O(d(n+r))。" },
    bucket: { idea:"桶排序按取值范围把元素分到不同桶里，桶与桶之间天然有整体顺序。", process:"先计算每个元素属于哪个桶；再分别排序桶内元素；最后按桶号从小到大连接所有桶。", tips:"数据分布均匀时效率好；如果大量元素挤进一个桶，性能退化为桶内排序的复杂度。" }
  };
  const detail = detailById[algo.id];
    if (detail) {
    const extra = knowledgeExtras[algo.id] || {};
    const complexity = getComplexityInfo(algo);
    return [
      { title:"1. 核心思想", body:[detail.idea, `本页演示重点是：${algo.subtitle}。学习时先用一句话说清它解决什么问题，再看动画中的每一步状态变化。`, ...(extra.ideaMore || [])] },
      { title:"2. 执行过程", body:[detail.process, `观察 ${algo.title} 时，不要只看最终结果；要追踪当前高亮对象、右侧变量状态、以及已经确定的区域是否保持不变。`, ...(extra.processMore || [])] },
      { title:"3. 关键变量 / 图中元素", body:extra.vars || ["先看动画中被高亮的对象，它通常就是当前步骤正在比较、访问或移动的核心数据。", "再看右侧变量状态，变量变化就是算法推进的证据。"] },
      { title:"4. 复杂度与适用场景", body:[`时间复杂度：${complexity.time}`, `空间复杂度：${complexity.space}`, complexity.note, ...(extra.scenarios || [])] },
      { title:"5. 常见误区", body:[detail.tips, ...(extra.mistakes || [])] },
      { title:"6. 学习自检", body:extra.practice || ["能否说出这个算法每一步的目标？", "能否指出动画中哪个区域已经处理完成？", "能否用一个小例子手算完整过程？"] }
    ];
  }
  // TODO: Keep the chapter-level cards below only as a fallback for newly added algorithms.
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

function positionCodePanel() {
  const panel = $("codePanel");
  const visualPanel = document.querySelector(".visualPanel");
  const guide = $("visualSummary");
  const controls = document.querySelector(".controls");
  if (!panel || !visualPanel || !controls) return;
  const visualRect = visualPanel.getBoundingClientRect();
  const guideRect = guide ? guide.getBoundingClientRect() : visualRect;
  const controlsRect = controls.getBoundingClientRect();
  const gap = 10;
  panel.style.left = `${Math.max(8, visualRect.left + 14)}px`;
  panel.style.right = `${Math.max(8, window.innerWidth - visualRect.right + 14)}px`;
  panel.style.top = `${Math.max(8, guideRect.top)}px`;
  panel.style.bottom = `${Math.max(88, window.innerHeight - controlsRect.top + gap)}px`;
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

function treeSvgFrom(treeData, active = [], done = [], activeEdges = []) {
  const nodes = treeData.nodes;
  const edges = Object.entries(nodes).flatMap(([k, n]) => [n.l && [k, n.l], n.r && [k, n.r]].filter(Boolean));
  return `<div class="svgWrap"><svg viewBox="0 -20 800 410" width="800">
    ${edges.map(([a,b]) => `<line class="edge ${activeEdges.some(e => e[0]===a && e[1]===b) ? "active" : ""}" x1="${nodes[a].x}" y1="${nodes[a].y}" x2="${nodes[b].x}" y2="${nodes[b].y}"/>`).join("")}
    ${Object.entries(nodes).map(([k,n]) => `<g class="treeNode ${active.includes(k) ? "active" : done.includes(k) ? "done" : ""}">
      <circle cx="${n.x}" cy="${n.y}" r="23"></circle><text x="${n.x}" y="${n.y}">${k}</text>
    </g>`).join("")}
  </svg></div>`;
}

function treeSvg(active = [], done = [], activeEdges = []) {
  return treeSvgFrom(tree, active, done, activeEdges);
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

function buildTraversalModeSteps(mode) {
  const configs = {
    preorder: {
      name: "前序",
      rule: "根-左-右",
      seq: ["A","B","D","H","C","E","I","J","F","K"],
      explain: "先访问当前根，再递归左子树，最后递归右子树。",
      reason: node => `${node} 是当前子树的根，所以前序要在进入它的孩子之前先输出 ${node}。`
    },
    inorder: {
      name: "中序",
      rule: "左-根-右",
      seq: ["D","H","B","A","I","E","J","C","F","K"],
      explain: "先把左子树走完，回到根时输出根，再递归右子树。",
      reason: node => `已经处理完 ${node} 的左侧部分，所以中序现在回到并输出 ${node}，之后再看右侧。`
    },
    postorder: {
      name: "后序",
      rule: "左-右-根",
      seq: ["H","D","B","I","J","E","K","F","C","A"],
      explain: "必须等左右子树都处理完，最后才输出当前根。",
      reason: node => `${node} 的左右子树已经完成，所以后序最后输出这个根结点 ${node}。`
    }
  };
  const cfg = configs[mode];
  return cfg.seq.map((node, i) => ({
    text: `${cfg.name}遍历第 ${i + 1} 步：访问 ${node}。${cfg.reason(node)}`,
    active: [node],
    done: cfg.seq.slice(0, i),
    state: { 遍历类型: cfg.name, 访问规则: cfg.rule, 输出: cfg.seq.slice(0, i + 1).join(" ") },
    defense: `${cfg.name}遍历口诀是“${cfg.rule}”。${cfg.explain}`
  }));
}

function buildPreorderSteps() {
  return buildTraversalModeSteps("preorder");
}

function buildInorderSteps() {
  return buildTraversalModeSteps("inorder");
}

function buildPostorderSteps() {
  return buildTraversalModeSteps("postorder");
}

function renderTraversal(el, step) {
  el.innerHTML = treeSvg(step.active || [], step.done || []) + `<div class="formula">输出：${step.state?.输出 || ""}</div>`;
}

function renderIrregularTraversal(el, step) {
  el.innerHTML = treeSvgFrom(traversalTree, step.active || [], step.done || []) + `<div class="formula">输出：${step.state?.输出 || ""}</div>`;
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
  el.innerHTML = `<div class="adjListDiagram">${(step.adj || []).map((list,i) => `<div class="adjListRow"><div class="cell active">顶点 ${i}</div><div class="adjListNeighbors">${list.map(v=>`<div class="token">${v}</div>`).join("") || "<span class='formula'>暂无邻居</span>"}</div></div>`).join("")}</div>`;
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
    steps.push({text:`取 A[${i}]=${temp} 作为 temp，先把它从数组里“拿出来”，A[${i}] 暂时变成空位。`, arr:a.slice(), active:[i], done:range(0,i-1), hole:i, temp, state:{i,temp, 空位:i}, lines:[2,3]});
    while (j>=0 && a[j]>temp) {
      const moved = a[j];
      a[j+1]=a[j];
      steps.push({text:`A[${j}]=${moved} 大于 temp=${temp}，所以把 ${moved} 复制右移到 A[${j+1}]；空位左移到 A[${j}]，temp 仍然单独暂存，并没有丢失。`, arr:a.slice(), active:[j,j+1], done:range(0,i), hole:j, temp, move:`A[${j}] -> A[${j+1}]`, state:{j,temp, 空位:j}, lines:[5,6]});
      j--;
    }
    a[j+1]=temp;
    steps.push({text:`找到插入位置 A[${j+1}]，把暂存的 temp=${temp} 放回空位，本轮插入完成。`, arr:a.slice(), active:[j+1], done:range(0,i), state:{插入位置:j+1}, lines:[9], defense:"插入排序稳定，因为相等时不右移；右移阶段出现“复制”是为了给 temp 腾位置。" });
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
  steps.push({text:`选择 A[${low}]=${pivot} 作为 pivot，先把 pivot 暂存，A[${low}] 是等待填数的空位。`, arr:a.slice(), active:[low], hole:low, pivot, lines:[3,4], state:{pivot, 空位:low}});
  while (i<j) {
    while (i<j && a[j]>=pivot) { steps.push({text:`从右往左找小于 pivot 的数：A[${j}]=${a[j]} >= ${pivot}，不合适，j 左移。`, arr:a.slice(), active:[j], hole:i, pivot, lines:[6], state:{pivot, 空位:i}}); j--; }
    if (i<j) { const moved=a[j]; a[i]=a[j]; steps.push({text:`找到 A[${j}]=${moved} 小于 pivot，把它填到左边空位 A[${i}]；原来的 A[${j}] 变成新的空位。`, arr:a.slice(), active:[i,j], hole:j, pivot, move:`A[${j}] -> A[${i}]`, lines:[7], state:{pivot, 空位:j}}); }
    while (i<j && a[i]<=pivot) { steps.push({text:`从左往右找大于 pivot 的数：A[${i}]=${a[i]} <= ${pivot}，不合适，i 右移。`, arr:a.slice(), active:[i], hole:j, pivot, lines:[8], state:{pivot, 空位:j}}); i++; }
    if (i<j) { const moved=a[i]; a[j]=a[i]; steps.push({text:`找到 A[${i}]=${moved} 大于 pivot，把它填到右边空位 A[${j}]；原来的 A[${i}] 变成新的空位。`, arr:a.slice(), active:[i,j], hole:i, pivot, move:`A[${i}] -> A[${j}]`, lines:[9], state:{pivot, 空位:i}}); }
  }
  a[i]=pivot;
  steps.push({text:`i 和 j 相遇，把暂存的 pivot=${pivot} 放回 A[${i}]，一趟划分完成。`, arr:a.slice(), active:[i], done:[i], pivot, lines:[11], defense:"一趟划分只保证 pivot 归位，左右两边还要继续递归排序；空位法中间不是交换，而是来回填空。" });
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
  const holes = new Set(Array.isArray(step.hole) ? step.hole : step.hole === undefined ? [] : [step.hole]);
  const active = new Set(step.active || []);
  const done = new Set(step.done || []);
  const cells = step.arr.map((v,i) => {
    const isHole = holes.has(i);
    const cls = ["cell", active.has(i) ? "active" : "", done.has(i) ? "done" : "", isHole ? "hole" : ""].filter(Boolean).join(" ");
    return `<div><div class="${cls}">${isHole ? "空位" : v}</div><div class="index">${i}</div></div>`;
  }).join("");
  const chips = [];
  if (step.temp !== undefined) chips.push(`<span class="tempChip">暂存 temp = ${step.temp}</span>`);
  if (step.pivot !== undefined) chips.push(`<span class="tempChip pivotChip">暂存 pivot = ${step.pivot}</span>`);
  if (step.gap !== undefined) chips.push(`<span class="tempChip">gap = ${step.gap}</span>`);
  if (step.move) chips.push(`<span class="moveChip">${escapeHtml(step.move)}</span>`);
  el.innerHTML = `<div class="row">${cells}</div>${chips.length ? `<div class="sortMeta">${chips.join("")}</div>` : ""}`;
}

function renderMerge(el, step) {
  const row = (label, arr, active) => `<div><div class="label">${label}</div><div class="row">${arr.map(v => `<div class="cell ${active?"active":""}">${v}</div>`).join("") || "<span class='formula'>空</span>"}</div></div>`;
  el.innerHTML = row("左有序表", step.left, step.active==="left") + row("右有序表", step.right, step.active==="right") + row("合并结果", step.merged, true);
}

function buildShellSteps(seed) {
  const a = (seed && seed.length ? seed : parseNums(getSortArrayText("shell")));
  const steps = [{ text:"初始数组。希尔排序先用较大的 gap 粗略调整，再逐步缩小 gap。", arr:a.slice(), active:[], done:[], state:{gap:"尚未开始"}, lines:[1] }];
  for (let gap = Math.floor(a.length / 2); gap >= 1; gap = Math.floor(gap / 2)) {
    steps.push({ text:`本轮 gap=${gap}：下标相差 ${gap} 的元素属于同一组，在组内做插入排序。`, arr:a.slice(), active:[], done:[], gap, state:{gap}, lines:[2,3] });
    for (let i = gap; i < a.length; i++) {
      const temp = a[i];
      let j = i;
      steps.push({ text:`取 A[${i}]=${temp} 作为 temp，先把它暂存起来，A[${i}] 是这个 gap 小组里的空位。`, arr:a.slice(), active:[i], done:[], hole:i, temp, gap, state:{gap, i, temp, 空位:i}, lines:[4,5] });
      while (j >= gap && a[j - gap] > temp) {
        const moved = a[j - gap];
        a[j] = a[j - gap];
        steps.push({ text:`A[${j-gap}]=${moved} 大于 temp=${temp}，沿 gap=${gap} 的间隔右移到 A[${j}]；空位退到 A[${j-gap}]，temp 仍在暂存区。`, arr:a.slice(), active:[j-gap,j], done:[], hole:j-gap, temp, gap, move:`A[${j-gap}] -> A[${j}]`, state:{gap, temp, 空位:j-gap}, lines:[6,7] });
        j -= gap;
      }
      a[j] = temp;
      steps.push({ text:`把暂存的 temp=${temp} 放到 A[${j}]。这一条 gap=${gap} 的小组完成局部插入排序。`, arr:a.slice(), active:[j], done:[], gap, state:{gap, 放入位置:j}, lines:[9] });
    }
  }
  steps.push({ text:"gap 缩小到 1 并完成后，整个数组有序。", arr:a.slice(), active:[], done:range(0,a.length-1), state:{完成:"有序"}, defense:"希尔排序本质是“分组插入排序”。看到右移时不要理解成交换：程序先暂存 temp，再把较大的元素按 gap 复制右移，最后把 temp 放回空位。" });
  return steps;
}

function buildSelectionSteps(seed) {
  const a = (seed && seed.length ? seed : parseNums(getSortArrayText("selection")));
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


function buildComplexityLoopSteps() {
  return [
    { text:"单循环：i 从 1 到 n，每轮执行一次，所以执行次数随 n 线性增长。", panels:["for i=1..n", "执行 n 次", "时间 O(n)"], state:{循环:"单循环", 复杂度:"O(n)"} },
    { text:"双重循环：外层 n 次，内层也约 n 次，总次数约 n*n。", panels:["for i=1..n", "for j=1..n", "时间 O(n²)"], state:{循环:"嵌套循环", 复杂度:"O(n²)"} },
    { text:"折半循环：每轮规模除以 2，n、n/2、n/4...，能除多少次才到 1。", panels:["n -> n/2 -> n/4", "约 log₂n 次", "时间 O(log n)"], state:{循环:"折半", 复杂度:"O(log n)"}, defense:"复杂度看增长趋势，只保留最高阶并忽略常数。" }
  ];
}
function renderComplexityLoop(el, step) {
  el.innerHTML = `<div class="row">${step.panels.map((p,i)=>`<div class="cell ${i===step.panels.length-1?'active':''}">${escapeHtml(p)}</div>`).join("")}</div><div class="formula">判断顺序：变量怎么变 → 执行多少轮 → 保留最高阶。</div>`;
}

function buildLinearInsertDeleteSteps() {
  let a = ["A","B","C","D","E","F"];
  const steps = [
    { text:"顺序表删除第 i 个元素时，后面的元素必须依次左移来填补空位。准备删除 A[2]=C。", arr:a.slice(), active:[2], done:[], state:{操作:"删除", i:2, 移动次数:"n-i-1=3"} },
    { text:"C 被删除后，A[2] 出现空位；D、E、F 都要向左移动一格。", arr:["A","B","空位","D","E","F"], active:[2,3,4,5], hole:2, state:{空位:2} },
    { text:"左移完成，表长减 1。删除位置越靠前，需要移动的元素越多。", arr:["A","B","D","E","F"], active:[2,3,4], done:[0,1,2,3,4], state:{表长:5} },
    { text:"顺序表插入时相反：为了在 A[2] 插入 X，先从表尾开始把元素向右挪，避免覆盖。", arr:["A","B","D","E","F","空位"], active:[2,5], hole:2, state:{操作:"插入", 插入值:"X"} },
    { text:"D、E、F 右移后，A[2] 留出空位。注意必须从右往左移动。", arr:["A","B","空位","D","E","F"], active:[2,3,4,5], hole:2, state:{空位:2} },
    { text:"把 X 放入 A[2]，表长加 1。", arr:["A","B","X","D","E","F"], active:[2], done:[0,1,2,3,4,5], state:{结果:"A,B,X,D,E,F"}, defense:"顺序表能 O(1) 随机访问，但插入删除常常要 O(n) 移动。" }
  ];
  return steps;
}

function buildLinkedDedupSteps() {
  return [
    { text:"有序链表中重复元素一定相邻。p 指向当前保留结点，检查 p->next 是否重复。", values:[1,1,2,3,3,4], active:[0,1], removed:[], state:{p:"第1个 1", 比较:"1 和 1"} },
    { text:"p->data 等于 p->next->data，保存 q=p->next，再让 p->next=q->next，第二个 1 被跳过。", values:[1,1,2,3,3,4], active:[0,1], removed:[1], state:{删除:"第二个 1"} },
    { text:"p 仍停在第一个 1，继续检查下一个结点 2；不相等，p 向后移动。", values:[1,2,3,3,4], active:[0,1], removed:[], state:{p:"1 -> 2"} },
    { text:"移动到 3 时，发现后面也是 3，同样删除重复结点。", values:[1,2,3,3,4], active:[2,3], removed:[3], state:{删除:"第二个 3"} },
    { text:"扫描结束，链表变成 1 -> 2 -> 3 -> 4。", values:[1,2,3,4], active:[], removed:[], done:[0,1,2,3], state:{结果:"1->2->3->4"}, defense:"链表删除前必须保存 q，否则被删结点后面的链可能丢失。" }
  ];
}
function renderLinkedList(el, step) {
  const removed = new Set(step.removed || []), active = new Set(step.active || []), done = new Set(step.done || []);
  el.innerHTML = `<div class="row">${step.values.map((v,i)=>`<div><div class="cell ${active.has(i)?'active':''} ${done.has(i)?'done':''} ${removed.has(i)?'bad':''}">${v}</div><div class="index">${i}</div></div>${i<step.values.length-1?'<span class="formula">→</span>':''}`).join("")}</div><div class="formula">链表核心：改 next 指针，不移动元素本身。</div>`;
}

function buildOrderedIntersectionSteps() {
  const A=[1,3,5,7,9], B=[3,4,5,8,9], result=[];
  const steps=[{text:"两个有序表求交集，i 指向 A，j 指向 B。小的一方先前进。", A, B, i:0, j:0, result:[], state:{规则:"小者前进，相等保留"}}];
  let i=0,j=0;
  while(i<A.length && j<B.length){
    steps.push({text:`比较 A[${i}]=${A[i]} 和 B[${j}]=${B[j]}。`, A, B, i, j, result:result.slice(), state:{i,j}});
    if(A[i]===B[j]){ result.push(A[i]); steps.push({text:`两边相等，${A[i]} 属于交集，加入结果；i、j 同时后移。`, A, B, i, j, result:result.slice(), state:{加入:A[i]}}); i++; j++; }
    else if(A[i]<B[j]){ steps.push({text:`A[${i}] 更小，说明 ${A[i]} 不可能在 B 当前及后面出现，i 后移。`, A, B, i, j, result:result.slice()}); i++; }
    else { steps.push({text:`B[${j}] 更小，j 后移。`, A, B, i, j, result:result.slice()}); j++; }
  }
  steps.push({text:`交集完成：${result.join(", ")}。`, A, B, i:-1, j:-1, result, state:{结果:result.join(",")}, defense:"有序表双指针不需要回头，所以时间复杂度 O(m+n)。"});
  return steps;
}
function renderDualList(el, step) {
  const row = (name, arr, active) => `<div><div class="label">${name}</div><div class="row">${arr.map((v,i)=>`<div><div class="cell ${i===active?'active':''}">${v}</div><div class="index">${i}</div></div>`).join("")}</div></div>`;
  el.innerHTML = row("A", step.A, step.i) + row("B", step.B, step.j) + `<div><div class="label">交集结果</div><div class="row">${(step.result||[]).map(v=>`<div class="cell done">${v}</div>`).join("") || '<span class="formula">空</span>'}</div></div>`;
}

function buildStackSequenceSteps() {
  const push=[1,2,3,4,5], pop=[4,5,3,2,1];
  const stack=[], steps=[]; let j=0;
  steps.push({text:`判断 ${pop.join(",")} 是否可能是 1..5 的出栈序列。`, stack:[], out:[], state:{目标出栈:pop.join(",")}});
  for(let i=0;i<push.length;i++){
    stack.push(push[i]);
    steps.push({text:`压入 ${push[i]}。如果栈顶等于下一个目标出栈元素，就可以出栈。`, stack:stack.slice(), out:pop.slice(0,j), active:push[i], state:{栈顶:stack[stack.length-1], 下一个目标:pop[j]}});
    while(stack.length && stack[stack.length-1]===pop[j]){
      const x=stack.pop(); j++;
      steps.push({text:`栈顶 ${x} 正好等于目标 ${x}，弹出。`, stack:stack.slice(), out:pop.slice(0,j), active:x, state:{已匹配:pop.slice(0,j).join(",")}});
    }
  }
  steps.push({text:`所有目标都匹配成功，所以该出栈序列合法。`, stack:stack.slice(), out:pop.slice(0,j), state:{结果:"合法"}, defense:"目标不在栈顶就只能继续压栈；如果输入用完仍无法匹配，就是非法序列。"});
  return steps;
}
function renderStackSequence(el, step) {
  el.innerHTML = `<div class="row"><div><div class="label">栈底 → 栈顶</div><div class="stackQueue">${(step.stack||[]).map(x=>`<div class="token">${x}</div>`).join("") || '<span class="formula">空</span>'}</div></div><div><div class="label">已出栈</div><div class="stackQueue">${(step.out||[]).map(x=>`<div class="token done">${x}</div>`).join("") || '<span class="formula">空</span>'}</div></div></div>`;
}

function buildCircularQueueSteps() {
  const m=6; let q=Array(m).fill(""), front=0, rear=0;
  const steps=[];
  const snap=(text,active,state={})=>steps.push({text,q:q.slice(),front,rear,active,state:{front,rear,长度:`(${rear}-${front}+${m})%${m}=${(rear-front+m)%m}`,...state}});
  snap("初始循环队列为空：front=rear=0。", null, {状态:"空"});
  for(const x of ["A","B","C","D"]){ q[rear]=x; rear=(rear+1)%m; snap(`入队 ${x}：先写 rear 位置，再 rear=(rear+1)%m。`, (rear-1+m)%m); }
  const out=q[front]; q[front]=""; front=(front+1)%m; snap(`出队 ${out}：front 向后移动一格。`, front, {出队:out});
  for(const x of ["E","F"]){ q[rear]=x; rear=(rear+1)%m; snap(`入队 ${x}，rear 可能绕回数组前面。`, (rear-1+m)%m); }
  snap("若牺牲一个单元，(rear+1)%m==front 表示队满。", null, {判满:`(${rear}+1)%${m}==${front}`});
  return steps;
}
function renderCircularQueue(el, step) {
  el.innerHTML = `<div class="row">${step.q.map((v,i)=>`<div><div class="cell ${i===step.active?'active':''} ${i===step.front?'done':''} ${i===step.rear?'bad':''}">${v||'空'}</div><div class="index">${i}${i===step.front?' F':''}${i===step.rear?' R':''}</div></div>`).join("")}</div><div class="formula">循环队列通过取模让 front/rear 到末尾后回到 0。</div>`;
}

function buildStringSubstringsSteps() {
  const s="ABCD";
  const steps=[1,2,3,4].map(len=>({text:`长度为 ${len} 的子串有 ${s.length-len+1} 个。`, s, subs:Array.from({length:s.length-len+1},(_,i)=>s.slice(i,i+len)), state:{长度:len, 个数:s.length-len+1}}));
  steps.push({text:"总数 = 4+3+2+1 = n(n+1)/2 = 10。", s, subs:["总数 10"], state:{公式:"n(n+1)/2"}, defense:"空串若也计入，需要再加 1。"});
  return steps;
}
function renderStringSubstrings(el, step) {
  el.innerHTML = `<div class="formula">原串：${step.s}</div><div class="row">${step.subs.map(x=>`<div class="cell active">${x}</div>`).join("")}</div>`;
}

function buildArrayAddressSteps() {
  return [
    {text:"行优先存储先按行连续存放。设 A[0..2][0..3]，基地址 1000，每个元素 4 字节。", active:[0,0], state:{基地址:1000, 元素大小:4}},
    {text:"要求 A[2][3]：它前面有 2 整行，每行 4 个元素，再加本行前 3 个元素，共 2*4+3=11 个元素。", active:[2,3], state:{偏移元素数:"2*4+3=11"}},
    {text:"地址 = 1000 + 11*4 = 1044。列优先则要先按列计算。", active:[2,3], state:{地址:1044}, defense:"地址题先确认行优先还是列优先，再写上下界和元素大小。"}
  ];
}
function renderArrayAddress(el, step) {
  el.innerHTML = `<div class="matrix" style="grid-template-columns: repeat(5, 58px)"><div></div>${[0,1,2,3].map(j=>`<div class="matrixCell head">列${j}</div>`).join("")}${[0,1,2].map(i=>`<div class="matrixCell head">行${i}</div>${[0,1,2,3].map(j=>`<div class="matrixCell ${step.active?.[0]===i&&step.active?.[1]===j?'one':''}">A${i}${j}</div>`).join("")}`).join("")}</div>`;
}

function buildSparseMatrixSteps() {
  const mat=[[0,0,5,0],[0,0,0,0],[7,0,0,2],[0,9,0,0]];
  const triples=[]; const steps=[{text:"稀疏矩阵大多数元素为 0，所以只记录非零元素的行、列、值。", mat, triples:[], active:null}];
  mat.forEach((row,i)=>row.forEach((v,j)=>{ if(v!==0){ triples.push([i,j,v]); steps.push({text:`发现非零元素 A[${i}][${j}]=${v}，记录三元组 (${i}, ${j}, ${v})。`, mat, triples:triples.slice(), active:[i,j], state:{三元组:`(${i},${j},${v})`}}); }}));
  steps.push({text:"扫描完成，只保存 4 个非零元素，而不是保存 16 个矩阵格。", mat, triples, active:null, state:{非零个数:triples.length}, defense:"稀疏矩阵压缩适合非零元素远少于总元素数的情况。"});
  return steps;
}
function renderSparseMatrix(el, step) {
  el.innerHTML = `<div class="matrix" style="grid-template-columns: repeat(5, 44px)"><div></div>${[0,1,2,3].map(j=>`<div class="matrixCell head">${j}</div>`).join("")}${step.mat.map((row,i)=>`<div class="matrixCell head">${i}</div>${row.map((v,j)=>`<div class="matrixCell ${step.active?.[0]===i&&step.active?.[1]===j?'one':''}">${v}</div>`).join("")}`).join("")}</div><div class="row">${(step.triples||[]).map(t=>`<div class="cell done">(${t.join(',')})</div>`).join("")}</div>`;
}

function buildGeneralizedListSteps() {
  return [
    {text:"广义表 L=(a,(b,c),d)。head(L) 取第一个元素 a。", expr:"L = (a,(b,c),d)", result:"head(L)=a"},
    {text:"tail(L) 取除第一个元素外剩余部分，仍然是一个表：((b,c),d)。", expr:"tail(L)", result:"((b,c),d)"},
    {text:"head(tail(L)) 取剩余表的第一个元素，得到子表 (b,c)。", expr:"head(tail(L))", result:"(b,c)"},
    {text:"head(head(tail(L))) 再取子表 (b,c) 的表头，得到原子 b。", expr:"head(head(tail(L)))", result:"b", defense:"head 取表头元素，tail 取表尾子表；多层嵌套时每次只做一步。"}
  ];
}
function renderGeneralizedList(el, step) {
  el.innerHTML = `<div class="formula" style="font-size:28px">${escapeHtml(step.expr)}</div><div class="row"><div class="cell active">${escapeHtml(step.result)}</div></div>`;
}

function letterTree() {
  return {key:"A", left:{key:"B", left:{key:"D", left:{key:"H"}, right:{key:"I"}}, right:{key:"E", left:{key:"J"}, right:{key:"K"}}}, right:{key:"C", left:{key:"F", left:{key:"L"}, right:{key:"M"}}, right:{key:"G", left:{key:"N"}, right:{key:"O"}}}};
}
function buildRestoreTreeSteps() {
  const full={key:"A",left:{key:"B",left:{key:"D"},right:{key:"E"}},right:{key:"C",left:{key:"F"},right:{key:"G"}}};
  return [
    {text:"先序 ABDECFG 的第一个 A 是根。", tree:{key:"A"}, active:["A"], state:{先序:"ABDECFG", 中序:"DBEAFCG", 根:"A"}},
    {text:"在中序 DBEAFCG 中找到 A，左边 DBE 是左子树，右边 FCG 是右子树。", tree:{key:"A",left:{key:"?"},right:{key:"?"}}, active:["A"], state:{左子树:"DBE", 右子树:"FCG"}},
    {text:"左子树先序 BDE，所以 B 是左子树根；中序 D B E 切出 D 和 E。", tree:{key:"A",left:{key:"B",left:{key:"D"},right:{key:"E"}},right:{key:"?"}}, active:["B"]},
    {text:"右子树先序 CFG，所以 C 是右子树根；中序 F C G 切出 F 和 G。还原完成。", tree:full, active:["C"], state:{完成:"A(B(D,E),C(F,G))"}, defense:"先序/后序负责找根，中序负责切左右子树。"}
  ];
}
function renderRestoreTree(el, step) { el.innerHTML = renderTreeSvg(step.tree, step.active || []); }

function buildThreadedTreeSteps() {
  return [
    {text:"中序遍历序列为 H D I B J E K A L F M C N G O。线索化要按这个顺序处理前驱和后继。", active:["H"], seq:["H","D","I","B","J","E","K","A","L","F","M","C","N","G","O"], state:{当前:"H"}},
    {text:"处理 D：它的中序前驱是 H，后继是 I。如果 D 的某个孩子指针为空，就可改作线索。", active:["D"], seq:["H","D","I"], state:{前驱:"H", 当前:"D", 后继:"I"}},
    {text:"处理 B：中序前驱是 I，后继是 J。线索指针让遍历时不用递归或栈也能找下一个结点。", active:["B"], seq:["I","B","J"], state:{前驱:"I", 后继:"J"}},
    {text:"线索化完成后，空左指针可指向前驱，空右指针可指向后继，同时用 ltag/rtag 区分孩子还是线索。", active:["A"], seq:["H","D","I","B","J","E","K","A","L","F","M","C","N","G","O"], state:{标志:"0=孩子，1=线索"}, defense:"线索二叉树利用空指针域，目的不是改变遍历序列，而是加快找前驱/后继。"}
  ];
}
function renderThreadedTree(el, step) {
  el.innerHTML = treeSvg(step.active || []) + `<div class="row">${(step.seq||[]).map(x=>`<div class="cell ${step.active?.includes(x)?'active':''}">${x}</div>`).join("")}</div><div class="formula">中序线索：空左指针→前驱，空右指针→后继。</div>`;
}

function buildForestTransformSteps() {
  return [
    {text:"森林有两棵树：A 的孩子 B、C；D 的孩子 E、F。先把每棵树内部改成左孩子右兄弟。", active:["A","B","C"], state:{规则:"第一个孩子走左，兄弟走右"}},
    {text:"A.left=B，B.right=C；D.left=E，E.right=F。", active:["A","B","C","D","E","F"], state:{内部转换:"完成"}},
    {text:"森林中第二棵树的根 D 作为第一棵树根 A 的右兄弟，因此 A.right=D。", active:["A","D"], state:{森林连接:"A.right=D"}},
    {text:"转换完成后，左指针表示孩子，右指针表示兄弟或下一棵树根。", active:["A","B","C","D","E","F"], defense:"树/森林转二叉树时，右指针常表示兄弟，不是普通意义的右孩子。"}
  ];
}
function renderForestTransform(el, step) {
  const active=new Set(step.active||[]);
  const nodes={A:[180,80],B:[120,190],C:[260,190],D:[460,80],E:[400,190],F:[540,190]};
  const edges=[["A","B"],["B","C"],["A","D"],["D","E"],["E","F"]];
  el.innerHTML=`<div class="svgWrap"><svg viewBox="0 0 700 280" width="700">${edges.map(([a,b])=>`<line class="edge ${active.has(a)&&active.has(b)?'active':''}" x1="${nodes[a][0]}" y1="${nodes[a][1]}" x2="${nodes[b][0]}" y2="${nodes[b][1]}"/>`).join("")}${Object.entries(nodes).map(([n,[x,y]])=>`<g class="node ${active.has(n)?'active':''}"><circle cx="${x}" cy="${y}" r="27"/><text x="${x}" y="${y}">${n}</text></g>`).join("")}</svg></div><div class="formula">左孩子右兄弟：left=第一个孩子，right=下一个兄弟/下一棵树根。</div>`;
}

function buildHuffmanSteps() {
  let forest=[5,9,12,13,16,45];
  const steps=[{text:"初始森林中每个权值都是一棵单结点树。", forest:forest.slice(), merges:[], wpl:0, active:[]}];
  const merges=[]; let wpl=0;
  while(forest.length>1){ forest.sort((a,b)=>a-b); const a=forest.shift(), b=forest.shift(), c=a+b; wpl+=c; merges.push(`${a}+${b}=${c}`); forest.push(c); steps.push({text:`取最小两个权值 ${a} 和 ${b} 合并成 ${c}，把 ${c} 放回森林。`, forest:forest.slice().sort((x,y)=>x-y), merges:merges.slice(), wpl, active:[a,b,c], state:{本次合并:`${a}+${b}=${c}`, WPL累加:wpl}}); }
  steps.push({text:`只剩一棵树，Huffman 构造完成。WPL 可用每次合并权值之和累加得到：${wpl}。`, forest, merges, wpl, active:forest, defense:"Huffman 每次必须选当前最小的两棵树，不能凭感觉挑。"});
  return steps;
}
function renderHuffman(el, step) {
  el.innerHTML=`<div><div class="label">当前森林权值</div><div class="row">${(step.forest||[]).map(v=>`<div class="cell ${step.active?.includes(v)?'active':''}">${v}</div>`).join("")}</div></div><div><div class="label">合并记录</div><div class="stackQueue">${(step.merges||[]).map(x=>`<div class="token">${x}</div>`).join("")||'<span class="formula">暂无</span>'}</div></div><div class="formula">当前 WPL 累加 = ${step.wpl||0}</div>`;
}

function buildNonRecursivePreorderSteps() {
  const children={A:["B","C"],B:["D","E"],C:["F","G"],D:["H","I"],E:["J","K"],F:["L","M"],G:["N","O"]};
  const stack=["A"], out=[], steps=[{text:"先把根 A 入栈。非递归先序用栈模拟递归。", stack:stack.slice(), out:[], active:["A"], tree:letterTree()}];
  while(stack.length){ const x=stack.pop(); out.push(x); const [l,r]=children[x]||[]; if(r) stack.push(r); if(l) stack.push(l); steps.push({text:`弹出并访问 ${x}。先把右孩子入栈，再把左孩子入栈，所以下一步会先访问左孩子。`, stack:stack.slice(), out:out.slice(), active:[x], tree:letterTree(), state:{访问:x, 输出:out.join(" ")}}); }
  return steps;
}
function renderTreeStack(el, step) { el.innerHTML = renderTreeSvg(step.tree, step.active||[]) + `<div><div class="label">栈</div><div class="stackQueue">${(step.stack||[]).map(x=>`<div class="token">${x}</div>`).join("")||'<span class="formula">空</span>'}</div></div><div class="formula">输出：${(step.out||[]).join(" ")}</div>`; }

function buildDeleteSubtreeSteps() {
  const before=letterTree();
  const after={key:"A", left:null, right:before.right};
  return [
    {text:"目标是删除以 B 为根的整棵子树。先从根 A 开始查找 B。", tree:before, active:["A"], state:{目标:"B"}},
    {text:"找到 B 后，不能只删 B；还要释放 B 的所有后代，所以通常用后序思想先删孩子。", tree:before, active:["B","D","E"], state:{子树:"B-D/E-H/I/J/K"}},
    {text:"后序释放 H、I、D、J、K、E，最后释放 B。", tree:before, active:["H","I","D","J","K","E","B"], state:{释放顺序:"孩子先，根最后"}},
    {text:"把 A.left 置为空，删除完成。", tree:after, active:["A"], state:{结果:"A 的左子树为空"}, defense:"删除子树要避免内存泄漏，先释放子孙，再断开父结点指针。"}
  ];
}
function buildSwapChildrenSteps() {
  const before=letterTree();
  const after={key:"A", left:before.right, right:before.left};
  return [
    {text:"交换左右孩子是典型树递归：先交换当前结点 A 的 left 和 right。", tree:before, active:["A"], state:{当前:"A"}},
    {text:"递归进入原来的左子树 B，同样交换 B 的左右孩子 D、E。", tree:before, active:["B","D","E"], state:{当前:"B"}},
    {text:"递归进入原来的右子树 C，交换 F、G。所有结点都按同样规则处理。", tree:before, active:["C","F","G"], state:{当前:"C"}},
    {text:"整棵树左右镜像完成。", tree:after, active:["A"], state:{结果:"左右镜像"}, defense:"递归交换时，每个结点只负责交换自己的两个孩子，然后把同样任务交给左右子树。"}
  ];
}
function renderTreeMutation(el, step) { el.innerHTML = renderTreeSvg(step.tree, step.active||[]); }

function buildConnectedComponentsSteps() {
  const pos={0:[120,100],1:[220,70],2:[220,160],3:[420,100],4:[520,70],5:[520,160]};
  const edges=[[0,1],[0,2],[3,4],[4,5]];
  return [
    {text:"从顶点 0 开始 DFS，访问 0、1、2，得到第 1 个连通分量。", pos, edges, active:[0,1,2], done:[0,1,2], comps:[[0,1,2]], state:{分量1:"0,1,2"}},
    {text:"继续扫描顶点 3，发现它未访问，于是从 3 再启动一次 DFS。", pos, edges, active:[3], done:[0,1,2,3], comps:[[0,1,2]], state:{新起点:3}},
    {text:"访问 3、4、5，得到第 2 个连通分量。所有顶点扫描完毕。", pos, edges, active:[3,4,5], done:[0,1,2,3,4,5], comps:[[0,1,2],[3,4,5]], state:{分量2:"3,4,5"}, defense:"输出连通分量要对每个未访问顶点重新启动 DFS/BFS。"}
  ];
}
function renderComponentGraph(el, step) {
  el.innerHTML=`<div class="svgWrap"><svg viewBox="0 0 650 240" width="650">${step.edges.map(([a,b])=>`<line class="edge" x1="${step.pos[a][0]}" y1="${step.pos[a][1]}" x2="${step.pos[b][0]}" y2="${step.pos[b][1]}"/>`).join("")}${Object.entries(step.pos).map(([n,[x,y]])=>`<g class="node ${step.active.includes(Number(n))?'active':step.done.includes(Number(n))?'done':''}"><circle cx="${x}" cy="${y}" r="27"/><text x="${x}" y="${y}">${n}</text></g>`).join("")}</svg></div><div class="row">${(step.comps||[]).map((c,i)=>`<div class="cell done">分量${i+1}: ${c.join('-')}</div>`).join("")}</div>`;
}

function buildMatrixToListSteps() {
  const mat=[[0,1,1,0],[1,0,0,1],[1,0,0,0],[0,1,0,0]];
  const adj=[[],[],[],[]], steps=[{text:"从邻接矩阵第 0 行开始扫描，遇到 1 就把列号加入该顶点邻接表。", mat, adj:adj.map(a=>a.slice()), active:[0,0]}];
  for(let i=0;i<mat.length;i++) for(let j=0;j<mat.length;j++) if(mat[i][j]){ adj[i].push(j); steps.push({text:`matrix[${i}][${j}]=1，所以把 ${j} 加入 adj[${i}]。`, mat, adj:adj.map(a=>a.slice()), active:[i,j], state:{当前:`${i},${j}`}}); }
  steps.push({text:"转换完成。矩阵扫描耗时 O(V²)，邻接表最终只保存真实边。", mat, adj, active:null, defense:"无向图矩阵对称，所以转换后每条无向边会出现在两个邻接表中。"});
  return steps;
}
function renderMatrixToList(el, step) { renderMatrix(el, {mat:step.mat}); el.innerHTML += `<div class="adjListDiagram">${step.adj.map((list,i)=>`<div class="adjListRow"><div class="cell active">顶点 ${i}</div><div class="adjListNeighbors">${list.map(v=>`<div class="token">${v}</div>`).join("")||'<span class="formula">空</span>'}</div></div>`).join("")}</div>`; }

function buildAoeSteps() {
  const pos={0:[80,170],1:[220,90],2:[220,250],3:[390,90],4:[390,250],5:[550,170]};
  const edges=[[0,1,3],[0,2,2],[1,3,2],[2,3,4],[2,4,3],[3,5,2],[4,5,3]];
  return [
    {text:"AOE 网中，顶点表示事件，边表示活动及持续时间。先按拓扑序计算事件最早发生时间 ve。", pos, edges, active:[0], critical:[], ve:[0,0,0,0,0,0], vl:[], state:{任务:"正向求 ve"}},
    {text:"从 0 出发：ve[1]=3，ve[2]=2。", pos, edges, active:[1,2], critical:[[0,1],[0,2]], ve:[0,3,2,0,0,0], vl:[], state:{更新:"ve[1]=3, ve[2]=2"}},
    {text:"继续正向更新：ve[3]=max(3+2,2+4)=6，ve[4]=2+3=5，ve[5]=max(6+2,5+3)=8。", pos, edges, active:[3,4,5], critical:[[2,3],[3,5],[4,5]], ve:[0,3,2,6,5,8], vl:[], state:{ve:"0,3,2,6,5,8"}},
    {text:"逆拓扑计算 vl：终点 vl[5]=ve[5]=8，再向前取最小允许时间。", pos, edges, active:[5], critical:[], ve:[0,3,2,6,5,8], vl:[0,4,2,6,5,8], state:{vl:"0,4,2,6,5,8"}},
    {text:"活动最早开始 e=ve[u]，最迟开始 l=vl[v]-w。e==l 的活动是关键活动，组成关键路径。", pos, edges, active:[0,2,3,5], critical:[[0,2],[2,3],[3,5]], ve:[0,3,2,6,5,8], vl:[0,4,2,6,5,8], state:{关键路径:"0->2->3->5"}, defense:"关键路径长度决定工程最短工期，关键活动延误会直接拖延总工期。"}
  ];
}
function renderAoe(el, step) {
  const isCrit=(a,b)=>step.critical?.some(e=>e[0]===a&&e[1]===b);
  el.innerHTML=`<div class="svgWrap"><svg viewBox="0 0 650 330" width="680"><defs><marker id="aoeArrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#8a9ba3"/></marker></defs>${step.edges.map(([a,b,w])=>`<line class="edge ${isCrit(a,b)?'active':''}" marker-end="url(#aoeArrow)" x1="${step.pos[a][0]}" y1="${step.pos[a][1]}" x2="${step.pos[b][0]}" y2="${step.pos[b][1]}"/>${edgeWeightLabel({x:step.pos[a][0],y:step.pos[a][1]},{x:step.pos[b][0],y:step.pos[b][1]},w,18)}`).join("")}${Object.entries(step.pos).map(([n,[x,y]])=>`<g class="node ${step.active.includes(Number(n))?'active':''}"><circle cx="${x}" cy="${y}" r="27"/><text x="${x}" y="${y}">${n}</text></g>`).join("")}</svg></div><div class="row">${(step.ve||[]).map((v,i)=>`<div class="cell done">ve${i}=${v}</div>`).join("")}</div>${step.vl?.length?`<div class="row">${step.vl.map((v,i)=>`<div class="cell active">vl${i}=${v}</div>`).join("")}</div>`:""}`;
}

function buildBinaryDecisionTreeSteps() {
  const t={key:4,left:{key:2,left:{key:1},right:{key:3}},right:{key:6,left:{key:5},right:{key:7}}};
  return [
    {text:"对 1..7 做二分查找，第一次比较 mid=4，所以 4 是判定树根。", tree:t, active:[4], state:{第1层:"4"}},
    {text:"若目标小于 4，就进入左半区 1..3，下一次比较 2；若大于 4，就进入右半区 5..7，比较 6。", tree:t, active:[2,6], state:{第2层:"2,6"}},
    {text:"叶子 1、3、5、7 是第三层，表示最多比较 3 次。查找长度就是命中结点所在层数。", tree:t, active:[1,3,5,7], state:{最多比较次数:3}, defense:"二分查找判定树近似平衡，所以查找复杂度 O(log n)。"}
  ];
}
function renderDecisionTree(el, step) { el.innerHTML = renderTreeSvg(step.tree, step.active||[]); }

function buildBstDeleteSteps() {
  const before=buildBst([50,30,70,20,40,60,80,35,45]);
  const replaced=buildBst([50,35,70,20,40,60,80,45]);
  return [
    {text:"准备删除 BST 中的 30。先按 BST 查找规则：30 小于 50，走左，找到 30。", tree:before, active:[50,30], state:{目标:30}},
    {text:"30 有两个孩子，不能简单断开。常用做法是找右子树中最小结点，也就是中序后继 35。", tree:before, active:[30,35], state:{后继:35}},
    {text:"用 35 覆盖 30 的关键字，相当于把要删除的问题转移到原来 35 的位置。", tree:replaced, active:[35], state:{替换:"30 <- 35"}},
    {text:"删除原 35 结点，BST 中序序列仍然保持递增。", tree:replaced, active:[35], state:{完成:"删除 30"}, defense:"BST 删除分三类：叶子直接删，单孩子用孩子顶上，双孩子用前驱或后继替代。"}
  ];
}

function buildBstAslSteps() {
  const tree=buildBst([50,30,70,20,40,60,80]);
  return [
    {text:"ASL 是平均查找长度，BST 中每个结点的成功查找次数等于它所在层数。", tree, active:[50], depths:{50:1}, state:{根结点比较次数:1}},
    {text:"第二层 30、70 需要比较 2 次。", tree, active:[30,70], depths:{50:1,30:2,70:2}, state:{第二层:"2+2"}},
    {text:"第三层 20、40、60、80 各需要比较 3 次。", tree, active:[20,40,60,80], depths:{50:1,30:2,70:2,20:3,40:3,60:3,80:3}, state:{第三层:"3*4"}},
    {text:"ASL=(1+2+2+3+3+3+3)/7=17/7。", tree, active:[], depths:{50:1,30:2,70:2,20:3,40:3,60:3,80:3}, state:{ASL:"17/7"}, defense:"树越平衡，平均查找长度越小；退化成链表时 ASL 会明显变大。"}
  ];
}
function renderBstAsl(el, step) { el.innerHTML = renderTreeSvg(step.tree, step.active||[]) + `<div class="row">${Object.entries(step.depths||{}).map(([k,d])=>`<div class="cell ${step.active?.includes(Number(k))?'active':'done'}">${k}: ${d}次</div>`).join("")}</div>`; }

function buildHashAslSteps() {
  const keys=[19,14,23,1,68], m=7, table=Array(m).fill(""), probes={};
  const steps=[];
  keys.forEach(k=>{ let pos=k%m, c=1; while(table[pos]!==""){ pos=(pos+1)%m; c++; } table[pos]=k; probes[k]=c; });
  steps.push({text:"先按 H(key)=key%7 和线性探测构造散列表。", table:table.slice(), active:[], probes, state:{表长:m}});
  for(const k of keys){ steps.push({text:`成功查找 ${k} 需要 ${probes[k]} 次探测。`, table:table.slice(), active:[table.indexOf(k)], probes, state:{key:k, 成功探测次数:probes[k]}}); }
  const success=keys.reduce((s,k)=>s+probes[k],0)/keys.length;
  steps.push({text:`成功 ASL = (${keys.map(k=>probes[k]).join("+")})/${keys.length} = ${success.toFixed(2)}。`, table:table.slice(), active:[], probes, state:{成功ASL:success.toFixed(2)}});
  steps.push({text:"失败 ASL 要统计每个可能初始地址查到空位需要几次探测，不能和成功 ASL 混算。", table:table.slice(), active:[], probes, state:{失败ASL:"按空位探测路径统计"}, defense:"散列表题一定先写哈希函数和冲突处理规则，再逐个数探测次数。"});
  return steps;
}
function renderHashAsl(el, step) { el.innerHTML = `<div class="row">${step.table.map((v,i)=>`<div><div class="cell ${step.active?.includes(i)?'active':v!==''?'done':''}">${v||'空'}</div><div class="index">${i}</div></div>`).join("")}</div><div class="row">${Object.entries(step.probes||{}).map(([k,c])=>`<div class="cell done">${k}: ${c}次</div>`).join("")}</div>`; }
function buildLinkedSplitSteps() {
  const values=[3,-1,4,-5,2,-2,7];
  const steps=[]; const positive=[], negative=[];
  steps.push({text:"准备把链表按正数/负数拆成两条链。为了保持原相对顺序，两条结果链都使用尾插法。", values, positive:[], negative:[], active:null, state:{规则:"正数进 A，负数进 B"}});
  values.forEach((v,i)=>{
    if(v>=0){ positive.push(v); steps.push({text:`结点 ${v} 满足非负条件，接到 A 链尾部，tailA 后移。`, values, positive:positive.slice(), negative:negative.slice(), active:i, state:{当前:v, 去向:"A 链"}}); }
    else { negative.push(v); steps.push({text:`结点 ${v} 为负数，接到 B 链尾部，tailB 后移。`, values, positive:positive.slice(), negative:negative.slice(), active:i, state:{当前:v, 去向:"B 链"}}); }
  });
  steps.push({text:"扫描结束，A/B 两条链都要把尾结点 next 置空，防止拖着原链旧后继。", values, positive, negative, active:null, state:{A:positive.join("->"), B:negative.join("->")}, defense:"链表拆分最怕丢后继：处理当前结点前要先保存 next。"});
  return steps;
}
function renderSplitList(el, step) {
  const source = `<div><div class="label">原链表</div><div class="row">${step.values.map((v,i)=>`<div class="cell ${i===step.active?'active':''}">${v}</div>`).join('<span class="formula">→</span>')}</div></div>`;
  const a = `<div><div class="label">A 链（非负）</div><div class="row">${(step.positive||[]).map(v=>`<div class="cell done">${v}</div>`).join('<span class="formula">→</span>') || '<span class="formula">空</span>'}</div></div>`;
  const b = `<div><div class="label">B 链（负数）</div><div class="row">${(step.negative||[]).map(v=>`<div class="cell active">${v}</div>`).join('<span class="formula">→</span>') || '<span class="formula">空</span>'}</div></div>`;
  el.innerHTML = source + a + b;
}
function buildLinkedInsertionSortSteps() {
  const input=[4,1,5,2,3], sorted=[], rest=input.slice(), steps=[];
  steps.push({text:"从原链表取结点，逐个插入到 sorted 有序链表中。", sorted:[], rest:rest.slice(), active:null});
  while(rest.length){
    const x=rest.shift(); let pos=0; while(pos<sorted.length && sorted[pos]<x) pos++;
    steps.push({text:`摘下结点 ${x}，在 sorted 中寻找第一个大于它的位置。`, sorted:sorted.slice(), rest:rest.slice(), active:x, state:{当前:x, 插入位置:pos}});
    sorted.splice(pos,0,x);
    steps.push({text:`把 ${x} 插入 sorted 的第 ${pos} 个位置，sorted 仍保持递增。`, sorted:sorted.slice(), rest:rest.slice(), active:x, state:{sorted:sorted.join("->")}});
  }
  steps.push({text:"未处理链表为空，链表递增排序完成。", sorted:sorted.slice(), rest:[], active:null, state:{结果:sorted.join("->")}, defense:"链表插入排序靠改指针接入结点，不需要像顺序表那样整体右移。"});
  return steps;
}
function renderLinkedSort(el, step) {
  const row = (name, arr, cls) => `<div><div class="label">${name}</div><div class="row">${arr.map(v=>`<div class="cell ${v===step.active?'active':cls}">${v}</div>`).join('<span class="formula">→</span>') || '<span class="formula">空</span>'}</div></div>`;
  el.innerHTML = row("sorted 有序链", step.sorted||[], "done") + row("未处理链", step.rest||[], "");
}
function buildDoubleListDeleteSteps() {
  const values=["A","B","C","D"];
  return [
    {text:"双链表准备删除结点 C。先找到 C 的前驱 B 和后继 D。", values, active:2, pre:1, next:3, state:{p:"C", pre:"B", next:"D"}},
    {text:"执行 B->next = D，让前向链绕过 C。", values, active:2, pre:1, next:3, state:{语句:"p->prior->next = p->next"}},
    {text:"执行 D->prior = B，让后向链也绕过 C。", values, active:2, pre:1, next:3, state:{语句:"p->next->prior = p->prior"}},
    {text:"释放 C，双链表删除完成。", values:["A","B","D"], active:-1, pre:1, next:2, state:{结果:"A<->B<->D"}, defense:"双链表删除必须同时维护 next 和 prior 两个方向。"}
  ];
}
function renderDoubleListDelete(el, step) {
  el.innerHTML = `<div class="row">${step.values.map((v,i)=>`<div><div class="cell ${i===step.active?'bad':i===step.pre||i===step.next?'active':''}">${v}</div><div class="index">${i}</div></div>${i<step.values.length-1?'<span class="formula">⇄</span>':''}`).join("")}</div><div class="formula">删除 p：p->prior->next=p->next；p->next->prior=p->prior。</div>`;
}
function buildLinkedQueueEnqueueSteps() {
  return [
    {text:"带头结点链队初始为空，front 和 rear 都指向头结点。", queue:[], front:"head", rear:"head", active:null, state:{状态:"空队"}},
    {text:"入队 A：创建新结点 s，让 rear->next=s。", queue:["A"], front:"head", rear:"head", active:"A", state:{新结点:"A", 第一步:"rear->next=s"}},
    {text:"再让 rear=s，队尾指针移动到 A。", queue:["A"], front:"head", rear:"A", active:"A", state:{第二步:"rear=s"}},
    {text:"继续入队 B，同样先接到 rear->next，再移动 rear。", queue:["A","B"], front:"head", rear:"B", active:"B", state:{队列:"A,B"}},
    {text:"链队入队完成。front 负责出队端，rear 负责入队端。", queue:["A","B"], front:"head", rear:"B", active:null, defense:"若最后一个元素出队，rear 要重新指向 front，表示空队。"}
  ];
}
function renderLinkedQueue(el, step) {
  el.innerHTML = `<div class="row"><div class="cell done">head</div>${(step.queue||[]).map(v=>`<span class="formula">→</span><div class="cell ${v===step.active?'active':''}">${v}${v===step.rear?' rear':''}</div>`).join("")}</div><div class="formula">front=${step.front}，rear=${step.rear}</div>`;
}
function buildArrayPartitionSteps() {
  const steps=[]; let arr=[3,-1,4,-5,2,-2,7];
  steps.push({text:"目标：把非负数放左边，负数放右边。左右指针分别从两端向中间扫描。", arr:arr.slice(), active:[0,arr.length-1], state:{i:0,j:arr.length-1}});
  steps.push({text:"i=0 的 3 已经属于左区，i 右移；j=6 的 7 不属于右区，等待交换。", arr:arr.slice(), active:[1,6], state:{i:1,j:6}});
  [arr[1],arr[6]]=[arr[6],arr[1]];
  steps.push({text:"A[1] 是负数、A[6] 是非负数，交换它们。", arr:arr.slice(), active:[1,6], state:{交换:"-1 和 7"}});
  steps.push({text:"继续扫描：3、7、4 都属于左区，i 移到 3；右侧 -1、-2 属于右区，j 移到 4。", arr:arr.slice(), active:[3,4], state:{i:3,j:4}});
  [arr[3],arr[4]]=[arr[4],arr[3]];
  steps.push({text:"A[3] 是负数、A[4] 是非负数，再交换。", arr:arr.slice(), active:[3,4], state:{交换:"-5 和 2"}});
  steps.push({text:"指针相遇，分区完成：左边都是非负数，右边都是负数；区内不保证有序。", arr:arr.slice(), done:[0,1,2,3,4,5,6], state:{结果:arr.join(",")}, defense:"分区不是完整排序，只保证满足条件的元素被分到两侧。"});
  return steps;
}
function buildLevelOrderLeavesSteps() {
  const children={A:["B","C"],B:["D","E"],C:["F","G"],D:["H","I"],E:["J","K"],F:["L","M"],G:["N","O"]};
  const queue=["A"], leaves=[], steps=[{text:"根 A 入队。层序遍历用队列从上到下处理结点。", tree:letterTree(), queue:queue.slice(), leaves:[], active:["A"], state:{队列:"A"}}];
  while(queue.length){ const x=queue.shift(); const cs=children[x]||[]; if(cs.length===0){ leaves.push(x); steps.push({text:`${x} 没有左右孩子，是叶子，输出到叶子序列。`, tree:letterTree(), queue:queue.slice(), leaves:leaves.slice(), active:[x], state:{叶子输出:leaves.join(" ")}}); } else { queue.push(...cs); steps.push({text:`${x} 不是叶子，把它的孩子 ${cs.join("、")} 入队。`, tree:letterTree(), queue:queue.slice(), leaves:leaves.slice(), active:[x].concat(cs), state:{入队:cs.join(","), 队列:queue.join(" ")}}); } }
  steps.push({text:`队列为空，层序叶子输出完成：${leaves.join(" ")}。`, tree:letterTree(), queue:[], leaves, active:leaves, state:{结果:leaves.join(" ")}, defense:"层序遍历的核心是队列；叶子判断是左右孩子都为空。"});
  return steps;
}
function renderLevelOrderLeaves(el, step) {
  el.innerHTML = renderTreeSvg(step.tree, step.active||[]) + `<div><div class="label">队列</div><div class="stackQueue">${(step.queue||[]).map(x=>`<div class="token">${x}</div>`).join("")||'<span class="formula">空</span>'}</div></div><div><div class="label">叶子输出</div><div class="stackQueue">${(step.leaves||[]).map(x=>`<div class="token done">${x}</div>`).join("")||'<span class="formula">暂无</span>'}</div></div>`;
}
function buildDeleteVertexConnectivitySteps() {
  const pos={0:[90,120],1:[220,120],2:[350,60],3:[350,180],4:[500,120]};
  const edges=[[0,1],[1,2],[1,3],[2,4],[3,4]], del=1;
  return [
    {text:"原图连通。现在假设删除顶点 1，所有与 1 相连的边也不能再使用。", pos, edges, del, active:[1], done:[], state:{删除顶点:1}},
    {text:"从剩余顶点 0 开始 DFS。由于 0 只连着被删除的 1，所以无法继续访问其他顶点。", pos, edges, del, active:[0], done:[0], state:{起点:0, 已访问:"0"}},
    {text:"检查剩余顶点发现 2、3、4 都未访问，因此删除 1 后图不连通。", pos, edges, del, active:[2,3,4], done:[0], state:{结论:"不连通"}, defense:"删点连通性判断要跳过被删除顶点及其所有关联边。"}
  ];
}
function renderDeleteVertexGraph(el, step) {
  const del=String(step.del); const active=new Set((step.active||[]).map(String)); const done=new Set((step.done||[]).map(String));
  el.innerHTML=`<div class="svgWrap"><svg viewBox="0 0 620 260" width="640">${step.edges.map(([a,b])=>`<line class="edge ${a===step.del||b===step.del?'bad':''}" x1="${step.pos[a][0]}" y1="${step.pos[a][1]}" x2="${step.pos[b][0]}" y2="${step.pos[b][1]}"/>`).join("")}${Object.entries(step.pos).map(([n,[x,y]])=>`<g class="node ${n===del?'bad':active.has(n)?'active':done.has(n)?'done':''}"><circle cx="${x}" cy="${y}" r="27"/><text x="${x}" y="${y}">${n}</text></g>`).join("")}</svg></div><div class="formula">红色顶点 ${step.del} 已删除，遍历不能经过它。</div>`;
}
function buildSequentialAslSteps() {
  const arr=[11,22,33,44,55], counts=[];
  const steps=[{text:"顺序查找成功 ASL：第 i 个元素要比较 i+1 次。先列出每个元素的比较次数。", arr, active:[], counts:[], state:{公式:"ASL=ΣPiCi"}}];
  arr.forEach((v,i)=>{ counts.push(i+1); steps.push({text:`查找 ${v} 时，需要依次比较到下标 ${i}，共 ${i+1} 次。`, arr, active:[i], counts:counts.slice(), state:{关键字:v, 比较次数:i+1}}); });
  steps.push({text:"等概率成功 ASL=(1+2+3+4+5)/5=3。", arr, active:[], counts, state:{成功ASL:3}, defense:"成功 ASL 与失败 ASL 要分开统计；若概率不同要做加权平均。"});
  return steps;
}
function renderSequentialAsl(el, step) {
  el.innerHTML = `<div class="row">${step.arr.map((v,i)=>`<div><div class="cell ${(step.active||[]).includes(i)?'active':''}">${v}</div><div class="index">C=${i+1}</div></div>`).join("")}</div><div class="row">${(step.counts||[]).map(c=>`<div class="cell done">${c}次</div>`).join("")}</div>`;
}function clone(x) { return x.map(r => r.slice()); }
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
    positionCodePanel();
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







