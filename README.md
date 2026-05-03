# 知识引擎实验室 · 管理与组织架构

基于 Vue 3 + Vite 的实验室组织架构站点，提供三种视角：

1. **总体架构（`/#/overall`）** — 以人为核心的层次树形结构（学术带头人 → 学术 / 工程 / 产业 PI → 学生与工程师）。
2. **研究方向（`/#/direction`）** — 按通用智能技术、AI 4 Science、AI 海洋三大方向组织。
3. **平台依托（`/#/platform`）** — 按二级单位划分，并单独展示孵化平台 **智科慧创**。

## 本地开发

```bash
npm install
npm run dev
```

## 生产构建

```bash
npm run build
npm run preview
```

## 部署

仓库已包含 `.github/workflows/deploy.yml`，推送到 `main` 分支后会自动构建并部署到 GitHub Pages。

> 站点访问地址（假设仓库名为 `myteam`）：`https://<user>.github.io/myteam/`
>
> 在仓库的 **Settings → Pages → Build and deployment** 中将 Source 选择为 **GitHub Actions** 即可生效。

## 维护成员名单

所有成员（老师、学生、工程师、智科慧创团队）都集中维护在 `src/data/members.js`，
按照已有结构增删字段后重新提交即可，CI 会自动重新部署。
