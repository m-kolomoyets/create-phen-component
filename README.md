# create-phen-component

### Simple utility for adding new React component with Phenomenon.Studio style.

## Features

-   Creating folder
-   Creating all the component files:

    -   Root file
    -   Types file
    -   Module CSS file
    -   index file with exports

-   Typescript only
    <br />

## Quickstart

Install via NPM:

```bash
# Using Yarn:
$ yarn global add create-phen-component

# or, using NPM
$ npm i -g create-phen-component
```

`cd` into your project's directory, and try creating a new component:

```bash
$ create-phen-component MyNewComponent
```

Your project will now have a new directory at `path/to/components/folder/MyNewComponent`. This directory has minimum 4 files:

```tsx
// `MyNewComponent/MyNewComponent.tsx`
import { memo } from 'react';
import clsx from 'clsx';
import type { MyNewComponentProps } from './types';
import s from './MyNewComponent.module.css';

const MyNewComponent: React.FC<MyNewComponentProps> = ({ className }) => {
	return <div className={clsx(s.wrap, className)}>{MyNewComponent}</div>;
};

export default memo(MyNewComponent);
```

```ts
// `MyNewComponent/types.ts`
export type MyNewComponentProps = {
	className?: string;
};
```

```ts
// `MyNewComponent/index.ts`
export * from './MyNewComponent';
export { default } from './MyNewComponent';
export type * from './types';
```

```css
/* `MyNewComponent/MyNewComponent.module.css` */
.wrap {
}
```

> **Storybook Stories** If you enable Storybook file creation, it will create Storybook 7.0.7 template;

```tsx
// `MyNewComponent/MyNewComponent.stories.tsx`
import type { Meta, StoryObj } from '@storybook/react';
import type { MyNewComponentProps } from './types';
import MyNewComponent from './MyNewComponent';

const meta = {
	title: 'ui/MyNewComponent',
	component: MyNewComponent,
	tags: ['autodocs']
} satisfies Meta<typeof MyNewComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {} as MyNewComponentProps
};
```

<br />

## API Reference

### Storybook enable

If you would like to create Storybook template in the component, use:

-   `--story` — or aliased (`--s`)

**Usage:**

Command line: `create-phen-component MyNewComponent` or `create-phen-component MyNewComponent --story` in the folder you want the component to be created
<br />

## Platform Support

This has only been tested in macOS. Windows is a big question mark.
<br />
