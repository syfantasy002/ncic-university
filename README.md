# New Canaan International College 网站

这是New Canaan International College大学官方网站的源代码仓库。该网站采用现代响应式设计，展示了大学的信息、课程和设施。

## 项目结构

```
├── index.html               # 主页
├── about.html               # 关于我们页面
├── academics.html           # 学术页面
├── admission.html           # 招生页面
├── campus.html              # 校园生活页面
├── contact.html             # 联系我们页面
├── css/
│   └── style.css            # 全局样式
├── js/
│   └── main.js              # JavaScript功能
├── images/                  # 图片资源文件夹
└── image_list.md            # 图片生成指南
```

## 特点

- 响应式设计 - 适配所有设备尺寸
- 现代化界面 - 使用Bootstrap 5框架
- 轮播组件 - 集成Owl Carousel 2滑块
- 动画效果 - 平滑的过渡和视觉效果
- 跨浏览器兼容 - 支持所有主流浏览器
- 多语言支持 - 支持中英文内容展示

## 页面说明

- **主页**: 展示学校概况、学术项目、活动和统计数据
- **关于我们**: 介绍学校历史、使命、核心价值观和领导团队
- **学术**: 展示本科和研究生课程、研究中心和学术资源
- **招生**: 提供入学要求、申请流程、奖学金信息和常见问题解答
- **校园生活**: 展示学生住宿、餐饮、活动、社团和支持服务
- **联系我们**: 包含联系表单、地图和部门联系方式

## 技术栈

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- jQuery
- Owl Carousel 2
- Font Awesome 6

## 部署到Cloudflare Pages

### 前提条件

1. 一个Cloudflare账户
2. 将代码托管在支持的Git提供商（GitHub、GitLab或Bitbucket）

### 部署步骤

1. **准备代码仓库**

   确保您的代码已经推送到Git仓库中，并且包含了所有必要的文件和图片资源。

2. **在Cloudflare Dashboard中创建新项目**

   - 登录到您的[Cloudflare仪表板](https://dash.cloudflare.com)
   - 从侧边栏导航到 **Pages**
   - 点击 **Create a project** 按钮
   - 选择 **Connect to Git**

3. **连接Git仓库**

   - 选择您的Git提供商（GitHub、GitLab或Bitbucket）
   - 授权Cloudflare访问您的仓库
   - 从列表中选择此仓库
   - 点击 **Begin setup**

4. **配置部署设置**

   - **Project name**: `ncic-website` (或您喜欢的名称)
   - **Production branch**: `main` (或您的主分支名称)
   - **Build settings**: 由于这是静态HTML网站，无需配置构建命令和输出目录
   - **环境变量**: 此项目不需要特殊的环境变量
   - 点击 **Save and Deploy**

5. **等待部署完成**

   Cloudflare Pages将自动构建和部署您的网站。这个过程通常需要几分钟时间。

6. **访问您的网站**

   部署完成后，您可以通过Cloudflare提供的默认域名访问您的网站：
   `https://ncic-website.pages.dev`

### 自定义域名设置（可选）

如果您想使用自定义域名（如 `www.ncic.edu.kg`）：

1. 在项目仪表板中，点击 **Custom domains**
2. 点击 **Set up a custom domain**
3. 输入您想要使用的域名
4. 按照说明配置DNS设置
5. 等待DNS验证完成

## 维护和更新

### 添加新内容

1. 修改相应的HTML文件以添加或更新内容
2. 将更改推送到Git仓库
3. Cloudflare Pages将自动检测更改并重新部署网站

### 添加新图片

1. 参考 `image_list.md` 文件中的提示生成新图片
2. 将生成的图片添加到 `images` 文件夹
3. 在HTML文件中引用新图片

## 图片生成

所有网站图片可以使用fal.ai的Recraft API生成。详细的生成提示和说明可以在 `image_list.md` 文件中找到。

## 联系信息

- **网站**: [ncic.edu.kg](https://ncic.edu.kg)
- **邮箱**: info@ncic.edu.kg
- **电话**: +996 (312) 544112
- **地址**: 223 University Avenue, Bishkek, Kyrgyzstan 