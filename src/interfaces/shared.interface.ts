import type { Component } from 'vue'

export interface GenericKeys {
  [key: string]: string | number
}

export interface Tile {
  title: string
  icon: Component
  bgColor: string
  to: string
  fullWidth?: boolean
  cols: number
  sm: number
  xl: number
  content?: Component
}

export enum Theme {
  Light = 'light',
  Dark = 'dark'
}

export interface PaginationData {
  count: number
  limit: number
  skip: number
}

export interface MainListDataItem {
  title: string
  subtitle?: string
  id: string
  hrefItem?: string
  hrefEdit?: string
  hrefRemove?: string
  clickItem?: (id: string) => void
  editItem?: (id: string) => void
  removeItem?: (id: string) => void
}

export interface MainLists extends PaginationData {
  data: MainListDataItem[]
}

export type EventType = MouseEvent | KeyboardEvent
