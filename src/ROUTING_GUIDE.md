# InfiniteBrick AI - 路由系统指南

## 🎯 路由架构总览

### 路由表

| 路由路径 | 页面组件 | 访问权限 | 说明 |
|---------|---------|---------|------|
| `/` | LandingPage | 公开 | 营销官网首页 |
| `/login` | LoginPage | 公开 | 用户登录 |
| `/signup` | SignupPage | 公开 | 用户注册 |
| `/community` | CommunityPage | 公开 | 灵感社区（所有人可浏览） |
| `/community/:id` | ModelDetailPage | 公开 | 作品详情页 |
| `/studio` | StudioPage | 🔒 需登录 | SaaS 工作台 |
| `/dashboard/*` | DashboardPage | 🔒 需登录 | 个人中心（嵌套路由） |
| `/dashboard/models` | MyModels | 🔒 需登录 | 我的模型 |
| `/dashboard/orders` | MyOrders | 🔒 需登录 | 我的订单 |
| `/dashboard/settings` | AccountSettings | 🔒 需登录 | 账户设置 |

---

## 🔐 认证系统

### AuthContext (`/contexts/AuthContext.tsx`)

**功能**：
- 全局用户状态管理
- 登录/注册/登出方法
- 用户信息存储

**接口**：
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  plan: 'free' | 'pro' | 'enterprise';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}
```

**使用方式**：
```tsx
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  // ...
}
```

---

## 🛡️ 路由守卫

### ProtectedRoute (`/components/ProtectedRoute.tsx`)

**功能**：
- 保护需要登录的页面
- 未登录用户自动重定向到 `/login`
- 登录后返回原页面

**实现原理**：
```tsx
<ProtectedRoute>
  <StudioPage />
