# ✨ Stack Component Guidlines ✨

Stack was created with a single goal: help ourself and others ship better products faster. Stack team very welcome any kind of contributions. Up to date Stack already consist 10+ components. To keep things structured we introduce few guidelines which must be maintained across all Stack components. 

If you're looking to add your component to the Stack family or trying to understand internal Stack structure keep reading. 

## Component files

Every Stack component must include following parts:
1. [CODE_OF_CONDUCT](./CODE_OF_CONDUCT.md) — general code of conduct
2. [README](./COMPONENT_README.md) — general component readme.
3. [CONTRIBUTING](./CONTRIBUTING.md) — contribution guide.
4. [List of contributors](./all-contributorssrc) — list of all component contributors. We use [all-contributors](https://github.com/kentcdodds/all-contributors)
5. [package.json](./package.json) — mainly used as source for the common component tasks. At the moment allow to add contributors to the component readme.
6. [LICENSE](./LICENSE) — all Stack components are released under MIT license.
7. [CHANGELOG.md](./CHANGELOG.md) — we keep every change in the CHANGELOG.md
8. [SHIP_README](./SHIP_README.md) — this is optional readme which becomes README.md, when component get integrated into the [Ship](https://github.com/paralect/ship). 

## A beautiful README

A good README needs to contain all the essential information so that developers understand what the project is about, why they should use it, and how to use it. It should also be stylish and attractive (use smiles and easy, concise language). 

1. *Headline* — every component should have a headline, which is one sentense description of how component can be helful or what it does. 
2. *Github topics* — every component should have a list of relevant topics.
3. *Features* — briefly describe primary features (use smiles 🔥⚡️, they make life more fun). See [an example](https://github.com/paralect/node-mongo#features)
4. *Installation guide* — users should know how to install/use component.
5. *Example* — include short component example usage, move full api reference into separate document. See [an example](https://github.com/paralect/node-mongo#quick-example)
6. *Changelog*, *License*, *Contributing*, *Contributors* sections are required to every repository. See [an example 1](./COMPONENT_README.md) and an [example 2](https://github.com/paralect/node-mongo#change-log).

## Creating your own Stack component

1. Copy/paste all files to your Stack component repository
2. Update [COMPONENT_README](./COMPONENT_README.md) and rename into `README.md` — that would be a primary readme of your component. It's important to provide meaningful description of the component, update all links to the relevant badges, provide clear getting started guide.
3. Add initial set of changes to the [CHANGELOG](./CHANGELOG.md)
4. Publish initial version of component using [Github Releases](https://help.github.com/articles/creating-releases/)
5. Create new issue into [Stack](https://github.com/paralect/stack/issues/new) to list your component in the main Stack repository.
