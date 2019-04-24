## product design

免费添加项目

急招：付钱帮你显示到 new position

interested <==> developer vs project

分类：
keyword： javascript; python; sql;


## Tech choices

- docker-compose: to start up dev env with one command
- up; aws lambda; aws dynamodb: to make the app serverless
- react: 模块化开发 UI

### My thoughts while considering about the tech stack

前后端分离还是用 view engine 的方法

分离的优点

- SPA + API, the frontend and backend code can be reused to build apps
- API 也可以作为应用的 feature 提供给感兴趣的人使用
- 性能优势
  - 前端是纯静态资源，不用服务器返回，省流量，也快

分离的缺点

- SEO 比较麻烦，根据做 cloudfetch 的经验，发 ajax 请求得到的内容没有被谷歌收录

view engine 的优点

- Using view engine way to render the page, browser get the result HTML, instead of doing ajax which seems hard to do SEO. I will need to learn next.js/nuxt.js. And who knows how these libs will be like in 3 years.

view engin 的缺点

- 如果需要客户端，要重写
- 如果需要 API，要重写
- js 模块化比较难，复杂单页应用不适合

所以我决定调查一下，基于 ajax 的单页应用，是否有比较简单的方法，让谷歌收录到你网站上的所有内容，并且不影响排名。如果这个问题可以解决，那么前后端分离的单页应用方案就可以战胜 view engine 了

Why SPA
- it's the future, google should handle the issue in the future
- more popular, as a open source project, adopting most popular tech stack makes more people to contribute

## the "银弹": next.js!

- react as a "template engine": react is a component system, which is more flexable and powerful then pug/ejs, and all things are in js, so you can make use of the great npm ecosystem

### Database choice

I choose dynamodb to make the app fully serverless. Dynamodb has [many issues](https://news.ycombinator.com/item?id=14721920), but its the best serverless database I can find for now.

## What to store

User

- githubLogin
- name
- avatarUrl
- email
- watchingCompanies
- watchingKeywords
- 发帖
- comment