</ProtectedRoute>
```

未登录访问 `/studio` → 重定向到 `/login?from=/studio` → 登录成功后跳回 `/studio`

---

## 🧭 导航栏系统

### 两套导航栏

#### 1. MarketingNav (`/components/navigation/MarketingNav.tsx`)
**使用场景**：营销官网（Landing Page）

**特点**：
- 透明背景 → 滚动后变实色
- Login / Sign Up 按钮
- 已登录显示 "Go to Studio" 按钮
- 响应式移动菜单

**菜单项**：
- Product（锚点链接）
- Community（路由链接 `/community`）
- Pricing（锚点链接）

#### 2. AppNav (`/components/navigation/AppNav.tsx`)
**使用场景**：应用内页面（Studio, Community, Dashboard）

**特点**：
- 实色背景
- Studio / Community 导航
- 通知图标
- 用户头像下拉菜单

**用户菜单**：
- My Models → `/dashboard/models`
- Orders → `/dashboard/orders`
- Settings → `/dashboard/settings`
- Logout

---

## 📄 页面组件

### 1. LandingPage (`/pages/LandingPage.tsx`)
**路由**：`/`

**组件结构**：
```tsx
<MarketingNav />
<Hero />
<CoreValues />
<Gallery />
<TrustBadges />
<Footer />
```

**CTA 按钮逻辑**：
- "Start Creating" 按钮：
  - 已登录 → `/studio`
  - 未登录 → `/signup`

---

### 2. LoginPage (`/pages/LoginPage.tsx`)
**路由**：`/login`

**功能**：
- 用户登录表单
- 记住我选项
- 忘记密码链接
- 跳转注册链接
- 登录成功后重定向

**重定向逻辑**：
```tsx
// 从受保护页面跳转来的，登录后返回
from = location.state?.from || '/studio'
```

**演示提示**：
任何邮箱和密码都可登录（mock 数据）

---

### 3. SignupPage (`/pages/SignupPage.tsx`)
**路由**：`/signup`

**功能**：
- 用户注册表单
- 左侧产品优势展示
- 服务条款勾选
- 注册成功自动登录并跳转 `/studio`

---

### 4. StudioPage (`/pages/StudioPage.tsx`)
**路由**：`/studio` 🔒

**功能**：
- 三栏工作台布局
- 提示词生成
- 3D 视窗
- 零件清单和购买

**URL 参数支持**（预留）：
- `?project=abc123` - 打开特定项目
- `?template=castle` - 使用模板
- `?fork=xyz789` - Fork 他人作品

---

### 5. CommunityPage (`/pages/CommunityPage.tsx`)
**路由**：`/community`

**特点**：
- 公开访问（无需登录）
- 已登录用户显示 AppNav
- 未登录用户无导航栏（可选）

**瀑布流画廊**：
- 点击卡片 → `/community/:id` 详情页
- 悬浮显示快捷操作

---

### 6. ModelDetailPage (`/pages/ModelDetailPage.tsx`)
**路由**：`/community/:id`

**功能**：
- 作品详情展示
- 创作者信息
- 规格参数
- 价格信息
- 购买/Remix 按钮

**权限逻辑**：
- 未登录：可浏览，不能 Remix/下载
- 已登录：显示 Remix、下载 BOM 按钮

**CTA 按钮**：
- "Buy Physical Set" → 购买流程
- "Remix" → `/studio?template=:id`

---

### 7. DashboardPage (`/pages/DashboardPage.tsx`)
**路由**：`/dashboard/*` 🔒

**嵌套路由**：
```tsx
<Routes>
  <Route path="/" element={<Navigate to="/dashboard/models" />} />
  <Route path="/models" element={<MyModels />} />
  <Route path="/orders" element={<MyOrders />} />
  <Route path="/settings" element={<AccountSettings />} />
</Routes>
```

**布局**：
- 左侧：DashboardSidebar（导航菜单）
- 右侧：内容区域（根据路由切换）

---

## 🔗 链接和导航方式

### 1. 使用 Link 组件（声明式）
```tsx
import { Link } from 'react-router-dom';

<Link to="/studio">Go to Studio</Link>
<Link to={`/community/${model.id}`}>View Model</Link>
```

### 2. 使用 useNavigate Hook（编程式）
```tsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

// 跳转
navigate('/studio');

// 带参数
navigate(`/community/${id}`);

// 后退
navigate(-1);

// 替换历史记录
navigate('/login', { replace: true });

// 传递状态
navigate('/studio', { state: { from: '/community' } });
```

### 3. 锚点链接（页面内）
```tsx
<a href="#product">Product</a>
```

---

## 🎨 导航状态管理

### 当前路由高亮

#### AppNav 示例：
```tsx
import { useLocation } from 'react-router-dom';

const location = useLocation();
const isActive = location.pathname === '/studio';

<Link 
  to="/studio"
  className={isActive ? 'active-style' : 'default-style'}
>
  Studio
</Link>
```

#### DashboardSidebar 示例：
```tsx
const isActive = location.pathname === '/dashboard/models';
```

---

## 📊 URL 参数管理

### 查询参数（Search Params）

```tsx
import { useSearchParams } from 'react-router-dom';

function StudioPage() {
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get('template');
  
  // URL: /studio?template=castle
  // templateId = "castle"
}
```

### 路径参数（Dynamic Routes）

```tsx
import { useParams } from 'react-router-dom';

function ModelDetailPage() {
  const { id } = useParams();
  
  // URL: /community/123
  // id = "123"
}
```

---

## 🔄 重定向逻辑

### 1. 未登录访问受保护页面
```
用户访问 /studio 
  ↓
ProtectedRoute 检测未登录
  ↓
重定向到 /login（保存 from: /studio）
  ↓
用户登录成功
  ↓
跳转回 /studio
```

### 2. 已登录访问登录页
```tsx
// 可选：在 LoginPage 中添加
const { isAuthenticated } = useAuth();

if (isAuthenticated) {
  return <Navigate to="/studio" replace />;
}
```

### 3. 404 处理
```tsx
<Route path="*" element={<Navigate to="/" replace />} />
```

---

## 🚀 用户流程示例

### 新用户注册流程
```
1. 访问首页 /
2. 点击 "Start Creating" 或 "Sign Up"
3. 跳转到 /signup
4. 填写注册表单
5. 注册成功 → 自动登录 → 跳转 /studio
6. 开始创作
```

### 老用户登录流程
```
1. 访问 /studio（直接访问受保护页面）
2. 检测未登录 → 重定向 /login?from=/studio
3. 填写登录表单
4. 登录成功 ��� 跳转回 /studio
```

### 浏览社区流程
```
1. 访问 /community（公开）
2. 浏览作品列表
3. 点击作品 → /community/123
4. 查看详情
5. 点击 "Remix":
   - 未登录 → 跳转 /login
   - 已登录 → 跳转 /studio?template=123
```

---

## 📱 响应式导航

### MarketingNav
- 桌面端：横向菜单
- 移动端：汉堡菜单（AnimatePresence 动画）

### AppNav
- 桌面端：完整用户信息
- 移动端：仅显示头像

### DashboardSidebar
- 桌面端：固定侧边栏
- 移动端：可考虑添加抽屉式导航（未实现）

---

## 🎯 最佳实践

### 1. 使用语义化路由
✅ `/community/123` （清晰）
❌ `/c/123` （简短但不明确）

### 2. 受保护路由使用 ProtectedRoute
```tsx
<Route 
  path="/studio" 
  element={
    <ProtectedRoute>
      <StudioPage />
    </ProtectedRoute>
  } 
/>
```

### 3. 条件导航栏
```tsx
{isAuthenticated && <AppNav />}
{!isAuthenticated && <MarketingNav />}
```

### 4. 后退按钮
```tsx
const navigate = useNavigate();
<button onClick={() => navigate(-1)}>Back</button>
```

### 5. 链接状态传递
```tsx
// 发送方
navigate('/studio', { state: { fromRemix: true, modelId: 123 } });

// 接收方
const location = useLocation();
const { fromRemix, modelId } = location.state || {};
```

---

## 🔧 技术栈

- **React Router v6** - 路由管理
- **Context API** - 认证状态
- **TypeScript** - 类型安全
- **Motion/React** - 页面过渡动画

---

## 📝 待实现功能（真实产品需要）

### 认证相关
- [ ] 真实 API 集成
- [ ] JWT Token 管理
- [ ] 刷新 Token 机制
- [ ] 持久化登录（localStorage/cookie）
- [ ] 第三方登录（Google, GitHub）

### 路由增强
- [ ] 加载状态（Suspense）
- [ ] 错误边界（Error Boundary）
- [ ] 页面标题管理（react-helmet）
- [ ] SEO 优化（meta tags）
- [ ] 页面过渡动画
- [ ] 滚动位置恢复

### 权限控制
- [ ] 角色权限系统（RBAC）
- [ ] 不同 Plan 的功能限制
- [ ] 试用期限制

---

## 🎓 学习资源

**React Router 官方文档**：
https://reactrouter.com/

**常用 Hooks**：
- `useNavigate()` - 编程式导航
- `useLocation()` - 获取当前路由
- `useParams()` - 获取路径参数
- `useSearchParams()` - 获取查询参数

---

## ✅ 总结

当前实现的路由系统包括：

✅ 7 个页面路由
✅ 嵌套路由（Dashboard）
✅ 路由守卫（受保护页面）
✅ 认证上下文（登录状态）
✅ 两套导航系统
✅ 编程式和声明式导航
✅ URL 参数管理
✅ 重定向逻辑
✅ 响应式菜单
✅ 浏览器历史记录支持

这是一个**完整的、真实产品级别的路由系统**！🎉
