export interface VideoItem {
  id?: string;
  title: string;
  description: string;
  isTrend: boolean;
  tags: string[];
  imageUrl: string;
  width?: number;
  height?: number;
}

export interface IList {
    name: string
    icon: React.ReactElement
    link?: string
    type: 'link' | 'btn'
    store?: () => void
    onClick?: () => void
}

