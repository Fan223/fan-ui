<template>
  <div v-if="article.visible" class="preview-margin">
    <h1 c-white>{{ article.title }}</h1>

    <div style="color: #bebebe" flex="~ items-center">
      <Logo height="2" width="1.5" />
      <b ml-2> 凡 </b>
      <!-- Last modified time -->
      <div class="i-ic-baseline-access-time" h-5 w-5 ml-4 />
      <span ml-1> {{ article.updateTime }} </span>

      <div class="stats" flex="~ items-center">
        <!-- Estimated reading speed -->
        <div class="i-ic-outline-timer" h-5 w-5 ml-4 />
        <span ml-1> {{ article.readSpeed }} </span>
        <!-- Word count -->
        <div class="i-line-md-text-box" h-5 w-5 ml-4 />
        <span ml-1> {{ article.length }} </span>
      </div>
    </div>
  </div>

  <div class="preview-grid preview-margin" grid>
    <div id="preview" />

    <div v-show="outline" class="outline-outer" w-80 sticky top-20 right-8 p-4 rd-6>
      <div style="color: var(--text-bright)" flex="~ items-center">
        <div class="i-ic-round-menu-book" h-6 w-6 />
        <h2 m="l-2 0">文章目录</h2>
      </div>

      <div id="outline" mt-4 />
    </div>
  </div>
</template>

<script setup lang="ts">
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import { debounce } from '@/assets/ts/utils/debounce';

const article = reactive({
  title: '',
  updateTime: '',
  readSpeed: '',
  length: '',
  visible: false,
});
const outline = ref(false);

onMounted(() => {
  request
    .get('/fan/blog/article/getArticle/' + router.currentRoute.value.params.id)
    .then((res) => {
      article.title = res.data.title;
      article.updateTime = 'Last modified on ' + res.data.updateTime;

      let length = res.data.content.length;
      article.length = length > 1000 ? (length / 1000).toFixed(1) + ' k' : length;

      let speed = Math.ceil(length / 500);
      article.readSpeed = speed < 60 ? speed + ' mins' : (speed / 60).toFixed(1) + ' hours';
      article.visible = true;

      Vditor.preview(document.getElementById('preview') as any, res.data.content, {
        mode: 'dark',
        hljs: {
          lineNumber: true,
          style: 'dracula',
        },
        math: {
          inlineDigit: true,
          engine: 'MathJax',
        },
        markdown: {
          autoSpace: true,
          fixTermTypo: true,
          toc: true,
          paragraphBeginningSpace: true,
          listStyle: true,
        },
        theme: {
          current: 'dark',
        },
        after: () => {
          initOutline();
          outline.value = true;

          clickHighlight();
          window.addEventListener('scroll', scrollHighlight);

          // Scroll to the anchor position when loading
          let anchor = router.currentRoute.value.redirectedFrom?.hash;
          if (anchor && anchor.startsWith('#')) {
            anchor = anchor.substring(1);
            let heading = document.getElementById(anchor);
            heading?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        },
      });
    })
    .catch(() => {
      ElMessage.error('Error occurred while loading article');
    });
});

const headings: any = [];
function initHeadings() {
  // Get the child elements of the element
  let children: any = document.getElementById('preview')?.children;

  Array.from(children).forEach((child: any) => {
    let tagName = child.tagName;
    // Retrieve its title element
    if (2 === tagName.length && 0 === tagName.indexOf('H') && !isNaN(tagName.charAt(1))) {
      headings.push(child);
    }
  });
}

const outlines: any = [];
function initOutline() {
  initHeadings();

  // Retrieve the outline element
  let outline = document.getElementById('outline') as HTMLElement;
  // Create an outline list and add it to the outline element
  let outlineList = document.createElement('ul');
  outline.appendChild(outlineList);

  // The current list, used to store directory items under the current level, initially set to the outline list.
  let currentList = outlineList;
  // Current level, initially set to 1.
  let currentLevel = 1;

  headings.forEach((heading: any) => {
    // Create anchor links
    let anchor = document.createElement('a');
    anchor.textContent = heading.textContent;
    anchor.setAttribute('href', `#${heading.id}`);
    outlines.push(anchor);

    // Create list items, and add anchor links to the list items.
    let listItem = document.createElement('li');
    listItem.appendChild(anchor);

    // Retrieve heading level
    let level = parseInt(heading.tagName.charAt(1));
    // If the heading level is greater than the current level, create a new list and add it to the current list.
    // Then set the current list to the newly created list, and increase the current level by 1.
    while (level > currentLevel) {
      let nestedList = document.createElement('ul');
      currentList.appendChild(nestedList);
      currentList = nestedList;
      currentLevel++;
    }

    // If the heading level is less than the current level, set the current list to the parent list of the parent list,
    // and decrease the current level by 1.
    while (level < currentLevel) {
      currentList = currentList.parentElement as HTMLUListElement;
      currentLevel--;
    }

    // Add the list item to the current list
    currentList.appendChild(listItem);
  });
}

let currentAnchor: any;
function highlight(anchor: any) {
  if (currentAnchor !== anchor) {
    // Unhighlight the previously highlighted element
    outlines.forEach((outline: any) => {
      if (outline === currentAnchor) {
        outline.classList.remove('highlight');
      }
    });

    if (anchor instanceof HTMLElement) {
      anchor.classList.add('highlight');
    }
    currentAnchor = anchor;
  }
}

function clickHighlight() {
  outlines.forEach((outline: any) => {
    outline.addEventListener('click', () => {
      highlight(outline);
    });
  });
}

const scrollHighlight = debounce(() => {
  let rects = headings.map((heading: any) => heading.getBoundingClientRect());

  for (let i = 0; i < rects.length; i++) {
    let rect = rects[i];
    let outline = outlines[i];

    if (rect.top >= 0 && rect.top <= 350) {
      highlight(outline);
      break;
    } else if (rect.top < 0 && rects[i + 1] && rects[i + 1].top > document.documentElement.clientHeight) {
      highlight(outline);
      break;
    }
  }
});
</script>

<style lang="scss">
.preview-margin {
  margin: 2rem;
}

@media (max-width: 768px) {
  .stats {
    display: none;
  }
}

.preview-grid {
  grid-template-columns: minmax(0, 1fr) 20rem;
  gap: 3.5rem;
}

#preview {
  color: var(--text-normal);

  h1,
  h2,
  h3,
  h4 {
    color: var(--text-bright);
  }
}

.outline-outer {
  height: calc(100vh - 8rem);
  background-color: var(--background-secondary);

  #outline {
    height: calc(100vh - 11rem);
    overflow-y: auto;

    ul {
      list-style: none;

      &:first-child {
        color: var(--text-bright);
        padding: 0;
        margin: 0;
        font-weight: bold;
      }

      &:not(:first-child) {
        color: var(--text-normal);
        margin-left: 0.25rem;
        padding-left: 2rem;
        border-left: 1px solid var(--text-accent);
        font-weight: normal;
      }

      li::before {
        content: '•';
        color: var(--text-accent);
        font-size: 1.5rem;
        margin-right: 0.5rem;
      }
    }
  }
}

.highlight {
  color: var(--text-accent) !important;
  font-weight: bold;
}

@media (max-width: 992px) {
  .outline-outer {
    display: none;
  }
  .preview-margin {
    margin: 1rem;
  }
  .preview-grid {
    grid-template-columns: 1fr;
  }
}
</style>
