title: Move to Hexo
---
Today, I moved my blog from Wordpress to [Hexo](https://hexo.io/). I use github.io to host the blog.

The reason I choose Hexo not Jekyll mainly is I am more familiar with Node.js than Ruby so I can write plugins easily.

Hexo is a very powerful static content generator which converts MarkDown posts to Html.

To install Hexo, simply:

```bash
npm install -g hexo
hex init  #create a new blog in current folder
npm install . #install dependencies
```

To serve content locally:

```bash
hexo serve
```

To generate static content:

```bash
hexo g
```

To deploy to github:

1. open _config.yml
2. add deploy section:

```yaml
deploy:
  type: git
  repo: <your github.io repo>
  branch: master
```

3. then run:

```bash
hexo deploy -g
```

There are still a lot of powerful function in Hexo. Check [here](https://hexo.io/docs/) for more details.
