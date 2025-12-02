# InfiniteBrick AI - 多语言系统指南 (I18n Guide)

## ✅ 已完成的多语言支持

### 核心系统
- ✅ 语言上下文 (`LanguageContext`)
- ✅ 英文字典 (`/locales/en.ts`)
- ✅ 中文字典 (`/locales/zh.ts`)
- ✅ 语言切换组件 (`LanguageSwitch`)
- ✅ 浏览器语言自动检测
- ✅ localStorage 持久化

### 已完成多语言的组件

#### 导航系统
- ✅ **MarketingNav** - 营销导航栏
- ✅ **AppNav** - 应用导航栏

#### 页面
- ✅ **LandingPage** (所有子组件)
  - ✅ Hero - 首屏
  - ✅ CoreValues - 核心价值
  - ✅ Gallery - 作品展示
  - ✅ TrustBadges - 信任徽章
  - ✅ Footer - 页脚
- ✅ **LoginPage** - 登录页
- ✅ **SignupPage** - 注册页

---

## 📋 待完成的多语言组件

### 高优先级
- [ ] **Studio 工作台**
  - [ ] StudioConsole - 左侧控制台
  - [ ] StudioViewport - 中间 3D 视窗
  - [ ] DeliveryPanel - 右侧交付面板

- [ ] **Community 社区**
  - [ ] Community - 社区页面
  - [ ] CommunityFilters - 筛选栏
  - [ ] CommunityCard - 作品卡片

- [ ] **Dashboard 个人中心**
  - [ ] DashboardSidebar - 侧边栏
  - [ ] MyModels - 我的模型
  - [ ] MyOrders - 我的订单
  - [ ] AccountSettings - 账户设置

- [ ] **ModelDetailPage** - 作品详情页

### 中优先级
- [ ] **BrandButton** - 品牌按钮 (部分文案)
- [ ] **BrandCard** - 品牌卡片 (标题等)

---

## 🎯 如何使用多语言系统

### 1. 在组件中使用翻译

```tsx
import { useTranslation } from '../../contexts/LanguageContext';

function MyComponent() {
  const t = useTranslation();
  
  return (
    <div>
      <h1>{t.hero.title1}</h1>
      <p>{t.hero.subtitle}</p>
      <button>{t.common.save}</button>
    </div>
  );
}
```

### 2. 访问当前语言

```tsx
import { useLanguage } from '../../contexts/LanguageContext';

function MyComponent() {
  const { language } = useLanguage();
  
  return (
    <div>
      {language === 'zh' ? '中文内容' : 'English Content'}
    </div>
  );
}
```

### 3. 切换语言

```tsx
import { useLanguage } from '../../contexts/LanguageContext';

function MyComponent() {
  const { setLanguage } = useLanguage();
  
  return (
    <button onClick={() => setLanguage('zh')}>
      切换到中文
    </button>
  );
}
```

### 4. 添加语言切换器

```tsx
import { LanguageSwitch } from './components/LanguageSwitch';

// Compact 样式（适合导航栏）
<LanguageSwitch variant="compact" />

// Default 样式（适合设置页面）
<LanguageSwitch />
```

---

## 📚 字典结构

### 英文字典示例 (`/locales/en.ts`)

```typescript
export const en = {
  nav: {
    product: 'Product',
    community: 'Community',
    login: 'Login',
    // ...
  },
  hero: {
    title1: 'Design Infinite',
    title2: 'Brick Models',
    subtitle: 'From text to physical...',
    // ...
  },
  common: {
    loading: 'Loading...',
    save: 'Save',
    cancel: 'Cancel',
    // ...
  }
};
```

### 中文字典示例 (`/locales/zh.ts`)

```typescript
export const zh = {
  nav: {
    product: '产品',
    community: '社区',
    login: '登录',
    // ...
  },
  hero: {
    title1: '用 AI 设计',
    title2: '无限可能的',
    subtitle: '从文字到实物...',
    // ...
  },
  common: {
    loading: '加载中...',
    save: '保存',
    cancel: '取消',
    // ...
  }
};
```

---

## 🔧 添加新翻译的步骤

### 步骤 1: 更新字典文件

在 `/locales/en.ts` 和 `/locales/zh.ts` 中添加新的键值对：

```typescript
// en.ts
export const en = {
  // ... existing translations
  newSection: {
    title: 'New Title',
    description: 'New description'
  }
};

// zh.ts
export const zh = {
  // ... existing translations
  newSection: {
    title: '新标题',
    description: '新描述'
  }
};
```

### 步骤 2: 在组件中使用

```tsx
import { useTranslation } from '../../contexts/LanguageContext';

function NewComponent() {
  const t = useTranslation();
  
  return (
    <div>
      <h2>{t.newSection.title}</h2>
      <p>{t.newSection.description}</p>
    </div>
  );
}
```

---

## 🌐 当前支持的语言

| 语言代码 | 语言名称 | 本地名称 | 状态 |
|---------|---------|---------|------|
| `en` | English | English | ✅ 完整支持 |
| `zh` | Chinese (Simplified) | 简体中文 | ✅ 完整支持 |

---

## 📝 翻译覆盖清单

