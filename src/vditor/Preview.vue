<template>
  <div v-show="article.visible" m-8>
    <h1 text-12.5 my-5.25 c-white>{{ article.title }}</h1>

    <div style="color: #bebebe" flex="~ wrap items-center">
      <Logo height="2.5rem" width="2rem" />
      <b ml-4 c-white>凡</b>

      <Icon class="i-ic:round-access-time" size="1.25rem" ml-4 />
      <div ml-1>{{ article.updateTime }}</div>

      <Icon class="i-ic:outline-timer" size="1.25rem" ml-4 />
      <div ml-1>{{ article.readTime }}</div>

      <Icon class="i-ic:round-text-snippet" size="1.25rem" ml-4 />
      <div ml-1>{{ article.length }}</div>
    </div>
  </div>

  <div class="preview-container">
    <div id="preview" />

    <div v-show="outlineVisible" class="outline-container">
      <div style="color: var(--text-bright)" flex="~ items-center" text-5.625>
        <Icon class="i-ic:round-menu-book" size="1.5rem" />
        <b ml-2>文章目录</b>
      </div>

      <ul id="outline"></ul>
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
  readTime: '',
  length: '',
  visible: false,
});

const outlineVisible = ref(false);
onMounted(() => {
  request.get('/fan/blog/article/getArticle/' + router.currentRoute.value.params.id).then((res) => {
    article.title = res.data.title;
    article.updateTime = '最后修改于 ' + res.data.updateTime;
    // 文章字数
    let length = res.data.content.length;
    article.length = length > 1000 ? (length / 1000).toFixed(1) + ' k' : length;
    // 阅读时长
    let speed = Math.ceil(length / 500);
    article.readTime = speed < 60 ? speed + ' mins' : (speed / 60).toFixed(1) + ' hours';
    article.visible = true;

    Vditor.preview(document.getElementById('preview') as HTMLDivElement, res.data.content, {
      mode: 'dark',
      hljs: {
        lineNumber: true,
        style: 'dracula',
      },
      math: {
        inlineDigit: true,
      },
      markdown: {
        autoSpace: true,
        fixTermTypo: true,
        toc: true,
        paragraphBeginningSpace: true,
      },
      theme: {
        current: 'dark',
      },
      after: () => {
        initOutline();
        outlineVisible.value = true;

        clickHighlight();
        window.addEventListener('scroll', scrollHighlight);

        // 加载时滚动到锚点位置
        let anchor = router.currentRoute.value.hash;
        if (anchor && anchor.startsWith('#')) {
          anchor = anchor.substring(1);
          let heading = document.getElementById(anchor);
          heading?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      },
    });
  });
});

let headings: HTMLElement[] = [];
function initHeadings() {
  const preview = document.getElementById('preview');
  if (!preview) return;

  // 解析标题
  headings = Array.from(preview.querySelectorAll<HTMLElement>('h1, h2, h3, h4, h5, h6'));
}

const outlines: any[] = [];
function initOutline() {
  initHeadings();

  let outline = document.getElementById('outline');
  if (!outline) return;

  let currentList = outline;
  let currentLevel = 1;

  headings.forEach((heading) => {
    // 创建锚点
    let anchor = document.createElement('a');
    anchor.textContent = heading.textContent;
    anchor.setAttribute('href', `#${heading.id}`);
    outlines.push(anchor);

    // 创建列表项，将锚点添加到下面
    let listItem = document.createElement('li');
    listItem.appendChild(anchor);

    // 获取标题等级
    let level = parseInt(heading.tagName.charAt(1));
    // 如果标题级别大于当前级别，创建一个新列表并将其添加到当前列表，然后将当前列表设置为新创建的列表，并将当前级别增加 1
    while (level > currentLevel) {
      let nestedList = document.createElement('ul');
      currentList.appendChild(nestedList);
      currentList = nestedList;
      currentLevel++;
    }

    // 如果标题级别小于当前级别，则将当前列表设置为其父列表，并将当前级别降低 1
    while (level < currentLevel) {
      currentList = currentList.parentElement as HTMLUListElement;
      currentLevel--;
    }

    // 将列表项添加到当前列表
    currentList.appendChild(listItem);
  });
}

let currentAnchor: any;
function highlight(anchor: any) {
  if (currentAnchor !== anchor) {
    // Unhighlight the previously highlighted element
    outlines.forEach((outline: any) => {
      if (outline === currentAnchor) {
        outline.classList.remove('outline--highlight');
      }
    });

    if (anchor instanceof HTMLElement) {
      anchor.classList.add('outline--highlight');
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

<style scoped lang="scss">
.preview-container {
  display: grid;
  gap: 2rem;
  grid-template-columns: minmax(0, 1fr) 20rem;
  margin: 0 2rem;
}

:deep(#preview) {
  color: var(--text-normal);
  margin-bottom: 1rem;

  :is(h1, h2, h3, h4) {
    color: var(--text-bright);
  }
}

.outline-container {
  position: sticky;
  top: 5rem;
  height: calc(100vh - 7rem);
  background-color: var(--background-secondary);
  padding: 1.5rem;
  border-radius: 1.5rem;
}

:deep(#outline) {
  height: calc(100vh - 12rem);
  margin-top: 1rem;
  color: var(--text-bright);
  font-weight: bold;
  overflow-y: auto;

  ul {
    color: var(--text-normal);
    margin-left: 0.25rem;
    padding-left: 2rem;
    border-left: 1px solid var(--text-accent);
  }

  li {
    cursor: pointer;

    &::before {
      content: '•';
      color: var(--text-accent);
      font-size: 1.5rem;
      margin-right: 0.5rem;
    }
  }
}

:deep(.outline--highlight) {
  color: var(--text-accent);
}

@media (max-width: 992px) {
  .preview-container {
    grid-template-columns: 1fr;
    margin: 0 1rem;
  }

  .outline-container {
    display: none;
  }
}
</style>
