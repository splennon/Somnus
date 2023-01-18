import { ListContentComponent_v2 } from "../components/list-content/v2/listcontent.component"
import { SnippetContentComponent_v2 } from "../components/snippet-content/v2/snippet-contet.component"

export const v2 = [
  {
    id: 1,
    header: 'Text content',
    content: {
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    },
    open: false,
  },
  {
    id: 2,
    header: 'Custom Component Header',
    content: {
      componentType: ListContentComponent_v2,
      inputs: {
        items: ['one', 'two', 'three'],
      },
    },
    open: false,
  },
  {
    id: 3,
    header: 'Another Custom Component Header',
    content: {
      componentType: SnippetContentComponent_v2,
      inputs: {
        description: 'Code snippet',
        snippet: `
          if (today === 'Sunday') {
            selfDestruct();
          }
        `,
      },
    },
    open: false,
  },
  {
    id: 4,
    header: 'Yet One More Custom Component Header',
    content: {
      componentType: SnippetContentComponent_v2,
      inputs: {
        description: 'Another Code snippet',
        snippet: `
          if (today === 'Sunday') {
            selfDestruct();
            // Holy moley
          }
        `,
      },
    },
    open: false,
  },
];