### Landing Page (首页) ✅
- [x] Hero Section
- [x] Core Values
- [x] Gallery
- [x] Trust Badges
- [x] Footer

### Auth Pages (认证页面) ✅
- [x] Login Page
- [x] Signup Page

### Navigation (导航) ✅
- [x] Marketing Nav
- [x] App Nav
- [x] User Menu

### Studio (工作台) ❌
- [ ] Console Panel
- [ ] Viewport Controls
- [ ] Delivery Panel
- [ ] Specifications
- [ ] Parts List
- [ ] Pricing Options

### Community (社区) ❌
- [ ] Filters & Search
- [ ] Category Tabs
- [ ] Model Cards
- [ ] Stats Display

### Dashboard (个人中心) ❌
- [ ] Sidebar Navigation
- [ ] My Models
- [ ] My Orders
- [ ] Settings
  - [ ] Profile
  - [ ] Subscription
  - [ ] Preferences
  - [ ] Security

### Model Detail (作品详情) ❌
- [ ] Specifications
- [ ] Creator Info
- [ ] Tags
- [ ] Pricing
- [ ] Actions (Buy, Remix, etc.)

---

## 🚀 快速更新剩余组件的模板

### 示例：更新 Studio 组件

```tsx
import { useTranslation } from '../../contexts/LanguageContext';

export function StudioConsole() {
  const t = useTranslation();
  
  return (
    <div>
      <h2>{t.studio.console.title}</h2>
      <input placeholder={t.studio.console.promptPlaceholder} />
      <button>{t.studio.console.generateButton}</button>
    </div>
  );
}
```

### 需要在字典中添加：

```typescript
// en.ts
studio: {
  console: {
    title: 'Console',
    promptPlaceholder: 'Describe your model...',
    generateButton: 'Generate Model'
  }
}

// zh.ts
studio: {
  console: {
    title: '控制台',
    promptPlaceholder: '描述你的模型...',
    generateButton: '生成模型'
  }
}
```

---

## 💡 最佳实践

### 1. 命名规范
- 使用点分隔符组织层级结构
- 使用驼峰命名法 (camelCase)
- 保持键名的一致性

```typescript
✅ Good
t.dashboard.settings.profile.title

❌ Bad
t.DashboardSettingsProfileTitle
```

### 2. 避免硬编码文本
```tsx
❌ Bad
<button>Save Changes</button>

✅ Good
<button>{t.common.saveChanges}</button>
```

### 3. 提供后备文本
```tsx
// 如果翻译缺失，提供默认值
{t.newFeature?.title || 'Default Title'}
```

### 4. 动态文本插值
对于需要插入变量的文本，可以使用字符串模板或函数：

```typescript
// 字典中
export const en = {
  welcome: (name: string) => `Welcome, ${name}!`
};

// 使用
{t.welcome(user.name)}
```

---

## 🔄 语言切换流程

```
用户点击语言切换器
       ↓
调用 setLanguage('zh')
       ↓
更新 LanguageContext state
       ↓
保存到 localStorage
       ↓
更新 HTML lang 属性
       ↓
所有组件自动重新渲染
       ↓
显示新语言内容
```

---

## 📊 统计数据

- **总翻译键数量**: ~200+ (已完成)
- **待翻译键数量**: ~150+ (剩余组件)
- **支持语言**: 2 (英文、简体中文)
- **翻译覆盖率**: ~57% (主要页面已完成)

---

## 🎯 下一步工作

### 优先级 1: Studio 工作台
这是核心功能，需要完整的多语言支持：
1. 更新 `StudioConsole.tsx`
2. 更新 `StudioViewport.tsx`
3. 更新 `DeliveryPanel.tsx`

### 优先级 2: Community 社区
用户浏览作品的主要入口：
1. 更新 `Community.tsx`
2. 更新 `CommunityFilters.tsx`
3. 更新 `CommunityCard.tsx`

### 优先级 3: Dashboard 个人中心
用户管理的核心页面：
1. 更新 `MyModels.tsx`
2. 更新 `MyOrders.tsx`
3. 更新 `AccountSettings.tsx`

---

## ✅ 测试清单

- [x] 英文环境下所有文本显示正确
- [x] 中文环境下所有文本显示正确
- [x] 语言切换实时生效
- [x] localStorage 持久化正常
- [x] 浏览器语言检测正常
- [x] HTML lang 属性更新正常
- [ ] Studio 所有文本已翻译
- [ ] Community 所有文本已翻译
- [ ] Dashboard 所有文本已翻译

---

## 📖 相关资源

- **React i18n 最佳实践**: https://react.i18next.com/
- **TypeScript 类型安全**: 当前实现已经是类型安全的
- **Context API 文档**: https://react.dev/reference/react/useContext

---

## 🎉 总结

当前多语言系统已经完成了核心框架和主要页面的翻译，包括：
- ✅ 首页完整支持双语
- ✅ 登录/注册页面
- ✅ 导航系统
- ✅ 语言切换功能
- ✅ 持久化和自动检测

剩余工作主要集中在应用内的核心功能页面（Studio、Community、Dashboard），这些页面的翻译可以按照相同的模式快速完成。
