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
