# Feature-Sliced Design (FSD) Structure

Проект реорганизован по методологии Feature-Sliced Design (FSD).

## Структура папок

```
app/
├── app/                    # Инициализация приложения (Next.js App Router)
│   ├── layout.tsx          # Корневой layout
│   └── page.tsx            # Главная страница
│
├── (pages)/                # Страницы приложения (Next.js pages)
│   ├── movies/
│   ├── tv/
│   ├── profile/
│   └── ...
│
├── widgets/                # Крупные самостоятельные блоки
│   ├── header/             # Виджет шапки сайта
│   │   ├── ui/
│   │   │   ├── Header.tsx
│   │   │   ├── Logo.tsx
│   │   │   └── Burger.tsx
│   │   └── index.ts
│   ├── sidebar/            # Виджет боковой панели
│   │   ├── ui/
│   │   │   ├── Sidebar.tsx
│   │   │   └── SidebarNavigate.tsx
│   │   └── index.ts
│   ├── main/               # Виджет основного контента
│   │   ├── ui/
│   │   │   └── Main.tsx
│   │   └── index.ts
│   └── background/         # Виджет фона
│       ├── ui/
│       │   ├── Bg.tsx
│       │   └── MatrixBackground.tsx
│       └── index.ts
│
├── features/               # Функциональные возможности
│   ├── video-preview/      # Превью видео
│   │   ├── ui/
│   │   │   ├── TrendingFilms.tsx
│   │   │   ├── Films.tsx
│   │   │   └── NewItemSlider.tsx
│   │   └── index.ts
│   ├── search/             # Поиск
│   │   ├── ui/
│   │   │   └── Search.tsx
│   │   └── index.ts
│   ├── notifications/      # Уведомления
│   │   ├── ui/
│   │   │   ├── NotificationButton.tsx
│   │   │   └── NotificationDropdown.tsx
│   │   └── index.ts
│   ├── profile/            # Профиль пользователя
│   │   ├── ui/
│   │   │   └── ProfileBtn.tsx
│   │   └── index.ts
│   └── genre/              # Жанры
│       ├── ui/
│       │   └── GanreBtn.tsx
│       └── index.ts
│
├── entities/               # Бизнес-сущности
│   ├── video/              # Сущность видео
│   │   ├── model/
│   │   │   └── types.ts
│   │   └── index.ts
│   ├── user/               # Сущность пользователя
│   │   └── ...
│   └── genre/              # Сущность жанра
│       ├── model/
│       │   └── types.ts
│       └── index.ts
│
└── shared/                 # Переиспользуемые ресурсы
    ├── ui/                 # UI компоненты
    │   └── ...
    ├── lib/                # Утилиты
    │   └── utils/
    │       └── common.ts
    ├── hooks/              # React хуки
    │   ├── useWindowSize.ts
    │   └── useSizeImage.ts
    ├── types/              # Типы (реэкспорт из entities)
    │   └── video.ts
    ├── constants/          # Константы
    │   ├── FakeData.ts
    │   └── FakeGanre.ts
    └── stores/             # Zustand stores
        └── modal.ts
```

## Правила импорта

### Импорт из shared
```typescript
import { useMediaQuery } from "@/shared/hooks/useWindowSize";
import { videoData } from "@/shared/constants/FakeData";
import { useSidebar } from "@/shared/stores/modal";
```

### Импорт из entities
```typescript
import { VideoItem, IList } from "@/entities/video";
import { Genre } from "@/entities/genre";
```

### Импорт из features
```typescript
import { Search } from "@/features/search";
import { NotificationButton } from "@/features/notifications";
import { ProfileBtn } from "@/features/profile";
import { TrendingFilms } from "@/features/video-preview";
```

### Импорт из widgets
```typescript
import { Header } from "@/widgets/header";
import { Sidebar } from "@/widgets/sidebar";
import { Main } from "@/widgets/main";
import { Bg, MatrixBackground } from "@/widgets/background";
```

## Правила FSD

1. **Слои могут импортировать только из нижележащих слоев:**
   - `app` → `pages` → `widgets` → `features` → `entities` → `shared`

2. **Слои не могут импортировать из вышележащих слоев**

3. **Сегменты одного слоя не должны импортировать друг друга**

4. **Shared** - самый низкий слой, используется всеми

5. **Entities** - бизнес-сущности, не зависят от features/widgets

6. **Features** - функциональные возможности, могут использовать entities и shared

7. **Widgets** - крупные блоки, могут использовать features, entities, shared

8. **Pages** - страницы, могут использовать widgets, features, entities, shared

