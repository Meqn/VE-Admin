import { randomNum } from '@/utils'
import { userlist } from './utils'

let articleId = 100
const ArticleStatus = [
  { name: '已发布', value: 'publish' },
  { name: '草稿', value: 'draft' },
  { name: '私密', value: 'secrete' },
  { name: '已废弃', value: 'discard' }
]

const categories = [
  { id: 2031, name: '日常生活' },
  { id: 2032, name: '奇技淫巧' },
  { id: 2033, name: '社会科学' },
  { id: 2034, name: '人文地理' },
  { id: 2035, name: '生物医药' },
  { id: 2036, name: '健康生活' },
  { id: 2037, name: '穿衣打扮' },
  { id: 2038, name: '装修攻略' },
  { id: 2039, name: '动物世界' },
  { id: 2040, name: '自然科学' },
  { id: 2041, name: '海外人文' },
  { id: 2042, name: '宇宙奥秘' }
]

function getArticleItem() {
  articleId++

  return {
    id: articleId,
    title: '基于ElementUI和Vue实现的后台前端解决方案',
    description: 'VE-Admin是一个后台前端解决方案，它基于 vue 和 element-ui实现。它使用了最新的前端技术栈，内置了 i18 国际化解决方案，动态路由，权限验证，提炼了典型的业务模型，提供了丰富的功能组件，它可以帮助你快速搭建企业级中后台产品原型。',
    // content: `<div class="markdown"><p>Ant Design Pro 是基于 Ant Design 和 umi 的封装的一整套企业级中后台前端/设计解决方案，致力于在设计规范和基础组件的基础上，继续向上构建，提炼出典型模板/业务组件/配套设计资源，进一步提升企业级中后台产品设计研发过程中的『用户』和『设计者』的体验。随着『设计者』的不断反馈，我们将持续迭代，逐步沉淀和总结出更多设计模式和相应的代码实现，阐述中后台产品模板/组件/业务场景的最佳实践，也十分期待你的参与和共建。</p><h2 id="开发前的输入"><a aria-hidden="true" tabindex="-1" href="/zh-CN/docs/getting-started#开发前的输入"><span class="icon icon-link"></span></a>开发前的输入</h2><p>Ant Design Pro 作为一个前端脚手架，默认读者已经懂了一些前端的基础知识，并且了解 umi 和 Ant Design, 如果你是纯粹的新手，第一次来跑项目建议读一下 <a href="/zh-CN/docs/introduction">新手需知</a>。磨刀不误砍柴工，了解一些基础知识可以让学习曲线更加平滑。</p><h2 id="准备工作"><a aria-hidden="true" tabindex="-1" href="/zh-CN/docs/getting-started#准备工作"><span class="icon icon-link"></span></a>准备工作</h2><p>由于国内网络和前端的特殊性，在安装依赖等方面可能会失败或导致无法启动，浪费大量的时间我们推荐如下的技术栈来帮助我们顺畅的开发。</p><h3 id="包管理器"><a aria-hidden="true" tabindex="-1" href="/zh-CN/docs/getting-started#包管理器"><span class="icon icon-link"></span></a>包管理器</h3><p>推荐使用 <a target="_blank" rel="noopener noreferrer" href="https://www.npmjs.com/package/tyarn">tyarn<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" x="0px" y="0px" viewBox="0 0 100 100" width="15" height="15" class="__dumi-default-external-link-icon"><path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path><polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon></svg></a> 来进行包管理，可以极大地减少 install 的时间和失败的概率，并且完全兼容 npm。</p><p>如果喜欢使用 npm 而不是 yarn，可以使用 <a target="_blank" rel="noopener noreferrer" href="https://www.npmjs.com/package/cnpm">cnpm<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" x="0px" y="0px" viewBox="0 0 100 100" width="15" height="15" class="__dumi-default-external-link-icon"><path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path><polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon></svg></a>, 安装速度比 <code>tyarn</code> 更快，但是与 npm 不是完全兼容。</p><h3 id="terminal"><a aria-hidden="true" tabindex="-1" href="/zh-CN/docs/getting-started#terminal"><span class="icon icon-link"></span></a>Terminal</h3><p>非 windows 用户没什么好说的，iTerm2 和 my zsh 是最强选择。</p><p>对于 windows 用户而言，bash on linux 是最好的选择，但是可能会造成一些性能问题。这里推荐使用 <a target="_blank" rel="noopener noreferrer" href="https://github.com/microsoft/terminal">Windows Terminal<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" x="0px" y="0px" viewBox="0 0 100 100" width="15" height="15" class="__dumi-default-external-link-icon"><path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path><polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon></svg></a> 和 <a target="_blank" rel="noopener noreferrer" href="https://github.com/PowerShell/Powershell">Powershell<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" x="0px" y="0px" viewBox="0 0 100 100" width="15" height="15" class="__dumi-default-external-link-icon"><path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path><polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon></svg></a>。Windows Terminal 可以直接在微软商店中下载，美貌与实力并存，不逊于 iTerm2，微软官方维护品质也值得信赖。Powershell 是 window7 以来内置的命令行工具，被 linux 创始人称赞为不那么烂的命令行。并且可以配置 <a target="_blank" rel="noopener noreferrer" href="https://dahlbyk.github.io/posh-git/">posh-git<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" x="0px" y="0px" viewBox="0 0 100 100" width="15" height="15" class="__dumi-default-external-link-icon"><path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path><polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon></svg></a>，能得到部分 zsh 的能力。</p><p>配置好后效果</p><p><img src="https://store-images.s-microsoft.com/image/apps.49728.13926773940052066.d057d8b2-5284-497c-95a9-c3db62fd5ed8.9fe6d0d6-c148-4742-8275-61d2d69a7ab1?w=1399&amp;h=810&amp;q=90&amp;format=jpg" alt="Powershell"></p><h2 id="初始化"><a aria-hidden="true" tabindex="-1" href="/zh-CN/docs/getting-started#初始化"><span class="icon icon-link"></span></a>初始化</h2><p>我们提供了 create umi 来快速的初始化脚手架。</p><p>脚手架初始化成功之后就可以开始进行开发了，我们提供了一些命令来辅助开发。</p></div>`,
    category: categories[randomNum(0, 11)],
    tags: ['管理后台', 'ElementUI', '路由', '权限验证'],
    author: userlist[randomNum(0, 14)],
    createTime: new Date('2021-12-03 15:32:41'),
    updateTime: new Date('2021-12-11 09:45:32'),
    viewCount: randomNum(100, 99999),
    likeCount: randomNum(5, 999),
    commentsCount: randomNum(5, 999),
    status: ArticleStatus[randomNum(0, 3)]
  }
}

export default {
  'post:/article/': () => {
    return ''
  },
  'put:/article/': () => {
    return ''
  },
  'get:/article/': ({ page, pageSize, userId, title, createDate }) => {
    // params = { page, pageSize, userId, title, createDate }
    return {
      count: 615,
      previous: '',
      next: '',
      results: Array(pageSize || 10).fill('').map(v => {
        return getArticleItem()
      })
    }
  },
  'get:/article/:id/': () => {
    return getArticleItem()
  }
}
